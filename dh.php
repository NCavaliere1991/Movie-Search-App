<?php

$j = file_get_contents('watchlist.json');
$j = json_decode($j, true);
$add = $_REQUEST['data'];
if (!in_array($add, $j)) {
    array_push($j, $add);
}
$j = json_encode($j);
file_put_contents('watchlist.json', $j);

?>