<?php
    $returnResponse = $_REQUEST['returnResponse'];
    sleep(1);
    if ($returnResponse != "") {
        header('HTTP/1.0 '.$returnResponse.' Server status', true, $returnResponse);
        echo '{success:false, message:"Faked error from server", errors:{"photo-path":"The server returned this"}}';
    } else {
        $file = $_FILES['photo-path'];
        $fileName = $file['name'];
        $fileSize = $file['size'];
        if (!$fileSize) {
            $fileSize = $_SERVER['CONTENT_LENGTH'];
        }

        echo json_encode(array(
            "success" => true,
            "fileName" => $fileName,
            "fileSize" => $fileSize
        ));
    }
?>