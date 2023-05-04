<?php
require 'vendor/autoload.php';



class loginTest extends PHPUnit\Framework\TestCase
{
    /**
     * @covers App\Calculator
     */
    public function testlogin()
    {
        $this->assertEquals(logOUT(), 0);
    }
    /**
     * @covers App\Calculator
     */
}
