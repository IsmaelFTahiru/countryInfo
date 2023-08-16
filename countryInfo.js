"use strict";

const countryInput = document.querySelector(".countryInput");

const url = "https://restcountries.com/v3.1/all";

async function getCountryInfo() {
  const countryInfo = await fetch('https://restcountries.com/v3.1/all');
  const response = await countryInfo.json();
 if(!response.ok){
  const errMessg = `!The error: ${response.status} occurred!`;
  throw new Error(errMessg); 
 }
 
/*
  for (let i = 0; i < response.length; i++) {
    const country = await response[i];
    //const countryName = await country.name
//console.log(country.name.common)
   
    searchBtn.addEventListener("click", function () {
      const countryInput = document.querySelector(".countryInput");
      if (country.name.common == countryInput.value) {
        console.log('Button works')
        return (
          country.name,
          country.capital,
          country.code,
          country.currency,
          country.region
        );
      }
    });
  }
  */
}

getCountryInfo();
