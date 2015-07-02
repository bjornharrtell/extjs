<?php

function get_extdirect_api($caller) {
    $TEST_API = array(
        'TestAction'=>array(
            'methods'=>array(
                'doEcho'=>array(
                    'len'=>1
                ),
                'multiply'=>array(
                    'len'=>1
                ),
                'getTree'=>array(
                    'len'=>1
                ),
                'getGrid'=>array(
                    'len'=>1,
                    'metadata' => array(
                        'params' => array('table')
                    )
                ),
                'showDetails'=>array(
                    'params'=>array(
                        'firstName',
                        'lastName',
                        'age'
                    )
                )
            )
        )
    );

    $FORM_API = array(
        'Profile' => array(
            'methods'=>array(
                'getBasicInfo'=>array(
                    'len'=>2
                ),
                'getPhoneInfo'=>array(
                    'len'=>1
                ),
                'getLocationInfo'=>array(
                    'len'=>1
                ),
                'updateBasicInfo'=>array(
                    'len'=>0,
                    'formHandler'=>true
                )
            )
        )
    );

    $api = null;
    
    # This demonstrates dynamic API generation based on what the client side
    # has requested from the server. In the client, we will use separate
    # Providers that handle Profile form requests and TestAction class methods.
    # Note that we only do that when called from aph.php; Router will need
    # the full API array to handle all requests.
    if ($caller == 'api') {
        if (isset($_GET['form'])) {
            $api = $FORM_API;
        }
        else {
            $api = $TEST_API;
        }
    }
    else {
        $api = array_merge($TEST_API, $FORM_API);
    }
    
    return $api;
}

?>
