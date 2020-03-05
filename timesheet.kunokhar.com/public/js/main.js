/*===================================================================
                        PAGE LOADER
=====================================================================*/ 
window.onload = function()
{
    var url = window.location.href.split("/");
    page = url[url.length - 1].trim();

    switch(page)
    {
        case "home.php":
            if(sessionStorage.getItem('user_session') != null && sessionStorage.getItem('role') == 0)
            {
                this.load_employee_home();
                this.done_tasks();
            }else
            {
                load_login();
            }

        break;

        case "tasks.php":
            if(sessionStorage.getItem('user_session') != null)
            {
                this.done_tasks();
                this.view_tasks();
            }else
            {
                load_login();
            }

        break;

        case "admin.php":
            if(sessionStorage.getItem('user_session') != null && sessionStorage.getItem('role') == 1)
            {
                this.load_admin_home();
            }else
            {
                load_login();
            }
            
        break;
        case "clients.php":
            if(sessionStorage.getItem('user_session') != null)
            {
                this.loadTasks();
            }else
            {
                load_login();
            }
            
        break;
        case "index.php":
            if(sessionStorage.getItem('user_session') != null)
            {
               if(sessionStorage.getItem('role') == 1)
               {
                   window.location.href = "view/admin.php";
                   this.load_admin_home();
               }else if(sessionStorage.getItem('role') == 0)
               {
                    window.location.href = "view/home.php";
                    this.done_tasks();
                    this.home();               
               }
            }
        break;
        case "":
            if(sessionStorage.getItem('user_session') != null)
            {
               if(sessionStorage.getItem('role') == 1)
               {
                   window.location.href = "view/admin.php";
                   this.load_admin_home();
               }else if(sessionStorage.getItem('role') == 0)
               {
                    window.location.href = "view/home.php";
                    this.done_tasks();
                    this.home();               
               }
            }
        break;
        
    }
}


/*===================================================================
                        GLOBAL VARIABLES
=====================================================================*/

var task_array = [];
var tasks_count = [];
var get_id = null;
var email_exists = null;
var error = null;
var employee_role = null;
var count = 0;
var task_status = null;
var time_taken_for_this = null;
var time_started = null;
var second = 0; 
var minute = 0;
var hour = 0;
var t;
var time_taken = "00:00:00";

/*===================================================================
                        LOADER
=====================================================================*/
    function showLoader(){
        var loaderHtml = '<div id="loader"><div></div><div></div></div>';
        if ($('body').find('#loader').length == 0) {
            $('body').append(loaderHtml);
        }
        $("#loader").addClass("lds-ripple");
    }

    function hideLoader(){
        $("#loader").removeClass("lds-ripple");
    }

/*===================================================================
                        AUTHENTIFICATION
=====================================================================*/ 
//------------------------| VARIABLES |-----------------------------

//------------------------| LOGIN |-----------------------------
$("#btnLogin").click(function(event) 
{ //Fetch form to apply custom Bootstrap validation\r\n  
    event.preventDefault(); 
    event.stopPropagation(); 

    // if (navigator.geolocation) {
    //     navigator.geolocation.watchPosition(showPosition);
    // } else { 
    //     console.log("Geolocation is not supported by this browser.");
    // }

          
    //   function showPosition(position) {
    //     console.log(position.coords.latitude);
    //     console.log(position.coords.longitude);
    //   }
    var form = $("#formLogin");    
    if (form[0].checkValidity() === false) {
        event.preventDefault(); 
        event.stopPropagation();
    }else{
        form.addClass('was-validated');
        var email = $('#uname1').val();
        var password = $('#pwd1').val();

        $.ajax({
            url: "controller/controller.php",
            method: "POST",
            dataType: "json",
            data: {email: email, password: password, action: "login"}
        }).then(function(data){
            if(data.success){
                var d = new Date();
                sessionStorage.setItem('user_session', d.getTime());
                sessionStorage.setItem('session_id', data.id);
                sessionStorage.setItem('role', data.role);
                if(data.role == 1){
                    window.location.href = 'view/admin.php';
                }
                window.location.href = 'view/home.php';
                
            }else{
                console.log(data);
            }
        }).catch(function(error){
            console.log(error);
        });
    } 
     
});

//------------------------| LOGOUT |-----------------------------

$('#logout').on('click', function(e)
{
    e.preventDefault();
    sessionStorage.clear();
    load_login();
});

function load_login(){
    window.location.href = '../index.php';
}

/*===========================================================
                  All insertions - events
=============================================================*/

