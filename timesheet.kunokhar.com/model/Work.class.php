<?php

require('Db.class.php');

class Work{
    //--------------------------[ VARIABLES ]---------------------------
    private $con;

    //--------------------------[ CONSTRUCTOR ]---------------------------
    public function __construct(){
        $conn = new DbClass();
        $sql = $conn->connect();
        $this->con = $sql;
    }

    //---------------------[ ATHENTFICATION FUNCTIONS ]----------------------
	public function login($email, $password){
		try{
			$sql = "SELECT * FROM `employee_tb` WHERE `emp_email` ='$email'";
			$stmt = $this->con->query($sql);
			if($stmt->rowCount() == 0) {
				echo json_encode(array('success' => false));
			} else {
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				$emp_id = $row['emp_id'];
				$emp_role = $row['emp_power'];
				$hash = $row['emp_password'];

				if(!$this->check_user_exists_on_register($emp_id)) {
					$this->add_to_register_enter_time($emp_id);
				}

				if(password_verify($password, $hash)) {
				$this->set_user_status($emp_id, 1);
				echo json_encode(array(
					'success' => true,
					'id' => $emp_id,
					'role' => $emp_role
					));
				}

			}
		}catch( PDOException $e){
			echo "Error: ".$e->getMessage();
		}
	}

