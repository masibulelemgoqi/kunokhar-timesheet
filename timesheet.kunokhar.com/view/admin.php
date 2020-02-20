<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Kunokhar Timesheet</title>
<link href="../public/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="../public/css/style.css" rel="stylesheet" type="text/css">
<link href="../public/css/fontawesome-free-5.12.1-web/css/all.min.css" type="text/css">
</head>
<body>

<nav class="navbar navbar-expand-sm fixed-top navbar-light bg-light">
  <a class="navbar-brand ml-3" href="#">
	<img src="../public/img/kunokharK.png" class="logo" alt="Kunokhar logo">
	<span>Timesheet</span>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="./profile"><i class="far fa-user fa-2x"></i><div>Profile</div></a>
      </li>

      <li class="nav-item">
        <a class="nav-link" id="logout"><i class="fas fa-sign-out-alt fa-2x"></i><div>Logout</div></a>
      </li>
	
    </ul>
  </div>
</nav>


<div class="container-fluid">
    <div class="offset-lg-0" id="employees_view">
        <div class="row">
            <div class="card col-sm-3">
                <div class="card-body">
                  <h5 class="card-title">Sive</h5>
                  <div class="scrollable">
                    <p class="card-text">This portion and only this portion will have a very long text so much so that the vertical scroll bar may appear when required. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue neque et sollicitudin blandit. Vivamus vestibulum
                      sed mauris a volutpat. Etiam quis arcu dictum, scelerisque ex sit amet, egestas eros. Sed convallis consectetur mauris, at fringilla mi gravida eu. Vivamus eu sagittis nulla. Vestibulum lobortis pretium metus, ut mattis libero aliquet ut. Sed
                      facilisis elementum dolor. Suspendisse euismod nunc malesuada, laoreet lectus egestas, auctor ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas odio nec ex suscipit vestibulum. Class aptent taciti sociosqu ad litora torquent
                      per conubia nostra, per inceptos himenaeos. Nunc bibendum turpis eget erat volutpat, vel. </p>
                  </div>
                </div>
              </div>
              <div class="card col-sm-3">
                <div class="card-body">
                  <h5 class="card-title">Sima</h5>
                  <div class="scrollable">
                    <p class="card-text">This portion and only this portion will have a very long text so much so that the vertical scroll bar may appear when required. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue neque et sollicitudin blandit. Vivamus vestibulum
                      sed mauris a volutpat. Etiam quis arcu bendum turpis eget erat volutpat, vel. </p>
                  </div>
                </div>
              </div>
              <div class="card col-sm-3">
                <div class="card-body">
                  <h5 class="card-title">Lukho</h5>
                  <div class="scrollable">
                    <p class="card-text">This portion and only this portion will have a very long text so much so that the vertical scroll bar may appear when required. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue neque et sollicitudin blandit. Vivamus vestibulum
                      sed mauris a volutpat. Etiam quis arcu dictum, scelerisque ex sit amet, egestas eros. Sed convallis consectetur mauris, at fringilla mi gravida eu. Vivamus eu sagittis nulla. Vestibulum lobortis pretium metus, ut mattis libero aliquet ut. Sed
                      facilisis elementum dolor. Suspendisse euismod nunc malesuada, laoreet lectus egestas, auctor ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas odio nec ex suscipit vestibulum. Class aptent taciti sociosqu ad litora torquent
                      per conubia nostra, per inceptos himenaeos. Nunc bibendum turpis eget erat volutpat, vel. </p>
                  </div>
                </div>
              </div>  
              <div class="card col-sm-3">
                <div class="card-body">
                  <h5 class="card-title">Zizipho</h5>
                  <div class="scrollable">
                    <p class="card-text">This portion and only this portion will have a very long text so much so that the vertical scroll bar may appear when required. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue neque et sollicitudin blandit. Vivamus vestibulum
                      sed mauris a volutpat. Etiam quis arcu dictum, scelerisque ex sit amet, egestas eros. Sed convallis consectetur mauris, at fringilla mi gravida eu. Vivamus eu sagittis nulla. Vestibulum lobortis pretium metus, ut mattis libero aliquet ut. Sed
                      facilisis elementum dolor. Suspendisse euismod nunc malesuada, laoreet lectus egestas, auctor ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas odio nec ex suscipit vestibulum. Class aptent taciti sociosqu ad litora torquent
                      per conubia nostra, per inceptos himenaeos. Nunc bibendum turpis eget erat volutpat, vel. </p>
                  </div>
                </div>
              </div>  
       
        </div>
    </div>

    <!-- <a class="btn-float btn-lg"><i class="fa fa-plus text-white"></i></a> -->
      
