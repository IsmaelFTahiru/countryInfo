'use strict';

let countryCardOrder = 0;

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

const errorMessage = document.getElementById('errorMessage');
const countryInput = document.getElementById('inputField');
countryInput.addEventListener('focus', function () {
  if (countryInput.value !== null) {
    countryInput.value = '';
    errorMessage.textContent = '';
  }
});

//Find a way to use the the stored countryData in multiple places
//Maybe write a function to get the countryData from Storage
//const countryJson = [];
//localStorage.setItem(`countryCards`, JSON.stringify(countryJson));

let countryData = getCountryInfo();
const data = countryData.then((items) => {
  const countryArr = items;
  console.log(countryArr[0].name.common);

  const searchButton = document.getElementById('searchBtn');
  searchButton.addEventListener('click', function () {
    countryCardOrder++;

    console.log('Button works');

    let countryArray = localStorage.getItem(`countryCards`);
    for (let a = 0; a < JSON.parse(countryArray).length; a++) {
      for (let i = 0; i < countryArr.length; i++) {
        if (countryArr[i].name.common === countryInput.value) {
          console.log('match');
          let countryDataObject = {
            flagData: countryArr[i].flags.png,
            nameData: ` ${countryArr[i].name.common}`,
            capitalData: ` ${countryArr[i].capital[0]}`,
            populationData: ` ${countryArr[i].population}`,
            regionData: ` ${countryArr[i].region}`,
          };

          const countryJson = [];

          countryJson.unshift(countryDataObject);

          console.log(countryJson, JSON.parse(countryArray)[a].nameData);

          localStorage.setItem(`countryCards`, JSON.stringify(countryJson));
        } /*else if (
          Object.keys(JSON.parse(countryObject)).length !== 0 &&
          JSON.parse(countryArray)[a].nameData === countryInput.value
        ) {
          errorMessage.textContent = 'NACH DIESEM LAND HABEN SIE SCHON GESUCHT';
        }*/
        console.log(countryJson, JSON.parse(countryArray)[a].nameData);
      }
    }

    let countryObject = localStorage.getItem(`countryCards`);
    const parsedObject = JSON.parse(countryObject);
    console.log(parsedObject);
    if (Object.keys(JSON.parse(countryObject)).length !== 0) {
      try {
        createFlagCard(JSON.parse(countryObject));
      } catch (e) {
        console.log(e);

        setTimeout(() => {
          errorMessage.textContent = '';
        }, 10000);
        errorMessage.textContent = 'IHRE SUCHE ERGAB KEINE TREFFER!';

        const invalidCard = document.getElementById(
          `countryCard${countryCardOrder}`
        );
        invalidCard.remove();
      }
    }
  });
});

/*
const setCountryInfo = function (position) {
  let countryCard = {
    flagData: countryArr[position].flags.png,
    nameData: ` ${countryArr[position].name.common}`,
    capitalData: ` ${countryArr[position].capital[0]}`,
    populationData: ` ${countryArr[position].population}`,
    regionData: ` ${countryArr[position].region}`,
  };

  localStorage.setItem(
    `countryCard${countryCardOrder}`,
    JSON.stringify(countryCard)
  );
};
*/

const deleteCard = function (parent, child) {
  parent.removeChild(child);
};

const createFlagCard = function (countryData) {
  const countryCardContainer = document.querySelector('.countryCardContainer');

  const countryCard = document.createElement('div');
  countryCard.classList.add('countryCard');
  countryCard.setAttribute('id', `countryCard${countryCardOrder}`);
  countryCardContainer.appendChild(countryCard);

  const deleteCardBtn = document.createElement('button');
  deleteCardBtn.classList.add('deleteCardBtn');
  deleteCardBtn.setAttribute('id', `deleteCardBtn${countryCardOrder}`);
  deleteCardBtn.innerHTML = 'x';
  deleteCardBtn.addEventListener('click', function () {
    deleteCard(countryCardContainer, countryCard);
  });
  countryCard.appendChild(deleteCardBtn);

  const countryFlag = document.createElement('img');
  countryFlag.src = countryData[0].flagData;
  countryCard.appendChild(countryFlag);
  countryFlag.setAttribute('id', `countryFlag${countryCardOrder}`);

  document.createElement('br');

  const countryName = document.createElement('p');
  countryName.setAttribute('id', 'countryName');
  countryName.textContent = `Name: ${countryData[0].nameData}`;
  countryCard.appendChild(countryName);
  countryName.setAttribute('id', `countryName${countryCardOrder}`);

  document.createElement('br');

  const countryCapital = document.createElement('p');
  countryCapital.setAttribute('id', 'countryCapital');
  countryCapital.textContent = `Capital: ${countryData[0].capitalData}`;
  countryCard.appendChild(countryCapital);
  countryCapital.setAttribute('id', `countryCapital${countryCardOrder}`);

  document.createElement('br');

  const countryPopulation = document.createElement('p');
  countryPopulation.setAttribute('id', 'countryPopulation');
  countryPopulation.textContent = `Population: ${countryData[0].populationData}`;
  countryCard.appendChild(countryPopulation);
  countryPopulation.setAttribute('id', `countryPopulation${countryCardOrder}`);

  document.createElement('br');

  const countryRegion = document.createElement('p');
  countryRegion.setAttribute('id', 'countryRegion');
  countryRegion.textContent = `Region: ${countryData[0].regionData}`;
  countryCard.appendChild(countryRegion);
  countryRegion.setAttribute('id', `countryRegion${countryCardOrder}`);
};

const presentCountryCards = function () {};

let countryLocalStorage = localStorage.getItem('countryCards');
console.log(countryLocalStorage);
if (countryLocalStorage !== null) {
  let countryLocalStorageArr = JSON.parse(countryLocalStorage);
  for (let a = 0; a < countryLocalStorageArr.length; a++) {
    window.onload = function () {
      createFlagCard(countryLocalStorageArr[a]);
    };
  }
}

const clearLocalStorageButton = document.getElementById('clearHistoryBtn');

clearLocalStorageButton.addEventListener('click', function () {
  localStorage.clear();
  window.location.reload();
});
