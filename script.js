let appRoot = document.querySelector("#container")

getData()

function getData(){
for(let i = 1; i <= 9; i++){
  fetch("https://swapi.dev/api/people/?page=" + i)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      for(let i = 0; i < data.results.length; i++){
        console.log(data.results[i].name)
        console.log(data.results[i].films)
        generateChar(data.results[i].name, data.results[i].films)
      }
    })
    .catch(err =>{
      console.error(err)
    })
  }
}

function generateChar(name, films){
  let container = document.createElement("div")
  container.classList.add("container")
  let charHeader = document.createElement("h2")
  charHeader.innerText = name
  container.append(charHeader)

  for(let i = 0; i < films.length; i++){
    fetch(films[i])
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let charFilms = document.createElement("p")
      charFilms.innerText = data.title
      container.append(charFilms)
    }
  )}

  appRoot.append(container)
}