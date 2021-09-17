const apiKey = "api_key=645b84c0424790ef23fda061c7c0aa17";
const baseURL = "https://api.themoviedb.org/3";
const apiURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgURL = "https://image.tmdb.org/t/p/w500";
const content = document.getElementById("mainContent");
const searchBar = document.getElementById("movieForm");
const search = document.getElementById("search");
const detailURL = baseURL + "/movie/";


findMovies(apiURL);

function findMovies(url) {
    fetch(url).then(res => res.json()).then(data => getMovies(data.results));
}

// function findOne(url) {
//     fetch(url).then(res => res.json()).then(data => console.log(data))
// }


function getMovies(data) {
    content.innerHTML = "";
    let watchList = [];
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
            // let movie = findOne(detailURL + `${String(x)}` + `?${apiKey}`)
            watchList.push(x);
            console.log(watchList)
            $.ajax({
                url: "dh.php",
                type: "POST",
                data: { data: watchList },
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