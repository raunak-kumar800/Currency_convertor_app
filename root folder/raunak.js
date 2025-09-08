
const dropdown= document.querySelectorAll(".dropdown select") ;
const btn = document.querySelector("form button");
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
for (let select of dropdown){
   for (currcode in countryList){
    let newoption=document.createElement("option");
    newoption.innerText=currcode;
    newoption.value=currcode;
    if (select.name==="from" && currcode==="USD"){
        newoption.selected="selected";
    } else if (select.name==="to" && currcode==="INR") {
        newoption.selected="selected";
    }
    select.append(newoption);
   }
   select.addEventListener("change",(evt) =>{
    updateflage(evt.target);
   })
}
const updateflage = (element) =>{
    let currcode = element.value;
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    if (amval === "" || amval < 1) {
        amval = 1;
        amount.value = "1";
    }

    var myHeaders = new Headers();
    myHeaders.append("apikey", "8GNFnxHe6ZDKMe4du5crEaUYdHPpP11i");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${tocurr.value}&from=${fromcurr.value}&amount=${amval}`;

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();  // ✅ Parse JSON properly

      
        if (data.result) {
            const msg = document.querySelector(".msg");
            msg.innerText = `${amval} ${fromcurr.value} = ${data.result} ${tocurr.value}`;
        } else {
            alert("Conversion failed. Please try again.");
        }
    } catch (error) {
        console.error("API fetch error:", error);
        alert("An error occurred while fetching exchange rate.");
    }
});
