<?php
require_once 'Silgenton.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$action = isset($data['action']) ? $data['action'] : null;

$limit = isset($data['limit']) ? $data['limit'] : 10;

$dni = isset($data['dni']) ? $data['dni'] : null;

// valores json
$msg = null;
$success = true;
$responseData = array();

try {
    $db = DB::getInstance();

    switch ($action) {
        case "get":
            $sql = "select * from alumno limit $limit";
            $stm = $db->prepare($sql);
            $stm->execute();
            $responseData = $stm->fetchAll(PDO::FETCH_ASSOC);
            $msg = "Listado de alumnos";
            break;
        case "Buscar":
            $sql = "select * from alumno where dni=:dni";
            $stm = $db->prepare($sql);
            $stm->bindParam(':dni', $dni);
            $stm->execute();
            $responseData = $stm->fetchAll(PDO::FETCH_ASSOC);
            $msg = "Alumno";
            break;
        case "Eliminar":
            $alumno = new Alumno($dni);
            $success = $alumno->Delete($alumno->dni);

        default:
            $success = false;
            $msg = "Acción no válida";
    }
} catch (Exception $e) {
    $success = false;
    $msg = $e->getMessage();
}

$json = [
    "success" => $success,
    "msg" => $msg,
    "data" => $responseData
];

// Construcción del JSON de respuesta
echo json_encode($json);
?>
