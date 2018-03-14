<?php

$recepient = "youmail@mail.com"; //Enter your mail
$sitename = "Site name"; //Enter the name of your site

$name = trim($_GET["name"]);
$company = trim($_GET["company"]);
$email = trim($_GET["email"]);
$message = trim($_GET["message"]);

$pagetitle = "New message from the site  \"$sitename\"";
$message = "Name: $name \Company: $company \ Email: $email \Message: $message";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");