<?php

$recepient = "youmail@ya.ru";
$sitename = "Bodo";

$name = trim($_GET["name"]);
$email = trim($_GET["email"]);
$message = trim($_GET["message"]);

$pagetitle = "New message from the site  \"$sitename\"";
$message = "Name: $name \Email: $email \Message‚: $message";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");