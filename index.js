

const BASE_URL = "https://v6.exchangerate-api.com/v6/0e5c511468de25333f2e4ce2/latest/";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", function (evt) {
        setFlag(evt.target); 
    });
}


function setFlag(element) {
    if (element) {
        let currency = element.value;
        let country = countryList[currency];
        let newSrc = `https://flagsapi.com/${country}/shiny/64.png`;
        let img = element.parentElement.querySelector("img");
        if (img) {
            img.src = newSrc;
        }
    }
}


const updateExchangeRate = async () => {

    let amount = document.querySelector(".amount input").value;
    if (amount === "" || amount < 1) {
        amount = 1;
        document.querySelector(".amount input").value = "1";
    }

    const url = `${BASE_URL}/${fromCurr.value}`;
    const response = await fetch(url);


    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];

    const finalAmount = rate * amount;

    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

}


btn.addEventListener("click", function(evt) {
    evt.preventDefault();
    updateExchangeRate();
});

