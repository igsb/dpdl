awk -F"\t" '{print $1 "\t" $2 "\t" $3 "\t" $4 "\t" $7}' <(gzip -dc submission_summary.txt.gz) > submission.txt
