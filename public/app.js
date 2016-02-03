window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1/all';
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.onload = function () {

    if(request.status === 200){
      console.log("got the data");
      var countryList = JSON.parse(request.responseText);

      for (var i = 0; i < countryList.length; i++) {
        var select = document.getElementById("select");
        var option = document.createElement("option");
        option.appendChild(document.createTextNode(countryList[i].name));
        option.value = countryList[i].name;
        select.appendChild(option);
      };

      var display = document.getElementById("display");
      var name = document.createElement("h1");
      var popn = document.createElement("p");
      var capital = document.createElement("p");
      var borders = document.createElement("p");
      display.appendChild(name);
      display.appendChild(popn);
      display.appendChild(capital);
      display.appendChild(borders);

      var found = JSON.parse(localStorage.getItem('selectedCountry')) || "";

      var foundDisplay = function(found){
        name.innerText = found.name;
        popn.innerText = "Population: " + Number(found.population).toLocaleString();
        capital.innerText = "Capital: " + found.capital;

        var foundLat = found.latlng[0];
        var foundLng = found.latlng[1];
        var center = {lat: foundLat, lng: foundLng};
        var zoom = 4;
        var map = new Map(center, zoom);

        var content = "<b>" + found.name + "</b><br>Population: " + Number(found.population).toLocaleString() + "<br>Capital: " + found.capital;
        map.addInfoWindow(center, content);
      }

      foundDisplay(found);

      select.oninput = function () {
        var selectedName = document.getElementById("select").value;
        var found = _.find(countryList, function(o) { return o.name === selectedName; });
        console.log(found.capital);

        foundDisplay(found);

          console.log(found.borders);

        // if(found.borders == false){
        //     display stuff = none or blank;
        // }
        var foundBorders = found.borders
        for (border of foundBorders){
          for (country of countryList){
            if(country.alpha3code === border){
              borders.innerText = country.name;
            }
          }
          console.log(borders);
        }

        localStorage.setItem('selectedCountry', JSON.stringify(found));
      }
    } 
  }

  request.send(null);



};