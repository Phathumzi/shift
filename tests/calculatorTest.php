<?php
require 'vendor/autoload.php';

use Calculator\BasicCalculator;

class calculatorTest extends PHPUnit\Framework\TestCase
{
    /**
     * @covers Calculator\BasicCalculator
     */
    public function testAdd()
    {
        $this->assertEquals(BasicCalculator::add(1, 2), 3.0);
    }
}
