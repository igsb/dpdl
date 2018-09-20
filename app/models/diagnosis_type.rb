class DiagnosisType < ApplicationRecord
  has_many :patients_disorders

  UNKNOWN = 'Unknown'
  DIFFERENTIAL_DIAGNOSIS = 'Differential diagnosis'
  MOLECULARLY_DIAGNOSED = 'Molecularly diagnosed'
  CLINICALLY_DIAGNOSED = 'Clinically diagnosed'

  def self.diag_type(diag)
    code = 1
    if diag == 'DIFFERENTIAL_DIAGNOSIS'
      code = self.find_by_name(DIFFERENTIAL_DIAGNOSIS).id
    elsif diag == 'MOLECULARLY_DIAGNOSED'
      code = self.find_by_name(MOLECULARLY_DIAGNOSED).id
    elsif diag == 'CLINICALLY_DIAGNOSED'
      code = self.find_by_name(CLINICALLY_DIAGNOSED).id
    else
      code = self.find_by_name(UNKNOWN).id
    end
    return code
  end
end
