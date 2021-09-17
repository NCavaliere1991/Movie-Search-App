<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Movie App</title>
    <link rel="stylesheet" href="./styles.css">
</head>

<body>
    <nav>
        <div class="navbar">
            <h2>Watchlist</h2>
            <form id="movieForm">
                <input class="search" type="text" id="search" placeholder="Search">
            </form>
        </div>
        <div class="buttons">
            <a href="index.html"><button>Home</button></a>
            <a href="watchlist.php"><button>Watchlist</button></a>
        </div>
    </nav>

    <section id="mainContent">
    </section>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="ajax.js"></script>

</body>

</html>