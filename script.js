let appRoot = document.querySelector("#container")
let appRootS = document.querySelector("#containerS")
appRoot.classList.add("app-root")
let chars = [];

//effects
let progress = document.querySelector("#progressbar")
let totalHeight = document.body.scrollHeight - window.innerHeight
window.onscroll = function(){
  let progressHeight = (-window.pageYOffset / totalHeight) * 17
  progress.style.height = progressHeight + "%"
}

//content
getData()
let char = 0;
function getData(){
for(let i = 1; i <= 9; i++){
  fetch("https://swapi.dev/api/people/?page=" + i)
    .then((response) => response.json())
    .then((data) => {
      for(let i = 0; i < data.results.length; i++){
        generateChar(
          data.results[i].name, 
          data.results[i].films,
          data.results[i].homeworld
          )
          chars[char] = data.results[i]
          char = char + 1
      }
    })
    .catch(err =>{
      console.error(err)
    })
  }
}

function addSearch(name, films, homeworld){
  //create container
  let container = document.createElement("div")
  container.classList.add("containerS")
  //create header with name
  let charHeader = document.createElement("h2")
  charHeader.innerText = name
  let filmsHeader = document.createElement("div")
  filmsHeader.innerText = "Appearances: "
    //add content to container
  container.append(charHeader)
  container.append(fetchHome(homeworld))
  filmsHeader.append(fetchFilms(films))
  container.append(filmsHeader)
  //add container to appRoot
  appRootS.append(container)
}

function generateChar(name, films, homeworld){
  //create container
  let container = document.createElement("div")
  container.classList.add("container")
  //create header with name
  let charHeader = document.createElement("h2")
  charHeader.innerText = name
  let filmsHeader = document.createElement("div")
  filmsHeader.innerText = "Appearances: "
  //add content to container
  container.append(charHeader)
  container.append(fetchHome(homeworld))
  filmsHeader.append(fetchFilms(films))
  container.append(filmsHeader)
  //add container to appRoot
  appRoot.append(container)
}

function fetchFilms(films){
  let filmsContainer = document.createElement("div")
  for(let i = 0; i < films.length; i++){
    fetch(films[i])
    .then((response) => response.json())
    .then((data) => {
      let charFilms = document.createElement("p")
      charFilms.classList.add("char-films")
      charFilms.innerText = data.title
      filmsContainer.append(charFilms)
    }
  )}
  return filmsContainer
}

function fetchHome(input){
let charHome = document.createElement("p")  
fetch(input)
  .then((response) => response.json())
  .then((data) => {
    charHome.innerText = "Homeworld: " + data.name
  })
  return charHome
}

window.addEventListener("scroll", function(){
  let header = document.querySelector("header")
header.classList.toggle("sticky", window.scrollY > 0)
})

//Search function is unstable, might generate too many requests, will add container at the bottom
let searchBar = document.querySelector("[data-search-bar]")
searchBar.addEventListener('submit', (event) =>{
  event.preventDefault()
  let search = document.querySelector("[data-search]").value
  let filteredChar = chars.filter((chars) => {
    return(
      chars.name.includes(search) ||
      chars.films.includes(search)
    )
  })
  for(let i = 0; i < filteredChar.length; i++){
    generateChar(
      filteredChar[i].name, 
      filteredChar[i].films,
      filteredChar[i].homeworld
      )
  }
}) 