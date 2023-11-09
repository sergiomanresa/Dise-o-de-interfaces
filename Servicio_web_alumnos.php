<?php
require_once 'Silgenton.php';
header('Content-Type: application/json');

$data=json_decode(file_get_contents('php://input'), true);

$action =isset($data['action'])?$data['action']:null;

$limit =$data['limit'];

// valores json
$msg=null;
$success=true;
$data =array();

switch($action){
    case "get":
        try {
            $db=DB::getInstance();

            $sql = "select * from alumno limit $limit";

            $stm=$db->prepare($sql);

            $stm->execute();

            $data=$stm->fetchAll(PDO::FETCH_ASSOC);

            $msg = "Listado de alumnos";

        }catch(Exception $e){
            $success=false;
        }
        break;
}

$json = [
    "success" => $success,
    "data" => $data
];


// Construción del JSON de respuesta
echo json_encode($json);

?>