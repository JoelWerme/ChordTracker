// let char = document.querySelector("#char")

getData()

function getData(){
for(let i = 1; i <= 9; i++){
  fetch("https://swapi.dev/api/people/?page=" + i)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      for(let i = 0; i < data.results.length; i++){
        console.log(data.results[i].name)
        char.append(printChar(data.results[i].name, data.results[i].films))
      }
    })
    .catch(err =>{
      console.error(err)
    })
  }
}

function printChar(name, films){
  let charContainer = document.createElement("div")
  charContainer.classList.add("char-container")
  let charName = document.createElement("div")
  let charFilms = document.createElement("div")
  charFilms.innerText = films
  charName.innerText = name
  charContainer.append(charName, charFilms)

  return charContainer
}