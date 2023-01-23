/**
* @name: JavaScript Essentials Class Activity
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Raphael E. Scaziti
*/

// Reference: https://www.geeksforgeeks.org/currency-converter-in-javascript/

// I defined my const with the return of this API (a json file)
const CURRENCY_API = "https://api.exchangerate-api.com/v4/latest/USD";

// Variables to manage all data, for example the value typed on <input>
var amountToBeConverted = document.querySelector(".amount-to-be-converted");
var fromCurrency = document.querySelector(".fromCurrency");
var toCurrency = document.querySelector(".toCurrency");
var convertButton = document.querySelector(".convertButton");
var convertedValue = document.querySelector(".convertedValue");
var returnedValueFrom;
var returnedValueTo;
var updatedAmountToBeConverted;
var convertedAmount;

// With the variable received above, I added a EventListener to get the value typed inside the <input> or the value of selected currency
// As I used the tag <select> on my HTML code, the 'change' event is fired
// When fired, my code will pass this event as parameter and the value of it will be addressed to the variable called returnedVal...
// Thus returnedValueFrom (and others) will receive the value inside <option>, such as "CAD" or "EUR" (the same name of the API's json file) 
fromCurrency.addEventListener('change', (event) => {
    returnedValueFrom = `${event.target.value}`;
})

toCurrency.addEventListener('change', (event) => {
    returnedValueTo = `${event.target.value}`;
})

amountToBeConverted.addEventListener('input', (event) => {
    updatedAmountToBeConverted = `${event.target.value}`;
});

// When button convert is cliked, this EventListener will call my function getCurrency...
convertButton.addEventListener("click", getCurrencyValuesFromApi);

// Before using the API's values, I must fetch that data and pass as argument in my arrow function and return a json to function showValue
function getCurrencyValuesFromApi(){
    fetch(`${CURRENCY_API}`)
        .then(convert => {
            return convert.json();
        }).then(showValue);
}

// showValue() will get the json as an object (I guess, because I'm a Java guy) and search the attribute "rates: "CAD" (it depends of the selected value)
// the value of json attribute that corresponds to the "CAD" will return to variable fromValueRate
// Now the system has both, from and to references, getCOnveterdValue() is called and it will return the result value to the variable caonvertdValue as 
// a html value (That's possible because I got that element using variable convertedValue)
function showValue(convert){
    let fromValueRate = convert.rates[returnedValueFrom];
    let toValueRate = convert.rates[returnedValueTo];

    convertedValue.innerHTML = getConvertedValue(fromValueRate, toValueRate);
}

// Function to execute the calculation
function getConvertedValue(fromValueRate, toValueRate){
    return ((toValueRate / fromValueRate) * updatedAmountToBeConverted).toFixed(2); 
}

// When button "reset" is cliked it calls resetValues() that will reload my page (removing values of input)
// And the converted Value showed before will receive an empty string (removing the value)
function resetValues(){
    window.location.reload();
    document.getElementsByClassNama("convertedValue").innerHTML = "";
}

// ref: https://stackoverflow.com/questions/50048638/display-images-one-after-another-with-few-seconds-delay
// I pass the id as value and call the function show() because <img> has display:none, it will take 10 seconds (10000 miliseconds)
setTimeout(function(){
    $('#main-image').show();      
}, 10000);//wait 10 sec