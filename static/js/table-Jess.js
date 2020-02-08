
 d3.json("/China_Data").then(function(data) {

    var  confirmed_pair=Object.entries(data.confirmed);
    var  recovered_pair = Object.entries(data.recovered)
    var  Datearray=data.Date;

        var recovered_date_sum=[];
        var confirm_date_sum_else=[];
            
     for (var j = 0; j <Datearray.length; j++){
       var yvalue=0
        for (var i = 0 ; i < recovered_pair.length ; i++){
            yvalue=yvalue+recovered_pair[i][1][j]
        };
        recovered_date_sum.push(yvalue)
    };

   
    for (var j = 0; j <Datearray.length; j++){
        var yvalue=0
        
         for (var i = 0 ; i < confirmed_pair.length ; i++){
             if (confirmed_pair[i][0]==="Hubei"){
               var hebei=confirmed_pair[i][1];
             }else{
             yvalue=yvalue+confirmed_pair[i][1][j]}
         };
         confirm_date_sum_else.push(yvalue)
     };

  
    
    var trace1 = {
        x: Datearray,
        y: confirm_date_sum_else,
        type: 'scatter',
        name: "China without Hubei"
      };

      var trace2 = {
        x: Datearray,
        y: hebei,
        type: 'scatter',
        name: "Hubei"
        };

    var trace3 = {
        x: Datearray,
        y: recovered_date_sum,
        type: 'scatter',
        name: "Hubei",
        mode:'lines', 
        line: {color: "green"}
        };
      
     var data = [trace1, trace2];
      
      var layout = {
            xaxis: {
            autorange: true
          },
          yaxis: {
            autorange: true,
            type: 'log',
            linecolor: '#ffffff',
            linewidth: 3,
            tickfont: {
            family: 'sans-serif',
            size: 20,
            color: '#ffffff'}
          },
          title: {
            text: "Confirmed Cases Reproduction Rate <br> (semi-log scale)",
            font: {
              family: 'sans-serif',
              size: 28,
              color: '#ebf1f5'
            }
          },
          plot_bgcolor: '#272B30',
          paper_bgcolor: '#272B30',
          xaxis: {
            linecolor: '#ffffff',
            linewidth: 3,
            tickfont: {
              family: 'sans-serif',
              size: 20,
              color: '#ffffff'
            }
          },
          legend: {
            x: 4,
            xanchor: "right",
            y: 0,
            "orientation": "v",
            traceorder: 'normal',
            font: {
              family: 'sans-serif',
              size: 25,
              color: '#ffffff'
            }
        }
      };
      
    
      Plotly.newPlot('myjDiv2', data, layout);

      var layout1 = {
        xaxis: {
        autorange: true
      },
      yaxis: {
        autorange: true,
        type: 'log',
        linecolor: '#ffffff',
        linewidth: 3,
        tickfont: {
        family: 'sans-serif',
        size: 20,
        color: '#ffffff'}
      },
      title: {
        text: "Recovery Rate <br> (semi-log scale)",
        font: {
          family: 'sans-serif',
          size: 28,
          color: '#ebf1f5'
        }
      },
      plot_bgcolor: '#272B30',
      paper_bgcolor: '#272B30',
      xaxis: {
        linecolor: '#ebf1f5',
        linewidth: 3,
        tickfont: {
          family: 'sans-serif',
          size: 20,
          color: '#ffffff'
        }
      },
      legend: {
        x: 4,
        xanchor: "right",
        y: 0,
        "orientation": "v",
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 25,
          color: '#ffffff'
        }
    }
  };
    


      Plotly.newPlot('myjDiv', [trace3],layout1);

       
});


