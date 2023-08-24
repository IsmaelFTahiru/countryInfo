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

  
    for (let i = 0; i < countryArr.length; i++) {
      const countryInput = document.getElementById('inputField');
      if (countryArr[i].name.common === countryInput.value) {
        localStorage.clear();
        localStorage.setItem('countryName', ` ${countryArr[i].name.common}`);
        localStorage.setItem('countryCapital', ` ${countryArr[i].capital[0]}`);
        localStorage.setItem('countryPopulation',` ${countryArr[i].population}`);
        localStorage.setItem('countryRegion', ` ${countryArr[i].region}`);
        localStorage.setItem('countryFlag', countryArr[i].flags.png )
      }
    };
});



function openInfoPage() {
  window.location.href = 'http://127.0.0.1:5500/countryInfoOutput.html';
}

const searchButton = document.getElementById('searchBtn');

searchButton.addEventListener('click', function () {
  console.log('button');
  openInfoPage();
 
});


