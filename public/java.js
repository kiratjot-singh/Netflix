// // java.js

// const apiKey = '45064565cb316c73d2dffacb1d07a7eb'; // 🔑 Replace this with your TMDB API key
// const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     // Get the first movie from the list
//     const movie = data.results[0]; 

//     // Select HTML elements
//     const titleElement = document.getElementById('movie-title');
//     const overviewElement = document.getElementById('movie-overview');

//     // Update text content
//     titleElement.textContent = movie.title;
//     overviewElement.textContent = movie.overview;
//   })
//   .catch(error => {
//     console.error("Error fetching movie data:", error);
//     document.getElementById('movie-title').textContent = "Error loading movie.";
//     document.getElementById('movie-overview').textContent = "Please check your API key or network.";
//   });
// const apiKey = '19fae50f'; // 🔑 Replace with your OMDb API key
// const heroTitle = document.getElementById('movie-title');
// const heroOverview = document.getElementById('movie-overview');
// const popularContainer = document.getElementById('popular-movies');
// const input_movie=document.getElementById('input_movie').value.trim()
// const searchMovies = async (query) => {
//   const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
//   const data = await res.json();
//   return data.Search || [];
// };

// const fetchMovieDetails = async (imdbID) => {
//   const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`);
//   const data = await res.json();
//   return data;
// };

// const loadHeroMovie = (movie) => {
//   document.querySelector('.hero').style.backgroundImage = `url(${movie.Poster})`;
//   heroTitle.textContent = movie.Title;
//   heroOverview.textContent = movie.Plot;
// };

// const displayPopularMovies = (movies) => {
//   movies.forEach(async (movie) => {
//     const details = await fetchMovieDetails(movie.imdbID);
//     const img = document.createElement('img');
//     img.src = details.Poster;
//     img.alt = details.Title;
//     img.style.width = '150px';
//     img.style.margin = '10px';
//     img.style.cursor = 'pointer';
//     img.addEventListener('click', () => loadHeroMovie(details));
//     popularContainer.appendChild(img);
//   });
// };

// // Start
// (async () => {
//   const movies = await searchMovies("Avengers"); // You can change the keyword
//   if (movies.length > 0) {
//     const firstMovie = await fetchMovieDetails(movies[0].imdbID);
//     loadHeroMovie(firstMovie);       // Set hero
//     displayPopularMovies(movies);    // Show posters
//   } else {
//     popularContainer.innerHTML = '<p>No movies found.</p>';
//   }
// })();
async function search() {
  const movieName = document.getElementById("movieInput").value.trim();
  const movieDetails = document.getElementById("movieDetails");

  if (!movieName) {
    movieDetails.innerHTML = "<p>Please enter a movie name.</p>";
    movieDetails.style.display = "block";
    return;
  }

  const apiKey = "19fae50f"; // Replace with your OMDb key
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      const videoBox = document.getElementById("video-player");
        const trailer = document.getElementById("trailer-video");

      

      movieDetails.innerHTML = `
       
        <img src="${data.Poster}" alt="${data.Title} poster">
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
        <button id="watch-trailer">🎬 Watch Trailer</button>
     
        
      `;
      trailer.currentTime = 0;
         trailer.play();
        videoBox.style.display = "block";

     
    } else {
      movieDetails.innerHTML = `<p>${data.Error}</p>`;
    }

    movieDetails.style.display = "block";
  } catch (error) {
    movieDetails.innerHTML = `<p>Error fetching movie data.</p>`;
    movieDetails.style.display = "block";
    console.error(error);
  }
}

const apiKey = '19fae50f'; // Replace with your OMDb API key
const trendingContainer = document.getElementById('trending-movies');

const fetchTrendingMovies = async (query) => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
};

const renderTrendingMovies = async () => {
  const trendingMovies = await fetchTrendingMovies("Marvel"); // use "Batman", "Spider", etc.
  
  
  trendingContainer.innerHTML = ''; // clear previous
  trendingMovies.forEach(movie => {
    if (movie.Poster !== "N/A") {
      const img = document.createElement('img');
      img.src = movie.Poster;
      img.alt = movie.Title;
      trendingContainer.appendChild(img);
      img.addEventListener('click', async () => {
        const videoBox = document.getElementById("video-player");
        const trailer = document.getElementById("trailer-video");

        const details = await fetchMovieDetails(movie.imdbID);
        movieDetails.classList.add('active');
        movieDetails.innerHTML = `
        <img src="${details.Poster}" alt="${details.Title} poster">
          <h3>${details.Title} (${details.Year})</h3>
          <p><strong>Rated:</strong> ${details.Rated}</p>
          <p><strong>Genre:</strong> ${details.Genre}</p>
          <p><strong>Director:</strong> ${details.Director}</p>
          <p><strong>Actors:</strong> ${details.Actors}</p>
          <p><strong>Plot:</strong> ${details.Plot}</p>
          <p><strong>IMDb Rating:</strong> ${details.imdbRating}</p>
        `;
         trailer.currentTime = 0;
         trailer.play();
        videoBox.style.display = "block";
        movieDetails.scrollIntoView({ behavior: 'smooth' });
    })
  }});
};
const fetchMovieDetails = async (imdbID) => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`);
  const data = await res.json();
  return data;
};

renderTrendingMovies();
const topContainer = document.getElementById('toprated movies');

// const fetchtopmovies = async (query) => {
//   const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
//   const data = await res.json();
//   return data.Search || [];
// };

const renderTopmovies = async () => {
  const topmovies = await fetchTrendingMovies("Spider"); // use "Batman", "Spider", etc.
  
  topContainer.innerHTML = ''; // clear previous
  topmovies.forEach(movie => {
    if (movie.Poster !== "N/A") {
      const img = document.createElement('img');
      img.src = movie.Poster;
      img.alt = movie.Title;
      topContainer.appendChild(img);
      img.addEventListener('click', async () => {
        const videoBox = document.getElementById("video-player");
        const trailer = document.getElementById("trailer-video");
        const details = await fetchMovieDetails(movie.imdbID);
        movieDetails.classList.add('active');
        movieDetails.innerHTML = `
        <img src="${details.Poster}" alt="${details.Title} poster">
          <h3>${details.Title} (${details.Year})</h3>
          <p><strong>Rated:</strong> ${details.Rated}</p>
          <p><strong>Genre:</strong> ${details.Genre}</p>
          <p><strong>Director:</strong> ${details.Director}</p>
          <p><strong>Actors:</strong> ${details.Actors}</p>
          <p><strong>Plot:</strong> ${details.Plot}</p>
          <p><strong>IMDb Rating:</strong> ${details.imdbRating}</p>
        `;
        trailer.currentTime = 0;
         trailer.play();
        videoBox.style.display = "block";
        movieDetails.scrollIntoView({ behavior: 'smooth' });})
    }
  });
};

renderTopmovies();




