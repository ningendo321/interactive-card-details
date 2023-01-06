const cardHolder = document.getElementById("name")
const cardNumber = document.getElementById("number")
const expiry = Array.from(document.querySelectorAll(".expiry"))
const cvc = document.getElementById("cvc")
const confirm_btn = document.querySelector(".btn")
const nameOnCard = document.querySelector(".card-holder-display")
const numberOnCard = document.querySelector('.card-number-display')
const expMM = document.querySelector(".expiry-month-display")
const expYY = document.querySelector(".expiry-year-display")
const cvcDisplay = document.querySelector('.cvc-display')
const form = document.querySelector('.myform')
const expiryError = document.getElementById('date-error')
const nameError = document.querySelector('.name-error')
const numberError = document.querySelector('.number-error')
const thankyou = document.querySelector('.thank-you-p')
const thankyou_div = document.querySelector('.thank-you')
const continue_btn = document.querySelector('.continue')

function inputname() {
    nameOnCard.innerHTML = cardHolder.value;
    if(nameOnCard.innerHTML == "") {
        nameOnCard.innerHTML = cardHolder.placeholder; 
    }
}

function inputnumber() {
    let cardnumberinput = cardNumber.value;
    let formattedcardnumber = cardnumberinput.replace(/[^\d]/g, "");
    formattedcardnumber = formattedcardnumber.substring(0, 16);

    let cardNumberSections = formattedcardnumber.match(/\d{1,4}/g);
    if (cardNumberSections !== null) {
      formattedcardnumber = cardNumberSections.join(" ");
    }
        if(cardnumberinput !== formattedcardnumber) {
        cardNumber.value = formattedcardnumber;
    }
        numberOnCard.innerHTML = cardNumber.value;
    if(cardNumber.value === "") {
        numberOnCard.innerHTML = cardNumber.placeholder;
    }
}

function inputMM() {
    let formattedMM = expiry[0].value;
    formattedMM = formattedMM.substring(0, 2)
    expiry[0].value = formattedMM;
    if(formattedMM === "") {
        expMM.innerHTML = '00';
    } else {
        expMM.innerHTML = formattedMM;
    }
}

function inputYY() {
    let formattedYY = expiry[1].value;
    formattedYY = formattedYY.substring(0, 3)
    expiry[1].value = formattedYY;
    if(formattedYY === "") {
        expYY.innerHTML = '00';
    } else {
        expYY.innerHTML = formattedYY;
    }

}
function inputCVC() {
    let formattedcvc = cvc.value;
    formattedcvc = cvc.value.substring(0, 3);
    cvc.value = formattedcvc;
    if(formattedcvc === "") {
        cvcDisplay.innerHTML = "000"
    } else {
        cvcDisplay.innerHTML = formattedcvc;
    }
}
//Validation
function massValidate() {
    function validateName() {
        let cardholderExp = /^[A-Z a-z]+$/;
        if(cardHolder.value.match(cardholderExp)) {
            nameError.textContent = ""
        } else {
            nameError.innerHTML = "Please enter correct name!"
        }
    }

    function validatecard() {
        if(cardNumber.value.length > 0 && cardNumber.value.length <16) {
            numberError.innerHTML = "Wrong length. Type correctly"
        } else if (cardNumber.value == "") {
            numberError.innerHTML = "Can't be blank"
        } else {
            numberError.innerHTML = ""
        }
    }
    function validateExpiry() {
        let expMonth = /^(0[0-9]|1[1-2]){2}$/;
        let expYear = /^[0-9][0-2]{4}$/;

        if (expiry[0].value.match(expMonth)) {
            expiryError.innerHTML = "";
        }  else if (
            expiry[0].value.match(expMonth) &&
            expiry[1].value.match(expYear)
            ) {
            expiryError.innerHTML = ""
        } else if (expiry[0] == ""){
            expiryError.innerHTML = "Can't be blank!"
        } else {
            expiryError.innerHTML = "Wrong format!"
        }
    }
validatecard();
validateName();
validateExpiry();
    if(
        nameOnCard.innerHTML == cardHolder.placeholder ||
        numberOnCard.innerHTML == cardNumber.placeholder ||
        expMM.innerHTML == "00" ||
        expYY.innerHTML == "00" ||
        cvcDisplay.innerHTML == "000" ||
        (cardNumber.value.length > 0 && cardNumber.value.length <16)    ) {
            return false;
        } else {
            return true;
        }

}

//Confirm Button

confirm_btn.addEventListener("click", function() {
    massValidate();
   if(massValidate() == false) {
    event.preventDefault()
   } else {
    event.preventDefault()

    form.classList.add('hidden')
    thankyou_div.classList.remove('hidden')
   }
})

//Continue Button
continue_btn.addEventListener("click", function(){
    location.reload()
})