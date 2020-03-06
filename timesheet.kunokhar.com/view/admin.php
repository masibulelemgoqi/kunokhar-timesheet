<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Kunokhar Timesheet</title>
    <link href="../public/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../public/css/style.css" rel="stylesheet" type="text/css">
    <link href="../public/css/fontawesome-free-5.12.1-web/css/all.min.css" type="text/css">
</head>
<body>
    <nav class="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <a class="navbar-brand ml-3" style="cursor: pointer;">
            <img src="../public/img/kunokharK.png" class="logo" alt="Kunokhar logo">
            <span>Timesheet</span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item text-center">
                    <a class="nav-link" href="./history.php">
                        <i class="fa fa-history fa-2x" aria-hidden="true"></i>
                        <div>History</div>
                    </a>
                </li>
                
                <li class="nav-item text-center">
                    <a class="nav-link" href="./profile">
                        <i class="far fa-user fa-2x"></i>
                        <div>Profile</div>
                    </a>
                </li>

                <li class="nav-item text-center">
                    <a class="nav-link" id="logout">
                        <i class="fas fa-sign-out-alt fa-2x"></i>
                        <div>Logout</div>
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container-fluid" id="employee-with-clients"> 
        <div class="offset-lg-0" id="employees_view">
            <div class="row">
           
            </div>
        </div>
    </div>

    <div class="button-pull">
        <a data-toggle="modal" data-target="#add_user" class="pull-item nav-count-1">
            <i class="fa fa-user-plus"></i>
        </a>
        <a data-toggle="modal" data-target="#add_task" class="pull-item nav-count-2">
            <i class="fa fa-tasks"></i>
        </a>
        <a data-toggle="modal" data-target="#add_client" class="pull-item nav-count-3">
            <i class="fa fa-user-tie"></i>
        </a>
        <a href="#toggle" class="mask">
            <i class="fa fa-plus"></i>
        </a>
    </div>

    <!-- user Modal -->
    <div class="modal fade add_user" role="dialog" id="add_user" data-backdrop="static" aria-labelledby="add_user" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="add_user">Add Employee</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <section class="user-section">
                        <div class="container">
                            <form class="p-3" method="POST">
                                <div class="col-sm-offset-1 form-group">
                                    <input class="form-control" type="text" placeholder="Email address" id="employee_email">
                                    
                                    <input class="form-control" type="text" placeholder="First name" id="employee_fname">

                                    <input class="form-control" type="text" placeholder="Last name" id="employee_lname">

                                    <select name="" id="employee_role" class=" form-control">
                                        <option disabled selected>- Select type of user -</option>
                                        <option>ADMIN USER</option>
                                        <option>ORDINARY USER</option>
                                    </select>
                                   
                                    <div class="input-group form-group">
                                        <div id="user-add-status"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>     
                </div>
                <div class="modal-footer">
                    <button class="btn btn-tomato-o mr-3" id="save_user">
                        <i class="fa fa-plus mr-2" aria-hidden="true"></i> Save user
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- client Modal -->
    <div class="modal fade add_client" role="dialog" id="add_client" data-backdrop="static" aria-labelledby="add_client" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="add_client">Add Client</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <section class="client-section">
                        <div class="container">
                            <form class="p-3 allocate-form" method="POST">
                                <input class="form-control" type="text" placeholder="First name" id="client_fname">
                                <input class="form-control" type="text" placeholder="Last name" id="client_lname">
                                <select class="form-control" id="employee_list">

                                </select>
                                
                                <h5>Select Tasks</h5>

                                <div class="form-group" id="check-task">
                                    
                                </div>
                            </form>
                            <div id="client-add-status"></div>
                        </div>
                    </section>     
                </div>
                <div class="modal-footer">
                    <button class="btn btn-tomato-o mr-3" id="allocate_client">
                        <i class="fa fa-plus mr-2" aria-hidden="true"></i> Save client
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- task Modal -->
    <div class="modal fade add_task" role="dialog" id="add_task" data-backdrop="static" aria-labelledby="add_task" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="add_task">Add Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <section class="task-section">
                        <div class="container">
                            <form class="p-3">
                                <div class=" col-sm-offset-1 form-group">
                                    <p style="margin: 0"></p>
                                    <div class="input-group form-group input-0">
                                        <input class="form-control" type="text" id="task_name-0" name="task_name" placeholder="Task name">
                                        <button id="more-task" class="btn btn-success">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="input-group form-group">
                                    <div id="task-add-status"></div>
                                </div>
                            </form>
                        </div>
                    </section>     
                </div>
            </div>
        </div>
    </div>
    
    <script src="../public/js/jquery.js"></script>
    <script src="../public/js/bootstrap.min.js"></script>
    <script src="../public/css/fontawesome-free-5.12.1-web/js/all.min.js"></script>
    <script src="../public/js/main.js"></script>
</body>
</html>

