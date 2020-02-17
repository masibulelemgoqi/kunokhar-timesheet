<?php

require('Db.class.php');

class Work
{
    private $con;

    public function __construct()
    {
        $conn = new DbClass();
        $sql = $conn->connect();
        $this->con = $sql;

    }

    public function add_employee($fname, $lname, $email, $role, $password)
    {
        try 
        {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $date_created = date("Y-m-d H:m:s");
            $user_status = 0;

            $power = 0;

            if($role == "ADMIN USER")
            {
                $power = 1;
            }else
            {
                $power = 0;
            }
            $sql = "INSERT INTO `employee_tb` (`emp_fname`, `emp_lname`, `emp_email`, `emp_password`, `emp_date_created`, `emp_power`, `emp_active_status`) 
                    VALUES (:fname, :lname, :email, :hash, :date_created, :power, :user_status)";
            $stmt = $this->con->prepare($sql);
            $stmt->bindParam(':fname', $fname);
            $stmt->bindParam(':lname', $lname);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':hash', $hash);
            $stmt->bindParam(':date_created', $date_created);
            $stmt->bindParam(':power', $power);
            $stmt->bindParam(':user_status', $user_status);
            if($stmt->execute())
            {
                return true;
            }
        } catch (PDOException $e) 
        {
            print("Error: ".$e->getMessage());
        }
    }


    public function add_client($fname, $lname)
    {
        try 
        {
            $date_created = date("Y-m-d H:m:s");

            $sql = "INSERT INTO `client_tb` (`client_fname`, `client_lname`, `date_created`) 
                    VALUES (:fname, :lname, :date_created)";
            $stmt = $this->con->prepare($sql);
            $stmt->bindParam(':fname', $fname);
            $stmt->bindParam(':lname', $lname);
            $stmt->bindParam(':date_created', $date_created);
            if($stmt->execute())
            {
                return true;
            }
        } catch (PDOException $e) 
        {
            print("Error: ".$e->getMessage());
        }

    }

    // public function add_task($task_name, $client_id)
    // {
    //     try 
    //     {
    //         $date_created = date("Y-m-d H:m:s");

    //         $sql = "INSERT INTO `client_tb` (`client_fname`, `client_lname`, `date_created`) 
    //                 VALUES (:fname, :lname, :date_created)";
    //         $stmt = $this->con->prepare($sql);
    //         $stmt->bindParam(':fname', $fname);
    //         $stmt->bindParam(':lname', $lname);
    //         $stmt->bindParam(':date_created', $date_created);
    //         if($stmt->execute())
    //         {
    //             return true;
    //         }
    //     } catch (PDOException $e) 
    //     {
    //         print("Error: ".$e->getMessage());
    //     }

    // }
}