//------------------------| ADD EMPLOYEE |-----------------------------
$("#save_user").on('click', function(e){
    e.preventDefault();
    var email = $('#employee_email').val();
    var fname = $('#employee_fname').val();
    var lname = $('#employee_lname').val();

    if(validate_email(email) && fname.length >= 3 && lname.length >= 3 && email_exists == null){
        $('.client_status').empty();
        if(employee_role == null){
            $('#user-add-status').html('<div class="text-danger">Employee role is important</div>');
        }else{
            var password = "123";
            console.log(password);
            
            $.ajax({

                url:'../controller/controller.php',
                method: 'POST',
                data: {fname: fname, lname: lname, email: email, employee_role: employee_role, password: password, action: 'add_employee'},
                success: function(data)
                {
                    
                    if(data == 1){
                        $('#employee_email').val("");
                        $('#employee_fname').val("");
                        $('#employee_lname').val("");
                        $('#employee_role').children().first().attr("selected");
                        employee_role = null;
                        $('#user-add-status').html('<div class="text-success">User has been successfully added</div>');
                        load_admin_home();

                    }else{
                        $('#user-add-status').html(data);
                    }
                },

                error: function(data){
                    console.log(data);  
                }
            });
        }
    }else{
        $('#user-add-status').html('<div class="text-danger">All the fields are required</div>');
    }
});

//------------------------| ADD COMPANY TASKS |-----------------------------
$('.task-section').on('click', '#more-task', function(e){
    e.preventDefault();
    e.stopPropagation();
    var taskName = $('#task_name-'+count).val();
    console.log(taskName);
    
    var parent = $("#task_name-"+count).parent();

    if(taskName != null){
        $('#task-add-status').empty();
        if(taskName.length < 5){
            $('#task-add-status').html('<div class="text-danger">Task name should be at least 5 letters</div>');
        }else{
            
            $(this).attr("disabled", true);
            $.ajax({
                url: '../controller/controller.php',
                method: 'POST',
                data: {task_name: taskName, action: "add_task"},
                success: function(data)
                {
                    if(data == "1"){

                        parent.fadeOut(10000, function(){
                            setTimeout(function(){
                                parent.remove()
                            }, 1000);
                        });
                        $('#task-add-status').html("<div class='text-success'>Task successfully added</div>");

                    }else{
                        console.log(data);
                        
                    }
                }
            });

            count++;
            var inputField = '<div class="input-group form-group">\
                            <input class="form-control" type="text" id="task_name-'+count+'" name="task_name" placeholder="Task name">\
                            <button id="more-task" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i> </button>\
                        </div>';
            $('.modal-body .task-section .container .p-3 .col-sm-offset-1 p').after(inputField);

            
        }
    }else{
        $('#task-add-status').html('<div class="text-danger">Task name cannot be empty</div>');
    }


});

//------------------------| SAVE LAST TASK |-----------------------------
$('#save_task').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var taskName = $('#task_name-'+count).val();
    console.log(taskName);

    if(taskName != null){
        $('#task-add-status').empty();
        if(taskName.length < 5){
            $('#task-add-status').html('<div class="text-danger">Task name should be at least 5 letters</div>');
        }else{
            
            $(this).attr("disabled", true);
            $.ajax({
                url: '../controller/controller.php',
                method: 'POST',
                data: {task_name: taskName, action: "add_task"},
                success: function(data){
                    if(data == "1"){
                        $('#task_name-'+count).val("");
                        $('#task-add-status').html("<div class='text-success'>Task added successfully</div>");
                    }else{
                        console.log(data);
                        
                    }
                }
            }); 
        }
    }else{
        $('#task-add-status').html('<div class="text-danger">Task name cannot be empty</div>');
    }
});

//------------------------| ALLOCATE CLIENT |-----------------------------
$('#allocate_client').on('click', function(e){
    e.preventDefault();
    var fname = $('#client_fname').val();
    var lname = $('#client_lname').val();

    setTimeout(function(){
        var id = get_id;
        if(fname.length >= 3 && lname.length >= 3){
            if(id != null){
                if(task_array.length > 0){
                    for(var i = 0; i < task_array.length; i++){
                        $.ajax({
                            url: '../controller/controller.php',
                            method: 'POST',
                            data: {fname: fname, lname: lname, id: id, task_name: task_array[i], action: "allocate_client"}
                        }).then(function(data){
                            if(data == 1){
                                if(i == task_array.length){
                                    $('#client-add-status').html("<div class='text-success'>Client allocated successfully</div>");
                                    $('#client_fname').val("");
                                    $('#client_lname').val("");
                                    task_array = [];
                                    load_admin_home();
                                }
                            }else{
                                $('#client-add-status').html("<div class='text-danger'>Oops, error occured while allocating client</div>");
                                
                            }
                        }).catch(function(error){
                            $('#client-add-status').html("<div class='text-danger'>Oops, error occured while allocating client</div>");
                            
                        });
                    }
                }else{
                    $('#client-add-status').html("<div class='text-danger'>Add at least one task</div>");
                }
            }else{
                $('#client-add-status').html("<div class='text-danger'>Select an employee</div>");
            }
        }else{
            $('#client-add-status').html("<div class='text-danger'>Both first and last name should be at least 3 letters</div>");
        }
    

    },2500);

});

