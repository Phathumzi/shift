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
    public function testSubtract()
    {
        $this->assertEquals(Calculator::subtract(4, 2), 2.0);
        $this->assertEquals(Calculator::subtract(3, 2), 1.0);
    }
}
