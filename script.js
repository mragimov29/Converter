const getCurrency = async (firstCurrency, secondCurrency) => {
    let response = await fetch(`https://api.exchangerate.host/latest?base=${firstCurrency}&symbols=${secondCurrency}`)
    let data = response.json();
    return data;
}

const printCurrency = (firstCurrency, secondCurrency) => {
    getCurrency(firstCurrency, secondCurrency).
    then(response => {
        let p = document.querySelector('.first').querySelector('.exchange-rates');
        p.innerText = `1 ${firstCurrency} = ${response.rates[`${secondCurrency}`].toFixed(4)} ${secondCurrency}`;
    })
    getCurrency(secondCurrency, firstCurrency).
    then(response => {
        let p = document.querySelector('.second').querySelector('.exchange-rates');
        p.innerText = `1 ${secondCurrency} = ${response.rates[`${firstCurrency}`].toFixed(4)} ${firstCurrency}`;
    })
}

const currency1 = document.querySelector('.first').querySelector('#selected');
const currency2 = document.querySelector('.second').querySelector('#selected');

printCurrency(currency1.innerText, currency2.innerText)