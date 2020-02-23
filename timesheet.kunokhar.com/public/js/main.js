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
            this.done_tasks();
            this.home();
        break;

        case "tasks.php":
            this.done_tasks();
            this.view_tasks();
        break;

        case "admin.php":
            this.load_employees_with_their_client();
        break;
        
    }
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
     var form = $("#formLogin");    
     if (form[0].checkValidity() === false) 
    {
        event.preventDefault(); 
        event.stopPropagation();
    }else
    {
        form.addClass('was-validated');
        var email = $('#uname1').val();
        var password = $('#pwd1').val();

        $.ajax(
        {
            url: "controller/controller.php",
            method: "POST",
            data: {email: email, password: password, action: "login"},
            success: function(data)
            {
                if(data === null)
                {
                    console.log(data);
                    
                }else
                {
                    console.log("incorrect credentials");
                    
                }

            }

        });
    } 
     
});

//------------------------| LOGOUT |-----------------------------

$('#logout').on('click', function(e)
{
    e.preventDefault();
});



/*===========================================================
                  All insertions - events
=============================================================*/

//------------------------| ADD EMPLOYEE |-----------------------------
$("#save_user").on('click', function(e)
{
    e.preventDefault();
    var email = $('#employee_email').val();
    var fname = $('#employee_fname').val();
    var lname = $('#employee_lname').val();

    if(validate_email(email) && fname.length >= 3 && lname.length >= 3 && email_exists == null)
    {
        $('.client_status').empty();
        if(employee_role == null)
        {
            $('#user-add-status').html('<div class="text-danger">Employee role is important</div>');
        }else
        {
            var password = generate_password();
            console.log(password);
            
            $.ajax(
            {
                url:'../controller/controller.php',
                method: 'POST',
                data: {fname: fname, lname: lname, email: email, employee_role: employee_role, password: password, action: 'add_employee'},
                success: function(data)
                {
                    
                    if(data == 1)
                    {
                        $('#employee_email').val("");
                        $('#employee_fname').val("");
                        $('#employee_lname').val("");
                        $('#employee_role').children().first().attr("selected");
                        employee_role = null;
                        $('#user-add-status').html('<div class="text-success">User has been successfully added</div>');

                    }else
                    {
                        $('#user-add-status').html(data);
                    }
                },

                error: function(data)
                {
                    console.log(data);
                    
                }
            });
        }

    }else
    {
        
        $('#user-add-status').html('<div class="text-danger">All the fields are required</div>');
    }
    
});


//------------------------| ADD CLIENT |-----------------------------
$('#save_client').on('click', function(e)
{
    e.preventDefault();
    var fname = $('#client_fname').val();
    var lname = $('#client_lname').val();
    if(fname.length >= 3 && lname.length >= 3)
    {
        $.ajax(
        {
            url: '../controller/controller.php',
            method: 'POST',
            data: {fname: fname, lname: lname, action: "add_client"},
            success: function(data)
            {
                console.log(data);
                
            }
        });
    }else
    {
        console.log("error");
        
    }
});

//------------------------| ADD TASK |-----------------------------

var client_id = null;

$('#save_task').on('click', function(e)
{
    var taskName = $('#task_name').val();
    $.ajax(
    {
        url: '../controller/controller.php',
        method: 'POST',
        data: {client_id: client_id, task_name: taskName, task_deadline: task_deadline, task_importance: task_importance, action: "add_task"},
        success: function(data)
        {
            if(data == "1")
            {
                $('#task_name').val("");
                $('#task-deadline').val("");
                $('#task-importance').val("");
                task_importance = null;
                task_deadline = null;
                $('#task-add-status').html("<div class='text-success'>Task added successfully, you can add another one</div>");

            }else
            {
                $('#task-add-status').html(data);
            }
        }
    });
    
});

/*===========================================================
                  All insertions - functions
=============================================================*/

/*============================================================
                        All Views
==============================================================*/

//=====================|| EVENTS ||=============================

//<<<<<<<<<<<<<<<<< GET CLIENTS ON KEY UP |>>>>>>>>>>>>>>>>>>>>>
$('#clients_list').hide();
$('#client_name').on('keyup', function()
{
    var name = $('#client_name').val();
    
    $.ajax(
    {
        url: '../controller/controller.php',
        method: 'POST',
        data:{name: name, action: 'get_client'},
        success: function(data)
        {
            $('#clients_list').show();
            $('#clients_list').empty();
            $('#clients_list').append(data);
            
        }

    });

     
});

function getClient(id)
{
    
    $('#clients_list').on('click', '#client-'+id, function(e)
    {
        e.stopPropagation();
        var fullname = $(this).text();
        $('#clients_list').empty();
        $('#client_name').val(fullname);
        client_id = id;
        
    });
}


