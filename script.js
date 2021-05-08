let appRoot = document.querySelector("#container")

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
  let filmsHeader = document.createElement("h3")
  filmsHeader.innerText = "Appearances: "
  //add content to container
  container.append(charHeader)
  container.append(fetchHome(homeworld))
  container.append(filmsHeader)
  container.append(fetchFilms(films))
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