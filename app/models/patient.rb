class Patient < ApplicationRecord
  belongs_to :submitter, :optional => true
  has_many :patients_features
  has_many :features, :through => :patients_features, :dependent => :destroy
  has_many :patients_disorders
  has_many :disorders, :through => :patients_disorders, :dependent => :destroy

  validates :case_id, :submitter_id, presence: true
  validates :case_id, uniqueness: true

  def parse_json(data)
    features = parse_features(data['features'])
    self.features << features
    parse_detected(data['detected_syndromes'])
    parse_selected(data['selected_syndromes'])
  end

  def parse_features(data)
    feature_array = Array.new
    for hpo in data do
      hpo_result = Feature.find_or_initialize_by(hpo_term: hpo)
      feature_array.push(hpo_result)
    end
    return feature_array
  end

  def parse_detected(data)
    for disorder in data
      if disorder['omim_id'].kind_of?(Array)
        omims = disorder['omim_id']
        for omim in omims
          disorder_result = Disorder.find_or_create_by(disorder_id: omim, disorder_name: disorder['syndrome_name'])
          self.disorders << disorder_result
          patient_disorder = PatientsDisorder.where(patient_id: self.id, disorder_id: disorder_result.id).take
          assign_scores(disorder, patient_disorder)
        end
      else
        disorder_result = Disorder.find_or_create_by(disorder_id: disorder['omim_id'], disorder_name: disorder['syndrome_name'])
        self.disorders << disorder_result
        patient_disorder = PatientsDisorder.where(patient_id: self.id, disorder_id: disorder_result.id).take
        assign_scores(disorder, patient_disorder)
      end
    end
  end

  def parse_selected(disorder)
    if disorder['omim_id'].kind_of?(Array)
      omims = disorder['omim_id']
      for omim in omims
        disorder_result = Disorder.where(disorder_id: omim).take
        if disorder_result.nil?
          disorder_result = Disorder.create(disorder_id: omim, disorder_name: disorder['syndrome_name'])
        end
        patient_disorder = PatientsDisorder.find_or_create_by(patient_id: self.id, disorder_id: disorder_result.id)
        patient_disorder.diagnosed = true
        patient_disorder.save
      end
    else
      disorder_result = Disorder.where(disorder_id: disorder['omim_id']).take
      if disorder_result.nil?
        disorder_result = Disorder.create(disorder_id: disorder['omim_id'], disorder_name: disorder['syndrome_name'])
      end
      patient_disorder = PatientsDisorder.find_or_create_by(patient_id: self.id, disorder_id: disorder_result.id)
      patient_disorder.diagnosed = true
      patient_disorder.save
    end
  end

  def assign_scores(scores, patient_disorder)
    for key in get_score_key(scores)
      score = Score.find_or_create_by(name: key)
      puts scores[key]
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
    return self.patients_disorders.where(diagnosed:true)
  end

  def get_detected_disorders
    return self.patients_disorders
  end
end