$('.pause-task').hide();
$(()=>
{
    var modal_id = "";

    $('#all_views').on('click', function(e)
    {
        e.preventDefault(); 
        e.stopPropagation();
    });


//<<<<<<<<<< DISPLAYS TASKS OF THE CLIENT ALLOCATED TO THE EMPLOYEE >>>>>>>>>>>>>>>>>>

    $('#all_views').on('click', '.client-view', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        let id = $(this).attr('id');
        sessionStorage.setItem('task_id', id);
        window.location.href = "tasks.html";
    });

//<<<<<<<<<<<<<<<<<<<<<<< SHOW A MODAL TO START A TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    $('#all_views').on('click','.card-body', '.task-view', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        $('.show_start_task').attr('id', 'exampleModal'+sessionStorage.getItem('task_id'));
        $('#exampleModal'+sessionStorage.getItem('task_id')).modal("show");
        modal_id = sessionStorage.getItem('task_id');
    
        
    });


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< START A TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    $('.start-task').on('click', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        
        $('.close').hide(); 
        startTime();
        $('.start-task').hide();
        $('.pause-task').show();
        $('.toast').toast('show');
        

    });


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PAUSE A TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    $('.pause-task').on('click', function(e)
    {
        e.preventDefault();
        e.stopPropagation();

        $('.close').show(); 
        stopTime();
        $('.pause-task').hide();
        $('.start-task').show();
        

    });


//<<<<<<<<<<<<<<<<<<<<<<<<<<<< VERIFY A TASK COMMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    $('.task-comment textarea').on('keyup change focusout', function()
    {
        var comment = $('.task-comment textarea').val();
        if(comment.length < 10)
        {
            $('.task-status').empty();
            $('.task-status').append("<div class='text-tomato'>Your comment should be at least 10 letters</div>");
        }else
        {
            $('.task-status').empty();
        }
    });


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE WITH A TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    $('#done_task').on('click', function(e)
    {
        e.preventDefault();
        var comment = $('.task-comment textarea').val();

        if(comment.length < 10)
        {
            $('.task-status').empty();
            $('.task-status').append("<div class='text-tomato'>Your comment should be at least 10 letters</div>");
        }else
        {
            stopTime();
            $('.task-status').empty();
            $('.task-status').text(comment+"  =>"+checkTime(hour)+":"+checkTime(minute)+":"+checkTime(second));
            $('.close').show(); 
        }

        
    });

    
    
});



//=====================|| FUNCTIONS ||=============================
//<<<<< LOADS ALL THE CLIENTS ALLOCATED TO THE EMPLOYEE >>>>>>>>>>>


function home()
{
    
 var html = `<div class="font-weight-bold client_head">CLIENTS</div>
                <div class="card mt-4 ml-4" style="width: 40rem;">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item d-flex justify-content-between client-view" id="1">Lucks Surname<span>14</span></li>
                      <li class="list-group-item d-flex justify-content-between client-view" id="2">Sma Verns<span>5</span></li>
                      <li class="list-group-item d-flex justify-content-between client-view" id="3">Zikile Surname<span>1</span></li>
                    </ul>
                </div>
                `;

    $('#all_views').empty();
    $('#all_views').append(html);

}


//--------------------------| VIEW ALL TASKS OF THE CLIENT ALLOCATED TO THE EMPLOYEE |--------------------


function view_tasks()
{
    var html = `<a id="to_home" class="m-3 ml-4" onclick="history.back(-1)"><i class="fa fa-angle-left"></i></a>
                <div class="font-weight-bold ml-4">client with id ${sessionStorage.getItem('task_id')}</div>
                <div class="card mt-4 ml-4 bg-chocolate" style="width: 40rem;">
                    <div class="card-body">
                        <a class="task-view" id="1" data-toggle="modal" data-target="#exampleModal"> This is some text within a card body. </a>
                    </div>
                </div>
                `;
    $('#all_views').empty();
    $('#all_views').append(html);

}


//-----------------| SHOW ALL DONE TASKS DONE BY EMPLOYEE IN A DAY |---------------------

