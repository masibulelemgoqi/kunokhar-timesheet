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
    <div id="snackbar"></div>
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
                <!-- Dynamic content goes here -->
    		</div>
    		<div class="paused-tasks">
    			<div class="daily-history">
                    <h3 class="w3-center">Paused Tasks</h3>
                    <div id="viewHistory">

                    </div>
                </div>
    		</div>
    	</div>
    </div>

    <script src="../public/js/jquery.js"></script>
    <script src="../public/js/bootstrap.min.js"></script>
    <script src="../public/css/fontawesome-free-5.12.1-web/js/all.min.js"></script>
    <script src="../public/js/main.js"></script>
    <script src="../public/js/moment.js"></script>
</body>
</html>