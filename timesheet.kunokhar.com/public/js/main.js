
/*===========================================================
                        All insertions
=============================================================*/



/*============================================================
                        All Views
==============================================================*/

window.onload = function()
{
    this.done_tasks();
    this.home();
}



$(()=>
{
    $('#all_views').on('click', function(e)
    {
        e.preventDefault(); 
        e.stopPropagation();
    });

    $('#all_views').on('click', '.client-view', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        let id = $(this).attr('id');
        view_tasks(id);
    
        
    });

    $('#all_views').on('click', '.task-view', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        let id = $(this).attr('id');
        console.log(id);
    
        
    });
    
    $('#all_views').on('click', '#to_home', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        home();
    });
    
});




function home()
{
 var html = `<div class="font-weight-bold client_head">CLIENTS</div>
                <div class="card mt-4 ml-4" style="width: 40rem;">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item d-flex justify-content-between client-view" id="1">Lucks Surname<span>14</span></li>
                      <li class="list-group-item d-flex justify-content-between client-view" id="2">Sma Verns<span>5</span></li>
                      <li class="list-group-item d-flex justify-content-between client-view" id="3">Zikile Surname<span>1</span></li>
                    </ul>
                </div>`;

    $('#all_views').empty();
    $('#all_views').append(html);

}

function view_tasks(id)
{
    var html = `<div id="to_home" class="m-3">back<div>
                <div class="font-weight-bold">client with id ${id}</div>
                <div class="card mt-4 ml-4" style="width: 40rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between task-view" id="1">Task 1</li>
                        <li class="list-group-item d-flex justify-content-between task-view" id="2">Task 2</li>
                        <li class="list-group-item d-flex justify-content-between task-view" id="3">Task 3</li>
                    </ul>
                </div>`;
    $('#all_views').empty();
    $('#all_views').append(html);

}


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
//generate password
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


 