<?php

  /**
   * Simple Class Example
   */
  class Point
  {
    function __construct($x, $y)
    {
      $this->x = $x;
      $this->y = $y;
    }

    function getX(){
      return $this->x;
    }

    function getY(){
      return $this->y;
    }

    function dist($p){
      $powX = pow($this->x - $p->getX(), 2);
      $powY = pow($this->y - $p->getY(), 2);
      return sqrt($powX+$powY);
    }
  }

  $p1 = new Point(2, 3);
  $p2 = new Point(3, 4);


  echo $p1->dist($p2);

?>
