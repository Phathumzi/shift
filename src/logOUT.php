<?php


function logOUT()
{
    session_start();
    session_unset();
    session_destroy();
    header("Location: signin.html");
}



logOUT();
