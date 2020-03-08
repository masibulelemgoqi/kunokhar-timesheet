<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Timesheet | Tasks</title>
<link href="../public/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="../public/css/style.css" rel="stylesheet" type="text/css">
<link href="../public/css/fontawesome-free-5.12.1-web/css/all.min.css" type="text/css">
</head>
<body>

<nav class="navbar navbar-expand-sm fixed-top navbar-light bg-light">
  <a class="navbar-brand ml-3" onclick="history.back(-1)">
	<img src="../public/img/kunokharK.png" class="logo" alt="Kunokhar logo">
	<span>Timesheet</span>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="./profile.php"><i class="far fa-user fa-2x"></i><div>Profile</div></a>
      </li>

      <li class="nav-item">
        <a class="nav-link" id="logout"><i class="fas fa-sign-out-alt fa-2x"></i><div>Logout</div></a>
      </li>
	
    </ul>
  </div>
</nav>

<div class="container profile-container shadow-lg">
<div id="snackbar"></div>
    <div class="row">
        <div class="profile-inner">
            <h1 class="profile-fullname">Masibulele Mgoqi</h1>
            <div class="email-view">
                <i class="fa fa-envelope"></i> <span></span>
            </div>
            <div class="password-view pr-4 py-2 pl-2 mt-3 mb-3">
                <div class="password-caption">Change password</div>
                <label for="old-password">Old password</label>
                <input type="password" name="old-password" id="old-password" class="form-control" placeholder="Enter old password">
                <label for="new-password">new password</label>
                <input type="password" name="new-password" id="new-password" class="form-control" placeholder="Enter new password">
                <label for="confirm-password">confirm password</label>
                <input type="password" name="confirm-password" id="confirm-password" class="form-control" placeholder="Confirm password">
                <div class="d-flex justify-content-end mt-2">
                    <button class="save-password">Save</button>
                </div>
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

