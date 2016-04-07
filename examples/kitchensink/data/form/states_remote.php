<?php
// This script was created for demonstrating remote querying for the first combobox example
// in examples/form/combos.html. It doesn't take into account start or limit or any other
// querystring param, but it could be easily extended to do so.
//                                      Name              Nickname                    Population   GDP (million$)
$states = array(
    "Alabama"        => array(0,  "AL", "Alabama",        "The Heart of Dixie",          4849377,  180727),
    "Alaska"         => array(1,  "AK", "Alaska",         "The Land of the Midnight Sun", 736732,   51542),
    "Arkansas"       => array(2,  "AR", "Arkansas",       "The Natural State",           2966369,  115745),
    "Arizona"        => array(3,  "AZ", "Arizona",        "The Grand Canyon State",      6731484,  261924),
    "California"     => array(4,  "CA", "California",     "The Golden State",           38802500, 2050693),
    "Colorado"       => array(5,  "CO", "Colorado",       "The Mountain State",          5355866,  273721),
    "Connecticut"    => array(6,  "CT", "Connecticut",    "The Constitution State",      3596677,  233996),
    "Delaware"       => array(7,  "DE", "Delaware",       "The First State",              935614,   58028),
    "Florida"        => array(8,  "FL", "Florida",        "The Sunshine State",         19893297,  750511),
    "Georgia"        => array(9,  "GA", "Georgia",        "The Peach State",            10097343,  424606),
    "Hawaii"         => array(10, "HI", "Hawaii",         "The Aloha State",             1419561,   70110),
    "Idaho"          => array(11, "ID", "Idaho",          "Famous Potatoes",             1634464,   57029),
    "Illinois"       => array(12, "IL", "Illinois",       "The Prairie State",          12880580,  671407),
    "Indiana"        => array(13, "IN", "Indiana",        "The Hospitality State",       6596855,  294212),
    "Iowa"           => array(14, "IA", "Iowa",           "The Corn State",              3107126,  150512),
    "Kansas"         => array(15, "KS", "Kansas",         "The Sunflower State",         2904021,  132153),
    "Kentucky"       => array(16, "KY", "Kentucky",       "The Bluegrass State",         4413457,  170667),
    "Louisiana"      => array(17, "LA", "Louisiana",      "The Bayou State",             4649676,  222008),
    "Maine"          => array(18, "ME", "Maine",          "The Pine Tree State",         1330089,   51163),
    "Maryland"       => array(19, "MD", "Maryland",       "Chesapeake State",            5976407,  322234),
    "Massachusetts"  => array(20, "MA", "Massachusetts",  "The Spirit of America",       6745408,  420748),
    "Michigan"       => array(21, "MI", "Michigan",       "Great Lakes State",           9909877,  408218),
    "Minnesota"      => array(22, "MN", "Minnesota",      "North Star State",            5457173,  289125),
    "Mississippi"    => array(23, "MS", "Mississippi",    "Magnolia State",              2994079,   96979),
    "Missouri"       => array(24, "MO", "Missouri",       "Show Me State",               6063589,  258135),
    "Montana"        => array(25, "MT", "Montana",        "Big Sky Country",             1023579,   39846),
    "Nebraska"       => array(26, "NE", "Nebraska",       "Beef State",                  1881503,   98250),
    "Nevada"         => array(27, "NV", "Nevada",         "Silver State",                2839099,  123903),
    "New Hampshire"  => array(28, "NH", "New Hampshire",  "Granite State",               1326813,   64118),
    "New Jersey"     => array(29, "NJ", "New Jersey",     "Garden State",                8938175,  509067),
    "New Mexico"     => array(30, "NM", "New Mexico",     "Land of Enchantment",         2085572,   84310),
    "New York"       => array(31, "NY", "New York",       "Empire State",               19746227, 1226619),
    "North Carolina" => array(32, "NC", "North Carolina", "First in Freedom",            9943964,  439672),
    "North Dakota"   => array(33, "ND", "North Dakota",   "Peace Garden State",           739482,   49772),
    "Ohio"           => array(34, "OH", "Ohio",           "The Heart of it All",        11594163,  526196),
    "Oklahoma"       => array(35, "OK", "Oklahoma",       "Oklahoma is OK",              3878051,  164303),
    "Oregon"         => array(36, "OR", "Oregon",         "Pacific Wonderland",          3970239,  211241),
    "Pennsylvania"   => array(37, "PA", "Pennsylvania",   "Keystone State",             12787209,  603872),
    "Rhode Island"   => array(38, "RI", "Rhode Island",   "Ocean State",                 1055173,   49962),
    "South Carolina" => array(39, "SC", "South Carolina", "Nothing Could be Finer",      4832482,  172176),
    "South Dakota"   => array(40, "SD", "South Dakota",   "Great Faces, Great Places",    853175,   41142),
    "Tennessee"      => array(41, "TN", "Tennessee",      "Volunteer State",             6549352,  269602),
    "Texas"          => array(42, "TX", "Texas",          "Lone Star State",            26956958, 1387598),
    "Utah"           => array(43, "UT", "Utah",           "Salt Lake State",             2942902,  131017),
    "Vermont"        => array(44, "VT", "Vermont",        "Green Mountain State",         626562,   27723),
    "Virginia"       => array(45, "VA", "Virginia",       "Mother of States",            8326289,  426423),
    "Washington"     => array(46, "WA", "Washington",     "Green Tree State",            7061530,  381017),
    "West Virginia"  => array(47, "WV", "West Virginia",  "Mountain State",              1850326,   68541),
    "Wisconsin"      => array(48, "WI", "Wisconsin",      "America's Dairyland",         5757564,  264126),
    "Wyoming"        => array(49, "WY", "Wyoming",        "Like No Place on Earth",       584153,   39538)
);

$filters = $_GET['filter'];
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
