<?php
include 'config.php';

// En PHP-Fil som tar emot data
$response = file_get_contents("php://input");

// Skicka tillbaka response-info för att testa
//echo $response;

// Omvandla JSON till ett PHP-Objekt
$request = json_decode($response);

// Lagra data från objektet i olika variabler
$reservation_firstname = $request->reservation_firstname;
$reservation_lastname = $request->reservation_lastname;
$reservation_email = $request->reservation_email;
$reservation_phone = $request->reservation_phone;

$reservation_room_id = $request->reservation_room_id;
$reservation_room_headline = $request->reservation_room_headline;
$reservation_adult = $request->reservation_adult;

$reservation_child = $request->reservation_child;
$reservation_arrival = $request->reservation_arrival;
$reservation_department = $request->reservation_department;

$reservation_total_days = $request->reservation_total_days;
$reservation_total_cost = $request->reservation_total_cost;
$reservation_one_cost = $request->reservation_one_cost;



$message =  "<h3>Tack $reservation_firstname för din bokning.<BR>Välkommen till oss!</h3>".
            "</p>Bokningsnummer: $reservation_room_id</p><BR>".
            "<p>Du har bokat $reservation_room_headline från $reservation_arrival till $reservation_department.</p>".
            "<p>Antal vuxna: $reservation_adult. Antal barn: $reservation_child.</p>".
            "<p>Totalt antal dagar: $reservation_total_days á $reservation_one_cost kr</p>".
            "</p>Total summa: $reservation_total_cost kr</p><BR>".
            "<p>Tack för din bokning!<BR>sthmlBNB<BR>0730-612133<BR>bokning@sthlmBNB.se</p>";

$subject = "Bokningsbekräftelse från sthlmBNB.";
$headers = "From: bokning@sthlmBNB.se";

// Skriv detta för att visa HTML-kodning
$headers = "From: bokning@sthlmBNB.se \r\n".
           "MIME-Version: 1.0" . "\r\n" .
           "Content-type: text/html; charset=UTF-8" . "\r\n";

if ($reservation_email != "") {
   mail($reservation_email , $subject, $message, $headers);
}

mysqli_set_charset($conn, "utf8");
$conn->query("INSERT INTO sthlmBNB_reservation (reservation_firstname,reservation_lastname,reservation_email,reservation_phone,reservation_room_id,reservation_room_headline,reservation_adult,reservation_child,reservation_arrival,reservation_department,reservation_total_days,reservation_total_cost,reservation_one_cost)". 
					"VALUES('$reservation_firstname','$reservation_lastname','$reservation_email','$reservation_phone','$reservation_room_id','$reservation_room_headline','$reservation_adult','$reservation_child','$reservation_arrival','$reservation_department','$reservation_total_days','$reservation_total_cost','$reservation_one_cost')");

?>
