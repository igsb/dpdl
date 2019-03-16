class Search < ApplicationRecord

  #has_many :search_types

  def self.search(search, search_type)
    # Init 
    hpo_array = Array.new
    omim_array = Array.new
    case_array = Array.new
    submitter_array = Array.new
    sample_array = Array.new
    
    has_hpo = false
    has_disorder = false
    has_case = false
    has_submitter = false
    has_sample = false


    # Parse search input
    search.zip(search_type) do |search_value, value_type|
      puts 'search input'
      puts "#{search_value}, #{value_type}"
      if !search_value.empty?
        if value_type.to_i == 1
          hpo_array.push(search_value)
          has_hpo = true
        elsif value_type.to_i == 2
          omim_array.push(search_value)
          has_disorder = true
        elsif value_type.to_i == 3
          case_array.push(search_value)
          has_case = true
        elsif value_type.to_i == 4
          submitter_array.push(search_value)
          has_submitter = true
        elsif value_type.to_i == 5
          sample_array.push(search_value)
          has_sample = true
        else
        end
      end
    end

    case_query = Array.new
    case_query_str = ""
    if has_case
      for c in case_array
        case_query.push('case_id LIKE ' + "'#{c}'")
      end
    case_query_str = " AND "
    end

    sample_query = Array.new
    sample_query_str = ""
    if has_sample
      for c in sample_array
        sample_query.push('sample_id LIKE ' + "'#{c}'")
      end
    sample_query_str = " AND "
    end

    submitter_query = Array.new
    submitter_query_str = ""
    if has_submitter
      for c in submitter_array
        name = Array.new
        if c.include?(" ")
          name = c.split(' ')
          submitters = Submitter.where("first_name LIKE ? OR last_name LIKE ? ", "#{name[0]}", "#{name[1]}")
        else
          submitters = Submitter.where("first_name LIKE ? OR last_name LIKE ? ", "#{c}", "#{c}")
        end
        if not submitters.empty?
          submitters.each do |submitter|
            submitter_query.push('submitter_id LIKE ' + "'#{submitter.id}'")
          end
          submitter_query_str = " AND "
        end
      end
    end

    if has_hpo and !has_disorder
      puts 'Search HPO'
      query = Array.new
      for hpo in hpo_array
        query.push("hpo_term LIKE " + "'#{hpo}'")
      end
      return Patient.joins(:features).where(query.join(" OR ") + " " + submitter_query_str + submitter_query.join(" OR ") + case_query_str + case_query.join(" OR ")).distinct
    elsif !has_hpo and has_disorder
      query = Array.new
      for omim in omim_array
        query.push('disorders.disorder_id LIKE ' + "'#{omim}'")
      end
      diag_query = Array.new
      # Add Phenotypic and Molecular diagnose
      diag_query.push('patients_disorders.diagnose_type_id LIKE 2')
      diag_query.push('patients_disorders.diagnose_type_id LIKE 3')

        return Patient.joins(:disorders).where(query.join(" OR ") + ' AND (' + diag_query.join(" OR ") + ') ' + submitter_query_str + submitter_query.join(" OR ") + case_query_str + case_query.join(" OR ")).distinct
    elsif has_hpo and has_disorder
      omim_query = Array.new
      for omim in omim_array
        omim_query.push('disorders.disorder_id LIKE ' + "'#{omim}'")
      end
      hpo_query = Array.new
      for hpo in hpo_array
        hpo_query.push('hpo_term LIKE ' + "'#{hpo}'")
      end
      diag_query = Array.new
      # Add Phenotypic and Molecular diagnose
      diag_query.push('patients_disorders.diagnose_type_id LIKE 2')
      #diag_query.push('patients_disorders.diagnose_type_id LIKE 3')
      return Patient.joins(:features).joins(:disorders).where(hpo_query.join(" OR ") + " AND (" + omim_query.join(" OR ") + ' AND ' + diag_query.join(" OR ") + ' ) '+ submitter_query_str + submitter_query.join(" OR ") + case_query_str + case_query.join(" OR ")).distinct
    elsif !has_hpo and !has_disorder and (has_submitter or has_case or has_sample)
      puts 'Search case and submitter'
      if case_query_str == ""
        submitter_query_str = ""
      end
      if submitter_query_str == "" and case_query_str == ""
        sample_query_str = ""
      end
      if submitter_query.empty? and case_query.empty? and sample_query.empty?
          return Patient.none
      else
        return Patient.where(case_query.join(" OR ") +
                             submitter_query_str +
                             submitter_query.join(" OR ") +
                             sample_query_str +
                             sample_query.join(" OR ")).distinct
      end
    else
      puts 'invalid'
    end
  end
end
