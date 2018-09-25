# PEDIA service
## PEDIA api status code
### get token
200
```
{token: blablabla}
```
400
```
{msg: Unauthorized.}
```
### create patient
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
### upload vcf file
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
### get results
200
```
{[
    {
        "gene_name": "SLC33A1",
        "gene_id": "9197",
        "pedia_score": "1.4282742372625679",
        "label": "0"
    },
    {
        "gene_name": "NUP214",
        "gene_id": "8021",
        "pedia_score": "0.5783114357257846",
        "label": "0"
    }
]}
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