/*===========================================================
                  All insertions - functions
=============================================================*/

function add_start_task_time(modal_id){
    $.ajax({
        url: '../controller/controller.php',
        method: 'POST',
        data: {task_id: modal_id, action: 'add_task_start_time'}
    }).then(function(data){
        if(data == 1){
            $('.task-status').empty();
            $('.task-status').append("<div class='text-success'>task started succefully!!!</div>");
        }else{
            $('.task-status').empty();
            $('.task-status').append("<div class='text-tomato'>Oops, error ocurred while starting task</div>");
        }
    }).catch(function(error){
        console.error(error.responseText);
    });
}

function add_end_task_time(modal_id, time_taken, comment){
    $.ajax({
        url: '../controller/controller.php',
        method: 'POST',
        data: {task_id: modal_id, task_time_taken: time_taken, task_comment: comment, action: 'add_task_end_time'}
    }).then(function(data){
        if(data == 1){
            $('.task-status').empty();
            $('.task-status').append("<div class='text-success'>task is done</div>");
        }else{
            $('.task-status').empty();
            $('.task-status').append("<div class='text-tomato'>Oops, could not save done task</div>");
        }
    }).catch(function(error){
        console.error(error.responseText);
    });
}

function add_pause_task_time(modal_id, exact_time_taken){
    $.ajax({
        url: '../controller/controller.php',
        method: 'POST',
        data: {task_id: modal_id, task_time_taken: exact_time_taken, action: 'add_task_pause'}
    }).then(function(data){
        if(data == 1){
            $('.task-status').empty();
            $('.task-status').append("<div class='text-success'>task is paused</div>");
        }else{
            $('.task-status').empty();
            $('.task-status').append("<div class='text-tomato'>Oops, error ocurred while pausing task</div>");
        }
    }).catch(function(error){
        console.error(error.responseText);
    });
}

/*============================================================
                        All Views
==============================================================*/

//=====================|| EVENTS ||=============================

//<<<<<<<<<<<<<<<<< GET CLIENTS ON KEY UP |>>>>>>>>>>>>>>>>>>>>>


$('.pause-task').hide();
$(()=>{
    var modal_id = null;

    $('#all_views').on('click', function(e){
        e.preventDefault(); 
        e.stopPropagation();
    });


//<<<<<<<<<< DISPLAYS TASKS OF THE CLIENT ALLOCATED TO THE EMPLOYEE >>>>>>>>>>>>>>>>>
    $('#all_views').on('click', '.client-view', function(e){
        e.preventDefault();
        e.stopPropagation();
        let id = $(this).attr('id');
        
        sessionStorage.setItem('task_id', id);
        window.location.href = "tasks.html";
    });

//<<<<<<<<<<<<<<<<<<<<<<< SHOW A MODAL TO START A TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('#all_views').on('click','.card-body', '.task-view', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.show_start_task').attr('id', 'exampleModal'+sessionStorage.getItem('task_id'));
        $('#exampleModal'+sessionStorage.getItem('task_id')).modal("show");
        modal_id = sessionStorage.getItem('task_id');
    });

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< START A TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('.start-task').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        get_task(modal_id);
        setTimeout(function(){
            $('.close').hide(); 
            if(time_started == "NULL" || time_started == null){
                startTime();
                $('.start-task').hide();
                $('.pause-task').show();
                add_start_task_time(modal_id);
            }else{
                if(hour == 0 && minute == 0 && second == 0){
                    var time_str = time_taken_for_this;
                    var hr = time_str.slice(0, 2);
                    var ms = time_str.slice(3, 5);
                    var sc = time_str.slice(6, 8);
                    hour = parseInt(hr);
                    minute = parseInt(ms);
                    second = parseInt(sc);
                }
                $('.task-status').empty();
                $('.task-status').append("<div class='text-success'>Task resumed</div>");
                startTime();
                $('.start-task').hide();
                $('.pause-task').show();
            }    
        }, 1000);
    });

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PAUSE A TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('.pause-task').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        $('.close').show(); 
        stopTime();
        add_pause_task_time(modal_id, time_taken);
        $('.pause-task').hide();
        $('.start-task').show();
    });

