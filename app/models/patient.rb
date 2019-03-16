class Patient < ApplicationRecord
  belongs_to :submitter, :optional => true
  belongs_to :lab, :optional => true
  has_many :patients_features
  has_many :features, :through => :patients_features, :dependent => :destroy
  has_many :patients_disorders
  has_many :disorders, :through => :patients_disorders, :dependent => :destroy
  has_many :patients_vcf_files
  has_many :vcf_files, :through => :patients_vcf_files, :dependent => :destroy
  #has_many :disorders_mutataion_scores, :through => :patients_vcf_files, :dependent => :destroy

  has_many :result_figures, :dependent => :destroy
  has_many :disease_causing_mutations, :dependent => :destroy
  has_many :pedia, :dependent => :destroy
  has_many :usi_materialnrs, :dependent => :destroy
  has_many :users_patients
  has_many :users, :through => :users_patients

  has_many :uploaded_vcf_files
  has_many :pedia_services
  validates :case_id, :submitter_id, presence: true
  validates :case_id, uniqueness: { scope: :lab_id }

  def self.create_patient(content)
    submitter = self.parse_user(content)
    lab = self.parse_lab(content)
    patient = Patient.create(case_id: content['case_data']['case_id'],
                             submitter_id: submitter.id,
                             lab_id: lab.id)
    if content['case_data'].has_key? 'sample_id'
      patient.sample_id = content['case_data']['sample_id']
    end
    patient.parse_json(content['case_data'])
    # ToDo: Parse suggested syndrome
    user = User.find_by_email(submitter.email)
    if not user.nil?
      if not user.patients.exists?(patient.id)
        user.patients << patient
      end
    end
    patient.save

    return patient
  end

  def self.parse_lab(content)
    # if contain lab info -> return lab
    # else return default lab
    if content['case_data'].has_key? 'lab_info'
      info = content['case_data']['lab_info']
      lab_f2g_id = info['lab_id']
      lab_name = info['lab_name']
      lab_contact = info['lab_contact']
      lab_email = info['lab_email']
      lab_country = info['lab_country']

      lab = Lab.find_by_lab_f2g_id(lab_f2g_id)
      if lab.nil?
        lab = Lab.create(lab_f2g_id: lab_f2g_id,
                  name: lab_name,
                  contact: lab_contact,
                  email: lab_email,
                  country: lab_country)
      end
    else
      lab = Lab.find_by_lab_f2g_id(0)
    end

    return lab
  end

  def self.parse_user(content)
    # Parse user info
    if content['case_data'].has_key? 'posting_user'
      user = content['case_data']['posting_user']
      user_name = user['userDisplayName']
      user_email = user['userEmail']
      user_institute = user['userInstitution']
    else
      user_name = "Mr. FDNA LAB"
      user_email = "fdna@fdna.com"
      user_institute = "F2G"
    end

    # Parse name
    user_array = user_name.split('.', 2)
    title = ''
    name = ''
    if user_array.length > 1
      title = user_array[0] + '.'
      name = user_array[1][1..-1]
      name_array = name.split(' ')
      first_name = name_array[0]
      last_name = name_array[-1]
      if name_array.length > 2
        first_name = name_array[0..-2].join(' ')
      end
    else
      name = user_array[0]
      name_array = name.split(' ')
      first_name = name_array[0]
      last_name = name_array[-1]
      if name_array.length > 2
        first_name = name_array[0..-2].join(' ')
      end
    end

    # Use email to find submitter
    submitter = Submitter.find_by_email(user_email)
    if submitter.nil?
      submitter = Submitter.create(first_name: first_name,
                                   last_name: last_name,
                                   email: user_email,
                                   #institute: user_institute,
                                   title: title)
    end
    return submitter
  end

  def parse_json(data)
    @@log = Logger.new('log/patient.log')
    @@log.info "Patient: #{data['case_id']}"
    @algo_version = data['algo_version']
    #parse_detected(data['detected_syndromes'])

    if data.has_key? 'selected_features'
      update_features(data['selected_features'])
    end

    if data.key? "selected_syndromes"
      parse_selected(data['selected_syndromes'])
    end

    if data.key? "genomicData"
      if data['genomicData'].length.positive?
        parse_genomic(data['genomicData'])
      end
    end
  end

  def update_json(data)
    @@log = Logger.new('log/patient.log')
    @@log.info "Patient: #{data['case_id']}"
    @algo_version = data['algo_deploy_version']
    if data.has_key? 'sample_id'
      self.sample_id = data['sample_id']
    end

    # features
    if data.has_key? 'selected_features'
      update_features(data['selected_features'])
    end

    # selected syndrome
    if data.key? 'selected_syndromes'
      parse_selected(data['selected_syndromes'])
    end

    # pedia score
    parse_pedia(data['geneList']) if data.key? 'geneList'

    # genomic data
    if data.key? "genomicData"
      if data['genomicData'].length > 0
        parse_genomic(data['genomicData'])
      end
    end
    self.result = true
  end

  def update_features(data)
    features = parse_features(data)
    new_features = features - self.features
    remove_features = self.features - features
    # Add new features
    self.features << new_features
    # Remove features
    remove_features.each do |feature|
      self.features.delete(feature.id)
    end
  end

  def parse_features(features)
    feature_array = Array.new
    features.each do |feature|
      hpo = feature['feature']['hpo_full_id']
      hpo_result = Feature.find_or_create_by(hpo_term: hpo)
      feature_array.push(hpo_result)
    end
    return feature_array
  end

  def parse_detected(data)
    for disorder in data
      if disorder['omim_id'].kind_of?(Array)
        syndrome_name = disorder['syndrome_name']
        psn = PhenotypicSeries.where(title:syndrome_name).take
        if psn.nil?
          @@log.fatal "PSN not found: #{syndrome_name}"
          next
        else
          psn_id = psn.id
          psn_num = psn.phenotypic_series_id
          psn_disorder_id = Disorder.where(disorder_id:psn_num, is_phenotypic_series: true).take.id
          omims = disorder['omim_id']
          for omim in omims
            disorder_result = Disorder.where(disorder_id: omim, is_phenotypic_series: false).take
            if disorder_result.nil?
              disorder_result = Disorder.create(disorder_id: omim)
              puts "New disorder"
            else
              PhenotypicSeriesDisorder.find_or_create_by(disorder_id:disorder_result.id, phenotypic_series_id:psn_id)
            end
          end
          patient_disorder = PatientsDisorder.find_or_create_by(patient_id: self.id, disorder_id:psn_disorder_id)
          assign_scores(disorder, patient_disorder)
        end
      else
        if disorder['omim_id'].nil?
          @@log.fatal "Syndrome has no omim: #{disorder['syndrome_name']}"
          next
        end
        disorder_result = Disorder.find_or_create_by(disorder_id: disorder['omim_id'])
        self.disorders << disorder_result
        patient_disorder = PatientsDisorder.where(patient_id: self.id, disorder_id: disorder_result.id).take
        assign_scores(disorder, patient_disorder)
      end
    end
  end

  def parse_selected(disorders)
    omim_array = Array.new
    disorders.each do |selected_syn|
      syn = selected_syn['syndrome']
      diagnosis = selected_syn['diagnosis']
      if syn['omim_id'].nil? and syn['omim_ids'].nil?
        puts "Syndrome has no omim: #{syn['syndrome_name']}"
      else
        if syn['omim_ps_id'].nil?
          disorder = Disorder.find_by(omim_id: syn['omim_id'],
                                      is_phenotypic_series: false)
          if disorder.nil?
            puts "Syndrome has no disorder: #{syn['syndrome_name']}"
            disorder = Disorder.create(omim_id: syn['omim_id'],
                                        disorder_name: syn['syndrome_name'],
                                        is_phenotypic_series: false)
          end
          omim_array << syn['omim_id'].to_i
        else
          ps_id = syn['omim_ps_id'].split('PS')[1]
          disorder = Disorder.find_by(omim_id: ps_id,
                                      is_phenotypic_series: true)
          if disorder.nil?
            puts "Syndrome has no PS: #{syn['syndrome_name']}"
            disorder = Disorder.create(omim_id: ps_id,
                                        disorder_name: syn['syndrome_name'],
                                        is_phenotypic_series: true)
          end
          omim_array << ps_id.to_i
        end
        patient_disorder = PatientsDisorder.find_or_create_by(patient_id: self.id,
                                                              disorder_id: disorder.id)
        patient_disorder.diagnosis_type_id = DiagnosisType.diag_type(diagnosis)
        patient_disorder.save
      end
    end
  end

  def parse_pedia(gene_list)
    for gene in gene_list
      if gene.key?("pedia_score")
        gene_id = gene['gene_id']
        gene_name = gene['gene_name']
        entrez_gene = Gene.find_by(entrez_id: gene_id)
        if gene_name != entrez_gene.name
          entrez_gene.name = gene_name
          entrez_gene.save
        end

        score = Score.find_or_create_by(name: 'pedia_score')
        pedia = gene['pedia_score']

        cadd = 0
        if gene.key?("cadd_phred_score")
          score = Score.find_or_create_by(name: 'cadd_phred_score')
          cadd = gene['cadd_phred_score']
        end

        pheno = 0
        if gene.key?("pheno_score")
          score = Score.find_or_create_by(name: 'pheno_score')
          pheno = gene['pheno_score']
        end

        gestalt = 0
        if gene.key?("gestalt_score")
          score = Score.find_or_create_by(name: 'gestalt_score')
          gestalt = gene['gestalt_score']
        end
        if entrez_gene.nil?
          puts gene_id
          puts gene['gene_name']
          next
        end
        p = Pedium.find_or_create_by(patient_id: self.id, gene_id: entrez_gene.id)
        p.pedia_score = pedia
        p.save
      end
    end
  end

  def parse_genomic(mut_array)
    if not mut_array.nil?
      mut_array.each do |mut|
        test = mut['Test Information']
        if test.key? 'Gene Name'
          gene = test['Gene Name']
          genotype = test['Genotype']
          muts = mut['Mutations']
          #if genotype == 'Compound Heterozygous'
          if genotype == 'COMPOUND HETEROZYGOUS'
            hgvs1 = muts['Mutation 1']['HGVS-code']
            hgvs2 = muts['Mutation 2']['HGVS-code']
            DiseaseCausingMutation.find_or_create_by(patient_id:self.id, genotype: genotype, gene_name: gene, hgvs: hgvs1)
            DiseaseCausingMutation.find_or_create_by(patient_id:self.id, genotype: genotype, gene_name: gene, hgvs: hgvs2)
          else
            hgvs = muts['HGVS-code']
            DiseaseCausingMutation.find_or_create_by(patient_id:self.id, genotype: genotype, gene_name: gene, hgvs: hgvs)
          end
        end
      end
    end
  end

  def assign_scores(scores, patient_disorder)
    for key in get_score_key(scores)
      puts @algo_version
      score = Score.find_or_create_by(name: key, version: @algo_version)
      DisordersPhenotypeScore.create(patients_disorder_id: patient_disorder.id, score_id: score.id, value: scores[key])
    end
  end

  def get_score_key(scores)
    key_array = Array.new
    for key in  scores.keys
      if key.end_with? '_score'
        key_array.push(key)
      end
    end
    return key_array
  end

  def get_selected_disorders
    unknow_id = DiagnosisType.find_by(name: DiagnosisType::UNKNOWN)
    return self.patients_disorders.where('diagnosis_type_id != ?', unknow_id)
  end

  def get_detected_disorders
    return self.patients_disorders
  end

end
