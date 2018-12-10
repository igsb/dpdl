
function getChromosomeLabelByNum(num){
    switch (num){
        case 23:
            return 'X';
        case 24:
            return 'Y';
        case 25:
            return 'M';
        default:
            return num;
    }
}

function generateData(results, loweringFactor, chromosomeStartingPoint) {


    results = results.map(function(result) {
        result.location = (parseInt(result.pos)/loweringFactor) + chromosomeStartingPoint[result.chr - 1];
        return result;
    });

    dataSets = [
        {
            label: 'NEUTRALS',
            data: results.filter(function(result) {return result.label == 0 && ((result.chr % 2) == 1)}),
            backgroundColor: '#C0C0C0',
        },
        {
            label: 'NEUTRALS',
            data: results.filter(function(result) {return result.label == 0 && ((result.chr % 2) == 0)}),
            backgroundColor: '#696969',
        },
        {
            label: 'PATHOGENIC',
            data: results.filter(function(result) {return result.label == 1}),
            backgroundColor: '#FF0000',
        },
    ];

    for(i = 0; i < dataSets.length; i++){
        var x = []
        var y = []
        var pedia = []
        var gene_id = []
        var gene_symbol = []
        var color = []
        var name = dataSets[i].label
        for(j = 0; j < dataSets[i].data.length; j++){
            data_point = dataSets[i].data[j];
            x.push(data_point.location);
            y.push(data_point.pedia_score);
            gene_symbol.push(data_point.gene_symbol);
            gene_id.push(data_point.entrez_id);
            color.push(dataSets[i].backgroundColor);
        }
        dataSets[i].points = {
            x: x,
            y: y,
            mode: 'markers',
            type: 'scatter',
            name: name,
            text: gene_symbol,
            textposition: 'bottom center',
            hoverinfo: "text+y",
            marker: {
                size: 9,
                color: color
            }
        };
    }

    return {
        datasets: dataSets,
    };
}
loweringFactor = 1;
chromosomeSizes = [249250621, 243199373, 198022430, 191154276, 180915260, 171115067, 159138663, 146364022, 141213431, 135534747, 135006516, 133851895, 115169878, 107349540, 102531392, 90354753, 81195210, 78077248, 59128983, 63025520, 48129895, 51304566, 155270560, 59373566, 16571];
chromosomeSizes = chromosomeSizes.map(function(size) {return size/loweringFactor});
chromosomeStartingPoint = [0];
xLabels = [1];
for(i = 1 ; i < chromosomeSizes.length ; i++){
    startingPoint = (chromosomeSizes[i - 1]) + chromosomeStartingPoint[i - 1];
    chromosomeStartingPoint.push(startingPoint);
    xLabels.push(getChromosomeLabelByNum(i + 1));
}
output =  generateData(gon.results, loweringFactor, chromosomeStartingPoint);

var data = [output.datasets[0].points, output.datasets[1].points, output.datasets[2].points];

var layout = {
    hovermode:'closest',
    xaxis: {
        range: chromosomeStartingPoint,
        ticktext: xLabels,
        tickvals: chromosomeStartingPoint,
        title: 'Chromosome position',
        titlefont: {
            size: 18
        },
        font: {
            size: 16
        }
    },
    yaxis: {
        title: 'PEDIA score',
        titlefont: {
            size: 18
        },
        font: {
            size: 16
        },
        dtick: "L0.5"
    },
    legend: {
        x: 0.5,
        y: 1.1,
        xanchor: 'center',
        orientation: 'h',
        font: {
            size: 12,
            color: 'grey',
        }
    },
    title:'Manhattan plot',
    titlefont: {
        size: 26
    },
    height: 600,
    width: 1150
};
