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
      display.appendChild(name);
      display.appendChild(popn);
      display.appendChild(capital);

      var found = JSON.parse(localStorage.getItem('selectedCountry')) || "";

      name.innerText = found.name;
      popn.innerText = "Population: " + Number(found.population).toLocaleString();;
      capital.innerText = "Capital: " + found.capital;

      select.oninput = function () {
        var selectedName = document.getElementById("select").value;
        var found = _.find(countryList, function(o) { return o.name === selectedName; });
        console.log(found.capital);

        name.innerText = found.name;
        popn.innerText = "Population: " + Number(found.population).toLocaleString();
        capital.innerText = "Capital: " + found.capital;


        // loop around bordering countries(found.borders[i])
        // set up dynamic html for display (add another p)
        // loop around the countryList selecting where found.borders[i](array).value === countryList[i].alpha3Code
        // populate display vars with the found country data


        localStorage.setItem('selectedCountry', JSON.stringify(found));
      }
    } 
  }

  request.send(null);

};