<?php 
require ('../model/Work.class.php');

$work_object = new Work();

if(isset($_POST['action']))
{
    $action = $_POST['action'];

    switch($action)
    {
        //---------------[ ADD ]----------------
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

        case "add_client":

            $fname = $_POST['fname'];
            $lname = $_POST['lname'];

            if($work_object->add_client($fname, $lname))
            {
                print("<div class='text-success'>Client added successfully!!!</div>");
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

        //--------------------------[ GET ]-----------------------------

        case "get_tasks":
            echo json_encode($work_object->get_tasks());
        break;

        case "get_employees":
            echo json_encode($work_object->get_employees());
        break;

        //--------------------[ AUTHENTIFICATION ]---------------------
        case "login":
            $email = $_POST['email'];
            $password = $_POST['password'];
            if($work_object->login($email, $password) !== null)
            {
                echo json_encode($work_object->login($email, $password));
            }
            
        break;

        //--------------------------[ CHECK ]---------------------------

        case "check_email":
            $email = $_POST['email'];
            $work_object->check_email_exists($email);
        break;

        //--------------------------[ EDIT ]-----------------------------


        //--------------------------[ DELETE ]---------------------------

    }
}