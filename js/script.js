const API_KEY = "tgB2iDuq4I5Ny2rPwGQ7qkCwwVgwJZUP";

const gifContainer = document.querySelector("#gif-container");
const searchInput = document.querySelector("#search-input");

async function fetchGifs(searchTerm = "funny") {
  gifContainer.innerHTML = "";

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=12&rating=g`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    const images = data.data.map(gif => gif.images.original.url);

    images.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.className = "col-3 mb-3 img-fluid";
      gifContainer.appendChild(img);
    });

  } catch (error) {
    console.error("Error fetching GIFs:", error);
    gifContainer.innerHTML = "<p class='text-danger'>Failed to load GIFs. Try again later.</p>";
  }
}

searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    fetchGifs(searchInput.value.trim() || "funny");
  }
});

fetchGifs();
