<?php
require 'vendor/autoload.php';

use App\logOUT;

class logOUTTest extends PHPUnit\Framework\TestCase
{
    /**
     * @covers App\Calculator
     */
    public function testlogOUT()
    {
        $this->assertEquals(logOUT::logOUT(), null);
    }
}
