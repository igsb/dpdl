/*
function chtoi(x){
  switch(x){
  case 'x':case 'X': return 24;
  case 'y':case 'Y': return 25;
  case 'm':case 'M': return 26;
  default: return parseInt(x, 10);
  }
  }

  function bla(x){
  return x+x;
  }

  var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.moveColumns']);

  app.filter('unsafe', function($sce) { return function(input) { return $sce.trustAsHtml(input); };});
  app.filter('rs_filter', function ($sce) {
  return function (input) {
  rs=input.match(/^rs(\d+)/);
  if ( rs ){
  return $sce.trustAsHtml('<a href="http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs='+rs[0]+'" target="_blank" class="extern">'+input+'</a>');
  } else {
  return $sce.trustAsHtml(input+' ');
  }
  };
  }); 
  app.filter('gene_filter', function ($sce) {
  return function (input) {
  return $sce.trustAsHtml('<a href="http://www.genecards.org/cgi-bin/carddisp.pl?gene='+input+'" target="_blank" class="extern">'+input+'</a>')
  };
  }); 
  app.controller('MainCtrl',  ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', '$sce',
  function ($scope, $http, $timeout, $interval, uiGridConstants, $sce) {
  $scope.gridOptions = {
onRegisterApi: function( gridApi ) {
$scope.gridApi = gridApi;
}
};
$scope.clicked = function(row){
window.location = '/review?chr=' + row.x + "&snp=" + row.i + "&hgvs=" + row.h + "&genotype=" + row.g + "&ref=" + row.r;
}
$scope.igv_clicked = function(pos){
window.location = 'http://localhost:60151/goto?locus=chr' + pos;
}
$scope.gridOptions.data = <%= @outdata.to_json.html_safe %>;
$scope.gridOptions.enableColumnResizing = true;
$scope.gridOptions.enableFiltering = true;
$scope.gridOptions.enableGridMenu = true;
$scope.gridOptions.showGridFooter = false;
$scope.gridOptions.showColumnFooter = false;
$scope.gridOptions.headerRowHeight = 200;
$scope.gridOptions.rowIdentity = function(row) { return row.id; };
$scope.gridOptions.getRowIdentity = function(row) { return row.id; };

}]);*/
function chtoi(x){
    switch(x){
        case 'x':case 'X': return 24;
        case 'y':case 'Y': return 25;
        case 'm':case 'M': return 26;
        default: return parseInt(x, 10);
    }
}
var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.moveColumns']);

app.filter('rs_filter', function ($sce) {
    return function (input) {
        rs=input.match(/^rs(\d+)/);
        if ( rs ){
            return $sce.trustAsHtml('<a href="http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs='+rs[0]+'" target="_blank" class="extern">'+input+'</a>');
        } else {
            return $sce.trustAsHtml(input+' ');
        }
    };
}); 
app.filter('gene_filter', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml('<a href="http://www.genecards.org/cgi-bin/carddisp.pl?gene='+input+'" target="_blank" class="extern">'+input+'</a>')
        };
    }); 
app.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.gridOptions = {
        enableSorting: true,
        enableColumnResizing: true,
        enableFiltering: true,
        enableGridMenu: true,
        headerRowHeight: 200,
        onRegisterApi: function( gridApi ) {
            $scope.gridApi = gridApi;
        },
        columnDefs: [ {
	displayName: 'Chrom. Pos', name:'x', width:150,
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
            displayName: 'ID',  name:'i', width:150,
            cellTemplate: '<div class="ui-grid-cell-contents"><span ng-bind-html=\"COL_FIELD | rs_filter\"></span></div>'
        },
        { 
            displayName: 'Gene', name:'ge', width:100,
            cellTemplate: '<div class="ui-grid-cell-contents"><span ng-bind-html=\"COL_FIELD | gene_filter\"></span></div>' 
        },
        { 
            displayName: 'Ref', name:'r', width:100, displaySubTitle: 'Foo'
        },
        { 
	    displayName: 'Genotype', name: 'g', width:150
	},
        {
	    displayName: 'PEDIA', name: 'p', width:100
	},
        {
	    displayName: 'CADD', name: 's', width:100
	},
        { 
            displayName: 'Effect/HGVS', 
            name: 'e', 
            width:150,
            cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.h}}"><span>{{COL_FIELD}}</span></div>' 
        },
        {
	    displayName: 'Review',  name:'review', width:100,
            cellTemplate: '<div class="ui-grid-cell-contents"><button ng-click="grid.appScope.clicked(row.entity)">Review</button></div>'
        },
        { 
	    displayName: 'IGV',  name:'igv', width:100,
            cellTemplate: '<div class="ui-grid-cell-contents"><button ng-click="grid.appScope.igv_clicked(row.entity.x)">IGV</button></div>'
        }
        ]
};
$scope.clicked = function(row){
    window.location = '/review?chr=' + row.x + "&snp=" + row.i + "&hgvs=" + row.h + "&genotype=" + row.g + "&ref=" + row.r;
}
$scope.igv_clicked = function(pos){
    window.location = 'http://localhost:60151/goto?locus=chr' + pos;
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
