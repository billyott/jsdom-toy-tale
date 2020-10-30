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
const newToyForm = document.querySelector(".add-toy-form")

//**************** define functions ****************

//html render
function renderToy(toy) {
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.dataset.id = toy.id
  toyCard.dataset.likes = toy.likes
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

function createToy(toyObj) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObj)
  })
    .then(response => response.json())
}

function updateLikes(toyId, toyLikeCount) {
  return fetch(`http://localhost:3000/toys/${toyId}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": `${toyLikeCount + 1}` 
    })
    .then(response => response.json())
  }
}

//event listeners
newToyForm.addEventListener('submit', handleNewToyFormSubmit)
toyCollectionDiv.addEventListener('click', handleIncreaseLikes)

//event handlers
function handleNewToyFormSubmit(e) {
  e.preventDefault()
  const newToyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }

  createToy(newToyObj)
    .then(toyObj => {
      if (toyObj.name) {
        renderToy(toyObj)
      } else {
        alert("Shoot. Something went wrong :(")
      }˚≤ ,
    })
  
  e.target.reset()
}

function handleIncreaseLikes(e) {
  if (e.target.matches(".like-btn")) {
    const toyId = e.target.closest(".card").dataset.id
    const currentLikes = parseInt(e.target.closest(".card").dataset.likes)
    // updateLikes(toyId, currentLikes)

  }
}

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