//<<<<<<<<<<<<<<<<<<<<<<<<<<<< VERIFY A TASK COMMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('.task-comment textarea').on('keyup change focusout', function(){
        var comment = $('.task-comment textarea').val();
        if(comment.length < 10){
            $('.task-status').empty();
            $('.task-status').append("<div class='text-tomato'>Your comment should be at least 10 letters</div>");
        }else{
            $('.task-status').empty();
        }
    });

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE WITH A TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('#done_task').on('click', function(e){
        e.preventDefault();
        var comment = $('.task-comment textarea').val();

        if(comment.length < 10){
            $('.task-status').empty();
            $('.task-status').append("<div class='text-tomato'>Your comment should be at least 10 letters</div>");
        }else{
            if(hour == 0 && minute == 0 && second == 0){
                add_end_task_time(modal_id, time_taken, comment);
                $('.task-status').empty();
                $('.close').trigger('click'); 
                $('.tasks-to-do #tasks-admin-view').empty();
                $('.tasks-done').empty();
                time_taken = "00:00:00";
                loadTasks();
                
            }else{
                stopTime();
                add_end_task_time(modal_id, time_taken, comment);
                $('.task-status').empty();
                $('.close').trigger('click'); 
                $('.tasks-to-do #tasks-admin-view').empty();
                $('.tasks-done').empty();
                hour = 0;
                minute = 0; 
                second = 0;
                time_taken = "00:00:00";
                loadTasks();

            }

           
        } 
    });


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< GET CLIENT FROM SELECT >>>>>>>>>>>>>>>>>>>>>>>>
    $('#employee_list').change(function(e){
        var user = $(this).val();
        var get_fname = user.split(' ').slice(0, -1).join(' ');
        var get_lname = user.split(' ').slice(-1).join(' ');
        get_employee_id(get_fname, get_lname);
    });


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SELECT TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('#check-task').on('click', '#check', function(e)
    {
        e.stopPropagation();

        var checked = $(this).closest('.form-check-label').find('span')[0].innerHTML;
        if(task_array.includes(checked))
        {
            task_array.splice(task_array.indexOf(checked), 1);
            console.log(task_array);
        }else
        {
            task_array.push(checked);
            console.log(task_array); 
        }
    });

//<<<<<<<<<<<<<<<<<<<<<<<<<< VIEW CLIENT TASK ADMIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('#employee-with-clients').on('click', '.client-to-employee', function(e){
        e.stopPropagation();
        var fullname = $(this).text();
        var emp_name = $(this).closest('#employee_card').find('.card-title').text();
        console.log(emp_name);
        
        let user = $(this).closest('.emp-list').attr('id');
        sessionStorage.setItem('allocted_emp', user);
        sessionStorage.setItem('emp_name', emp_name);
        sessionStorage.setItem('client_name', fullname);
        window.location.href = "clients.php";
    });

//<<<<<<<<<<<<<<<<<<<<<<<<<< VIEW CLIENT TASKS EMPLOYEE >>>>>>>>>>>>>>>>>>>>>>>
    $('#emp-view-clients').on('click', '.client-view', function(e){
        e.stopPropagation();
        var name = $(this).children().first().text();
        var id =  sessionStorage.getItem("session_id");
        
        sessionStorage.setItem('client_name', name);
        sessionStorage.setItem('allocted_emp', id);
        sessionStorage.setItem('emp_name', "Me");
        window.location.href = "./clients.php";
        
    });

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< START TASK MODAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('#client_tasks').on('click', '#task-action', function(e){
        
        e.stopPropagation();
        $('.task-status').empty();
        if(sessionStorage.getItem('role') != 1){
            var task_id = $(this).find('p').text();
            var task_name = $(this).find('span').text();
            $('.show_start_task').attr('id', 'exampleModal'+task_id);
            $('#exampleModal'+task_id).find('h5').text(task_name);
            modal_id = task_id;
            get_task(modal_id);
            setTimeout(function(){
                if(time_started == "NULL" || time_started == null){
                    $('.time-show').empty();
                    $('.time-show').append("00:00:00");  
                    $('#exampleModal'+task_id).modal("show");
                }else{
                    $('.time-show').empty();
                    time_taken = time_taken_for_this;
                    $('.time-show').append(time_taken_for_this);
                    $('#exampleModal'+task_id).modal("show");
                }
            }, 2000);
        }else if(sessionStorage.getItem('role') == 1 && sessionStorage.getItem('session_id') == sessionStorage.getItem('allocted_emp')){
            var task_id = $(this).find('p').text();
            var task_name = $(this).find('span').text();
            $('.show_start_task').attr('id', 'exampleModal'+task_id);
            $('#exampleModal'+task_id).find('h5').text(task_name);
            modal_id = task_id;
            get_task(modal_id);
            setTimeout(function(){
                if(time_started == "NULL" || time_started == null){
                    $('.time-show').empty();
                    $('.time-show').append("00:00:00");  
                    $('#exampleModal'+task_id).modal("show");
                }else{
                    $('.time-show').empty();
                    time_taken = time_taken_for_this;
                    $('.time-show').append(time_taken_for_this);
                    $('#exampleModal'+task_id).modal("show");
                }
            }, 2000);
        }
    });

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CLOSE MODAL ACTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('.close').on('click', function(e){
        stopTime();
        $('.task-comment textarea').val("")
        second = 0;
        hour = 0;
        minute = 0;
        $('.time-show').empty();
        $('.time-show').text("00:00:00");
    })  
});


