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
        $this->assertEquals(pastgames::getTable(), null);
    }
}
