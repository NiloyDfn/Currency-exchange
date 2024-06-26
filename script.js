const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for(let select of dropdowns) {
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode ==="USD"){
            newOption.selected = "selected";
        }else if(select.name ==="to" && currCode ==="BDT"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc
}

btn.addEventListener("click", async (e) =>{
    e.preventDefault()
    let amount = document.querySelector("form input")
    let amval = amount.value
    if(amount === "" || amval <1){
        amval = 1;
        amount.value = "1"      
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmount = Math.floor(amval * rate) 
    msg.innerText = `${fromCurr.value} = ${finalAmount} ${toCurr.value}`

})      