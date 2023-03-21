$(window).on('load',function(){
    $('#loadModal').modal('show');
});

// rounded cap chart
new Chartist.Bar('.dashboard-rounded-chart', {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q13', 'Q14', 'Q15', 'Q16'],
    series: [600, 400, 800, 1000, 600, 500, 1100, 1300, 1000, 800, 400, 600, 400, 350, 300]
}, {
    distributeSeries: true,
    chartPadding: {
        left: 5,
        bottom: 0,
        right:0,
        top:0,
    },
    low: 0,
    axisY: {
        labelInterpolationFnc: function(value) {
            return (value / 1000);
        }
    },
    axisX: {
        showLabel: false,
        showGrid: false,
        offset: 0
    }
}).on('draw', function(data) {
    if(data.type === 'bar') {
        data.element.attr({
            style: 'stroke-width: 8px ; stroke-linecap: round'
        });
    }
});

// small bar chart
new Chartist.Bar('.ct-small-left', {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    series: [
        [100, 200, 300, 350, 250]
    ]
}, {
    stackBars: true,
    axisY: {
        low: 0,
        showGrid: false,
        showLabel: false,
        offset: 0
    },
    axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
    }
}).on('draw', function(data) {
    if(data.type === 'bar') {
        data.element.attr({
            style: 'stroke-width: 3px'
        });
    }
});

// our growth chart
var chart    = document.getElementById('our-growth').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 150, 0);

gradient.addColorStop(0, 'rgb(255, 246, 243)');
gradient.addColorStop(0.5, 'rgb(255, 230, 220)');
gradient.addColorStop(1, 'rgb(255, 84, 24)');
var lineGraphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "aug", "sup"],
    datasets: [{
        label: "My first dataset",
        fillColor: 'transparent',
        strokeColor: gradient,
        pointColor: "#fff",
        pointStrokeColor: gradient,
        pointHighlightFill: "#fff",
        pointHighlightStroke: gradient,
        data: [28, 45, 28, 55, 40, 60, 50, 80, 60]
    }],

};
var lineGraphOptions = {
    scaleShowGridLines: true,
    showScale: false,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: false,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 6,
    pointDotStrokeWidth: 3,
    pointHitDetectionRadius: 30,
    datasetStroke: true,
    datasetStrokeWidth: 4,
    datasetFill: true,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};
var lineCtx = document.getElementById("our-growth").getContext("2d");
var myLineCharts = new Chart(lineCtx).Line(lineGraphData, lineGraphOptions);

// call chart
new Chartist.Bar('.call-chart', {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q13', 'Q14'],
    series: [
        [100, 300, 500, 700, 600, 400, 300, 100, 300, 500, 700, 600, 400, 100]
    ]
}, {
    scaleShowLabels : false,
    stackBars: true,
    chartPadding: {
        left: 0,
        bottom: 0,
        right:0,
        top: 5,
    },
    axisY: {
        showLabel: false,
        showGrid: false,
        offset: 0
    },
    axisX: {
        low: 0,
        showLabel: false,
        showGrid: false,
        offset: 0
    }
}).on('draw', function(data) {
    if(data.type === 'bar') {
        data.element.attr({
            style: 'stroke-width: 10px ; stroke-linecap: round'
        });
    }
});
// vector map
! function(maps) {
    "use strict";
    var b = function() {};
    b.prototype.init = function() {
        maps("#world").vectorMap({
            map: "world_mill_en",
            scaleColors: ["#2196F3", "#1B8BF9"],
            normalizeFunction: "polynomial",
            hoverOpacity: .7,
            hoverColor: !1,
            regionStyle: {
                initial: {
                    fill: creativeAdminConfig.primary
                }
            },
            backgroundColor: "transparent",
        })
    }, maps.VectorMap = new b, maps.VectorMap.Constructor = b
}(window.jQuery),
    function(maps) {
        "use strict";
        maps.VectorMap.init()
    }(window.jQuery);

// btn js
$('.btn-js').click(function(){
    //make all inactive-doesn't work
    $( '.btn-js' ).each(function( ) {
        if($(this).hasClass('active')){
            $(this).removeClass('active')
        }
    });

    if($(this).hasClass('active')){
        $(this).removeClass('active')
    } else {
        $(this).addClass('active')
    }
});

$('.btn-js1').click(function(){
    //make all inactive-doesn't work
    $( '.btn-js1' ).each(function( ) {
        if($(this).hasClass('active')){
            $(this).removeClass('active')
        }
    });

    if($(this).hasClass('active')){
        $(this).removeClass('active')
    } else {
        $(this).addClass('active')
    }
});
