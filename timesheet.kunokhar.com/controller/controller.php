<?php 
require ('../model/Work.class.php');

$work_object = new Work();

if(isset($_POST['action']))
{
    $action = $_POST['action'];

    switch($action)
    {
        case "add_employee":

            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $email = $_POST['email'];
            $role = $_POST['employee_role'];
            $password = $_POST['password'];
            if($work_object->add_employee($fname, $lname, $email, $role, $password))
            {
                print("<div class='text-success'>Employee added successfully!!!</div>");
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

    }
}