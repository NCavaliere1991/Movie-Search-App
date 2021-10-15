const apiKey = "api_key=645b84c0424790ef23fda061c7c0aa17";
const baseURL = "https://api.themoviedb.org/3";
const detailURL = baseURL + "/movie/";
const imgURL = "https://image.tmdb.org/t/p/w500";
const content = document.getElementById("mainContent");

function findMovies(url) {
    fetch(url).then(res => res.json()).then(data => showMovies(data));
}

function showMovies(data) {
    const newMovie = document.createElement('div');
    newMovie.classList.add("movie-container", `i${data.id}`);
    newMovie.innerHTML = `<img
        src="${imgURL + data.poster_path}" alt="${data.title}" />
        <div class="description">
        <h4 class="overview">${data.overview}</h4>
        <button class="removeButton">Remove from Watchlist</button>
        </div>
    <div class="info">
        <h3>${data.title}</h3>
        <span class=${getRating(data.vote_average)}>${data.vote_average}</span>
    </div>`
    content.appendChild(newMovie);
    let removeButton = document.getElementsByClassName("removeButton");
    for (y in removeButton) {
        removeButton[y].onclick = function () {
            let x = this.parentElement.parentElement.classList[1];
            x = x.replace("i", "");
            x = Number(x);
            $.ajax({
                url: "remove.php",
                type: "POST",
                data: { data: x },
                // cache: false,
                // contentType: false,
                // processData: false,
                success: function () {
                    console.log("completed");
                    content.innerHTML = "";
                    $.ajax({
                        url: 'watchlist.json',
                        type: 'get',
                        dataType: 'JSON',
                        cache: false,
                        success: function (data) {
                            $.each(data, function (index, value) {
                                movie = findMovies(detailURL + `${String(value)}` + `?${apiKey}`);

                            })
                        }
                    })

                }
            })
        }
    }
};

$('document').ready(function () {
    function cardloading() {
        $.ajax({
            url: 'watchlist.json',
            type: 'get',
            dataType: 'JSON',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    movie = findMovies(detailURL + `${String(value)}` + `?${apiKey}`);

                })
            }
        })
    }
    cardloading();
});

function getRating(rating) {
    if (rating >= 8) {
        return "green"
    } else if (rating >= 5) {
        return "yellow"
    } else {
        return "red"
    }
}

