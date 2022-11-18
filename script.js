//functions
const getCurrencyData = async (firstCurrency, secondCurrency) => {
    let response = await fetch(`https://api.exchangerate.host/latest?base=${firstCurrency}&symbols=${secondCurrency}`)
    let data = response.json();
    return data;
}

const printAndGetCurrency = (firstCurrency, secondCurrency) => {
    let exchangeRates = [];
    getCurrencyData(firstCurrency, secondCurrency).
        then(response => {
            let p = document.querySelector('.first').querySelector('.exchange-rates');
            p.innerText = `1 ${firstCurrency} = ${response.rates[`${secondCurrency}`].toFixed(4)} ${secondCurrency}`;
            exchangeRates.push(response.rates[`${secondCurrency}`].toFixed(4));
        })
    getCurrencyData(secondCurrency, firstCurrency).
        then(response => {
            let p = document.querySelector('.second').querySelector('.exchange-rates');
            p.innerText = `1 ${secondCurrency} = ${response.rates[`${firstCurrency}`].toFixed(4)} ${firstCurrency}`;
            exchangeRates.push(response.rates[`${firstCurrency}`].toFixed(4));
        })
    return exchangeRates;
}

const change = (index, button) => {
    if (index === 0) {
        button[index + 1].id = ''; button[index + 1].parentElement.id = '';
        button[index + 2].id = ''; button[index + 2].parentElement.id = '';
        button[index + 3].id = ''; button[index + 3].parentElement.id = '';
    } else if (index === 1) {
        button[index + 1].id = ''; button[index + 1].parentElement.id = '';
        button[index + 2].id = ''; button[index + 2].parentElement.id = '';
        button[index - 1].id = ''; button[index - 1].parentElement.id = '';
    } else if (index === 2) {
        button[index - 2].id = ''; button[index - 2].parentElement.id = '';
        button[index - 1].id = ''; button[index - 1].parentElement.id = '';
        button[index + 1].id = ''; button[index + 1].parentElement.id = '';
    } else if (index === 3) {
        button[index - 3].id = ''; button[index - 3].parentElement.id = '';
        button[index - 2].id = ''; button[index - 2].parentElement.id = '';
        button[index - 1].id = ''; button[index - 1].parentElement.id = '';
    }
}

const removeExtraCharacters = (str) => {
    str = str.replace(',', '.');
    if (str.length == 1 && str[0] == '.') str = str.replace('.', '');

    str = str.replace(/[A-Za-zА-Яа-я ]+/g, '');
    str = str.replace(/[^0-9,.]/g, ' ');

    let arr = str.split('');
    let dots = arr.filter(x => x == '.');
    if (dots.length == 2) {
        arr.pop();
        str = arr.join('');
    }

    return str;
}

//variables
const input1 = document.querySelector('.first').querySelector('input');
const input2 = document.querySelector('.second').querySelector('input');
const currency1 = document.querySelector('.first').querySelector('#selected');
const currency2 = document.querySelector('.second').querySelector('#selected');
const button1 = document.querySelector('.first').querySelectorAll('button');
const button2 = document.querySelector('.second').querySelectorAll('button');
let exchangeRates = printAndGetCurrency(document.querySelector('.first').querySelector('#selected').innerText,
    document.querySelector('.second').querySelector('#selected').innerText);

//events
button1.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.target.id = 'selected';
        event.target.parentElement.id = 'selected';

        change(index, button1);
        exchangeRates = printAndGetCurrency(document.querySelector('.first').querySelector('#selected').innerText,
            document.querySelector('.second').querySelector('#selected').innerText);
    });
});

button2.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        // extraRates[0] = exchangeRates[0];
        // extraRates[1] = exchangeRates[];
        event.target.id = 'selected';
        event.target.parentElement.id = 'selected';

        change(index, button2);
        exchangeRates = printAndGetCurrency(document.querySelector('.first').querySelector('#selected').innerText,
            document.querySelector('.second').querySelector('#selected').innerText)
    })
});

input1.addEventListener('keyup', event => {
    event.target.value = removeExtraCharacters(event.target.value);
    if (event.target.value != '') {
        let value;
        value = event.target.value * exchangeRates[0];
        if (value % 1 == 0)
            input2.value = value;
        else
            input2.value = value.toFixed(4);
    }
    else input2.value = '';
});

input2.addEventListener('keyup', event => {
    console.log(exchangeRates)
    event.target.value = removeExtraCharacters(event.target.value);

    if (event.target.value != '') {
        let value = event.target.value * exchangeRates[1];
        if (value % 1 == 0)
            input1.value = value;
        else
            input1.value = value.toFixed(4);
    }
    else input1.value = '';
});
