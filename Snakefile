configfile: "config.yaml"

PEDIA_DIR = config['PEDIA_PATH']

subworkflow classifier_workflow:
	workdir: PEDIA_DIR + "classifier/scripts"
	snakefile: PEDIA_DIR + "classifier/Snakefile"

rule cp_json:
	input: 
		json = "Data/Received_JsonFiles/" + "{case}.json"
	output:
		json = PEDIA_DIR + "lab/" + "{case}.json"
	shell:
		"""
		cp {input.json} {output.json}
		"""

rule compress_vcf:
	input: 
		vcf = "Data/Received_VcfFiles/" + "{case}.vcf"
	output:
		vcf = "Data/Received_VcfFiles/" + "{case}.vcf.gz"
	shell:
		"""
		bgzip -c {input.vcf} > {output.vcf}
		"""

rule cp_vcf:
	input: 
		vcf = "Data/Received_VcfFiles/" + "{case}.vcf.gz"
	output:
		vcf = PEDIA_DIR + "data/PEDIA/vcfs/original/" + "{case}.vcf.gz"
	shell:
		"""
		cp {input.vcf} {output.vcf}
		"""

rule per:
	input: 
		json = PEDIA_DIR + "lab/" + "{case}.json"
	output:
		json = PEDIA_DIR + "out/" + "{case}.json"
	params:
		dir = PEDIA_DIR + "out/",
		script = PEDIA_DIR + "convert.py",
		omim = PEDIA_DIR + "preproc/216_gestalt_syn_to_omim_final.csv"
	shell:
		"""
		python {params.script} -c {input.json} -o {params.dir} -m {params.omim} 
		"""

rule convert:
	input: 
		json = PEDIA_DIR + "out/" + "{case}.json"
	output:
		json = PEDIA_DIR + "data/PEDIA/jsons/phenomized/" + "{case}.json"
	params:
		dir = PEDIA_DIR + "data/PEDIA/jsons/phenomized/",
		script = PEDIA_DIR + "preprocess.py",
		work_dir = PEDIA_DIR
	shell:
		"""
		cd {params.work_dir} 
		python {params.script} -s {input.json} -o {params.dir}
		"""

rule pre_json_vcf:
	input: 
		json = PEDIA_DIR + "data/PEDIA/jsons/phenomized/" + "{case}.json",
		vcf = PEDIA_DIR + "data/PEDIA/vcfs/original/" + "{case}.vcf.gz",
	output:
		"Data/PEDIA_service/{case}/" + "{case}_preproc.done"
	params:
		dir = "Data/PEDIA_service/{case}/"
	shell:
		"""
		mkdir -p {params.dir} 
		touch {output}
		"""

rule pedia:
	input: 
		json = PEDIA_DIR + "data/PEDIA/jsons/phenomized/" + "{case}.json",
		vcf = PEDIA_DIR + "data/PEDIA/vcfs/original/" + "{case}.vcf.gz",
		out = classifier_workflow("../output/test/1KG/{case}/run.out")
	output:
		result = "Data/PEDIA_service/{case}/" + "{case}.csv"
	params:
		dir = "Data/PEDIA_service/{case}/",
		result = PEDIA_DIR + "classifier/output/test/1KG/{case}/" + "{case}.csv"
	shell:
		"""
		mkdir -p {params.dir} 
		cp {params.result} {output.result}
		"""

rule cp_result:
	input: 
		json = classifier_workflow("../output/test/1KG/{case}/run.out")
	output:
		json = "Data/PEDIA_service/{case}/" + "{case}.json"
	params:
		dir = "Data/PEDIA_service/{case}/"
	shell:
		"""
		cp {input.json} {output.json}
		"""
