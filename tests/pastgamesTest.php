<?php
require 'vendor/autoload.php';

use App\pastgames;

class pastgamesTest extends PHPUnit\Framework\TestCase
{
    /**
     * @covers App\Calculator
     */
    public function testconn()
    {
        $this->assertNotEquals(pastgames::getTable(1, 2), 3.0);
    }
}
