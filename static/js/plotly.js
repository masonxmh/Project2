d3.csv("../../static/comparison.csv").then(function(data){
    console.log(data);

    // SARS data
    var sars = data.map(x=>x.SARS);

    // ConV data
    var conv = data.map(x=>x.ConV);

    // Generate data points for x-axis
    var x_axis = []
    var j = 0
    for (i=0;i<sars.length;i++){
        j=j+1
        x_axis.push(j)
    };
    console.log(x_axis)

    // line plots data
    trace1 = {
        x: x_axis,
        y: sars,
        type:"scatter",
        mode:"lines+markers",
        name:"SARS",
        line:{
            color:"green",
            width:2
        }
    };

    trace2 = {
        x:x_axis,
        y:conv,
        type:"scatter",
        mode:"lines+markers",
        name:"2019-nCov",
        line:{
            color:"crimson",
            width:2
        }
    };

    // line plot layout
    layout = {
        title:{
            text:"Total Infections Since the First Case",
            font:{
                color:"white"
            }
        },
        xaxis: {
            title:{
                text:"Total Infections Count",
                font:{
                    color:"white"
                }
            },
            showgrid:false,
            zeroline:false,
            zerolinecolor:"white",
            tickfont:{
                color:"white"
            }
        },
        yaxis: {
            title:{
                text:"Number of Days",
                font:{
                    color:"white"
                }
            },
            showgrid:true,
            gridcolor:"	#696969",
            tickfont:{
                color:"white"
            }
        },
        paper_bgcolor:"black",
        plot_bgcolor:"black",
        legend:{
            font:{
                color:"white"
            }
        },
        annotations: [
            {
                x:25,
                y:10300,
                text:"Reported SARS cases",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"	white"
                }
            },
            {
                x:25,
                y:9600,
                text:"exploded several",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"	white"
                }
            },
            {
                x:25,
                y:8900,
                text:"month after, and",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"	white"
                }
            },
            {
                x:25,
                y:8100,
                text:"comparatively slower",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"	white"
                }
            },
            {
                x:21,
                y:20500,
                text:"New virus",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"crimson",
                    size:18
                }
            },
            {
                x:21,
                y:19600,
                text:"20,626",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"crimson",
                    size:18
                }
            },
            {
                x:21,
                y:18800,
                text:"confirmed",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"crimson",
                    size:18
                }
            },
            {
                x:48,
                y:8400,
                text:"<b>SARS</b>",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"green",
                    size:18
                }
            },
            {
                x:65,
                y:9700,
                text:"SARAS tapers off",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"	white"
                }
            },
            {
                x:65,
                y:9100,
                text:"3-months",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"	white"
                }
            },
            {
                x:75,
                y:1500,
                text:"It took MERS a year",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"	white"
                }
            },
            {
                x:75,
                y:900,
                text:"to infect 108 people",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"	white"
                }
            },
            {
                x:75,
                y:7600,
                text:"WHO confirmes",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"green",
                    size:18
                }
            },
            {
                x:75,
                y:6800,
                text:"8,465",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"green",
                    size:18
                }
            },
            {
                x:75,
                y:6000,
                text:"cases worldwide",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"green",
                    size:18
                }
            },
            {
                x:4,
                y:19000,
                text:"<b>2019-nCov</b>",
                showlegend: false,
                showarrow:false,
                font:{
                    color:"crimson",
                    size:17
                }
            },
            {
                x:13,
                y:22000,
                text:"<b>Day 13</b>",
                showlegend: false,
                showarrow:true,
                font:{
                    color:"black",
                    size:18
                }
            }
        ],
        shapes: [

            //line vertical
        
            {
              type: 'line',
              x0: 13,
              y0: 0,
              x1: 13,
              y1: 21100,
              line: {
                color: '#5F9EA0',
                width: 3,
                dash:"dashdot"
              }
            }
        ],
        autosize:true,
        // height:800,
        // width:800
    }
    var data = [trace1,trace2];

    Plotly.newPlot("plot",data, layout);
})