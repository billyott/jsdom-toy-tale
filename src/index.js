let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//**************** define variables ****************

//for targeting html elements
const toyCollectionDiv = document.querySelector("#toy-collection")

//**************** define functions ****************

//html render
function renderToy(toy) {
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.dataset.id = toy.id
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>`
  toyCollectionDiv.append(toyCard)
}

function renderAllToys(toyArray) {
  toyArray.forEach(renderToy)
}

//fetch requests
function getAllToys() {
  return fetch("http://localhost:3000/toys")
  .then(response => response.json())
}

//event listeners

//event handlers

//initialization
function initialize() {
  getAllToys()
    .then(toyArray => {
      renderAllToys(toyArray)
    })
    .catch(errors => {
      alert("Failed to grab all toys :(")
    })
}

//**************** invoke functions ****************
initialize()