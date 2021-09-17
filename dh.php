<?php
$j = $_REQUEST["data"];
$j = json_encode($j);
file_put_contents('watchlist.json', $j);

?>