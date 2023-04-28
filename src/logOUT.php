<?php

namespace APP;

class logOUT
{

    public static function logOUT()
    {
        session_start();
        session_unset();
        session_destroy();
        header("Location: signin.html");
    }
}


session_start();
session_unset();
session_destroy();
header("Location: signin.html");
