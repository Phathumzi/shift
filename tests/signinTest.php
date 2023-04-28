<?php
require 'vendor/autoload.php';

use App\Calculator;

class CalculatorTest extends PHPUnit\Framework\TestCase
{
    /**
     * @covers App\Calculator
     */
    public function testAdd()
    {
        $this->assertEquals(Calculator::add(1, 2), 3.0);
    }
    /**
     * @covers App\Calculator
     */
    public function testSubtract()
    {
        $this->assertEquals(Calculator::subtract(3, 2), 1.0);
    }
}
