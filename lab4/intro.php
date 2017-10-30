<?php


// variables...
$myVariable1 = "Some kinda text data";
$myVariable2 = 1;
$myVariable3 = true;

// echo $myVariable3;

// numerically indexed arrays
$numericIndexedArray[0] = "index 0"; // index 0
$numericIndexedArray[1] = "index 1";
$numericIndexedArray[] = "index ?"; // index 2
$numericIndexedArray[3] = "index 3";

$numArray[] = "slkfjdsl"; // auto inde 0
$numArray[] ="slkjhfgkds";// auto index 1


$languages = array("English", "Spanish", "French");
$languages[] = "German";

// echo $languages[3];

// key value pair arrays
$state['pos'] = "Trinidad";
$state['kingstown'] = 'Jamaica';

$languages = array('Spain' => "Spanish",
                    'Germany' => "German",
                  "United States" => "English");

// echo $languages['Spain'];
// echo "<br>";
// echo $languages['Germany'];
// echo "<br>";
// echo $languages['United States'];

foreach ($languages as $key => $value) {
  echo $key." : ".$value."<br>";
}






?>
