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
        }).catch(error => {
            alert(error);
        });
    getCurrencyData(secondCurrency, firstCurrency).
        then(response => {
            let p = document.querySelector('.second').querySelector('.exchange-rates');
            p.innerText = `1 ${secondCurrency} = ${response.rates[`${firstCurrency}`].toFixed(4)} ${firstCurrency}`;
            exchangeRates.push(response.rates[`${firstCurrency}`].toFixed(4));
        }).catch(error => {
            alert(error);
        });
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

    str = str.replace(/[^0-9,.]/g, '');

    let arr = str.split('');
    let dots = arr.filter(x => x == '.');
    let dot = 0;
    let removed;
    if (dots.length == 2) {
        arr.forEach((item, index) => {
            if(dot == 1 && item == '.') {
                arr.splice(index, 1);
            }
            if(item == '.') dot++;
        })
        str = arr.join('');
    }
    return str;
}

const prinrWithSpace = (str) => {
    let c = str.indexOf('.');
    let p = 0, b;
    if (c > -1) {
        p = str.slice(0, c);
        b = str.slice(c, str.length);
        return addSpace(p) + b;
    }

    else if (str.length > 3)
        str = addSpace(str);

    return str;
}

const addSpace = (str) => {
    let arr = []

    for (let i = str.length; i > str.length % 3; i -= 3)
        arr.unshift(str.slice(i - 3, i));
    if (str.length % 3 != 0)
        arr.unshift(str.slice(0, str.length % 3));
    str = arr.join(' ');
    return str;
}

//variables
const input1 = document.querySelector('.first').querySelector('input');
const input2 = document.querySelector('.second').querySelector('input');
const currency1 = document.querySelector('.first').querySelector('#selected');
const currency2 = document.querySelector('.second').querySelector('#selected');
const button1 = document.querySelector('.first').querySelectorAll('button');
const button2 = document.querySelector('.second').querySelectorAll('button');
const menuButton = document.querySelector('.menu');
let exchangeRates = printAndGetCurrency(document.querySelector('.first').querySelector('#selected').innerText,
    document.querySelector('.second').querySelector('#selected').innerText);

// //events
menuButton.addEventListener('click', (event) => {
    if (window.innerWidth < 801) {
        if (event.target.id == 'clicked') {
            document.querySelector('.list').style.display = 'none';
            document.querySelector('.sing-in').style.display = 'none';
            event.target.id = ''
        } else {
            event.target.id = 'clicked'
            document.querySelector('.list').style.display = 'flex';
            document.querySelector('.sing-in').style.display = 'flex';
        }
    }
});

button1.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.target.id = 'selected';
        event.target.parentElement.id = 'selected';

        change(index, button1);
        exchangeRates = printAndGetCurrency(document.querySelector('.first').querySelector('#selected').innerText,
            document.querySelector('.second').querySelector('#selected').innerText);
        getCurrencyData(document.querySelector('.first').querySelector('#selected').innerText,
            document.querySelector('.second').querySelector('#selected').innerText).
            then(response => {
                if (input1.value != '') {
                    value = removeExtraCharacters(input1.value) * response.rates[`${document.querySelector('.second').querySelector('#selected').innerText}`];
                    if (value % 1 == 0)
                        input2.value = value;
                    else
                        input2.value = value.toFixed(4);

                    input2.value = prinrWithSpace(input2.value);
                }
            }).catch(error => {
                alert(error);
            });
    });
});

button2.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.target.id = 'selected';
        event.target.parentElement.id = 'selected';

        change(index, button2);
        exchangeRates = printAndGetCurrency(document.querySelector('.first').querySelector('#selected').innerText,
            document.querySelector('.second').querySelector('#selected').innerText)

        getCurrencyData(document.querySelector('.first').querySelector('#selected').innerText,
            document.querySelector('.second').querySelector('#selected').innerText)
            .then(response => {
                if (input1.value != '') {
                    value = removeExtraCharacters(input1.value) * response.rates[`${document.querySelector('.second').querySelector('#selected').innerText}`].toFixed(4);
                    if (value % 1 == 0)
                        input2.value = value;
                    else
                        input2.value = value.toFixed(4);

                    input2.value = prinrWithSpace(input2.value);
                }
            }).catch(error => {
                alert(error);
            });
    })
});

let prevKey;
input1.addEventListener('keyup', event => {
    // evt.preventDefault()
    // evt.target.value = '2.0'
    // if(evt.key == ',' || evt.key == '.')

    // prevKey = evt.key;
    // event.target.value = removeExtraCharacters(event.target.value);

    e = event || window.event;  
    // var val = event.value;
    // alert(val.slice(0, event.selectionStart).length);
    if (e.keyCode != '38' && e.keyCode != '40' && e.keyCode != '37' && e.keyCode != '39') {
        event.target.value = removeExtraCharacters(event.target.value);
        if (event.target.value != '') {
            let value = event.target.value * exchangeRates[0];

            if (value % 1 == 0)
                input2.value = value;
            else
                input2.value = value.toFixed(4);

            event.target.value = prinrWithSpace(event.target.value);
            input2.value = prinrWithSpace(input2.value);
        }
        else input2.value = '';
    }
});

input2.addEventListener('keyup', event => {
    event.target.value = removeExtraCharacters(event.target.value);
    e = event || window.event;
    if (e.keyCode != '38' && e.keyCode != '40' && e.keyCode != '37' && e.keyCode != '39'
    && e.keyCode != '8' && e.keyCode != '9' && e.keyCode != '13' && e.keyCode != '16' && e.keyCode != '17' && e.keyCode != '20') {
       if (event.target.value != '') {
            let value = event.target.value * exchangeRates[1];
            if (value % 1 == 0)
                input1.value = value;
            else
                input1.value = value.toFixed(4);

            event.target.value = prinrWithSpace(event.target.value);
            input1.value = prinrWithSpace(input1.value);
        }
        else input1.value = '';
    }
});
