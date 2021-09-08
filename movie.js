const apiKey = "645b84c0424790ef23fda061c7c0aa17";
const baseURL = "https://api.themoviedb.org/3";
const detailURL = baseURL + "/movie/";



function findOne(url) {
    fetch(url).then(res => res.json()).then(data => console.log(data.results));
}

