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

const change = (index, button) => {
    if(index === 0) {
        button[index+1].id = ''; button[index+1].parentElement.id = '';
        button[index+2].id= ''; button[index+2].parentElement.id= '';
        button[index+3].id= ''; button[index+3].parentElement.id= '';
    } else if(index === 1) {
        button[index+1].id = ''; button[index+1].parentElement.id = '';
        button[index+2].id = ''; button[index+2].parentElement.id = '';
        button[index-1].id = ''; button[index-1].parentElement.id = '';
    } else if(index === 2) {
        button[index-2].id = ''; button[index-2].parentElement.id = '';
        button[index-1].id = ''; button[index-1].parentElement.id = '';
        button[index+1].id = ''; button[index+1].parentElement.id = '';
    } else if(index === 3) {
        button[index-3].id = ''; button[index-3].parentElement.id = '';
        button[index-2].id = ''; button[index-2].parentElement.id = '';
        button[index-1].id = ''; button[index-1].parentElement.id = '';
    } 
}

const currency1 = document.querySelector('.first').querySelector('#selected');
const currency2 = document.querySelector('.second').querySelector('#selected');
const button1 = document.querySelector('.first').querySelectorAll('button');
const button2 = document.querySelector('.second').querySelectorAll('button');

printCurrency(currency1.innerText, currency2.innerText)

button1.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.target.id = 'selected';
        event.target.parentElement.id = 'selected';
        
        change(index, button1);
        printCurrency(document.querySelector('.first').querySelector('#selected').innerText, document.querySelector('.second').querySelector('#selected').innerText)
    })
})

button2.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.target.id = 'selected';
        event.target.parentElement.id = 'selected';

        change(index, button2);
        printCurrency(document.querySelector('.first').querySelector('#selected').innerText, document.querySelector('.second').querySelector('#selected').innerText)
    })
})