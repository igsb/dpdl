(head -n 1 clinvar_072018_final.csv && tail -n +2 clinvar_072018_final.csv | sort -t, -k3,3 -k4,4n )| bgzip -c > clinvar_072018_final.csv.gz