//=====================|| FUNCTIONS ||=============================
//<<<<< LOADS ALL THE CLIENTS ALLOCATED TO THE EMPLOYEE >>>>>>>>>>>


function load_employee_home()
{
    setTimeout(function(){
        $.ajax(
            {
                url: "../controller/controller.php",
                method: "POST",
                dataType: "json",
                data: {id: sessionStorage.getItem('session_id'), action: "get_clients"},
                success: function(data)
                {
                    var count = 0;
                    $('#all_views').find('ul').empty();
                    if(Object.entries(data).length !== 0 && data.constructor !== Object)
                    {           
                        $.each(data, function(key, client)
                        {
                            get_unattended_tasks(client.allocate_client_fname, client.allocate_client_lname);
                            setTimeout(function(){
                                var html = `<li class="list-group-item d-flex justify-content-between client-view"><span>${client.allocate_client_fname} ${client.allocate_client_lname}</span><span>${tasks_count[count]}</span></li>`;
                            
                                $('#all_views').find('ul').append(html);
                                count++;                           
                            },1000);
    
                        });
                    }else
                    {
                        $('#all_views').find('ul').append("<h3>No clients allocated for you</h3>");
                    }
    
                }
            });
    
    },1000);
}

function get_unattended_tasks(fname, lname){
    $.ajax({
        url: "../controller/controller.php",
        method: "POST",
        dataType: "json",
        data: {fname: fname, lname: lname, id: sessionStorage.getItem('session_id'),  action: "get_client_tasks"}
    }).then(function(data){
        var html = "";
        var count = 0;
        $('.tasks-to-do #tasks-admin-view').empty();

        if(Object.entries(data).length !== 0 && data.constructor !== Object){
            $.each(data, function(key, value){
                if(value.allocate_status == null){
                    ++count;
                    
                }
            });
            tasks_count.push(count);
             
        }
    }).catch(function(error){
        console.error(error.responseText);  
    });
   
}

//-----------------| SHOW ALL DONE TASKS DONE BY EMPLOYEE IN A DAY |---------------------
function done_tasks(){

    var id = sessionStorage.getItem('session_id');
    $.ajax({
        url: '../controller/controller.php',
        method: 'POST',
        dataType: 'json',
        data: {id: id, action: 'get_done_emp_tasks'}
    }).then(function(tasks){
        var count = 0;
        $('#done_tasks_only .tasks-done').empty();
        if(Object.entries(tasks).length !== 0 && tasks.constructor !== Object){
            $.each(tasks, function(key, task){
                var start_time = new Date(task.allocate_start_time);
                var end_time = new Date(task.allocate_end_time);
                var current_date = new Date();
                var d = end_time.getDate();
                var m = end_time.getMonth();
                var y = end_time.getFullYear();
                var start_hr = start_time.getHours();
                var start_ms = start_time.getMinutes();
                var end_hr = end_time.getHours();
                var end_ms = end_time.getMinutes();  

                if(current_date.getDate() == d && current_date.getMonth() == m && current_date.getFullYear() == y && task.allocate_status == "Done"){
                    html = `<div class="actual-task shadow">
                                <h4>${task.allocate_task_name}</h4>
                                <small>${start_hr}:${start_ms} - ${end_hr}:${end_ms}</small>
                                <small class="time-taken">Time Taken ${task.allocate_time_taken}</small>
                            </div>`;
                            count++;
                    
                    $('#done_tasks_only .tasks-done').append(html);
                }
            });

            if(count == 0){
                $('#done_tasks_only .tasks-done').append("<div>No tasks done yet!</div>");
            }
        }
    }).catch(function(error){
        console.log(error);
        
    });
}


