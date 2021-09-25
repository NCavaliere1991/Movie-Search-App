const apiKey = "api_key=645b84c0424790ef23fda061c7c0aa17";
let currentPage = 1;
const baseURL = "https://api.themoviedb.org/3";
const apiURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey + `&page=${currentPage}`;
const imgURL = "https://image.tmdb.org/t/p/w500";
const content = document.getElementById("mainContent");
const searchBar = document.getElementById("movieForm");
const search = document.getElementById("search");
const detailURL = baseURL + "/movie/"
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?${apiKey}&language=en-US`;
const genres = document.getElementById("genres");
let mainList = [];
let movieIds = [];

getGenres(genreUrl);
findMovies(apiURL);


function findMovies(url) {
    fetch(url).then(res => res.json()).then(data => getMovies(data.results));
}

function findMoviesByGenre(url) {
    fetch(url).then(res => res.json()).then(data => getMoviesByGenre(data.results));
}

function getMoviesByGenre(data) {
    content.innerHTML = "";
    data.forEach(movie => {
        const { title, poster_path, overview, vote_average, id } = movie;
        const genreList = movie.genre_ids;
        genreList.forEach(genre => {
            console.log(id, genre)
            if (!movieIds.includes(id) && mainList.includes(genre)) {
                movieIds.push(id)
                const newMovie = document.createElement('div');
                newMovie.classList.add("movie-container", `i${id}`);
                newMovie.innerHTML = `<img
                    src="${imgURL + poster_path}" alt="${title}" />
                    <div class="description">
                    <h4 class="overview">${overview}</h4>
                    <button class="addButton">Add to Watchlist</button>
                    </div>
                <div class="info">
                    <h3>${title}</h3>
                    <span class=${getRating(vote_average)}>${vote_average}</span>
                </div>`
                content.appendChild(newMovie);
            }
            console.log(movieIds);
        })
    })
}

function getGenres(url) {
    fetch(url).then(res => res.json()).then(data => showGenres(data.genres));
}

function getMoreMovies(url) {
    fetch(url).then(res => res.json()).then(data => getMore(data.results));
}

function showMore() {
    currentPage += 1;
    getMoreMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&" + apiKey + `&page=${currentPage}`);
}

function showGenres(data) {
    data.forEach(genre => {
        const { id, name } = genre;
        mainList.push(id);

        const newButton = document.createElement('button');
        newButton.classList.add('genreBtn')
        newButton.innerHTML = name;
        newButton.onclick = function () {
            findMoviesByGenre(`https://api.themoviedb.org/3/discover/movie?api_key=645b84c0424790ef23fda061c7c0aa17&with_genres=${id}`);
        }
        genres.append(newButton);
    })
}

function getMore(data) {
    data.forEach(movie => {
        const { title, poster_path, overview, vote_average, id } = movie;
        const newMovie = document.createElement('div');
        newMovie.classList.add("movie-container", `i${id}`);
        newMovie.innerHTML = `<img
        src="${imgURL + poster_path}" alt="${title}" />
        <div class="description">
        <h4 class="overview">${overview}</h4>
        <button class="addButton">Add to Watchlist</button>
        </div>
    <div class="info">
        <h3>${title}</h3>
        <span class=${getRating(vote_average)}>${vote_average}</span>
    </div>`
        content.appendChild(newMovie);
    })
    let addButton = document.getElementsByClassName("addButton");
    for (y in addButton) {
        addButton[y].onclick = function () {
            let x = this.parentElement.parentElement.classList[1];
            x = x.replace("i", "");
            x = Number(x);
            addButton[y].innerHTML = `<button class="removeButton">Remove from Watchlist</button>`
            $.ajax({
                url: "dh.php",
                type: "POST",
                data: { data: x },
                // cache: false,
                // contentType: false,
                // processData: false,
                success: function () {
                    console.log("completed")
                }
            });
        }
    }
}


function getMovies(data) {
    content.innerHTML = "";
    data.forEach(movie => {
        // console.log(movie);
        const { title, poster_path, overview, vote_average, id } = movie;
        const newMovie = document.createElement('div');
        newMovie.classList.add("movie-container", `i${id}`);
        newMovie.innerHTML = `<img
        src="${imgURL + poster_path}" alt="${title}" />
        <div class="description">
        <h4 class="overview">${overview}</h4>
        <button class="addButton">Add to Watchlist</button>
        </div>
    <div class="info">
        <h3>${title}</h3>
        <span class=${getRating(vote_average)}>${vote_average}</span>
    </div>`
        content.appendChild(newMovie);
    })
    let addButton = document.getElementsByClassName("addButton");
    for (y in addButton) {
        addButton[y].onclick = function () {
            let x = this.parentElement.parentElement.classList[1];
            x = x.replace("i", "");
            x = Number(x);
            addButton[y].innerHTML = `<button class="removeButton">Remove from Watchlist</button>`
            $.ajax({
                url: "dh.php",
                type: "POST",
                data: { data: x },
                // cache: false,
                // contentType: false,
                // processData: false,
                success: function () {
                    console.log("completed")
                }
            });
        }
    }
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


searchBar.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchedMovie = search.value;

    if (searchedMovie) {
        findMovies(`https://api.themoviedb.org/3/search/movie?${apiKey}&query=${searchedMovie}`)
    } else {
        findMovies(apiURL);
    }
})
