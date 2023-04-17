let slider = document.getElementById("input");
let lowerCase = document.getElementById("lowerCase");
let symbol = document.getElementById("symbol");
let upperCase = document.getElementById("upperCase");
let number = document.getElementById("number");
let checkboxes = document.getElementById("checkboxes");
const symbols = "!@#$%^&*()_-+={}[]|\\:;\"'<>,.?/";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
let checkedNumber = 0;
let shvilebi = document.querySelectorAll('#checkboxes input[type="checkbox"]');
let power = document.getElementById("power");
const makeCopy = document.getElementById("copya");
const copyNotification = document.getElementById("copyText");

// let password = "";

function dacopireba() {
  const paragraphElement = document.getElementById("resultat");
  const inputElement = document.createElement("textarea");
  inputElement.value = paragraphElement.textContent;
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand("copy");
  document.body.removeChild(inputElement);

  if (copyNotification.style.display === "none") {
    copyNotification.style.display = "inline-block";
    setTimeout(function () {
      copyNotification.style.display = "none";
    }, 800);
  } else {
    copyNotification.style.display = "none";
  }
}

makeCopy.addEventListener("click", dacopireba);

slider.oninput = function () {
  document.getElementById("qauntity-value").innerHTML = slider.value;
  let value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.backgroundImage =
    "linear-gradient(to right, #A4FFAF 0%, #A4FFAF " +
    value +
    "%, #18171F " +
    value +
    "%, rgba(24, 23, 31, 1))";
};

function dachekili() {
  checkedNumber = 0;
  for (let i = 0; i < shvilebi.length; i++) {
    if (shvilebi[i].checked) {
      checkedNumber++;
    }
  }
}

function monishvna() {
  let password = "";
  checkedNumber = 0;
  checkboxArray = [];
  dachekili();
  if (checkedNumber !== 0) {
    let divisor = Math.ceil(input.value / checkedNumber);
    let selcted_Symbols = "";
    let selected_LowLetters = "";
    let selected_UpperLetters = "";
    let selected_Numbers = "";

    let letterCoef = 1;
    let upperLetterCoef = 1;
    let symbolCoef = 1;
    let numberCoef = 1;
    let lengthCoef = input.value < 8 ? input.value * 0.85 : input.value;
    let strengthWord = "";

    if (lowerCase.checked) {
      letterCoef = 1.15;
      for (i = 0; i < divisor; i++) {
        selected_LowLetters += lowerLetters.charAt(
          Math.floor(Math.random() * lowerLetters.length)
        );
      }
      checkboxArray.push(selected_LowLetters);
    }

    if (upperCase.checked) {
      upperLetterCoef = 1.25;
      for (i = 0; i < divisor; i++) {
        selected_UpperLetters += upperLetters.charAt(
          Math.floor(Math.random() * upperLetters.length)
        );
      }
      checkboxArray.push(selected_UpperLetters);
    }

    if (symbol.checked) {
      symbolCoef = 1.25;
      for (i = 0; i < divisor; i++) {
        selcted_Symbols += symbols.charAt(
          Math.floor(Math.random() * symbols.length)
        );
      }
      checkboxArray.push(selcted_Symbols);
    }

    if (number.checked) {
      numberCoef = 1.16;
      for (i = 0; i < divisor; i++) {
        selected_Numbers += numbers.charAt(
          Math.floor(Math.random() * numbers.length)
        );
      }
      checkboxArray.push(selected_Numbers);
    }

    for (let s = 0; s < divisor; s++) {
      for (let a = 0; a < checkboxArray.length; a++) {
        if (checkboxArray[a][s]) {
          password += checkboxArray[a][s];
        }
      }
    }

    password = password.substring(0, input.value);
    let newPass = shuffleString(password);
    power.innerHTML = "";

    let strengthCoef =
      lengthCoef * numberCoef * symbolCoef * upperLetterCoef * letterCoef;

    if (strengthCoef < 9) {
      tooWeak();
      strengthWord = "too weak";
    } else if (strengthCoef < 14) {
      weak();
      strengthWord = "weak";
    } else if (strengthCoef < 19) {
      medium();
      strengthWord = "medium";
    } else {
      hard();
      strengthWord = "hard";
    }
    errorMessage.innerHTML = "";
    document.getElementById("resultat").innerHTML = newPass;
    document.getElementById("strengthWord").innerHTML = strengthWord;
  } else {
    errorMessage.innerHTML = "Check at least one argument";
    document.getElementById("resultat").innerHTML = "";
    document.getElementById("strengthWord").innerHTML = "";
  }
}

function tooWeak() {
  power.innerHTML += `
  <p id="levels"></p>
  <span style="background-color: #f64a4a; border-color: #f64a4a"></span>
  <span></span>
  <span></span>
  <span></span>
  `;
}

function weak() {
  power.innerHTML += `
  <p id="levels"></p>
  <span style="background-color: #fb7c58; border-color: #fb7c58"></span>
  <span style="background-color: #fb7c58; border-color: #fb7c58"></span>
  <span></span>
  <span></span>
  `;
}

function medium() {
  power.innerHTML += `
  <p id="levels"></p>
  <span style="background-color: #f8cd65; border-color: #f8cd65"></span>
  <span style="background-color: #f8cd65; border-color: #f8cd65"></span>
  <span style="background-color: #f8cd65; border-color: #f8cd65"></span>
  <span></span>
  `;
}

function hard() {
  power.innerHTML += `
  <p id="levels"></p>
  <span style="background-color: #a4ffaf; border-color: #a4ffaf"></span>
  <span style="background-color: #a4ffaf; border-color: #a4ffaf"></span>
  <span style="background-color: #a4ffaf; border-color: #a4ffaf"></span>
  <span style="background-color: #a4ffaf; border-color: #a4ffaf"></span>
  `;
}

function shuffleString(str) {
  // Convert the string to an array of characters
  var arr = str.split("");

  // Shuffle the array using the Fisher-Yates shuffle algorithm
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // Convert the array back to a string and return it
  return arr.join("");
}

// makeCopy.addEventListener("click", function () {
//   makeCopy.querySelector("path").setAttribute("fill", "red");
// });
