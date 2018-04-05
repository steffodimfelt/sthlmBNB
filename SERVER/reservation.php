<?php
include 'config.php';
// En PHP-Fil som tar emot data
$response = file_get_contents("php://input");

// Skicka tillbaka response-info för att testa
//echo $response;

// Omvandla JSON till ett PHP-Objekt
$request = json_decode($response);

$reservation_email = $request->reservation_email;

$query = "SELECT * FROM sthlmBNB_reservation WHERE reservation_email='$reservation_email'";

$table = mysqli_query($conn, $query) 
    or die(mysqli_error($conn)); 

$temparray = array();
while($row = $table-> fetch_assoc()){
    $temparray[] = $row;
    
}

$string =json_encode($temparray, JSON_UNESCAPED_UNICODE) ;
echo $string;
?>