//-------------------| SHOW ALL EMPLOYEES WITH CLIENTS LIST |--------------------


function load_admin_home()
{
    $.ajax({
        url: "../controller/controller.php",
        method: "POST",
        data: {action: "get_employees"},
        dataType: "json",
        success: function(data){
            var html = "";
            $(".container-fluid #employees_view .row").empty();
            if(Object.entries(data).length !== 0 && data.constructor !== Object){
                $.each(data, function(key, employee){
                    var html = `<div class="card" id="employee_card">
                                    <div class="card-body">
                                        <h5 class="card-title">${employee.emp_fname} ${employee.emp_lname}</h5>
                                        <div class="scrollable">
                                            <p class="card-text">
                                                <ol id="${employee.emp_id}" class="emp-list">
                                                    <p hidden>${employee.emp_id}</p>
                                                    ${load_clients_to_employee(employee.emp_id)}
                                                </ol>
                                            </p>
                                        </div>
                                    </div>
                               </div>`;
                    $(".container-fluid #employees_view .row").append(html);
                });
            }else{
                $(".container-fluid #employees_view .row").html("<h1>NO EMPLOYEES IN THE SYSTEM</h1>");
            } 
        }
    });

    $.ajax({
        url: '../controller/controller.php',
        method: 'POST',
        dataType: 'json',
        data: {action: 'get_tasks'},
        success: function(tasks){
            $('#add_client #check-task').empty();
            $.each(tasks, function(key, value){
                var html = `<div class="form-check">
                                <label class="form-check-label" for="check">
                                    <input type="checkbox" class="form-check-input" id="check" name="option2" value="">
                                    <span>${value.task_name}</span>
                                </label>
                            </div>`;
                $('#add_client #check-task').append(html);
            });
        }
    });

    $.ajax({
            url: '../controller/controller.php',
            method: 'POST',
            dataType: 'json',
            data: {action: 'get_employees'},
            success: function(employees){
                $('.client-section #employee_list').empty();
                $('.client-section #employee_list').append('<option selected disabled id="default">- Assign to -</option>');
                $.each(employees, function(key, value){
                    var html = "<option class='option-btn' id='"+value.emp_id+"'>"+value.emp_fname +" "+value.emp_lname+"</option>";
                    $('.client-section #employee_list').append(html);
                }); 
            }
        });
}

function loadTasks(){
    var fullname = sessionStorage.getItem('client_name');
    var fname = fullname.split(' ').slice(0, -1).join(' ');
    var lname = fullname.split(' ').slice(-1).join(' ');
    var id = sessionStorage.getItem('allocted_emp');
    setTimeout(function(){
        $('.client-name').find('h1').text(fullname);
        $('.client-name').find('b').text(sessionStorage.getItem('emp_name'));
    },2000);
    $.ajax({
        url: "../controller/controller.php",
        method: "POST",
        dataType: "json",
        data: {fname: fname, lname: lname, id: id,  action: "get_client_tasks"}
    }).then(function(data){
        
        var html = "";
        var task_done_check = 0;
        $('.tasks-to-do #tasks-admin-view').empty();
        $('.tasks-done').empty();
        if(Object.entries(data).length !== 0 && data.constructor !== Object){
            $.each(data, function(key, value){

                var start_time = new Date(value.allocate_start_time);
                var end_time = new Date(value.allocate_end_time);
                var current_date = new Date();
                var d = end_time.getDate();
                var m = end_time.getMonth();
                var y = end_time.getFullYear();
                var start_hr = start_time.getHours();
                var start_ms = start_time.getMinutes();
                var end_hr = end_time.getHours();
                var end_ms = end_time.getMinutes();  

                if(value.allocate_status != "Done"){
                    html = `<div id="task-action" class="py-2"><span>${value.allocate_task_name}</span><p hidden>${value.allocate_id}</p></div>`;
                    $('.tasks-to-do #tasks-admin-view').append(html);
                }

                if(current_date.getDate() == d && current_date.getMonth() == m && current_date.getFullYear() == y && value.allocate_status == "Done"){
                    html = `<div class="actual-task shadow">
                                <h4>${value.allocate_task_name}</h4>
                                <small>${start_hr}:${start_ms} - ${end_hr}:${end_ms}</small>
                                <small class="time-taken">Time taken ${value.allocate_time_taken}</small>
                            </div>`;
                    
                    $('.tasks-done').append(html);
                    task_done_check++;
                }
            });

            if(task_done_check == 0)
            {
                $('.tasks-done').append("No tasks done at the moment!");
            }
        }
    }).catch(function(error){
        console.error(error.responseText);  
    });
}