function done_tasks()
{
    var html = `<div class="text-center font-weight-bold mb-4">DONE TASKS</div>
                    <div class="card mr-2">
                    <div class="card-body">
                        <div>
                            <i class="fas fa-tasks"></i> 
                            <span class="ml-2">Write a code</span>
                        </div>
                        <div>
                            <i class="fas fa-user-tie"></i> 
                            <span class="ml-2">Simamkele Ndabeni</span>
                        </div>
                        <div>
                            <i class="fas fa-hourglass-half"></i> 
                            <span class="font-italic text-muted ml-2">2 hours</span>  
                        </div> 
                        
                    </div>
                    </div>
                    <div class="card mt-3 mr-2">
                    <div class="card-body">
                        <div>
                            <i class="fas fa-tasks"></i> 
                            <span class="ml-2">Write a code</span>
                        </div>
                        <div>
                            <i class="fas fa-user-tie"></i> 
                            <span class="ml-2">Simamkele Ndabeni</span>
                        </div>
                        <div>
                            <i class="fas fa-hourglass-half"></i> 
                            <span class="font-italic text-muted ml-2">2 hours</span>  
                        </div> 
                        
                    </div>
                </div>`;

        $('#done_tasks_only').empty();
        $('#done_tasks_only').append(html);
}


//-------------------| SHOW ALL EMPLOYEES WITH CLIENTS LIST |--------------------


function load_employees_with_their_client()
{
    $.ajax(
    {
        url: "../controller/controller.php",
        method: "POST",
        data: {action: "get_employees"},
        dataType: "json",
        success: function(data)
        {
            // console.log(data);
            var html = "";
            if(Object.entries(data).length !== 0 && data.constructor !== Object)
            {
                $.each(data, function(key, employee)
                {
                    var html = `<div class="card col-sm-3">
                                    <div class="card-body">
                                    <h5 class="card-title">${employee.emp_fname} ${employee.emp_lname}</h5>
                                    <div class="scrollable">
                                        <p class="card-text">
                                        <ul class="list-unstyled text-center" id="employees_clients-${employee.emp_id}">
                                            ${load_clients_to_employee(employee.emp_id)}
                                        </ul>
                                        </p>
                                    </div>
                                    </div>
                               </div>`;
                    $(".container-fluid #employees_view .row").append(html);
                });
            }else
            {
                $(".container-fluid #employees_view .row").html("<h1>NO EMPLOYEES IN THE SYSTEM</h1>");
            }
            
        }

    });

}

function load_clients_to_employee(id)
{
    $.ajax(
    {
        url: "../controller/controller.php",
        method: "POST",
        dataType: "json",
        data: {id: id, action: "get_clients"},
        success: function(data)
        {
            $("#employees_clients-"+id).empty();
            if(Object.entries(data).length !== 0 && data.constructor !== Object)
            {
                console.log("hello");
                
                var html = "";
                $.each(data, function(key, client)
                {
                    html = `<li class="border p-3 mb-2 clients-employee-li" onclick="client_byId(${client.client_id});">${client.client_fname} ${client.client_fname}</li>`;
                    $("#employees_clients-"+id).append(html);
                });
            }else
            {
                $("#employees_clients-"+id).append('<li class="p-3 mb-2 text-disable h5 text-uppercase">Employee currently has no client allocated to them!</li>');
            }
        }
    });

}

function client_byId(id)
{
    alert(id);
}

/*============================================================
                        All Views functions
==============================================================*/


/*============================================================
                        All Edit
==============================================================*/


/*============================================================
                        All delete
==============================================================*/


/*============================================================
                        All validations
==============================================================*/
//====================|| VARIABLES ||============================

var email_exists = null;
var task_deadline = null;
var task_importance = null;
var error = null;
var employee_role = null;


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

$('#task-deadline').on('change', function(e)
{
    e.preventDefault();
    task_deadline = $(this).val();

});

$('#task-importance').on('change', function(e)
{
    e.preventDefault();
    task_importance = $(this).val();

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

//<<<<<<<<<<<<<<<<<<<<<<<<<< TASK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/*============================================================
                        Other functions
==============================================================*/
//------------------| GENERATE PASSWORD |----------------------

function generate_password() 
{
    var lowercase = "abcdefghijklmnopqrstuvwxyz",
        uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers = "0123456789",
        punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=",
        plength = Number(10),
        userPassword = "",
        passwordCharSet = "";

    passwordCharSet = lowercase + uppercase + punctuation + numbers;

    for (let i = 0; i < plength; i++) 
    {
        userPassword += passwordCharSet.charAt(
        Math.floor(Math.random() * passwordCharSet.length)
        );
    }
    return userPassword;
}

//-----------------------| TASK TIMER |----------------------------

var second = 0; 
var minute = 0;
var hour = 0;
var t;
function startTime() 
{
    $('.time-show').empty();
    $('.time-show').text(this.checkTime(this.get_hr(minute))+":"+this.checkTime(this.get_mins(second))+":"+this.checkTime(this.get_secs(second)));
    t = setTimeout(startTime, 1000);
}

function stopTime()
{
    $('.time-show').empty();
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


 