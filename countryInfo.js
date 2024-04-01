'use strict';

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

let countryCardOrder = 0;
let countryMatch = false;
let validCountry = false;

const errorMessage = document.getElementById('errorMessage');
const countryInput = document.getElementById('inputField');
countryInput.addEventListener('focus', function () {
  if (countryInput.value !== null) {
    countryInput.value = '';
    errorMessage.textContent = '';
    countryMatch = false;
    validCountry = false;
  }
});

let countryData = getCountryInfo();
const data = countryData.then((items) => {
  const countryArr = items;

  let countryJson = [];
  localStorage.setItem(`countryCards`, JSON.stringify(countryJson));

  const searchButton = document.getElementById('searchBtn');
  searchButton.addEventListener('click', function () {
    countryCardOrder++;

    let countryArray = localStorage.getItem(`countryCards`);
    let countryArrayFormat = JSON.parse(countryArray);

    for (let i = 0; i < countryArr.length; i++) {
      if (
        countryArr[i].name.common.replace(/ /g, '') ===
        countryInput.value.replace(/ /g, '')
      ) {
        validCountry = true;
        countryMatch = true;

        for (let a = 0; a < countryArrayFormat.length; a++) {
          if (
            countryArrayFormat[a].nameData.replace(/ /g, '') ===
            countryInput.value.replace(/ /g, '')
          ) {
            console.log('Repeated Search');
            countryMatch = false;

            errorMessage.textContent =
              'NACH DIESEM LAND HABEN SIE SCHON GESUCHT';
          }
        }
        console.log(validCountry, countryMatch);
        if (countryMatch === true) {
          console.log('match');
          let countryDataObject = {
            flagData: countryArr[i].flags.png,
            nameData: ` ${countryArr[i].name.common}`,
            capitalData: ` ${countryArr[i].capital[0]}`,
            populationData: ` ${countryArr[i].population}`,
            regionData: ` ${countryArr[i].region}`,
          };

          countryJson.push(countryDataObject);

          localStorage.setItem(`countryCards`, JSON.stringify(countryJson));
        } else if (
          countryArrayFormat[a].nameData.replace(/ /g, '') ===
          countryInput.value.replace(/ /g, '')
        ) {
          countryMatch = false;

          errorMessage.textContent =
            'NACH DIESEM LAND HABEN SIE SCHON GESUCHT1';
        }
      }
    }

    if (countryMatch !== true && validCountry !== true) {
      errorMessage.textContent = 'IHRE SUCHE ERGAB KEINE TREFFER!';
    }

    let countryObject = localStorage.getItem(`countryCards`);
    let parsedCountryObject = JSON.parse(countryObject);
    let countryArrIndex = parsedCountryObject.length - 1;

    if (countryMatch === true && validCountry === true) {
      try {
        createFlagCard(parsedCountryObject, countryArrIndex);
      } catch (e) {
        console.log(e);

        setTimeout(() => {
          errorMessage.textContent = '';
        }, 10000);
        errorMessage.textContent = 'IHRE SUCHE ERGAB KEINE TREFFER!2';

        const invalidCard = document.getElementById(
          `countryCard${countryCardOrder}`
        );
        invalidCard.remove();
      }
    }
  });
});

const deleteCard = function (parent, child) {
  parent.removeChild(child);
};

const createFlagCard = function (countryData, countryPosition) {
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
  countryFlag.src = countryData[countryPosition].flagData;
  countryCard.appendChild(countryFlag);
  countryFlag.setAttribute('id', `countryFlag${countryCardOrder}`);

  document.createElement('br');

  const countryName = document.createElement('p');
  countryName.setAttribute('id', 'countryName');
  countryName.textContent = `Name: ${countryData[countryPosition].nameData}`;
  countryCard.appendChild(countryName);
  countryName.setAttribute('id', `countryName${countryCardOrder}`);

  document.createElement('br');

  const countryCapital = document.createElement('p');
  countryCapital.setAttribute('id', 'countryCapital');
  countryCapital.textContent = `Capital: ${countryData[countryPosition].capitalData}`;
  countryCard.appendChild(countryCapital);
  countryCapital.setAttribute('id', `countryCapital${countryCardOrder}`);

  document.createElement('br');

  const countryPopulation = document.createElement('p');
  countryPopulation.setAttribute('id', 'countryPopulation');
  countryPopulation.textContent = `Population: ${countryData[countryPosition].populationData} mio.`;
  countryCard.appendChild(countryPopulation);
  countryPopulation.setAttribute('id', `countryPopulation${countryCardOrder}`);

  document.createElement('br');

  const countryRegion = document.createElement('p');
  countryRegion.setAttribute('id', 'countryRegion');
  countryRegion.textContent = `Region: ${countryData[countryPosition].regionData}`;
  countryCard.appendChild(countryRegion);
  countryRegion.setAttribute('id', `countryRegion${countryCardOrder}`);
};

const presentCountryCards = function () {};

const clearLocalStorageButton = document.getElementById('clearHistoryBtn');

clearLocalStorageButton.addEventListener('click', function () {
  localStorage.clear();
  window.location.reload();
});
