function processListSeries(data,typeFilter){
    var listSeries = [];
    if(data.series.length != undefined){
        for(var i = 0; i < data.series.length; i++){
            var currentItem = data.series[i];
            var serieItem = {};

            serieItem.name = currentItem.name.trim();
            serieItem.data = [];
            for(var j = 0; j < currentItem.data.length; j++){
                serieItem.data.push(parseFloat(currentItem.data[j]));
            }

            var year = currentItem.pointStart.substring(0,4);
            var month = currentItem.pointStart.substring(5,7);
            var day = currentItem.pointStart.substring(8,10);

            //mês começa em zero
            month = (month - 1);

            serieItem.pointStart = Date.UTC(year,month,day);
            serieItem.pointInterval = (typeFilter == 4 ? 2629750000 : 86400000);
            listSeries.push(serieItem);
        }
    }
    return listSeries;
};

function processXAxis(typeFilter){
    var obj;
    if(typeFilter == 4){
        obj = {   
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%b %y'
            }
        }
    }else{
        obj = {   
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e de %b'
            }
        }
    }

    return obj;
};

function processTooltip(typeGraph,serieColor,serieName,percentage){
    var obj;
    if(typeGraph == 'area'){
        obj = {   
            pointFormat: '<span style="color:'+serieColor+'">'+serieName+'</span>: <b> '+percentage+'%</b><br/>',
            split: true
        }
    }else{
        obj = {};
    }

    return obj;
};

function processPlotOptions(typeGraph){
    var obj;
    if(typeGraph == 'area'){
        obj = {  
             area: { 
            stacking: 'percent',
            lineColor: 'ffffff',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#ffffff'
            }
        }
        }
    }else{
        obj = {};
    }

    return obj;
};

function drawGraph(data,divName,typeGraph,typeFilter) {
    Highcharts.chart(divName, {
        chart: {
            type: typeGraph
        },

        title: {
            text: data.title
        },

        subtitle: {
            text: data.subtitle
        },

        yAxis: {
            title: {
                text: data.yTitle
            }
        },
        
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        xAxis: processXAxis(typeFilter),

        tooltip: processTooltip(typeGraph,'{series.color}','{series.name}','{point.y}'),

        plotOptions: processPlotOptions(typeGraph),

        series: processListSeries(data,typeFilter)
    });

    Highcharts.setOptions({
        lang: {
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            shortMonths: ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez']
        }
    });
};