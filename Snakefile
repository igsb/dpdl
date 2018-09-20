configfile: "config.yaml"

# PEDIA home directory
PEDIA_DIR = config['PEDIA_PATH']

# DPDL vcf and json directory
RECEIVED_VCF_DIR = "Data/Received_VcfFiles"
RECEIVED_JSON_DIR = "Data/Received_JsonFiles"

# input directory for PEDIA analysis
# cp json file to process/dpdl/{case_id}/case
# cp vcf file to process/dpdl/{case_id}/vcfs
PEDIA_PROCESS_DIR = os.path.join(PEDIA_DIR, "process/dpdl")
PEDIA_PHENO_DIR = os.path.join(PEDIA_DIR, "data/PEDIA/jsons/phenomized")
PEDIA_VCF_DIR = os.path.join(PEDIA_DIR, "data/PEDIA/vcfs/original")

subworkflow classifier_workflow:
	workdir: PEDIA_DIR + "classifier"
	snakefile: PEDIA_DIR + "classifier/Snakefile"

def get_process_vcf(wc):
	configfile: "Data/Received_JsonFiles/%s.json" % wc.case
	docs = config['documents']
	for doc in docs:
		if doc['is_vcf']:
			filename = doc['document_name']
	return filename

rule convert:
	input:
		json = os.path.join(RECEIVED_JSON_DIR, "{case}.json")
	output:
		json = os.path.join(PEDIA_PROCESS_DIR, "{case}.json")
	params:
		dir = os.path.join(PEDIA_PROCESS_DIR),
		script = PEDIA_DIR + "convert.py",
		omim = PEDIA_DIR + "preproc/216_gestalt_syn_to_omim_final.csv"
	shell:
		"""
		mkdir -p {params.dir}
		python {params.script} -c {input.json} -o {params.dir} -m {params.omim}
		"""

rule phenomize:
	input:
		json = os.path.join(PEDIA_PROCESS_DIR, "{case}.json"),
		vcf = get_process_vcf
	output:
		json = os.path.join(PEDIA_PHENO_DIR, "{case}.json")
	params:
		dir = PEDIA_PHENO_DIR,
		script = os.path.join(PEDIA_DIR, "preprocess.py"),
		work_dir = PEDIA_DIR
	shell:
		"""
		cd {params.work_dir}
		python {params.script} -s {input.json} -o {params.dir}
		"""

rule preprocess:
	input:
		json = os.path.join(PEDIA_PHENO_DIR, "{case}.json")
	output:
		"Data/PEDIA_service/{case}/preproc.done"
	params:
		dir = "Data/PEDIA_service/{case}/"
	shell:
		"""
		mkdir -p {params.dir}
		touch {output}
		"""

rule pedia:
	input:
		out = classifier_workflow("output/test/1KG/{case}/run.out")
	output:
		result = "Data/PEDIA_service/{case}/{case}.csv"
	params:
		dir = "Data/PEDIA_service/{case}/",
		result = PEDIA_DIR + "classifier/output/test/1KG/{case}/{case}.csv"
	shell:
		"""
		mkdir -p {params.dir}
		cp {params.result} {output.result}
		"""
