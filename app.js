const apiKey = "api_key=645b84c0424790ef23fda061c7c0aa17";
const baseURL = "https://api.themoviedb.org/3";
const apiURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgURL = "https://image.tmdb.org/t/p/w500";
const content = document.getElementById("mainContent");
const searchBar = document.getElementById("movieForm");
const search = document.getElementById("search");
const addButton = document.getElementsByClassName("addButton");
const watchList = [];

var x = addButton.length;
console.log(x)

findMovies(apiURL);

function findMovies(url) {
    fetch(url).then(res => res.json()).then(data => getMovies(data.results));
}


function getMovies(data) {
    content.innerHTML = "";
    data.forEach(movie => {
        const { title, poster_path, vote_average } = movie;
        const newMovie = document.createElement('div');
        newMovie.classList.add("movie-container");
        newMovie.innerHTML = `<img
        src="${imgURL + poster_path}" alt="${title}" />
        <div class="description">
        <button class="addButton">Add to Watchlist</button>
        </div>
    <div class="info">
        <h3>${title}</h3>
        <span class=${getRating(vote_average)}>${vote_average}</span>
    </div>`
        content.appendChild(newMovie);
    })

}

function getRating(rating) {
    if (rating >= 8) {
        return "green"
    } else if (rating >= 5) {
        return "yellow"
    } else {
        return "red"
    }
}

function addItem(movie) {
    watchList.push(movie);
    console.log(watchList);
}


searchBar.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchedMovie = search.value;

    if (searchedMovie) {
        findMovies(`https://api.themoviedb.org/3/search/movie?${apiKey}&query=${searchedMovie}`)
    } else {
        findMovies(apiURL);
    }
})

