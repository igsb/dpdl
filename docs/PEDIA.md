# Running PEDIA pipeline
## Setup
### DPDL
 * config.yaml for setup path to PEDIA pipeline
 ```
 # In config.yaml tell DPDL where PEDIA is in your system
 PEDIA_PATH: '/data/project/pedia3/PEDIA-workflow/'
 ```
### PEDIA
1. Clone PEDIA workflow and checkout dpdl branch, and clone submodule classifier.
   ```
   git clone https://github.com/PEDIA-Charite/PEDIA-workflow.git
   git checkout dpdl
   git submodule update --recursive
   ```

1. Copy config file from the PEDIA folder in sciebo
   * config.ini 
   * hgvs_errors.json
 
1. Setup environment
   * install miniconda
   * install pedia environment
   ```
   # create pedia environment
   conda env create -f environment.yaml
 
   # activate pedia environment
   source activate pedia
 
   # deactivate pedia environment
   source deactivate
   ```
4. Download all necessary files
   ```
   # Download all files by running snakemake in data folder
   # It may takes several hours. You can also and --cores 4
   # to run with 4 threads.
   source activate pedia
   cd data
   snakemake -p all
   ```
5. Download training json file to training folder
   * To save your time for preprocess all training data, use the json files from
   our project folder in sciebo.
   Extract CV.tar.gz and put all files in 3_simulation/jsons/1KG/CV/.

## Run DPDL and PEDIA
### activate delayed_job workers
   * We used delayed_job to manage all submission from F2G. The jobs will be sent to a queue. Then we have to activate workers to process the jobs in the queue.
   ```
   # Run one worker
   bin/delayed_job start
   # Run two workers
   bin/delayed_job -n 2 start
   ```
### create patient
   ```
   http://localhost:3000/api/patients
   ```
### send VCF file
   * the PEDIA pipeline will be triggered once we received VCF file.
   * VCF file is saved in Data/Received_VcfFiles/case_id/.
   * Before activate PEDIA pipeline, we will add the following data to patient JSON file
   to point the path to VCF file
   ```
   "documents": [
        {
            "document_name": "/home/la60312/project/dpdl/Data/Received_VcfFiles/12/12.vcf",
            "is_vcf": 1
        }
    ]
   ```
### Trigger PEDIA pipeline
Triggering PEDIA is mainly in app/models/pedia_service.rb and Snakefile. There are two steps for PEDIA
preprocessing and main workflow. For these two steps, we call two shell commands in pedia_service.rb to
trigger the rules in Snakefile.

**Note**:

We haven't block the new submission of same case while the previous one is still running because we use 
snakemake --nolock here. For example, if case 12345 is still running, we can't send 12345 again before 
the process is completed.

1. Preprocessing
   * The pedia_service.rb call the following function for the following purposes. All the rules are defined
   in Snakefile
   * convert JSON format to PEDIA JSON format. The new JSON file will be in
   process/dpdl/12345.json (in PEDIA folder)
   * phenomize and convert syndrome to genes. The phenomized JSON file will be in 
   data/PEDIA/jsons/phenomized/12345.json
   * copy and compress VCF file to data/PEDIA/vcfs/original/12345.vcf.gz (in PEDIA folder)
   ```
   snakemake --nolock Data/PEDIA_service/12345/preproc.done
   # log file in log/pedia/12345/preprocess.log
   ```
   
1. PEDIA main workflow
   * annotating VCF file in the VCF workflow in data/PEDIA/vcfs/. All the rules are defined in
   data/PEDIA/vcfs/Snakefile. The annotated VCF is in data/PEDIA/vcfs/annotated_vcfs/
   * extract CADD from VCF file and append to JSON file. All the rules are defined in
   3_simulation/Snakefile. The final JSON file is in 3_simulation/jsons/real/unknown_test/12345.json
   * classification. Classifier will be trained by the JSON files in 3_simulation/jsons/1KG/CV, and
   further classify 3_simulation/jsons/real/unknown_test/12345.json. The results are in 
   classifier/output/test/12345/.
   * Copy the classifier/output/test/12345/12345.csv back to Data/PEDIA_service/12345/12345.csv
   ```
   snakemake --nolock Data/PEDIA_service/12345/12345.csv
   # log file in log/pedia/12345/workflow.log
   ```