function get_employee_id(fname, lname){
    if(fname != null && lname != null){  
        $.ajax({
            url: '../controller/controller.php',
            method: 'POST',
            dataType: 'json',
            data: {fname: fname, lname: lname, action: 'get_employee'}
        
        }).then(function(res){
            if(res.success){
                get_id = res.id;
            }else{
                get_id = null;
            }
            
        });
    } 
}

function load_clients_to_employee(id){
    $.ajax({
        url: "../controller/controller.php",
        method: "POST",
        dataType: "json",
        data: {id: id, action: "get_clients"},
    }).then(function(data){
        $("#"+id).empty();
        if(Object.entries(data).length !== 0 && data.constructor !== Object){           
            var html = "";
            $.each(data, function(key, client){
                html = `<li class="client-to-employee">${client.allocate_client_fname} ${client.allocate_client_lname}</li>`;
                $("#"+id).append(html);
            });
        }else{
            $("#"+id).append('No client(s) allocated!');
        }
    }).catch(function(error){
        console.error(error);
    });
}

function get_task(task_id){
    $.ajax({
        url: '../controller/controller.php',
        method: 'POST',
        dataType: 'json',
        data: {task_id: task_id, action: 'get_task_by_id'}
    }).then(function(task){
        if(task.success){
            task_status = task.task_status;
            time_started = task.start_time;
            time_taken_for_this = task.time_taken;
        }else{
            console.log("error loading data");
        }

    }).catch(function(error){
        console.error(error);
    });
}

/*============================================================
                        All Edit
==============================================================*/


/*============================================================
                        All delete
==============================================================*/


/*============================================================
                        All validations
==============================================================*/



//====================|| EVENTS ||===============================

//<<<<<<<<<<<<<<<<<<<<< EMPLOYEE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$('#employee_role').on('change', function(e)
{
    employee_role = $('#employee_role').val();
});

$('#employee_email').on('keyup focusout', function(e)
{
    e.preventDefault();
    if(!validate_email($('#employee_email').val()))
    {
        $('#user-add-status').html('<div class="text-danger">A valid email address is like example@kunokhar.com</div>');
    }else
    {
        setTimeout(function()
        {
            email_availability($('#employee_email').val());
        }, 2000);

    }
});

$('#employee_fname').on('keyup focusout', function(e)
{
    e.preventDefault();

    if($('#employee_fname').val().length < 3)
    {
        $('#user-add-status').html('<div class="text-danger">Name should be at least 3 letters long</div>');
    }else
    {
        $('#user-add-status').html("");
    }
});

$('#employee_lname').on('keyup focusout', function(e)
{
    e.preventDefault();
    if($('#employee_lname').val().length < 3)
    {
        $('#user-add-status').html('<div class="text-danger">Name should be at least 3 letters long</div>');
    }else
    {
        $('#user-add-status').html("");
    }
});

//<<<<<<<<<<<<<<<<<<<<< TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

$('#task_name').on('keyup focusout', function(e)
{
    e.preventDefault();
    var taskName = $(this).val();
    if(taskName.length < 3)
    {
        $('#task-add-status').html("<div class='text-danger'>Task name should be at least four letters long</div>");
    }else
    {
        $('#task-add-status').html("");
    }
});

$('#client_name').on('keyup focusout', function(e)
{
    e.preventDefault();
    var clientName = $(this).val();
    if(clientName.length < 3)
    {
        $('#task-add-status').html("<div class='text-danger'>Task name should be at least four letters long</div>");
    }else
    {
        $('#task-add-status').html("");
    }
});

//====================|| FUNCTIONS ||============================

//<<<<<<<<<<<<<<<<<<<< EMPLOYEE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function validate_email(email)
{
  var mail = email.trim();

  if(mail.length >= 5)
  {
    var email_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email_test.test(String(mail).toLowerCase()))
    {
      error = "";
      return true;
    }else
    {
      error = "<div class='text-danger'>email address is like: example@organisation.com</div>";
      return false;
    }

  }else
  {
      error = "<div class='text-danger'>Email address should be at least 5 digits long</div>";
      return false;

  }
}

function email_availability(email)
{
    $.ajax(
    {
        url: "../controller/controller.php",
        method: 'POST',
        data: {email: email, action: 'check_email'},
        success: function(data)
        {
            
            if(data === "0")
            {
                $('#user-add-status').html('<div class="text-danger">Email address is already taken! try another one</div>');
                email_exists = "Email taken";
            }else
            {
                $('#user-add-status').html('');
                email_exists = null;
            }

        }
    });
}

