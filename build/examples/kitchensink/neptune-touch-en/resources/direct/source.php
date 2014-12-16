<?php

$PATHS = array(
    'api'        => 'api.php',
    'config'     => 'config.php',
    'poll'       => 'poll.php',
    'router'     => 'router.php',
    'profile'    => 'classes/Profile.php',
    'testaction' => 'classes/TestAction.php'
);

if (isset($_GET['file'])) {
    $path = $PATHS[$_GET['file']];
    
    $contents = file_get_contents($path);
    
    header('Content-Type: application/x-php');
    
    print $contents;
}
else {
    die("Invalid request.");
}

?>
