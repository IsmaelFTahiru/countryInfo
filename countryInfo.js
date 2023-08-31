'use strict';

let countryCardOrder = -1;

const url = 'https://restcountries.com/v3.1/all';

async function getCountryInfo() {
  const countryInfo = await fetch(url);

  if (!countryInfo.ok) {
    const errMessg = `!The error: ${response.status} occurred!`;
    throw new Error(errMessg);
  }

  const response = await countryInfo.json();

  return response;
}

getCountryInfo().catch((error) => {
  error.errMessg;
});

let countryData = getCountryInfo();
const data = countryData.then((items) => {
  const countryArr = items;
  console.log(countryArr[0].flags.svg);

  const searchButton = document.getElementById('searchBtn');
  searchButton.addEventListener('click', function () {
    countryCardOrder++;

    for (let i = 0; i < countryArr.length; i++) {
      const countryInput = document.getElementById('inputField');
      countryInput.addEventListener('focus', function () {
        if (countryInput.value !== null) {
          countryInput.value = '';
        }
      });
      if (countryArr[i].name.common === countryInput.value) {
        let countryCard = {
          flagData: countryArr[i].flags.png,
          nameData: ` ${countryArr[i].name.common}`,
          capitalData: ` ${countryArr[i].capital[0]}`,
          populationData: ` ${countryArr[i].population}`,
          regionData: ` ${countryArr[i].region}`,
        };

        localStorage.setItem(
          `countryCard${countryCardOrder}`,
          JSON.stringify(countryCard)
        );
      }
    }

    let countryObject = localStorage.getItem(`countryCard${countryCardOrder}`);

    createFlagCard(JSON.parse(countryObject));
  });
});

const createFlagCard = function (countryData) {
  const countryCardContainer = document.querySelector('.countryCardContainer');

  const countryCard = document.createElement('div');
  countryCard.classList.add('countryCard');
  countryCard.setAttribute('id', `countryCard${countryCardOrder}`);
  countryCardContainer.appendChild(countryCard);

  const countryFlag = document.createElement('img');
  countryFlag.src = countryData.flagData;
  countryCard.appendChild(countryFlag);
  countryFlag.setAttribute('id', `countryFlag${countryCardOrder}`);

  document.createElement('br');

  const countryName = document.createElement('p');
  countryName.setAttribute('id', 'countryName');
  countryName.textContent = `Name: ${countryData.nameData}`;
  countryCard.appendChild(countryName);
  countryName.setAttribute('id', `countryName${countryCardOrder}`);

  document.createElement('br');

  const countryCapital = document.createElement('p');
  countryCapital.setAttribute('id', 'countryCapital');
  countryCapital.textContent = `Capital: ${countryData.capitalData}`;
  countryCard.appendChild(countryCapital);
  countryCapital.setAttribute('id', `countryCapital${countryCardOrder}`);

  document.createElement('br');

  const countryPopulation = document.createElement('p');
  countryPopulation.setAttribute('id', 'countryPopulation');
  countryPopulation.textContent = `Population: ${countryData.populationData}`;
  countryCard.appendChild(countryPopulation);
  countryPopulation.setAttribute('id', `countryPopulation${countryCardOrder}`);

  document.createElement('br');

  const countryRegion = document.createElement('p');
  countryRegion.setAttribute('id', 'countryRegion');
  countryRegion.textContent = `Region: ${countryData.regionData}`;
  countryCard.appendChild(countryRegion);
  countryRegion.setAttribute('id', `countryRegion${countryCardOrder}`);
};
console.log(countryCardOrder);

const presentCountryCards = function () {};

window.onload = function () {
  Object.keys(localStorage).forEach((keys) => {
    let countryCardKey = localStorage.getItem(keys);
    createFlagCard(JSON.parse(countryCardKey));
  });
};

//next find a way to present the countryCrads with the data in local storage after user gets back on the page; idea: store data in one array inn local storage
