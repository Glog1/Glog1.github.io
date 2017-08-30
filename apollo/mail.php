<?php

$recepient = "youmail@ya.ru";
$sitename = "Apollo";

$email = trim($_GET["email"]);
$subj = trim($_GET["subj"]);
$message = trim($_GET["message"]);

$pagetitle = "New message from the site  \"$sitename\"";
$message = " Email: $email\Subject: $subj \Message‚: $message";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");