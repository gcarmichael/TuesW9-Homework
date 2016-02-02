window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1/all';
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.onload = function () {
    if(request.status === 200){
      console.log("got the data");
      var countryList = JSON.parse(request.responseText);
      console.log(countryList[0]);
      console.log(countryList[0].name + ", " + countryList[0].capital);
      console.log(countryList[countryList.length - 1]);
      console.log(countryList[countryList.length - 1].name + ", " + countryList[countryList.length - 1].capital);
      for (var i = 0; i < countryList.length; i++) {
        var select = document.getElementById("select");
        var option = document.createElement("option");
        option.appendChild(document.createTextNode(countryList[i].name));
        option.value = countryList[i].name;
        select.appendChild(option);
      };
    }
  }

  request.send(null);

};
