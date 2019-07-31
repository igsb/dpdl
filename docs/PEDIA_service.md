# PEDIA service
Please follow these four steps to obtain the PEDIA results of your case.
For any question, please contact Tzung-Chien Hsieh (thsieh@uni.bonn.de).
1. [Authentication](#Authentication)
1. [Create patient](#Create-patient)
1. [Upload vcf file](#Upload-vcf-file)
1. [Get results](#Get-results)


## Authentication
### get token
**Get**  https://pedia-study.org/api/auth?user={}&key={}

For the authentication key, please contact thsieh@uni-bonn.de.
```
https://pedia-study.org/api/auth?user=username&key=user_key
```
### Response
200
```
{token: blablabla}
```
400
```
{msg: Unauthorized.}
```

## Create patient
**POST** https://pedia-study.org/api/patients

```
https://pedia-study.org/api/patients

# Header
Authorization: Bearer {token you received}

# Body
# Please send the data in the following format.
# If you want to use the exact format from PhenoBot, please contact us.
{
  "case_data": {
    "case_id": "123",
    "selected_syndromes": [],
    "selected_features": [
      {
        "is_present": "1",
        "feature": {
          "feature_name": "Hypertelorism",
          "hpo_id": "316",
          "hpo_full_id": "HP:0000316"
        }
      },
      {
        "is_present": "1",
        "feature": {
          "feature_name": "Global developmental delay",
          "hpo_id": "1263",
          "hpo_full_id": "HP:0001263"
        }
      }
    ],
    "suggested_syndromes": [
      {
        "syndrome": {
          "syndrome_name": "Noonan Syndrome",
          "omim_id": null,
          "omim_ids": [
            163950,
            609942,
            610733,
            611553,
            613706,
            163950,
            613224,
            605275,
            615355,
            616559,
            616564
          ],
          "omim_ps_id": "PS163950",
          "is_group": true,
          "app_valid": 1
        },
        "gestalt_score": 0.500829663,
        "feature_score": 0.5666834317
      },
      {
        "syndrome": {
          "syndrome_name": "Costello Syndrome; CSTLO",
          "omim_id": "218040",
          "omim_ids": [

          ],
          "omim_ps_id": null,
          "is_group": false,
          "app_valid": 1
        },
        "gestalt_score": 0.197606809,
        "feature_score": 0.6036102249
      }
    ],
    "dismissed_syndromes": [],
    "suggested_genes": [
      {
        "gene_name": "PTPN11",
        "omim_id": "176876"
      },
      {
        "gene_name": "CHRNG",
        "omim_id": "100730"
      }
    ],
    "selected_genes": [],
    "algo_version": "19.1.1",
    "lab_info": {
      "lab_id": 10000000,
      "lab_name": "",
      "lab_contact": "Tzung-Chien",
      "lab_address1": "Berlin",
      "lab_address2": "",
      "lab_city": "Berlin",
      "lab_state": "",
      "lab_country": "Germany",
      "lab_zip_code": "",
      "lab_phone": "123456789",
      "lab_fax": "",
      "lab_email": "la60312@gmail.com",
      "lab_web": "http://www.charite.de",
      "created_at": "2018-11-15 13:44:09",
      "updated_at": "2019-01-28 13:34:16",
      "test_types": []
    },
    "sample_id": "",
    "posting_user": {
      "userDisplayName": "",
      "userInstitution": "",
      "userEmail": "",
      "userPhone": null,
      "userCountry": "Germany",
      "userState": null
    },
    "team": null
  },
  "lab_id": 1000000000,
  "documents": [
    {
      "document_name": "1.vcf.gz",
      "is_vcf": 1
    }
  ]
}

```

### Response

200
```
# Create new case
{msg: PEDIA case created successfully.}
# Update exsited case
{msg: Update PEDIA case successfully.}
```
400
```
# Some problems with parsing and saving patinet data
# Perhaps check the format
{msg: Unable to save patient information. Please check the data.}
```
401
```
# Token expired, please get a new token.
{msg: Token expired.}

# Invalid token, please check if you provide the correct token.
{msg: Invalid token.}
```
## Upload vcf file
**POST** https://pedia-study.org/api/vcf_file

Once you upload the vcf file, the PEDIA service will be triggered.
It might take up to 10 minutes to complete. If you send the case
for the second time and the VCF file is the same. The annotation
process will be skipped, then the whole process will be done in 
3 minutes.
```
https://pedia-study.org/api/patients

# Header
Authorization: Bearer {token you received}

# Body
file: your vcf file
case_id: case id in the JSON data you send
lab_id: lab id in the JSON data you send
```
### Response

200
```
{msg: VCF file uploaded successfully. PEDIA workflow will be triggered.}
```
400
```
# File name without extension with zip, vcf or .gz.
{msg: Invalid file}

# There is no patient for this vcf file yet.
{msg: Corresponding case does not exist. Please create the case first.}

# There is already one PEDIA service for this case running. Please retry it once
# the previous one is completed.
{msg: There is another PEDIA service for this case running. Please try it later.}
```
401
```
# Token expired, please get a new token.
{msg: Token expired.}

# Invalid token, please check if you provide the correct token.
{msg: Invalid token.}
```
## Get results
**GET** http://pedia-study.org/api/get_results?case_id={}&lab_id={}
```
# Request
http://pedia-study.org/api/get_results?case_id=123&lab_id=1000000

# Header
Authorization: Bearer {token you received}

```

### Response
200
```
[
{
        "gene_name": "TRAPPC9",
        "gene_id": "83696",
        "pedia_score": "0.7303633426956435",
        "feature_score": "0.0",
        "cadd_score": "33.0",
        "gestalt_score": "0.0",
        "boqa_score": "2.3243727146145995e-10",
        "pheno_score": "0.9979",
        "label": "0"
    },
    {
        "gene_name": "PDE11A",
        "gene_id": "50940",
        "pedia_score": "0.6583320836247606",
        "feature_score": "0.0",
        "cadd_score": "43.0",
        "gestalt_score": "0.0",
        "boqa_score": "0.0",
        "pheno_score": "0.0",
        "label": "0"
    }
]
```

400
```
# There is no PEDIA service for this patient
{msg: No PEDIA service found.}

```
401
```
# Token expired, please get a new token.
{msg: Token expired.}

# Invalid token, please check if you provide the correct token.
{msg: Invalid token.}
```
404
```
# Whenever recieve 404, PEDIA service is still running. Please keep retrying.
{msg: Initiate PEDIA service}
{msg: Preprocessing running}
{msg: Workflow running}
```
500
```
# Whenever recieve 500, there is error in PEDIA service.
# Don't retry it. Please contact us.
# PEDIA service is completed, but no results is found.
{msg: Can not find results.}

# Preprocessing failed
{msg: Preprocessing failed}

# Worklow failed, perhaps due to VCF file processing.
{msg: Workflow failed}

# PEDIA service failed with unknown issue. Perhaps it ran over 1 hour or killed by server
{msg: PEDIA failed. Unknown issue.}
```
