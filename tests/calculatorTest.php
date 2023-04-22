<?php
require 'vendor/autoload.php';

use App\Calculator;

class calculatorTest extends PHPUnit\Framework\TestCase
{
    /**
     * @covers Calculator\BasicCalculator
     */
    public function testAdd()
    {
        $this->assertEquals(Calculator::add(1, 2), 3.0);
    }
}
