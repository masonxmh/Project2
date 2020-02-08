
d3.json("/China_Data").then(function(data) {

     var new_recovered_pair=Object.entries(data[0].new_recovered);
     var new_confirmed_pair=Object.entries(data[0].new_confirmed);
     var new_death_pair = Object.entries(data[0].new_death);
     var confirmed_pair=Object.entries(data[0].confirmed);
     var death_pair=Object.entries(data[0].death);
     var recovered_pair = Object.entries(data[0].recovered);

     console.log(data[0].Province);
  
     var innerContainer = document.querySelector('[data-num="0"]'),
      provinceSelector = innerContainer.querySelector('.provincedata'),
      listofProvince = data[0].Province,
      Datearray=data[0].Date;
        
      setBubblePlot('Hubei');
      setPlot('Hubei');
  

    function getyData(chosenProvince) {
    for (var i = 0 ; i < new_confirmed_pair.length ; i++){
      if ( new_confirmed_pair[i][0] === chosenProvince) {
        y_newc=new_confirmed_pair[i][1];  
      } 
    }

    for (var i = 0 ; i < new_death_pair.length ; i++){
      if ( new_death_pair[i][0] === chosenProvince) {
        y_newd=new_death_pair[i][1];
      } 
    }

    for (var i = 0 ; i < new_confirmed_pair.length ; i++){
      if ( new_recovered_pair[i][0] === chosenProvince) {
        y_newr=new_recovered_pair[i][1];
      } 
    }

    for (var i = 0 ; i < death_pair.length ; i++){
      if ( death_pair[i][0] === chosenProvince) {
        y_d=death_pair[i][1];
      } 
    }

    for (var i = 0 ; i < confirmed_pair.length ; i++){
      if ( confirmed_pair[i][0] === chosenProvince) {
        y_c=confirmed_pair[i][1];
      } 
    }

    for (var i = 0 ; i < recovered_pair.length ; i++){
      if ( recovered_pair[i][0] === chosenProvince) {
        y_r=recovered_pair[i][1];
      } 
    }
    };


  function setBubblePlot(chosenProvince) {
    getyData(chosenProvince)
    var trace1 = {
      x: Datearray,
      y: y_newc,
      mode: 'lines+markers',
      name: 'New Confirmed',
      marker: {
        size: 12, 
        opacity: 0.5
      },
      line: {
        color: 'red',
        width: 4
      }
    };

    var trace2 = {
      x: Datearray,
      y: y_newd,
      mode: 'lines+markers',
      name: 'New Death',
      marker: {
        size: 12, 
        opacity: 0.5
      },
      line: {
        color: 'orange',
        width: 4
      }
    };

    var trace3 = {
      x: Datearray,
      y: y_newr,
      mode: 'lines+markers',
      name: 'New Recovered',
      marker: {
        size: 12, 
        opacity: 0.5
      },
      line: {
        color: 'green',
        width: 4
      }
    };

    var data = [trace1, trace2, trace3];

    var layout = {
      title: {
        text: chosenProvince + ' Daily Situation',
        font: {
          family: 'sans-serif',
          size: 20,
          color: '#ffffff'
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
      yaxis: {
        linecolor: '#ffffff',
        linewidth: 3,
        tickfont: {
          family: 'sans-serif',
          size: 20,
          color: '#ffffff'
        }
      },
      legend: {
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 20,
          color: '#ffffff'
        }
        // bgcolor: '#E2E2E2'
      },
      showgrid:false
    };

    Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
  };

  function setPlot(chosenProvince) {
    getyData(chosenProvince)
    var trace1 = {
      x: Datearray,
      y: y_c,
      type: 'bar',
      name: 'Confirmed',
      marker: {
        size: 12, 
        color: 'red'
      }
    };

    var trace2 = {
      x: Datearray,
      y: y_d,
      type: 'bar',
      name: 'Death',
      marker: {
        size: 12, 
        color: 'orange'
      }
    };

    var trace3 = {
      x: Datearray,
      y: y_r,
      type: 'bar',
      name: 'Recovered',
      marker: {
        size: 12, 
        color: 'green'
      }
    };

    var data = [trace1, trace2, trace3];

    var layout = {
      title: {
        text: chosenProvince + " Situation <br>(accumulation) ",
        font: {
          family: 'sans-serif',
          size: 20,
          color: '#ffffff'
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
      yaxis: {
        linecolor: '#ffffff',
        linewidth: 3,
        tickfont: {
          family: 'sans-serif',
          size: 20,
          color: '#ffffff'
        }
      },
      legend: {
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 35,
          color: '#ffffff'
        },
        // bgcolor: '#E2E2E2'
        // bordercolor: 'black',
        // borderwidth: 4
      },
      autosize:true
    };

    Plotly.newPlot('plotbar', data, layout);
  };
  
  function assignOptions(textArray, selector) {
    for (var i = 0; i < textArray.length;  i++) {
          var currentOption = document.createElement('option');
          currentOption.text = textArray[i];
          selector.appendChild(currentOption);
      }
  };

  assignOptions(listofProvince, provinceSelector);

  function calculation(chosenProvince){
    for (var i = 0 ; i < confirmed_pair.length ; i++){
      if ( confirmed_pair[i][0] === chosenProvince) {
        total_c=Math.max(...confirmed_pair[i][1]);
        total_d=Math.max(...death_pair[i][1]);
        array=confirmed_pair[i][1];
        rate=(Number.parseFloat(((array[array.length-1]-array[array.length-7])/array[array.length-7]))*100).toFixed(2);
      };
    }
  }
  
  var total_confirmed = document.getElementById('total_confirmed');
  var total_death = document.getElementById('total_death');

  function updateProvince(){
    setBubblePlot(provinceSelector.value);
    setPlot(provinceSelector.value);
    calculation(provinceSelector.value);
    total_confirmed.innerHTML = total_c;
    total_death.innerHTML =total_d;
    if ((isNaN(rate)) || (isFinite(rate)==false)) {
      w_rate.innerHTML="N/A";
    } else {w_rate.innerHTML=rate +"%"}
  };
  
  provinceSelector.addEventListener('change', updateProvince, false);


});





