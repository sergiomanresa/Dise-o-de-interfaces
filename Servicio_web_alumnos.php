<?php
require_once 'alumnos.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$action = isset($data['action']) ? $data['action'] : null;

$limit = isset($data['limit']) ? $data['limit'] : 10;
$dni = isset($data['dni']) ? $data['dni'] : null;
$nombre = isset($data['nombre']) ? $data['nombre'] : null;
$apellido_1 = isset($data['apellido_1']) ? $data['apellido_1'] : null;
$apellido_2 = isset($data['apellido_2']) ? $data['apellido_2'] : null;
$direccion = isset($data['direccion']) ? $data['direccion'] : null;
$localidad = isset($data['localidad']) ? $data['localidad'] : null;
$provincia = isset($data['provincia']) ? $data['provincia'] : null;
$fecha = isset($data['fecha']) ? $data['fecha'] : null;


// valores json
$msg = null;
$success = true;
$responseData = array();

try {
    $db = DB::getInstance();

    switch ($action) {
        case "get":
            $sql = "SELECT * FROM alumno WHERE 1=1"; 

            $params = array(); 
        
            if ($dni) {
                $sql .= " AND dni like :dni";
                $params[':dni'] = '%' . $dni . '%';
            }
        
            if ($nombre) {
                $sql .= " AND nombre LIKE :nombre";
                $params[':nombre'] = '%' . $nombre . '%';
            }

            $sql .= " LIMIT " . $limit;

        
            $stm = $db->prepare($sql);
            
            
            foreach ($params as $key => &$value) {
                $stm->bindParam($key, $value);
            }
            

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
            $alumno = new Alumno($dni,$nombre,$apellido_1,$apellido_2,$direccion,$localidad,$provincia,$fecha);
            $success = $alumno->delete();
            break;

        case "Insert":
            $alumno = new Alumno($dni,$nombre,$apellido_1,$apellido_2,$direccion,$localidad,$provincia,$fecha);
            $success = $alumno->insert();
            break;
        case "editar":
            $alumno = new Alumno($dni,$nombre,$apellido_1,$apellido_2,$direccion,$localidad,$provincia,$fecha);
            $success = $alumno->editar();
            break;

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
