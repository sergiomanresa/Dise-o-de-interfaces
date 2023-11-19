<?php
require_once 'Silgenton.php';

class Alumno{
    public $dni;
    public $nombre;
    public $apellido1;
    public $apellido2;
    public $direccion;
    public $localida;
    public $provincia;
    public $fecha;


    public function __construct($dni) {
        $this->dni = $dni;
    }


    public function Editar(){
   
    }

    public function Insert(){

    }

    public function delete(){
        try{
            $db=DB::getInstance();
            $sql="Delete from alumno where dni='$this->dni'";
            $stmt = $db->prepare($sql);
            return $stmt->execute();

        }catch(Exception $e){
            throw new Exception($e->getMessage());
        }
        
    }

    public static function Buscar(){
    }

}


?>