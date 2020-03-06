<!DOCTYPE html>
<html>
<head>
	<title>Timesheet History</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link href="../public/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../public/css/style.css" rel="stylesheet" type="text/css">
    <link href="../public/css/fontawesome-free-5.12.1-web/css/all.min.css" type="text/css">
</head>
<body>
	<nav class="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <a class="navbar-brand ml-3" onclick="history.back(-1)" style="cursor: pointer;">
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

    <div id="task_history">
    	<div class="container">
    		<div class="page-title w3-card-4">
    			<h2>Tasks History</h2>
    			<div class="row">
    				<div class="col-sm-12">
    					<div class="daily">
    						<ul class="select-date">
	    						<li class="active-date">Today</li>
	    						<li>Yesterday</li>
	    						<li>Last 7 Days</li>
	    						<li>30 Days</li>
	    						<li>60 Days</li>
	    						<li>90 Days</li>
	    					</ul>
    					</div>
    					<!-- <div class="monthly">
    						<input type="month" value="2018-08">
    					</div> -->
    				</div>
    			</div>
    		</div>
    		<div class="content">
    			<div class="task">
	    			<div class="header">
	    				<h1>Client Name</h1>
	    				<small>Attended by <span>Employee Name</span></small>
	    			</div>
	    			<div class="date-and-time">
	    				<span>20/05/2015</span><br>
	    				<span>13:23 - 14:45</span><br>
	    				<span>Took 00:10:34</span>
	    			</div>
	    			<p>
	    				This is a comment that the employee write after attending a client. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	    			</p>
	    		</div>

	    		<div class="task">
	    			<div class="header">
	    				<h1>Client Name</h1>
	    				<small>Attended by <span>Employee Name</span></small>
	    			</div>
	    			<div class="date-and-time">
	    				<span>20/05/2015</span><br>
	    				<span>13:23 - 14:45</span><br>
	    				<span>Took 00:10:34</span>
	    			</div>
	    			<p>
	    				This is a comment that the employee write after attending a client. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	    			</p>
	    		</div>

	    		<div class="task">
	    			<div class="header">
	    				<h1>Client Name</h1>
	    				<small>Attended by <span>Employee Name</span></small>
	    			</div>
	    			<div class="date-and-time">
	    				<span>20/05/2015</span><br>
	    				<span>13:23 - 14:45</span><br>
	    				<span>Took 00:10:34</span>
	    			</div>
	    			<p>
	    				This is a comment that the employee write after attending a client. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	    			</p>
	    		</div>

	    		<div class="task">
	    			<div class="header">
	    				<h1>Client Name</h1>
	    				<small>Attended by <span>Employee Name</span></small>
	    			</div>
	    			<div class="date-and-time">
	    				<span>20/05/2015</span><br>
	    				<span>13:23 - 14:45</span><br>
	    				<span>Took 00:10:34</span>
	    			</div>
	    			<p>
	    				This is a comment that the employee write after attending a client. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	    			</p>
	    		</div>
    		</div>
    		<div class="paused-tasks">
    			<div class="daily-history">
                    <h3 class="w3-center">Paused Tasks</h3>
                	<div class="w3-dropdown-click" style="width: 100%;">
                		<div class="actual-task shadow" onclick="viewPausedComment()">
	                        <h4>Task Name</h4>
	                        <div class="client-attandee">
	                        	<small>Client: <span>Simamkele Ndabeni</span></small><br>
	                        	<small class="employee-name">Attendent by <span>Silindile Ngwane</span></small>
	                        </div>
	                    </div>
	                    <div id="pauseReason" class="w3-dropdown-content w3-bar-block w3-border" style="margin-top: 5px; padding: 0.3em">
	                    	<p>
	                    		This is a comment that the employee write after attending a client. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	                    	</p>
					    </div>
                	</div>
                </div>
    		</div>
    	</div>
    </div>

    <script src="../public/js/jquery.js"></script>
    <script src="../public/js/bootstrap.min.js"></script>
    <script src="../public/css/fontawesome-free-5.12.1-web/js/all.min.js"></script>
    <script src="../public/js/main.js"></script>
    <script type="text/javascript">
    	function viewPausedComment() {
			var x = document.getElementById("pauseReason");
			if (x.className.indexOf("w3-show") == -1) { 
				x.className += " w3-show";
			} else {
				x.className = x.className.replace(" w3-show", "");
			}
		} function viewPausedComment() {
	  		var x = document.getElementById("pauseReason");
	  		if (x.className.indexOf("w3-show") == -1) { 
	    		x.className += " w3-show";
	  		} else {
	    		x.className = x.className.replace(" w3-show", "");
	  		}
		}
    </script>
</body>
</html>