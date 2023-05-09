<?php
require 'vendor/autoload.php';

use App\Calculator2;

class calculator2Test extends PHPUnit\Framework\TestCase
{
    /**
     * @covers App\Calculator
     */
    public function testAdd()
    {
        $this->assertEquals(Calculator2::add(1, 2), 3.0);
    }
    /**
     * @covers App\Calculator
     */
}
