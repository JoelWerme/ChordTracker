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
        generateChar(data.results[i].name)
        // char.append(printChar(data.results[i].name, data.results[i].films,
        //   fetch(data.results[i].films)
        //     .then((response) => response.json())
        //     .then((data) => {console.log(data) 
        //       char.append(printChar(data.title))
        //     }))
        // )
      }
    })
    .catch(err =>{
      console.error(err)
    })
  }
}

function generateChar(name){
  let charHeader = document.createElement("h2")
  charHeader.innerText = name
  appRoot.append(charHeader)
}

// function printChar(name, films, title){
//   let charContainer = document.createElement("div")
//   charContainer.classList.add("char-container")
//   let charName = document.createElement("div")
//   let charFilms = document.createElement("div")
//   let filmsTitle = document.createElement("div")
//   filmsTitle.innerText = title
//   charFilms.innerText = films
//   charName.innerText = name
//   charContainer.append(charName, charFilms, filmsTitle)
//   return charContainer
// }