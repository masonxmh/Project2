Plotly.d3.json("/china/death/dex", function (err, data) {
    //console.log(data);
    age = []
    female_death = []
    male_death = []
    total_death = []

    data.forEach(element =>{
      //console.log(element);
      Object.entries(element).forEach(([key, value]) => {
          if(key == 'Age') {age.push(value)};
          if(key == 'Female_death') {female_death.push(value)};
          if(key == 'Male_death') {male_death.push(value)};
          if(key == 'Total_death') {total_death.push(value)};
      })//Object.entries
  })//d.forEach
  var trace1 = {
    x: age,
    y: female_death,
    type: 'scatter',
    name: 'Female',
    line:{
      color:"red",
      width:2
  }
  };
  
  var trace2 = {
    x: age,
    y: male_death,
    type: 'scatter',
    name: 'Male',
    line:{
      color:"blue",
      width:2
  }
  };

  var trace3 = {
    x: age,
    y: total_death,
    type: 'scatter',
    name: 'Total Death Count',
    line:{
      color:"orange",
      width:2
  }
  };

  var layout = {
    title:'Female VS. Male Death Plot',
      xaxis: {
      title: 'Patient Age Range',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: 'Number Count',
      showline: false
    },
    plot_bgcolor:"#FFF3",
    paper_bgcolor:"black",
    autosize: false,
    width: 550,
    height: 550,
    margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
    }
  };

  var layout2 = {
    title:'Total Death Plot',
      xaxis: {
      title: 'Patient Age Range',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: 'Number Count',
      showline: false
    },
    plot_bgcolor:"#FFF3",
    paper_bgcolor:"black",
    autosize: false,
    width: 550,
    height: 550,
    margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
    }
  };
  
  var data2 = [trace3];
  var data = [trace1, trace2];
  
  Plotly.newPlot('myDiv-v1', data, layout);
  Plotly.newPlot('myDiv-v2', data2, layout2);
});

$(document).ready(function(){
  $(".bg").css('background-image', 'url(http://eskipaper.com/images/black-2.jpg)');
});
