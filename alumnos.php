<?php
require_once 'Silgenton.php';

class Alumno{
    public $dni;
    public $nombre;
    public $apellido_1;
    public $apellido_2;
    public $direccion;
    public $localidad; 
    public $provincia;
    public $fecha;

    public function __construct($dni, $nombre, $apellido_1, $apellido_2, $direccion, $localidad, $provincia, $fecha) {
        $this->dni = $dni;
        $this->nombre = $nombre;
        $this->apellido_1 = $apellido_1;
        $this->apellido_2 = $apellido_2;
        $this->direccion = $direccion;
        $this->localidad = $localidad;
        $this->provincia = $provincia;
        $this->fecha = $fecha;
    }


    public function Editar(){
        try {
            $db = DB::getInstance();
            $sql = "UPDATE alumno SET nombre = :nombre, apellido_1 = :apellido_1, apellido_2 = :apellido_2, direccion = :direccion, localidad = :localidad, provincia = :provincia, FECHA_NACIMIENTO = :fecha 
            WHERE dni = :dni";
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':nombre', $this->nombre);
            $stmt->bindParam(':apellido_1', $this->apellido_1);
            $stmt->bindParam(':apellido_2', $this->apellido_2);
            $stmt->bindParam(':direccion', $this->direccion);
            $stmt->bindParam(':localidad', $this->localidad);
            $stmt->bindParam(':provincia', $this->provincia);
            $stmt->bindParam(':fecha', $this->fecha);
            $stmt->bindParam(':dni', $this->dni);
    
            return $stmt->execute();
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
    

    public function insert(){
        try {
            $db = DB::getInstance();
            $sql = "INSERT INTO alumno (DNI, Nombre, Apellido_1, Apellido_2, Direccion, Localidad, Provincia, Fecha_Nacimiento) 
            VALUES (:dni, :nombre, :apellido1, :apellido2, :direccion, :localidad, :provincia, :fecha)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':dni', $this->dni);
            $stmt->bindParam(':nombre', $this->nombre);
            $stmt->bindParam(':apellido1', $this->apellido_1);
            $stmt->bindParam(':apellido2', $this->apellido_2);
            $stmt->bindParam(':direccion', $this->direccion);
            $stmt->bindParam(':localidad', $this->localidad);
            $stmt->bindParam(':provincia', $this->provincia);
            $stmt->bindParam(':fecha', $this->fecha);
            $stmt->execute();
            return true; 
        } catch (Exception $e){
            return $e->getMessage();
        }
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