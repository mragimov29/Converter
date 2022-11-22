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
    str = str.replace(',', '.').replace(/^00+/, '0');

    if (str[0] == '0' && str.length > 1 && str[1] != '.')
        str = str.slice(1);

    str = str.replace(',', '.');
    if (str.length == 1 && str[0] == '.') str = str.replace('.', '');

    str = str.replace(/[^0-9,.]/g, '');

    let arr = str.split('');
    let dots = arr.filter(x => x == '.');
    let dot = 0;

    if (dots.length == 2) {
        arr.forEach((item, index) => {
            if (dot == 1 && item == '.') {
                arr.splice(index, 1);
            }
            if (item == '.') dot++;
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

const getCursorPos = (input) => {
    let caretPos = 0;
    if (document.selection) {
        input.focus();
        let sel = document.selection.createRange();
        sel.moveStart('character', -input.value.length);
        caretPos = sel.text.length;
    } else if (input.selectionStart || input.selectionStart == '0') {
        caretPos = input.selectionStart;
    }
    return caretPos
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


window.addEventListener('resize', (e) => {
    if (window.innerWidth >= 801) {
        document.querySelector('.list').style.display = 'flex';
        document.querySelector('.sing-in').style.display = 'flex';
    }
    if (window.innerWidth < 801) {
        document.querySelector('.list').style.display = 'none';
        document.querySelector('.sing-in').style.display = 'none';
    }
});
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

        getCurrencyData(document.querySelector('.second').querySelector('#selected').innerText,
            document.querySelector('.first').querySelector('#selected').innerText).
            then(response => {
                if (input1.value != '') {
                    console.log(response.rates[`${document.querySelector('.first').querySelector('#selected').innerText}`]);
                    value = removeExtraCharacters(input2.value) * response.rates[`${document.querySelector('.first').querySelector('#selected').innerText}`];
                    if (value % 1 == 0)
                        input1.value = value;
                    else
                        input1.value = value.toFixed(4);

                    input1.value = prinrWithSpace(input1.value);
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

let prevSpace1 = 0;
input1.addEventListener('keyup', event => {
    e = event || window.event;

    let caretPos = getCursorPos(input1);

    if (e.keyCode != '38' && e.keyCode != '40' && e.keyCode != '37' && e.keyCode != '39'
        && e.keyCode != '9' && e.keyCode != '13' && e.keyCode != '16' && e.keyCode != '17' && e.keyCode != '20') {
        event.target.value = removeExtraCharacters(event.target.value);
        if (event.target.value != '') {
            let value = event.target.value * exchangeRates[0];

            if (value % 1 == 0)
                input2.value = value;
            else
                input2.value = value.toFixed(4);
                
            event.target.value = prinrWithSpace(event.target.value);
            input2.value = prinrWithSpace(input2.value);

            let space = event.target.value.split('').filter(x => x == ' ');

            if (e.keyCode == 8 || (event.target.value[event.target.value.length - 1] = '.'))
                input1.setSelectionRange(caretPos, caretPos)
            else if (!(e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 190 || e.keyCode == 188)
                input1.setSelectionRange(caretPos - 1, caretPos - 1)
            if (space.length > prevSpace1.length)
                input1.setSelectionRange(caretPos + 1, caretPos + 1)
            else if (space.length < prevSpace1.length && (e.keyCode == 190 || e.keyCode == 188))
                input1.setSelectionRange(caretPos - 1, caretPos - 1)


            prevSpace1 = event.target.value.split('').filter(x => x == ' ');
        }
        else input2.value = '';
    }
});

let prevSpace2 = 0;
input2.addEventListener('keyup', event => {
    e = event || window.event;

    let caretPos = getCursorPos(input2);

    if (e.keyCode != '38' && e.keyCode != '40' && e.keyCode != '37' && e.keyCode != '39'
        && e.keyCode != '9' && e.keyCode != '13' && e.keyCode != '16' && e.keyCode != '17' && e.keyCode != '20') {
        if (event.target.value != '') {
            event.target.value = removeExtraCharacters(event.target.value);
            let value = event.target.value * exchangeRates[1];
            if (value % 1 == 0)
                input1.value = value;
            else
                input1.value = value.toFixed(4);

            event.target.value = prinrWithSpace(event.target.value);
            input1.value = prinrWithSpace(input1.value);

            let space = event.target.value.split('').filter(x => x == ' ');

            if (e.keyCode == 8 || (event.target.value[event.target.value.length - 1] = '.'))
                input2.setSelectionRange(caretPos, caretPos)
            else if (!(e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 190 || e.keyCode == 188)
                input2.setSelectionRange(caretPos - 1, caretPos - 1)
            if (space.length > prevSpace2.length)
                input2.setSelectionRange(caretPos + 1, caretPos + 1)
            else if (space.length < prevSpace2.length && (e.keyCode == 190 || e.keyCode == 188))
                input2.setSelectionRange(caretPos - 1, caretPos - 1)

            prevSpace2 = event.target.value.split('').filter(x => x == ' ');
        }
        else input1.value = '';
    }
});
