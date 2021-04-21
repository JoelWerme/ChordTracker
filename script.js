document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    fetch("https://api.uberchord.com/v1/chords?names={chordNames}")
      .then((response) => response.json())
      .then((data) => console.log(data))});