const charactersContainer = document.getElementById("characters-container");

// Fetch data from Rick and Morty API
fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        // Process the characters from the API response
        data.results.forEach(character => {
            const card = document.createElement("div");
            card.className = "card";
            charactersContainer.appendChild(card);
            card.innerHTML = `
                <img src="${character.image}" alt="${character.name}" class="character-image">
                <p class="character-detail"><span class="attribute">Name:</span> ${character.name}</p>
                <p class="character-detail"><span class="attribute">Status:</span> ${character.status}</p>
                <p class="character-detail"><span class="attribute">Species:</span> ${character.species}</p>
            `;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        charactersContainer.innerHTML = '<p>Error loading characters. Please try again later.</p>';
    });