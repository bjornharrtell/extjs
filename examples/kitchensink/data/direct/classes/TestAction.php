<?php

class TestAction {
    function doEcho($data){
        return $data;
    }

    function multiply($num){
        if(!is_numeric($num)){
            throw new Exception('Call to multiply with a value that is not a number');
        }
        return $num*8;
    }

    function getTree($id){
        $out = array();
        if($id == "root"){
        	for($i = 1; $i <= 5; ++$i){
        	    array_push($out, array(
        	    	'id'=>'n' . $i,
        	    	'text'=>'Node ' . $i,
        	    	'leaf'=>false
        	    ));
        	}
        }else if(strlen($id) == 2){
        	$num = substr($id, 1);
        	for($i = 1; $i <= 5; ++$i){
        	    array_push($out, array(
        	    	'id'=>$id . $i,
        	    	'text'=>'Node ' . $num . '.' . $i,
        	    	'leaf'=>true
        	    ));
        	}
        }
        return $out;
    }
    
    function getGrid($params, $metadata){
        $sort = $params->sort[0];
        $field = $sort->property;
        $direction = $sort->direction;
        
        $table = $metadata->table;
        
        if ($table == 'customers') {
            $data = array(
                array(
                    'name'=>'ABC Accounting',
                    'revenue'=>50000
                ), array(
                    'name'=>'Ezy Video Rental',
                    'revenue'=>106300
                ), array(
                    'name'=>'Greens Fruit Grocery',
                    'revenue'=>120000
                ), array(
                    'name'=>'Icecream Express',
                    'revenue'=>73000
                ), array(
                    'name'=>'Ripped Gym',
                    'revenue'=>88400
                ), array(
                    'name'=>'Smith Auto Mechanic',
                    'revenue'=>222980
                )
            );
        }
        elseif ($table == 'leads') {
            $data = array(
                array(
                    'name' => 'AT&T Inc.',
                    'revenue' => 10000000
                ), array(
                    'name' => 'General Electric',
                    'revenue' => 5000000
                ), array(
                    'name' => 'Intel Corporation',
                    'revenue' => 150000000
                ), array(
                    'name' => 'Verizon Communications',
                    'revenue' => 3000000
                )
            );
        }
        else {
            throw new Exception("Wrong table: $table");
        }
        
        function sort_fn($property) {
            $fn_text = "return strnatcmp(\$a['$property'], \$b['$property']);";
    
            return create_function('$a, $b', $fn_text);
        }

        usort($data, sort_fn($field));
        
        if ($direction == 'DESC') {
            $data = array_reverse($data);
        }
        
        return $data;
    }
    
    function showDetails($data){
        $first = $data->firstName;
        $last = $data->lastName; 
        $age = $data->age;
        return "Hi $first $last, you are $age years old.";
    }
}

?>