/*============================================================
                        Other functions
==============================================================*/
//------------------| GENERATE PASSWORD |----------------------

function generate_password() 
{
    var numbers = "0123456789",
        plength = Number(10),
        userPassword = "",
        passwordCharSet = "";

    passwordCharSet = numbers;

    for (let i = 0; i < plength; i++) 
    {
        userPassword += passwordCharSet.charAt(
        Math.floor(Math.random() * passwordCharSet.length)
        );
    }
    return userPassword;
}

//-----------------------| TASK TIMER |----------------------------

function startTime() 
{
    $('.time-show').empty();
    $('.time-show').text(this.checkTime(this.get_hr(minute))+":"+this.checkTime(this.get_mins(second))+":"+this.checkTime(this.get_secs(second)));
    t = setTimeout(startTime, 1000);
}

function stopTime()
{
    $('.time-show').empty();
    time_taken = this.checkTime(this.get_hr(minute))+":"+this.checkTime(this.get_mins(second))+":"+this.checkTime(this.get_secs(second));
    $('.time-show').text(this.checkTime(this.get_hr(minute))+":"+this.checkTime(this.get_mins(second))+":"+this.checkTime(this.get_secs(second)));
    clearTimeout(t);
}

function checkTime(i) 
 {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function get_secs(s)
{
    if(s == 60)
    {
        second = 0;
        return second++;
    }else
    {
        return second++;
    }
}

function get_mins(s)
{
     if(s == 60)
     {
        second = 0;
        return minute++;
     }else
     {
         return minute;
     }
}

function get_hr(m)
{
     if(m == 60)
     {
        minute = 0;
        return hour++;
     }else
     {
         return hour;
     }
}

//-----------------------| BUTTON AT ADMIN CORNER |----------------------------
$(function() {
    App.init();
});
var App = {
    init: function() {
                this.side.nav(), this.search.bar(), this.navigation(), this.hyperlinks()
    },

    title: function(e) {
                return $(".header>.title").text(e)
    },
    side: {
                nav: function() {
                            this.toggle(), this.navigation()
                },
                toggle: function() {
                            $(".ion-ios-navicon").on("touchstart click", function(e) {
                                        e.preventDefault(), $(".sidebar").toggleClass("active"), $(".nav").removeClass("active"), $(".sidebar .sidebar-overlay").removeClass("fadeOut animated").addClass("fadeIn animated")
                            }), $(".sidebar .sidebar-overlay").on("touchstart click", function(e) {
                                        e.preventDefault(), $(".ion-ios-navicon").click(), $(this).removeClass("fadeIn").addClass("fadeOut")
                            })
                },
                navigation: function() {
                            $(".nav-left a").on("touchstart click", function(e) {
                                        e.preventDefault();
                                        var t = $(this).attr("href").replace("#", "");
                                        $(".sidebar").toggleClass("active"), $(".html").removeClass("visible"), "home" == t || "" == t || null == t ? $(".html.welcome").addClass("visible") : $(".html." + t).addClass("visible"), App.title($(this).text())
                            })
                }
    },
    search: {
                bar: function() {
                            $(".header .ion-ios-search").on("touchstart click", function() {
                                        var e = ($(".header .search input").hasClass("search-visible"), $(".header .search input").val());
                                        return "" != e && null != e ? (App.search.html($(".header .search input").val()), !1) : ($(".nav").removeClass("active"), $(".header .search input").focus(), void $(".header .search input").toggleClass("search-visible"))
                            }), $(".search form").on("submit", function(e) {
                                        e.preventDefault(), App.search.html($(".header .search input").val())
                            })
                },
                html: function(e) {
                            $(".search input").removeClass("search-visible"), $(".html").removeClass("visible"), $(".html.search").addClass("visible"), App.title("Result"), $(".html.search").html($(".html.search").html()), $(".html.search .key").html(e), $(".header .search input").val("")
                }
    },
    navigation: function() {
                $(".button-pull .mask").on("touchstart click", function(e) {
                            e.preventDefault(), $(this).parent().toggleClass("active")
                })
    },
    hyperlinks: function() {
                $(".button-pull .nav-item").on("click", function(e) {
                            e.preventDefault();
                            var t = $(this).attr("href").replace("#", "");
                            $(".html").removeClass("visible"), $(".html." + t).addClass("visible"), $(".nav").toggleClass("active"), App.title($(this).text())
                })
    }
};

//---------------------------- LOADER ---------------------------------


 