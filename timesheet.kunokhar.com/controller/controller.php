<?php 
require ('../model/Work.class.php');

$work_object = new Work();

if(isset($_POST['action']))
{
    $action = $_POST['action'];

    switch($action)
    {
        //ANCHOR  ADD
        case "add_employee":

            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $email = $_POST['email'];
            $role = $_POST['employee_role'];
            $password = $_POST['password'];
            if($work_object->add_employee($fname, $lname, $email, $role, $password))
            {
                print(1);
            }else
            {
                print("<div class='text-success'>".$work_object->add_employee($fname, $lname, $email, $role, $password)."</div>");
            }
        break;

        case "add_task":
            $task_name = $_POST['task_name'];

            if($work_object->add_task($task_name))
            {
                print("1");
            }else
            {
                print($work_object->add_task($task_name));
            }
        break;

        case "allocate_client":
            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $emp_id = $_POST['id'];
            $task_name = $_POST['task_name'];

            if($work_object->allocate_client($fname, $lname, $task_name, $emp_id))
            {
                print(1);
            }else
            {
                print($work_object->allocate_client($fname, $lname, $task_name, $emp_id));
            }

        break;

        case "add_task_start_time":
            $task_id = $_POST['task_id'];
            if($work_object->set_task_start_time($task_id)){
                print(1);
            }else{
                print($work_object->set_task_start_time($task_id));
            }
        break;

        case "add_task_end_time":
            $task_id = $_POST['task_id'];
            $task_time_taken = $_POST['task_time_taken'];
            $task_comment = $_POST['task_comment'];
            if($work_object->set_task_end_time($task_id, $task_time_taken, $task_comment)){
                print(1);
            }else{
                print($work_object->set_task_end_time($task_id, $task_time_taken, $task_comment));
            }
        break;

        case "add_task_pause":
            $task_id = $_POST['task_id'];
            $task_time_taken = $_POST['task_time_taken'];
            $task_comment = $_POST['task_comment'];
            if($work_object->set_pause_task($task_id, $task_time_taken, $task_comment)){
                print(1);
            }else{
                print($work_object->set_pause_task($task_id, $task_time_taken, $task_comment));
            }
        break;
        //ANCHOR  GET 

        case "get_tasks":
            echo json_encode($work_object->get_tasks());
        break;

        case "get_task_by_id":
            $task_id = $_POST['task_id'];
            $work_object->get_task_by_id($task_id);
        break;

        case "get_client_tasks":
            $id = $_POST['id'];
            $fname = $_POST['fname'];
            $lname = $_POST['lname'];

            $work_object->get_client_tasks($id, $fname, $lname);
        break;

        case "get_done_emp_tasks":
            $id = $_POST['id'];
            $work_object->get_emp_all_tasks($id);
        break;

        case "get_employees":
            echo json_encode($work_object->get_employees());
        break;

        case "get_employee":
            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $work_object->get_employeeId($fname, $lname);
        break;

        case "get_employee_by_id":
            $id = $_POST['id'];
            $work_object->get_employee($id);
        break;

        case "get_clients":
            $id = $_POST['id'];
            echo json_encode($work_object->get_grouped_clients($id));
        break;

        case 'get_all_history':
            $range = $_POST['range'];
            echo json_encode($work_object->get_all_history($range));    
        break;

        case 'get_employee_client_history':
            $id = $_POST['id'];
            $fullname = $_POST['fullname'];
            $range = $_POST['range'];
            echo json_encode($work_object->get_employee_client_history($fullname, $id, $range));    
        break;


        //ANCHOR  AUTHENTIFICATION
        case "login":
            $email = $_POST['email'];
            $password = $_POST['password'];
            $position = $_POST['position'];
            $work_object->login($email, $password, $position);

            
        break;

        //ANCHOR  CHECK 

        case "check_email":
            $email = $_POST['email'];
            $work_object->check_email_exists($email);
        break;

        case "check_password":
            $id = $_POST['id'];
            $password = $_POST['password'];

            if($work_object->check_password($id, $password)) {
                print(1);
            }else {
                print($work_object->check_password($id, $password));
            }
        break;

        //ANCHOR  EDIT 

        case "logout":
            $id = $_POST['id'];
            if($work_object->add_to_register_exit_time($id)){
                print(1);
            }else{
                print($work_object->add_to_register_exit_time($id));
            }
        break;

        //ANCHOR  DELETE 

    }
}