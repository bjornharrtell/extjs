<?php
// This script was created for demonstrating remote querying for the first combobox example
// in examples/form/combos.html. It doesn't take into account start or limit or any other
// querystring param, but it could be easily extended to do so.

$states = array(
    "Alabama"        => array(0,  "AL", "Alabama", "The Heart of Dixie"),
    "Alaska"         => array(1,  "AK", "Alaska", "The Land of the Midnight Sun"),
    "Arkansas"       => array(2,  "AR", "Arkansas", "The Natural State"),
    "Arizona"        => array(3,  "AZ", "Arizona", "The Grand Canyon State"),
    "California"     => array(4,  "CA", "California", "The Golden State"),
    "Colorado"       => array(5,  "CO", "Colorado", "The Mountain State"),
    "Connecticut"    => array(6,  "CT", "Connecticut", "The Constitution State"),
    "Delaware"       => array(7,  "DE", "Delaware", "The First State"),
    "Florida"        => array(8,  "FL", "Florida", "The Sunshine State"),
    "Georgia"        => array(9,  "GA", "Georgia", "The Peach State"),
    "Hawaii"         => array(10, "HI", "Hawaii", "The Aloha State"),
    "Idaho"          => array(11, "ID", "Idaho", "Famous Potatoes"),
    "Illinois"       => array(12, "IL", "Illinois", "The Prairie State"),
    "Indiana"        => array(13, "IN", "Indiana", "The Hospitality State"),
    "Iowa"           => array(14, "IA", "Iowa", "The Corn State"),
    "Kansas"         => array(15, "KS", "Kansas", "The Sunflower State"),
    "Kentucky"       => array(16, "KY", "Kentucky", "The Bluegrass State"),
    "Louisiana"      => array(17, "LA", "Louisiana", "The Bayou State"),
    "Maine"          => array(18, "ME", "Maine", "The Pine Tree State"),
    "Maryland"       => array(19, "MD", "Maryland", "Chesapeake State"),
    "Massachusetts"  => array(20, "MA", "Massachusetts", "The Spirit of America"),
    "Michigan"       => array(21, "MI", "Michigan", "Great Lakes State"),
    "Minnesota"      => array(22, "MN", "Minnesota", "North Star State"),
    "Mississippi"    => array(23, "MS", "Mississippi", "Magnolia State"),
    "Missouri"       => array(24, "MO", "Missouri", "Show Me State"),
    "Montana"        => array(25, "MT", "Montana", "Big Sky Country"),
    "Nebraska"       => array(26, "NE", "Nebraska", "Beef State"),
    "Nevada"         => array(27, "NV", "Nevada", "Silver State"),
    "New Hampshire"  => array(28, "NH", "New Hampshire", "Granite State"),
    "New Jersey"     => array(29, "NJ", "New Jersey", "Garden State"),
    "New Mexico"     => array(30, "NM", "New Mexico", "Land of Enchantment"),
    "New York"       => array(31, "NY", "New York", "Empire State"),
    "North Carolina" => array(32, "NC", "North Carolina", "First in Freedom"),
    "North Dakota"   => array(33, "ND", "North Dakota", "Peace Garden State"),
    "Ohio"           => array(34, "OH", "Ohio", "The Heart of it All"),
    "Oklahoma"       => array(35, "OK", "Oklahoma", "Oklahoma is OK"),
    "Oregon"         => array(36, "OR", "Oregon", "Pacific Wonderland"),
    "Pennsylvania"   => array(37, "PA", "Pennsylvania", "Keystone State"),
    "Rhode Island"   => array(38, "RI", "Rhode Island", "Ocean State"),
    "South Carolina" => array(39, "SC", "South Carolina", "Nothing Could be Finer"),
    "South Dakota"   => array(40, "SD", "South Dakota", "Great Faces, Great Places"),
    "Tennessee"      => array(41, "TN", "Tennessee", "Volunteer State"),
    "Texas"          => array(42, "TX", "Texas", "Lone Star State"),
    "Utah"           => array(43, "UT", "Utah", "Salt Lake State"),
    "Vermont"        => array(44, "VT", "Vermont", "Green Mountain State"),
    "Virginia"       => array(45, "VA", "Virginia", "Mother of States"),
    "Washington"     => array(46, "WA", "Washington", "Green Tree State"),
    "West Virginia"  => array(47, "WV", "West Virginia", "Mountain State"),
    "Wisconsin"      => array(48, "WI", "Wisconsin", "America's Dairyland"),
    "Wyoming"        => array(49, "WY", "Wyoming", "Like No Place on Earth")
);

$query = $_GET['q'];
$queryRe = '/^' . $query . '/i';
$found = array();

function filter_states($val, $i) {
    if (strlen($GLOBALS['query']) === 0 || preg_match($GLOBALS['queryRe'], $i)) {
        array_push($GLOBALS['found'], $GLOBALS['states'][$i]);
    }
}

array_walk($states, "filter_states");

echo json_encode(array(
    "total" => count($found),
    "data" => $found
));

?>
