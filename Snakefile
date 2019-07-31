configfile: "config.yaml"

# PEDIA home directory
PEDIA_DIR = config['PEDIA_PATH']

# DPDL vcf and json directory
RECEIVED_VCF_DIR = "Data/Received_VcfFiles"
RECEIVED_JSON_DIR = "Data/Received_JsonFiles"

# input directory for PEDIA analysis
# cp json file to process/dpdl/{case_id}/case
# cp vcf file to process/dpdl/{case_id}/vcfs
PEDIA_OUTPUT = os.path.join(PEDIA_DIR, 'output')
PEDIA_PROCESS_DIR = os.path.join(PEDIA_DIR, "process/dpdl")
PEDIA_PHENO_DIR = "jsons/phenomized"
PEDIA_VCF_DIR = "vcfs/original"
PEDIA_ANN_VCF_DIR = "vcfs/annotated_vcfs"

def get_process_vcf(wc):
	configfile: "Data/Received_JsonFiles/%s/%s.json" % (wc.lab, wc.case)
	docs = config['documents']
	for doc in docs:
		if doc['is_vcf']:
			filename = doc['document_name']
	return filename

rule convert:
	input:
		json = os.path.join(RECEIVED_JSON_DIR, "{lab}", "{case}.json")
	output:
		json = os.path.join(PEDIA_PROCESS_DIR, "{lab}", "{case}.json")
	params:
		dir = os.path.join(PEDIA_PROCESS_DIR, "{lab}"),
		script = PEDIA_DIR + "helper/convert.py",
		omim = PEDIA_DIR + "preproc/216_gestalt_syn_to_omim_final.csv"
	shell:
		"""
		mkdir -p {params.dir}
		python {params.script} -c {input.json} -o {params.dir} -m {params.omim}
		"""

rule preprocess:
	input:
		json = os.path.join(PEDIA_PROCESS_DIR, "{lab}", "{case}.json")
	output:
		"Data/PEDIA_service/labs/{lab}/{case}/{pedia_id}/preproc.done"
	params:
		dir = "Data/PEDIA_service/labs/{lab}/{case}/{pedia_id}/"
	shell:
		"""
		mkdir -p {params.dir}
		touch {output}
		"""

rule pedia:
	input:
		json = os.path.join(PEDIA_PROCESS_DIR, "{lab}", "{case}.json"),
		vcf = get_process_vcf
	output:
		result = os.path.join(PEDIA_OUTPUT, "{lab}/results/{case}/{case}.csv"),
		vcf = os.path.join(PEDIA_OUTPUT, "{lab}/results/{case}/{case}.vcf.gz")
	params:
		dir = os.path.join(PEDIA_OUTPUT, "{lab}"),
		script = os.path.join(PEDIA_DIR, "pedia.py"),
		work_dir = PEDIA_DIR
	shell:
		"""
		cd {params.work_dir}
		python {params.script} --aws-format -s {input.json} -o {params.dir} -v {input.vcf}
		"""

rule cpoy_results:
	input:
		result = os.path.join(PEDIA_OUTPUT, "{lab}/results/{case}/{case}.csv"),
		vcf = os.path.join(PEDIA_OUTPUT, "{lab}/results/{case}/{case}.vcf.gz")
	output:
		result = "Data/PEDIA_service/labs/{lab}/{case}/{pedia_id}/{case}.csv",
		vcf = "Data/PEDIA_service/labs/{lab}/{case}/{pedia_id}/{case}_pedia.vcf.gz",
		ann_vcf = "Data/PEDIA_service/labs/{lab}/{case}/{pedia_id}/{case}_annotated.vcf.gz",
		qc_vcf = "Data/PEDIA_service/labs/{lab}/{case}/{pedia_id}/{case}_annotated_quality.vcf.gz"
	params:
		ann_vcf = os.path.join(PEDIA_OUTPUT, "{lab}", PEDIA_ANN_VCF_DIR, "{case}_annotated.vcf.gz"),
		dir = "Data/PEDIA_service/labs/{lab}/{case}/{pedia_id}/",
	shell:
		"""
		mkdir -p {params.dir}
		cp {input.result} {output.result}
		cp {input.vcf} {output.vcf}
		cp {params.ann_vcf} {output.ann_vcf}
		python lib/convert_annotation.py -i {params.ann_vcf} -o {output.qc_vcf}
		"""
