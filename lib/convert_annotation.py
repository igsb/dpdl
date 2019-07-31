#!/usr/bin/python
# -*- coding: utf-8 -*-

import csv
import getopt
import sys
import os
import gzip
import logging
import argparse

logger = logging.getLogger(__name__)
console = logging.StreamHandler()
console.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s: %(message)s', datefmt='%m-%d %H:%M')
console.setFormatter(formatter)
logger.addHandler(console)

def main():
    parser = argparse.ArgumentParser(description='Get variants in PEDIA genes')
    parser.add_argument('-i', '--input', help='path of input VCF file')
    parser.add_argument('-o', '--output', help='path of output VCF file')

    args = parser.parse_args()
    input_vcf = args.input
    output_vcf = args.output

    get_variant(input_vcf, output_vcf)

def get_variant(input_vcf, output_vcf):

    prefix = output_vcf[0:-7]
    tmp_name = output_vcf[0:-3]
    # Filter out the variant which is not in gene list
    with gzip.open(input_vcf, 'r') as f:
        line = f.readline()
        flag = 0
        with open(tmp_name, 'w') as tmp_file:
            while line:
                line = line.decode('utf-8')
                if flag:
                    tmp = line.split('\t')
                    for info in tmp[7].split(';'):
                        if info.startswith('ANN='):
                            ann = info
                    effects = ann.split('|')[1].split('&')
                    corrected_effect = []
                    for effect in effects:
                        if effect == 'stop_gained':
                            effect = 'stopgain'
                        if effect == 'stop_lost':
                            effect = 'stoploss'
                        #if effect == '':
                        #    effect = 'nonsynonymous'
                        if effect == 'missense_variant':
                            effect = 'missense'
                        if effect == 'synonymous_variant':
                            effect = 'synonymous'
                        corrected_effect.append(effect)
                    corrected_effect_str = ','.join(corrected_effect)
                    tmp[7] = 'EFFECT=' + corrected_effect_str + ';'
                    out_line = '\t'.join(tmp)
                    tmp_file.write(out_line)
                    line = f.readline()
                else:
                    if "#CHROM" in line:
                        flag = 1
                        tmp = line.split('\t')
                        tmp[-1] = prefix
                        line = '\t'.join(tmp) + '\n'
                        tmp_file.write(line)
                        line = f.readline()
                    else:
                        tmp_file.write(line)
                        line = f.readline()
    cmd = 'bgzip ' + tmp_name
    os.system(cmd)

if __name__ == '__main__':
    main()
