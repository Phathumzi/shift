<?php
require 'vendor/autoload.php';



class loginTest extends PHPUnit\Framework\TestCase
{
    /**
     * @covers App\Calculator
     */
    public function testlogin()
    {
        $this->assertEquals(logOUT(1, 1), 0);
    }
    /**
     * @covers App\Calculator
     */
}
