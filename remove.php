<?php

$j = file_get_contents('watchlist.json');
$j = json_decode($j, true);
$delete = $_REQUEST['data'];
foreach ($j as $k => $v) {
    if ($v == $delete) {
        unset($j[$k]);
    };
}
$j = json_encode($j);
file_put_contents('watchlist.json', $j);

?>