document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let inputData = document.querySelector("[data-input]").value;
    fetch("https://api.uberchord.com/v1/chords?names=" + inputData)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        let sprite = document.createElement('p');
        sprite.setAttribute("src", data.sprites.front_default)
        document.querySelector("#chords").prepend(sprite);
        document.querySelector("[data-input]").value = "";
        document.querySelector(
          ".message"
        ).innerText = `Chord:${inputData}`;
      })
    });