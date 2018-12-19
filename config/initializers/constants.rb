# MSG
# Token
MSG_TOKEN_EXPIRED = 'Token expired.'
MSG_TOKEN_INVALID = 'Invalid token.'
MSG_TOKEN_UNAUTHORIZED = 'Unauthorized.'

# Case
MSG_CASE_EXISTS = 'PEDIA case already exists.'
MSG_CASE_UPDATE = 'Update PEDIA case successfully.'
MSG_CASE_CREATED = 'PEDIA case created successfully.'
MSG_CASE_ERROR = 'Unable to save patient information. Please check the data.'
MSG_CASE_NOT_EXISTS = 'Case does not exist.'
MSG_CASE_DELETED = 'Patient information deleted.'

# VCF
MSG_VCF_INVALID = 'Invalid file'
MSG_VCF_NO_CASE = 'Corresponding case does not exist. Please create the case first.'
MSG_VCF_DELETED = 'VCF file deleted.'
MSG_VCF_NOT_EXIST = 'VCF file does not exist.'

# PEDIA service
MSG_PEDIA_RUNNING_TRY_LATER = 'There is another PEDIA service for this case running. Please try it later.'
MSG_VCF_SUCCESS_PEDIA_RUNNING = 'VCF file uploaded successfully. PEDIA workflow will be triggered.'
MSG_NO_PEDIA = 'No PEDIA service found.'
MSG_NO_PEDIA_RESULTS = 'Can not find results.'
MSG_NO_PEDIA_CASE = 'Case does not exist. Please create a case first to get PEDIA results.'

# Log
API_LOG = File.join("#{Rails.root}", 'log', 'api')

# QC
MSG_VCF_PASSED_QC = 'VCF file passed QC, report generated and PEDIA running'
MSG_VCF_TOO_SHORT = 'VCF file too short for QC, no report generated, PEDIA running'
MSG_VCF_FAILED_QC = 'VCF file failed QC, report generated and PEDIA running'
