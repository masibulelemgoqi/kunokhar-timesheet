<?php

require('Db.class.php');

class Work
{
    //--------------------------[ VARIABLES ]---------------------------
    private $con;

    //--------------------------[ CONSTRUCTOR ]---------------------------
    public function __construct()
    {
        $conn = new DbClass();
        $sql = $conn->connect();
        $this->con = $sql;


    }

    //---------------------[ ATHENTFICATION FUNCTIONS ]----------------------
    public function login($email, $password)
    {

        $sql = "SELECT * FROM `employee_tb` WHERE `emp_email` ='$email'";
        $stmt = $this->con->query($sql);
        $userRow = $stmt->fetch(PDO::FETCH_ASSOC);

        if(count($userRow) == 1)
        {
            $hash = $userRow['emp_password'];

            if(password_verify($password, $hash))
            {
                return $userRow;
            }
        }


    }

    //--------------------------[ ADD FUNCTIONS ]---------------------------
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
            $message = "<h3>
                            Dear ".$fname." ".$lname." ,<br><br>
                            Your credentials for Kunokhar timesheet are as follow:<br><br>
                            Email: ".$email."<br>
                            Passoword: ".$password."<br><br>
                            Please note that you'll have to change the password to the one 
                            you prefer as this is an auto generated password.<br><br>

                            Thank you,<br>
                            Kunokhar IT Support team

                        </h3>";
            if($this->sendEmail($email, $message))
            {
                if($stmt->execute())
                {
                    return true;
                }
                
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
            date_default_timezone_set("Africa/Johannesburg");
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

    public function add_task($task_name)
    {
        try 
        {
            // date_default_timezone_set("Africa/Johannesburg");
            // $date_created = date("Y-m-d H:m:s");
            // $deadline = date("Y-m-d H:m:s", strtotime($task_deadline));

            $sql = "INSERT INTO `task_tb` (`task_name`) VALUES (:task_name)";
            $stmt = $this->con->prepare($sql);
            $stmt->bindParam(':task_name', $task_name);
            if($stmt->execute())
            {
                return true;
            }
        } catch (PDOException $e) 
        {
            print("Error: ".$e->getMessage());
        }

    }

    //----------------------------------[ GET FUNCTIONS ]---------------------------------
   

    public function get_employees()
    {
        try 
        {
          $stmt = $this->con->query("SELECT * FROM `employee_tb`");
          $emp_array = array();

          while($row = $stmt->fetch(PDO::FETCH_ASSOC))
          {
              $emp_array[] = $row; 
          }

          return $emp_array;
            
        }catch (PDOException $e) 
        {
            echo "Error: ".$e->getMessage();
        }
    }

    public function get_tasks()
    {
        try 
        {
            $stmt = $this->con->query("SELECT * FROM `task_tb`");
            $task_array = array();

            while($row = $stmt->fetch(PDO::FETCH_ASSOC))
            {
                $task_array[] = $row; 
            }

            return $task_array;
            
        }catch (PDOException $e) 
        {
            echo "Error: ".$e->getMessage();
        }
        
    }


    //---------------------------[ CHECK FUNCTIONS ]------------------------------

    public function check_email_exists($email)
    {
        try 
        {
            $stml = $this->con->query("SELECT * FROM `employee_tb` WHERE `emp_email`='$email'");
            $row = $stml->fetch(PDO::FETCH_ASSOC);
            if(count($row) == 1)
            {
                print("1");
            }else
            {
                print("0");
            }
        } catch (PDOException $e) 
        {
            print("Error: ".$e->getMessage());
        }

    }
    //--------------------------[ SEND EMAIL FUNCTION ]---------------------------
    public function sendEmail($email, $message)
    {

            require 'phpmailer/PHPMailerAutoload.php';

            $to = $email; // this is your Email address
            $from = 'info@kunokhar.com'; // this is the sender's Email address
            $mail = new PHPMailer;
            $mail->isSMTP();
            $mail->Host = 'mail.kunokhar.com';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls';

            $mail->Username = $from;
            $mail->Password = '!nf0@kuN0kh@r';

            $mail->setFrom($from, 'Kunokhar CTP');
            $mail->addAddress($to);
            $mail->addReplyTo($from);

            $mail->isHTML(true);
            $mail->Subject = 'Timesheet - Registration';
            $mail->Body = $message;

            if($mail->send())
            {
                return true;
            }

    }
}