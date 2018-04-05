<?php
include 'config.php';

$query = "SELECT * FROM `sthlmBNB_room`";

$table = mysqli_query($conn, $query) 
    or die(mysqli_error($conn)); 

$temparray = array();
while($row = $table-> fetch_assoc()){
    $temparray[] = $row;
    
}

$string =json_encode($temparray, JSON_UNESCAPED_UNICODE) ;
echo $string;
?>
