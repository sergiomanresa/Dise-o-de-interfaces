<?php 

class DB{
    protected static $instance;

    protected function __construct(){}

    public static function getInstance(){

        if(empty(self::$instance)){
            
            $db_info= array(
                'host' => 'localhost',
                'user' => 'root',
                'password' => '',
                'dbname' => 'universidad');

            try{
                self::$instance = new PDO('mysql:host=' . $db_info['host'] . ';dbname=' . $db_info['dbname'], $db_info['user'], $db_info['password']);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e){
                echo $e->getMessage();
            }
        }

        return self::$instance;
    }    
}
?>