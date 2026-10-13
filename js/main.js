const energyInput = document.querySelector("#energy");
const timeInput = document.querySelector("#time");
const placeInput = document.querySelector("#place");
const reputationInput = document.querySelector("#reputation");
const wordInput = document.querySelector("#word");
const generateButton = document.querySelector("#generate");
const againButton = document.querySelector("#again");
const generatedName = document.querySelector("#generated-name");

function generateAlias() {
  const energy = energyInput.value;
  const time = timeInput.value;
  const place = placeInput.value;
  const reputation = reputationInput.value;
  const word = wordInput.value;

  if (
    energy === "" ||
    time === "" ||
    place === "" ||
    reputation === "" ||
    word === ""
  ) {
    generatedName.textContent = "Answer all five questions.";
    return;
  }

  const apiUrl =
    `/api?energy=${energy}` +
    `&time=${time}` +
    `&place=${place}` +
    `&reputation=${reputation}` +
    `&word=${word}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);

      generatedName.textContent = data.name;
    })

    .catch(function (error) {
      console.log(error);

      generatedName.textContent = "Something went wrong.";
    });
}

generateButton.addEventListener("click", generateAlias);

againButton.addEventListener("click", generateAlias);
