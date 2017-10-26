class Search < ApplicationRecord

  #has_many :search_types

  def self.search(search, search_type)
    # Init 
    hpo_array = Array.new
    omim_array = Array.new
    case_array = Array.new
    
    has_hpo = false
    has_disorder = false
    has_case = false


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
        else
        end
      end
    end
    
    case_query = Array.new
    case_query_str = " "
    if has_case
      for c in case_array
        case_query.push('case_id LIKE ' + "'#{c}'")
      end
    case_query_str = " AND "
    end
    
    if has_hpo and !has_disorder
      puts 'Search HPO'
      query = Array.new
      for hpo in hpo_array
        query.push('hpo_term LIKE ' + "'#{hpo}'")
      end
      return Patient.joins(:features).where(query.join(" OR ") + case_query_str + case_query.join(" OR ")).group('case_id')
    elsif !has_hpo and has_disorder
      puts 'Search omim'
      query = Array.new
      for omim in omim_array
        query.push('disorders.disorder_id LIKE ' + "'#{omim}'")
      end
      return Patient.joins(:disorders).where(query.join(" OR ") + ' AND patients_disorders.diagnosed LIKE true' + case_query_str + case_query.join(" OR ")).group('case_id')
    elsif has_hpo and has_disorder
      puts 'Search HPO and omim'
      omim_query = Array.new
      for omim in omim_array
        omim_query.push('disorders.disorder_id LIKE ' + "'#{omim}'")
      end
      hpo_query = Array.new
      for hpo in hpo_array
        hpo_query.push('hpo_term LIKE ' + "'#{hpo}'")
      end
      return Patient.joins(:features).joins(:disorders).where(hpo_query.join(" OR ") + " AND " + omim_query.join(" OR ") + ' AND patients_disorders.diagnosed LIKE true' + case_query_str + case_query.join(" OR ")).group('case_id')
    elsif !has_hpo and !has_disorder and has_case
      #puts 'Search case'
      return Patient.where(case_query.join(" OR "))
    else
    puts 'invalid'
    end
  end
end
