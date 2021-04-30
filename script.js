var chords = document.getElementById("chords");

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    // let inputData = document.querySelector("[data-input]").value;
    fetch("https://api.uberchord.com/v1/chords?nameLike=C")
    // + inputData
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        chords.append(chordInfo(data.Array(1).chordName));
        // for(let i = 0; i < 10; i++)
        // {
        //   chords.append(chordInfo(data.i.chordName));
        // }
        // chords.append(chordInfo(data.chords?nameLike.chordName:inputData));
      })

      .catch(err =>{
        console.error(err);
      });
    });

function chordInfo(chordName){
  let chordContainer = document.createElement("div");
  chordContainer.classList.add("chord-container");
  let chordNameStat = document.createElement("div");
  chordNameStat.innerText = chordName;
  let chordFingeringStat = document.createElement("div");
  chordContainer.append(chordNameStat, chordFingeringStat);

  return chordContainer;
}