    //--------------------------[ ADD FUNCTIONS ]---------------------------
    public function add_employee($fname, $lname, $email, $role, $password){
        try {
            $password = "987654321";
            $hash = password_hash($password, PASSWORD_DEFAULT);
            date_default_timezone_set("Africa/Johannesburg");
            $date_created = date("Y-m-d H:i:s");
            $user_status = 0;

            $power = 0;

            if($role == "ADMIN USER"){
                $power = 1;
            }else{
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
            if($this->sendEmail($email, $message)){
                if($stmt->execute()){
                    return true;
                }  
            }
        } catch (PDOException $e) {
            print("Error: ".$e->getMessage());
        }
    }

    public function add_task($task_name){
        try {
            $sql = "INSERT INTO `task_tb` (`task_name`) VALUES (:task_name)";
            $stmt = $this->con->prepare($sql);
            $stmt->bindParam(':task_name', $task_name);
            if($stmt->execute())
            {
                return true;
            }
        } catch (PDOException $e) {
            print("Error: ".$e->getMessage());
        }
    }

    public function allocate_client($fname, $lname, $task_name, $emp_id){
        try {
            date_default_timezone_set("Africa/Johannesburg");
            $date_created = date("Y-m-d H:i:s");
            
            $sql = "INSERT INTO `allocate_tb` (`allocate_client_fname`, `allocate_client_lname`, `allocate_emp_id`, `allocate_task_name`, `allocate_date_created`) VALUES (:fname, :lname, :emp_id, :task_name, :date_created)";
            $stmt = $this->con->prepare($sql);
            $stmt->bindParam(':fname', $fname);
            $stmt->bindParam(':lname', $lname);
            $stmt->bindParam(':date_created', $date_created);
            $stmt->bindParam(':emp_id', $emp_id);
            $stmt->bindParam(':task_name', $task_name);
            if($stmt->execute()){
                return true;
            }
        } catch (PDOException $e) {
            print("Error: ".$e->getMessage());
        }      
	}
	
	private function add_to_register_enter_time($id) {
		try{
			date_default_timezone_set("Africa/Johannesburg");
			$date_now = date("Y-m-d H:i:s"); 
			$emp_id = $id;

			$sql = "INSERT INTO `register_tb`(`reg_emp_id`, `reg_enter_time`) VALUES (:emp_id, :date_now)";
			$stmt = $this->con->prepare($sql);
			$stmt->bindParam(":date_now", $date_now);
			$stmt->bindParam(":emp_id", $emp_id);
			$stmt->execute();
			
		}catch (PDOException $e) {
			print("Error: ".$e->getMessage());
		}
	}


    //----------------------------------[ GET FUNCTIONS ]---------------------------------
   

    public function get_employees() {
        try {
          $stmt = $this->con->query("SELECT * FROM `employee_tb`");
          $emp_array = array();

          while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
              $emp_array[] = $row; 
          }
          return $emp_array;  
        }catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }
    }

    public function get_employeeId($fname, $lname) {
        try {
          $stmt = $this->con->query("SELECT * FROM `employee_tb` WHERE `emp_fname`='$fname' AND `emp_lname`='$lname'");
          if($stmt->rowCount() == 0) {
            echo json_encode(array('success' => false));

          } else {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $user_id = $row['emp_id'];
            echo json_encode(array(
              'success' => true,
              'id' => $user_id
            ));
          }
            
        }catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }
    }

    public function get_tasks() {
        try {
            $stmt = $this->con->query("SELECT * FROM `task_tb`");
            $task_array = array();

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $task_array[] = $row; 
            }
            return $task_array;
            
        }catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }
    }

    public function get_client_tasks($id, $fname, $lname) {
        try {
            $stmt = $this->con->query("SELECT * FROM `allocate_tb` WHERE `allocate_client_fname`='$fname' AND `allocate_client_lname`='$lname' AND `allocate_emp_id`='$id'");
            $task_array = array();
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $task_array[] = $row; 
            }
            echo json_encode($task_array);
        }catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }    
    }

    public function get_emp_all_tasks($id) {
        try {
            $stmt = $this->con->query("SELECT * FROM `allocate_tb` WHERE `allocate_emp_id`='$id'");
            $task_array = array();
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $task_array[] = $row; 
            }
            echo json_encode($task_array);
        }catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }           
    }

    public function get_grouped_clients($emp_id) {
        try {
            $sql = "SELECT * FROM `allocate_tb` WHERE `allocate_emp_id` = '$emp_id'  GROUP BY `allocate_client_fname`, `allocate_client_lname`";        
            $stmt = $this->con->query($sql);
            $clients_array = array();

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $clients_array[] = $row; 
            }
            return $clients_array;
        }catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        } 
    }

    public function get_task_by_id($task_id) {
        try {
          $stmt = $this->con->query("SELECT * FROM `allocate_tb` WHERE `allocate_id`='$task_id'");
          if($stmt->rowCount() == 0) {
            echo json_encode(array('success' => false));

          } else {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $task_status = $row['allocate_status'];
            $start_time = $row['allocate_start_time'];
            $time_taken = $row['allocate_time_taken'];
          
            echo json_encode(array(
              'success' => true,
              'task_status' => $task_status,
              'start_time' => $start_time,
              'time_taken' => $time_taken 
            ));
          }
            
        }catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }       
	}
	
	public function get_profile($id) {
		try {
			$sql = "SELECT * FROM `employee_tb` WHERE `emp_id`='$id'";
			$stmt = $this->con->query($sql);
			if($stmt->rowCount() == 1) {
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				$fname = $row['emp_fname'];
				$lname = $row['emp_lname'];
				$email = $row['emp_email'];

				echo json_decode(array(
					'success' => true,
					'fname' => $fname,
					'lname' => $lname,
					'email' => $email
				));
			}
		} catch (PDOException $e) {
			print("Error: ".$e->getMessage());
		}
	}

	public function get_all_history($range){
		$days = null;
		date_default_timezone_set("Africa/Johannesburg");
		$date_now = date("Y-m-d"); 
		if($range == "Today") {
			$days = 0;
		}else if($range == "1 Week") {
			$days = 7;
		}else if($range == "1 Month") {
			$days = 30;
		}else if($range == "3 Month") {
			$days = 90;
		}else if($range == "6 Month") {
			$days = 180;
		}else if($range == "1 Year") {
			$days = 365;
		}
		
		try {
			$sql = "SELECT * FROM `allocate_tb` WHERE DATEDIFF('$date_now', `allocate_date_created`) <='$days'";
			$stmt = $this->con->query($sql);
			$arr = array();
			while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$arr[] = $row;
			}
			return $arr;
		} catch (PDOException $e) {
			print("Error: ".$e->getMessage());
		}
	}

    //----------------------------[ EDIT FUNCTIONS ]------------------------------

    public function set_task_start_time($task_id) {
        date_default_timezone_set("Africa/Johannesburg");
        $start_task_time = date("Y-m-d H:i:s");  
        $task_status = "Running";

        try {
            $sql = "UPDATE `allocate_tb` SET `allocate_start_time`=:start_task_time, `allocate_status`=:task_status WHERE `allocate_id`=:task_id";
            $stml = $this->con->prepare($sql);
            $stml->bindParam(':start_task_time', $start_task_time);
            $stml->bindParam(':task_id', $task_id);
            $stml->bindParam(':task_status', $task_status);

            if($stml->execute()){
                return true;
            }
        } catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }
    }

    public function set_task_end_time($task_id, $task_time_taken, $task_comment) {
        date_default_timezone_set("Africa/Johannesburg");
        $end_task_time = date("Y-m-d H:i:s"); 
        $task_status = "Done"; 

        try {
            $sql = "UPDATE `allocate_tb` SET `allocate_end_time`=:end_task_time,
                    `allocate_time_taken`=:task_time_taken, `allocate_comment`=:task_comment,  
                    `allocate_status`=:task_status WHERE `allocate_id`=:task_id";
            $stml = $this->con->prepare($sql);
            $stml->bindParam(':end_task_time', $end_task_time);
            $stml->bindParam(':task_id', $task_id);
            $stml->bindParam(':task_time_taken', $task_time_taken);
            $stml->bindParam(':task_comment', $task_comment);
            $stml->bindParam(':task_status', $task_status);

            if($stml->execute()) {
                return true;
            }
        } catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }
    }

    public function set_pause_task($task_id, $task_time_taken) {
        date_default_timezone_set("Africa/Johannesburg");
        $end_task_time = date("Y-m-d H:i:s"); 
		$task_status = "Pause"; 
		
        try {
            $sql = "UPDATE `allocate_tb` SET `allocate_end_time`=:end_task_time,
                    `allocate_time_taken`=:task_time_taken,
                    `allocate_status`=:task_status WHERE `allocate_id`=:task_id";
            $stml = $this->con->prepare($sql);
            $stml->bindParam(':end_task_time', $start_task_time);
            $stml->bindParam(':task_id', $task_id);
            $stml->bindParam(':task_time_taken', $task_time_taken);
            $stml->bindParam(':task_status', $task_status);

            if($stml->execute()) {
                return true;
            }
        } catch (PDOException $e) {
            echo "Error: ".$e->getMessage();
        }
	}
	
	public function add_to_register_exit_time($id) {
		try{
			date_default_timezone_set("Africa/Johannesburg");
			$exit_time = date("Y-m-d H:i:s"); 
			$date_now = date("Y-m-d");

			$sql = "UPDATE `register_tb` SET `reg_exit_time`=:exit_time WHERE `reg_emp_id`=:id AND DATE(`reg_enter_time`)=:date_now";
			$stmt = $this->con->prepare($sql);
			$stmt->bindParam(":exit_time", $exit_time);
			$stmt->bindParam(":id", $id);
			$stmt->bindParam(":date_now", $date_now);
			if($stmt->execute()) {
				$this->set_user_status($id, 0);
				return true;
			}
			
		}catch (PDOException $e) {
			print("Error: ".$e->getMessage());
		}
	}

	public function set_user_status($id, $value) {
		try {
			$sql = "UPDATE `employee_tb` SET `emp_active_status`=:value WHERE `emp_id`=:id";
			$stmt = $this->con->prepare($sql);
			$stmt->bindParam(':id', $id);
			$stmt->bindParam(':value', $value);
			$stmt->execute();
		} catch (PDOException $e) {
			echo "Error: ".$e->getMessage();
		}
	}
    //---------------------------[ CHECK FUNCTIONS ]------------------------------

    public function check_email_exists($email) {
        try {
            $stml = $this->con->query("SELECT * FROM `employee_tb` WHERE `emp_email`='$email'");
            $row = $stml->fetch(PDO::FETCH_ASSOC);
            if(count($row) == 1) {
                print("1");
            }else {
                print("0");
            }
        } catch (PDOException $e) {
            print("Error: ".$e->getMessage());
        }
	}
	
	private function check_user_exists_on_register($id) {
		try{
			date_default_timezone_set("Africa/Johannesburg");
			$current_date = date("Y-m-d");

			$sql = "SELECT * FROM  `register_tb` WHERE `reg_emp_id`='$id' AND DATE(`reg_enter_time`) ='$current_date'";
			$stmt = $this->con->query($sql);
			if($stmt->rowCount() == 0) {
				return false;
			}else {
				return true;
			}
			
		}catch (PDOException $e) {
			print("Error: ".$e->getMessage());
		}
	}

	public function check_password($id, $password) {
		try{
			$sql = "SELECT * FROM `employee_tb` WHERE `emp_id` ='$id'";
			$stmt = $this->con->query($sql);
			if($stmt->rowCount() == 1) {
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				$hash = $row['emp_password'];
				if(password_verify($password, $hash)) {
					return true;
				}
			}
		}catch( PDOException $e){
			echo "Error: ".$e->getMessage();
		}
	}
    //--------------------------[ SEND EMAIL FUNCTION ]---------------------------
    public function sendEmail($email, $message) {
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

		if($mail->send()) {
			return true;
		}
	}
	
}