const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector("#Lowercase");
const numbersCheck = document.querySelector("#Numbers");
const symbolsCheck = document.querySelector("#Symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '@#$%^&*:?><,./+-!~{}|}[]()';
let password = "";
let passwordLength = 10;
let checkCount = 1;

handleslider();
setIndicator("#ccc");

function handleslider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
    if (indicator) {
        indicator.style.backgroundColor = color;
    } else {
        console.error("Indicator element not found.");
    }
}

function getRnInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRnNumber() {
    return getRnInteger(0, 9);
}

function getRnLowercase() {
    return String.fromCharCode(getRnInteger(97, 122));
}

function getRnUppercase() {
    return String.fromCharCode(getRnInteger(65, 90));
}

function getRnSymbol() {
    const ranNum = getRnInteger(0, symbols.length - 1);
    return symbols.charAt(ranNum);
}

function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.join('');
}

function getPassword() {
    password = "";

    let funArr = [];

    if (uppercaseCheck.checked) {
        funArr.push(getRnUppercase);
    }

    if (lowercaseCheck.checked) {
        funArr.push(getRnLowercase);
    }

    if (numbersCheck.checked) {
        funArr.push(getRnNumber);
    }

    if (symbolsCheck.checked) {
        funArr.push(getRnSymbol);
    }

    for (let i = 0; i < passwordLength; i++) {
        if (funArr.length > 0) {
            let ranIndex = getRnInteger(0, funArr.length - 1);
            password += funArr[ranIndex]();
        }
    }

    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;
    calcStrength();
}

function calcStrength() {
    let hasUpper = uppercaseCheck.checked;
    let hasLower = lowercaseCheck.checked;
    let hasNum = numbersCheck.checked;
    let hasSym = symbolsCheck.checked;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        console.log("copyContent: Copied to clipboard");
    } catch (e) {
        copyMsg.innerText = "Fail to copy";
        console.error("copyContent: Error copying to clipboard", e);
    }
    copyMsg.classList.add("active");
    setTimeout(function () {
        copyMsg.classList.remove("active");
    }, 2000);
}

function handleCheckBoxChange() {
    checkCount = 1;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    });
}

if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleslider();
}

// Initial password generation
getPassword();

// Event listener for the "Generate Password" button
generateBtn.addEventListener("click", getPassword);


function copyContent() {
    try {
        navigator.clipboard.writeText(passwordDisplay.value);
        console.log("copyContent: Copied to clipboard");
        copyMsg.innerText = "Copied!";
    } catch (e) {
        copyMsg.innerText = "Failed to copy";
        console.error("copyContent: Error copying to clipboard", e);
    }
    copyMsg.classList.add("active");
    setTimeout(function () {
        copyMsg.classList.remove("active");
    }, 2000);
}

// Event listener for the copy button
copyBtn.addEventListener("click", copyContent);




