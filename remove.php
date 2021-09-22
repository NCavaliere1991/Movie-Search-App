<?php

$j = file_get_contents('watchlist.json');
$j = json_decode($j, true);
$delete = $_REQUEST['data'];
unset($j[$delete]);
$j = json_encode($j);
file_put_contents('watchlist.json', $j);

?>