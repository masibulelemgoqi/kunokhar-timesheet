<!DOCTYPE html>
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

    <section id="client_tasks">
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <div class="tasks-to-do">
                    	<div class="client-name">
	                    	<h1>Sive Ndabeni</h1>
	                    	<span>Allocated to <b>Masibulele Mgoqi</b></span>
	                    </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="daily-history">
                    	<h3>Today</h3>
                    	<div class="tasks-done">
                    		<div class="actual-task shadow">
                    			<h4>Bookkeeping</h4>
                    			<small>13:45 - 15:22</small>
                    		</div>

                    		<div class="actual-task shadow">
                    			<h4>Requirements Gathering</h4>
                    			<small>08:10 - 09:43</small>
                    		</div>

                    		<div class="actual-task shadow">
                    			<h4>Web Development</h4>
                    			<small>10:00 - 12:15</small>
                    		</div>
                    	</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

	<script src="../public/js/jquery.js"></script>
    <script src="../public/js/bootstrap.min.js"></script>
    <script src="../public/css/fontawesome-free-5.12.1-web/js/all.min.js"></script>
    <script src="../public/js/main.js"></script>
</body>
</html>