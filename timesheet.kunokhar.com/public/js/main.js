
$("#btnLogin").click(function(event) 
{ //Fetch form to apply custom Bootstrap validation\r\n   
     var form = $("#formLogin");    
     if (form[0].checkValidity() === false) 
     {
        event.preventDefault(); 
        event.stopPropagation();
    }  
     form.addClass('was-validated');
});

/*===========================================================
                        All insertions
=============================================================*/



/*============================================================
                        All Views
==============================================================*/

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                  FIRST THING THAT SHOWS ONCES AN EMPLOYEE LOGS IN
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
window.onload = function()
{
    var url = window.location.href.split("/");
    page = url[url.length - 1].trim();

    switch(page)
    {
        case "home.html":
            this.done_tasks();
            this.home();
        break;

        case "tasks.html":
            this.done_tasks();
            this.view_tasks();
        break;

        case "admin.html":
            this.load_employees_with_their_client();
        break;
        
    }

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

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                        DISPLAYS TASKS OF THE CLIENT ALLOCATED TO THE EMPLOYEE
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++

    $('#all_views').on('click', '.client-view', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        let id = $(this).attr('id');
        sessionStorage.setItem('task_id', id);
        window.location.href = "tasks.html";
    });
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                      SHOW A MODAL TO START A TASK
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
    $('#all_views').on('click','.card-body', '.task-view', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        $('.show_start_task').attr('id', 'exampleModal'+sessionStorage.getItem('task_id'));
        $('#exampleModal'+sessionStorage.getItem('task_id')).modal("show");
        modal_id = sessionStorage.getItem('task_id');
    
        
    });
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                        DISPLAYS HOME PAGE TO THE EMPLOYEE
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
    $('#all_views').on('click', '#to_home', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        home();
    });

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                        START A TASK
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
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

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                       PAUSE A TASK
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++

    $('.pause-task').on('click', function(e)
    {
        e.preventDefault();
        e.stopPropagation();

        $('.close').show(); 
        stopTime();
        $('.pause-task').hide();
        $('.start-task').show();
        

    });

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                        VERIFY A TASK COMMENT
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++

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

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                  DONE WITH A TASK
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
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



//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                   LOADS ALL THE CLIENTS ALLOCATED TO THE EMPLOYEE
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++

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

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                     VIEW ALL TASKS OF THE CLIENT ALLOCATED TO THE EMPLOYEE
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++

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

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                      SHOW ALL DONE TASKS DONE BY EMPLOYEE IN A DAY
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
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

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                      SHOW ALL EMPLOYEES WITH CLIENTS LIST
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++

function load_employees_with_their_client()
{

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


/*============================================================
                        Other functions
==============================================================*/
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                                  generate password
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
function generate() 
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

//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
//                                  TIME FUNCTIONS AND METHODS
//+-+-+-+-+-+-+-+-+-+-+-++-++-++-+-+-+--++-+-+-+++-+-+-++--++++-+--+-++-++-++++-+-++--++++-+--+-++-++-+++
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


 