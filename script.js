document.addEventListener("DOMContentLoaded", function () {
  const characterList = document.getElementById("characterList");
  const loadCharactersButton = document.getElementById("loadCharacters");

  const locationList = document.getElementById("locationList");
  const loadLocationsButton = document.getElementById("loadLocations");

  const episodeList = document.getElementById("episodeList");
  const loadEpisodesButton = document.getElementById("loadEpisodes");

  loadCharactersButton.addEventListener("click", function () {
    toggleVisibility(characterList, loadCharactersButton, "personnages");
    fetchCharacters();
  });

  loadLocationsButton.addEventListener("click", function () {
    toggleVisibility(locationList, loadLocationsButton, "lieux");
    fetchLocations();
  });

  loadEpisodesButton.addEventListener("click", function () {
    toggleVisibility(episodeList, loadEpisodesButton, "épisodes");
    fetchEpisodes();
  });

  function toggleVisibility(list, button, type) {
    if (list.style.display === "none") {
      list.style.display = "block";
      button.textContent = `Cacher les ${type}`;
    } else {
      list.style.display = "none";
      button.textContent = `Afficher les ${type}`;
    }
  }

  function fetchCharacters() {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        const characters = data.results;

        const characterListHTML = characters
          .map(
            (character) => `
            <div>
              <img src="${character.image}" alt="${character.name}">
              <p>${character.name}</p>
              <p>Status: ${character.status}</p>
              <p>Species: ${character.species}</p>
            </div>
          `
          )
          .join("");

        document.getElementById("characterList").innerHTML = characterListHTML;
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des personnages", error)
      );
  }

  function fetchLocations() {
    fetch("https://rickandmortyapi.com/api/location")
      .then((response) => response.json())
      .then((data) => {
        const locations = data.results;

        const locationListHTML = locations
          .map(
            (location) => `
            <div>
              <p>${location.name}</p>
              <p>Type: ${location.type}</p>
              <p>Dimension: ${location.dimension}</p>
            </div>
          `
          )
          .join("");

        document.getElementById("locationList").innerHTML = locationListHTML;
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des lieux", error)
      );
  }

  function fetchEpisodes() {
    fetch("https://rickandmortyapi.com/api/episode")
      .then((response) => response.json())
      .then((data) => {
        const episodes = data.results;

        const episodeListHTML = episodes
          .map(
            (episode) => `
            <div>
              <p>${episode.name}</p>
              <p>Episode: ${episode.episode}</p>
              <p>Air Date: ${episode.air_date}</p>
            </div>
          `
          )
          .join("");

        document.getElementById("episodeList").innerHTML = episodeListHTML;
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des épisodes", error)
      );
  }
});
