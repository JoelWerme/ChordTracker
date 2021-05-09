let appRoot = document.querySelector("#container")
appRoot.classList.add("app-root")

//effects
let progress = document.querySelector("#progressbar")
let totalHeight = document.body.scrollHeight - window.innerHeight
window.onscroll = function(){
  let progressHeight = (-window.pageYOffset / totalHeight) * 4
  progress.style.height = progressHeight + "%"
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
  let charHeader = document.createElement("div")
  charHeader.innerText = name
  let filmsHeader = document.createElement("div")
  filmsHeader.innerText = "Appearances: "
  //add content to container
  charHeader.append(fetchHome(homeworld))
  container.append(charHeader)
  filmsHeader.append(fetchFilms(films))
  container.append(filmsHeader)
  console.log(container)
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
    console.log(charHome)
  })
  return charHome
}