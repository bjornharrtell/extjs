<?php
require('config.php');

header('Content-Type: text/javascript');

$API = get_extdirect_api('api');

# convert API config to Ext Direct spec
$actions = array();
foreach($API as $aname=>&$a){
	$methods = array();
	foreach($a['methods'] as $mname=>&$m){
	    if (isset($m['len'])) {
		    $md = array(
			    'name'=>$mname,
			    'len'=>$m['len']
		    );
		} else {
		    $md = array(
		        'name'=>$mname,
		        'params'=>$m['params']
		    );
		}
		if(isset($m['formHandler']) && $m['formHandler']){
			$md['formHandler'] = true;
		}
		
		if (isset($m['metadata'])) {
		    $md['metadata'] = $m['metadata'];
		}
		$methods[] = $md;
	}
	$actions[$aname] = $methods;
}

$cfg = array(
    'url'=>'data/direct/router.php',
    'type'=>'remoting',
	'actions'=>$actions
);

echo 'var Ext = Ext || {}; Ext.REMOTING_API = ';

echo json_encode($cfg);
echo ';';

?>
