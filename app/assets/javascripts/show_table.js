function chtoi(x){
    switch(x){
        case 'x':case 'X': return 23;
        case 'y':case 'Y': return 24;
        case 'm':case 'M': return 25;
        default: return parseInt(x, 10);
    }
}
var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.moveColumns']);

app.controller('MainCtrl',  ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', '$sce',
    function ($scope, $http, $timeout, $interval, uiGridConstants, $sce) {
        $scope.gridOptions = {
            enableSorting: true,
            enableColumnResizing: true,
            enableFiltering: true,
            enableGridMenu: true,
            headerRowHeight: 200,
            showGridFooter: false,
            showColumnFooter: false,
            rowIdentity: function(row) { return row.id; },
            getRowIdentity: function(row) { return row.id; },
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
            },
            columnDefs: [
                {
                    displayName: 'Chrom. Pos', name:'x', width:130,
                    sortingAlgorithm: function(a, b) {
                        var nulls = $scope.gridApi.core.sortHandleNulls(a, b);
                        if (nulls !== null) {
                            return nulls;
                        } else {
                            aa = a.split(':');
                            ba=b.split(':');
                            ac=chtoi(aa[0]);
                            bc=chtoi(ba[0]);
                            if( ac < bc ) { return -1; }
                            if( ac > bc ) { return 1; }
                            ap=parseInt(aa[1],10);
                            bp=parseInt(ba[1],10);
                            if( ap < bp ) { return -1; }
                            if( ap > bp ) { return 1;  }
                            return 0;
                        }
                    }
                },
                {
                    displayName: 'ID',  name:'i', width:120,
                    cellTemplate: '<div class="ui-grid-cell-contents"><a href ng-click="grid.appScope.show_rs(row.entity.i)">{{COL_FIELD}}</a></div>'
                },
                {
                    displayName: 'Gene', name:'ge', width:100,
                    cellTemplate: '<div class="ui-grid-cell-contents"><a href ng-click="grid.appScope.show_gene(row.entity.ge)">{{COL_FIELD}}</a></div>'
                },
                {
                    displayName: 'Ref', name:'r', width:80, displaySubTitle: 'Foo'
                },
                {
                    displayName: 'Genotype', name: 'g', width:100
                },
                {
                    displayName: 'PEDIA', name: 'p', width:85, type: 'number', sort: { direction: 'desc' }
                },
                {
                    displayName: 'CADD', name: 's', width:85, type: 'number', sort: { direction: 'desc' }
                },
                {
                    displayName: 'Effect',
                    name: 'e',
                    width:150,
                    cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.e}}"><span>{{COL_FIELD}}</span></div>'
                },
                {
                    displayName: 'HGVS',
                    name: 'h', 
                    width:150,
                    cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.h}}"><span>{{COL_FIELD}}</span></div>'
                },
                {
                    displayName: 'Significance', name: 'cs_score', width:120, type: 'number',
                    cellTemplate: '<div class="ui-grid-cell-contents"><span title="{{grid.appScope.getSigString(COL_FIELD)}}"><img ng-src="{{grid.appScope.getTemplate(COL_FIELD)}}" width=100 height=20/></span></div>'
                },
                {
                    displayName: '',  name:'review', width:30,
                    enableColumnMenu: false,
                    enableFiltering: false,
                    enableSorting: false,
                    cellClass: 'noborder',
                    cellTemplate: '<div class="ui-grid-cell-contents"><span title="Review"><img ng-src="{{grid.appScope.getView}}" width=20 height=20 ng-click="grid.appScope.clicked(row.entity)" /></span></div>'
                },
                {
                    displayName: '',  name:'igv', width:25,
                    enableColumnMenu: false,
                    enableSorting: false,
                    enableFiltering: false,
                    cellClass: 'noborder',
                    cellTemplate: '<div class="ui-grid-cell-contents" title="Open IGV"><span><img ng-src="{{grid.appScope.getIgv}}" width=20 height=20 ng-click="grid.appScope.igv_clicked(row.entity.x)" /></span></div>'
                }
            ]
        };
        $scope.getSigString = function(value){
            result = '';
            switch (value) {
                case 1:
                    result = 'Benign';
                    break;
                case 2:
                    result = 'Likley benign';
                    break;
                case 3:
                    result = 'Uncertain significance';
                    break;
                case 4:
                    result = 'Likely pathogenic';
                    break;
                case 5:
                    result = 'Pathogenic';
                    break;
                default:
                    result = '';
            }

            return result;
        };
        $scope.getTemplate = function(value){
            return '/assets/star_' + value + '.png';
        };
        $scope.getIgv = '/assets/igv.png';
        $scope.getView = '/assets/sharp-visibility-24px.svg';
        $scope.show_rs = function(input) {
            rs=input.match(/^rs(\d+)/);
            if (rs){
                url = "http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=" + rs[0];
            } else {
                url = "http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=";
            }
            window.open(url, '_blank');
        }
        $scope.show_gene = function(gene) {
            url = 'http://www.genecards.org/cgi-bin/carddisp.pl?gene=' + gene;
            window.open(url, '_blank');
        }
        $scope.clicked = function(row){
            url = '/review?chr=' + row.x + "&snp=" + row.i + "&hgvs=" + row.h + "&genotype=" + row.g + "&ref=" + row.r + "&mut=" + row.m + "&p_vcf=" + row.v + "&gene_id=" + row.gene_id + "&cadd=" + row.s;
            window.open(url, '_blank');
        }
        $scope.igv_clicked = function(pos){
            url = 'http://localhost:60151/goto?locus=chr' + pos;
            window.open(url, '_blank');
        }

        url = '/vcf_files/get_var/' + gon.vcf_id 
        $http.get(url).success(function(data) {
            $scope.gridOptions.data = data['variants'];
            $("#var_num").append(data['var_num'])
        });
    }])

    .directive('gridLoading', function () {
        return {
            restrict: 'C',
            require: '^uiGrid',
            link: function ($scope, $elm, $attrs, uiGridCtrl) {
                $scope.grid = uiGridCtrl.grid;
            }
        }
    });