</div>

<div class="button-pull">
<a data-toggle="modal" data-target="#add_user" class="pull-item nav-count-1"><i class="fa fa-user-plus"></i><span class="invisible">Add employee</span></a>
<a data-toggle="modal" data-target="#add_task" class="pull-item nav-count-2"><i class="fa fa-tasks"></i><span class="invisible">Add task</span></a>
<a data-toggle="modal" data-target="#add_client" class="pull-item nav-count-3"><i class="fa fa-user-tie"></i><span class="invisible">Add Client</span></a>
<a href="#toggle" class="mask"><i class="fa fa-plus"></i></a>
</div>

      <!-- user Modal -->
      <div class="modal fade add_user" role="dialog" id="add_user" data-backdrop="static" aria-labelledby="add_user" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="add_user">Employee</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <section class="user-section">
                  <div class="container">
                      <form class="p-3" method="POST">
                          <div class=" col-sm-offset-1 form-group">
                            <p>Add an employee</p>
                            <div class="input-group form-group">
                              <span class="input-group-addon">
                                <i class="fa fa-envelope fa-fw"></i>
                              </span>
                              <input class="form-control" type="text" placeholder="Email address" id="employee_email">
                            </div>
                            <div class="input-group form-group">
                              <span class="input-group-addon">
                                <i class="fa fa-user fa-fw"></i>
                              </span>
                              <input class="form-control" type="text" placeholder="First name" id="employee_fname">
                            </div>
                            <div class="input-group form-group">
                              <span class="input-group-addon">
                                <i class="fa fa-user fa-fw"></i>
                              </span>
                              <input class="form-control" type="text" placeholder="Last name" id="employee_lname">
                            </div>
                            <div class="input-group form-group">
                              <span class="input-group-addon">
                                <i class="fa fa-user-tag fa-fw"></i>
                              </span>
                              <select name="" id="employee_role" class=" form-control">
                                <option disabled selected>- Select type of user -</option>
                                <option>ADMIN USER</option>
                                <option>ORDINARY USER</option>
                              </select>
                            </div>
                            <div class="input-group form-group">
                                <div class="client_status"></div>
                            </div>
                          </div>
                      </form>
                 </div>
              </section>     
            </div>
            <div class="modal-footer">
              <button class="btn btn-tomato-o mr-3" id="save_user"> <i class="fa fa-plus mr-2" aria-hidden="true"></i>Save user</button>
            </div>
          </div>
        </div>
      </div>

      <!-- client Modal -->
      <div class="modal fade add_client" role="dialog" id="add_client" data-backdrop="static" aria-labelledby="add_client" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="add_client">Client</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <section class="client-section">
                  <div class="container">
                      <form class="p-3" method="POST">
                          <div class=" col-sm-offset-1 form-group">
                            <p>Add a Client</p>
                            <div class="input-group form-group">
                              <span class="input-group-addon">
                                <i class="fa fa-user fa-fw"></i>
                              </span>
                              <input class="form-control" type="text" placeholder="First name" id="client_fname">
                            </div>
                            <div class="input-group form-group">
                              <span class="input-group-addon">
                                <i class="fa fa-user fa-fw"></i>
                              </span>
                              <input class="form-control" type="text" placeholder="Last name" id="client_lname">
                            </div>
                          </div>
                      </form>
                 </div>
              </section>     
            </div>
            <div class="modal-footer">
              <button class="btn btn-tomato-o mr-3" id="save_client"> <i class="fa fa-plus mr-2" aria-hidden="true"></i>Save client</button>
            </div>
          </div>
        </div>
      </div>

      <!-- task Modal -->
      <div class="modal fade add_task" role="dialog" id="add_task" data-backdrop="static" aria-labelledby="add_task" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="add_task">Client</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <section class="task-section">
                  <div class="container">
                      <form class="p-3">
                          <div class=" col-sm-offset-1 form-group">
                            <p>Add a Client</p>
                            <div class="input-group form-group">
                              <span class="input-group-addon">
                                <label for="task_name">Task name</label>
                              </span>
                              <input class="form-control" type="text" name="task_name" placeholder="task name">
                            </div>
                            <div class="input-group form-group">
                              <span class="input-group-addon">
                                <label for="client_name">Client id</label>
                              </span>
                              <input class="form-control" type="text" placeholder="Search for a client" id="client_name">
                            </div>
                            <div class="clients_list">
                            </div>
                          </div>
                      </form>
                 </div>
              </section>     
            </div>
            <div class="modal-footer">
              <button class="btn btn-tomato-o mr-3" id="save_task"> <i class="fa fa-plus mr-2" aria-hidden="true"></i>Save Task</button>
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

