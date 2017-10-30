<?php

$dbhost = '127.0.0.1';
$dbuser = "root";
$dbpass = "r00t"; //should be an empty string
$dbname = "demo";

try {
  $connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
} catch (Exception $e) {
  echo $e;
}

$read = "SELECT * from `country`";
$result = $connection->query($read);
$arrRes = array();
while ($arr = $result->fetch_assoc()) {
  $arrRes[] = $arr;
}

printAsTable($arrRes);

function printAsTable($data){
   echo "<table>".
            "<thead>".
              "<tr>".
                "<td>ID</td>".
                "<td>Country</td>".
                "<td>Population</td>".
              "</tr>".
            "</thead>";
   echo "<tbody>";
   foreach ($data as $row) {
     echo "<tr>";
     echo "<td>".$row['id']."</td>";
     echo "<td>".$row['country']."</td>";
     echo "<td>".$row['population']."</td>";
     echo "</tr>";
   }
   echo "</tbody>";
   echo "</table>";
 }




function printForm(){
  echo "<form method='post'>".
          "Name: ".
          "<input type='text' name='country' />".
          "Population".
          "<input type='text' name='population' />".
          "<input type='submit' value='Submit' />".
        "</form>";

}

printForm();


if(isset($_POST['country']) && $_POST['country'] != '' &&
    isset($_POST['population']) && $_POST['population'] != ''){

      $country = $_POST['country'];
      $population = $_POST['population'];

      $insertStatement = "INSERT into country
                          (`country`, `population`)
                          values
                          ('$country', '$population')";

      try {
        $result = $connection->query($insertStatement);
        unset($_POST);
      } catch (Exception $e) {
        echo $e;
      }

}


?>
