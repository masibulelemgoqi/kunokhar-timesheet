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

    public function add_task($task_name, $client_id, $task_deadline, $task_importance)
    {
        try 
        {
            date_default_timezone_set("Africa/Johannesburg");
            $date_created = date("Y-m-d H:m:s");
            $deadline = date("Y-m-d H:m:s", strtotime($task_deadline));

            $sql = "INSERT INTO `task_tb` (`task_client_id`, `task_name`, `task_date_posted`, `task_importance`, `task_deadline`) 
                    VALUES (:client_id, :task_name, :date_created, :task_importance, :deadline)";
            $stmt = $this->con->prepare($sql);
            $stmt->bindParam(':task_name', $task_name);
            $stmt->bindParam(':client_id', $client_id);
            $stmt->bindParam(':date_created', $date_created);
            $stmt->bindParam(':task_importance', $task_importance);
            $stmt->bindParam(':deadline', $deadline);
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
    public function get_client_wildcat($name)
    {
        try
        {
            $stmt = $this->con->query("SELECT * FROM `client_tb` WHERE UPPER(client_fname) LIKE UPPER('%".$name."%') OR UPPER(client_lname) LIKE UPPER('%".$name."%') LIMIT 3");
            $html = "";
            $arr = array();
            if($name !== "")
            {
                
                $html = "<ul id='list-of-clients'>";
                while($row = $stmt->fetch(PDO::FETCH_ASSOC))
                {
                    $arr[] = $row;
                }
                
                if(count($arr) > 0)
                {
                    foreach($arr as $client)
                    {
                        $fullname = $client['client_fname']." ".$client['client_lname'];
                        $html .= "<li id='client-".$client['client_id']."' onclick='getClient(".$client['client_id'].");'>".$fullname."</li>";
                    }
                }else
                {
                    $html .= "<li> Client not found...</li>";
                }
    
                $html .= "</ul>";
    
            }else
            {
                return;
            }
            echo $html;
    
            $this->con = null;


        }catch(PDOException $e)
        {
            print("Error: ".$e->getMessage());
        }
    }

    function get_employees()
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

    function get_client_admin($id)
    {
        try
        {
            $sql = "SELECT `client_id`, `client_fname`, `client_lname`, `allocate_date_allocated` FROM `client_tb` c, `allocate_client_tb` a WHERE a.`allocate_emp_id`='$id' AND c.`client_id`= a.`allocate_client_id`";
            $stml = $this->con->query($sql);
            $clients_arr = array();
            while($row = $stml->fetch(PDO::FETCH_ASSOC))
            {
                $clients_arr[] = $row;
            }
            return $clients_arr;
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