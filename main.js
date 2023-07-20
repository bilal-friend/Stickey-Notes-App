// Project : sticky notes application

const addCard = document.querySelector(".add-card");
const section = document.querySelector("section");

// // Retrieve the notes from local storage and split them into an array
let memory = localStorage.getItem("notes")
  ? localStorage.getItem("notes").split(",")
  : [];

if (localStorage.getItem("notes")) {
  for (let i = 0; i < memory.length; i++) {
    createCards(memory[i]);
  }
}
addCard.addEventListener("click", function () {
  createCards();
});

function createCards(memoryName = "") {
  // Create a new card
  const card = document.createElement("div");
  card.classList.add("card");
  addCard.before(card);

  // Create a textarea inside the card
  const textarea = document.createElement("textarea");
  card.appendChild(textarea);
  textarea.placeholder = "Empty Sticky Note";

  // add trash
  let trash = document.createElement("span");
  trash.textContent = "🗑️";
  card.appendChild(trash);
  trash.classList.add("trash");

  // Add numerical attributes to the card
  addNumAttr();

  // Set the value of the textarea to the provided memoryName
  textarea.value = memoryName;

  // Store the memoryName in the memory array at the corresponding card index
  memory[card.getAttribute("num")] = memoryName;

  // Update the notes in local storage
  localStorage.setItem("notes", memory);

  // Save the textarea value on each blur event
  textarea.onblur = function () {
    memory[card.getAttribute("num")] = textarea.value;
    localStorage.setItem("notes", memory);
  };

  // Delete the card on double click on it
  card.addEventListener("dblclick", () => {
    rem(card);
  });
  // delete card when trash is clicked for mobile phone
  trash.addEventListener("click", () => {
    rem(card);
  });
}

function rem(card) {
  if (confirm("Do You Want To Delete This Note") === true) {
    card.remove();
    memory.splice(card.getAttribute("num"), 1);
    localStorage.setItem("notes", memory);
    addNumAttr();
  }
}
function addNumAttr() {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].setAttribute("num", i);
  }
}
