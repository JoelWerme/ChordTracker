let appRoot = document.querySelector("#container")
appRoot.classList.add("app-root")

//effects
let progressRight = document.querySelector("#progressbar-right")
let totalHeight = document.body.scrollHeight - window.innerHeight
let progressLeft = document.querySelector("#progressbar-left")
let totalHeightLeft = document.body.scrollHeight - window.innerHeight
window.onscroll = function(){
  let progressHeight = (-window.pageYOffset / totalHeight) * 10
  progressRight.style.height = progressHeight + "%"
  let progressHeightLeft = (-window.pageYOffset / totalHeight) * 10
  progressLeft.style.height = progressHeightLeft + "%"
  console.log(progressHeightLeft)
  console.log(progressHeight)
}

//content
getData()

function getData(){
for(let i = 1; i <= 9; i++){
  fetch("https://swapi.dev/api/people/?page=" + i)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      for(let i = 0; i < data.results.length; i++){
        generateChar(
          data.results[i].name, 
          data.results[i].films,
          data.results[i].homeworld
          )
      }
    })
    .catch(err =>{
      console.error(err)
    })
  }
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
  charHeader.append(fetchHome(homeworld))
  container.append(charHeader)
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