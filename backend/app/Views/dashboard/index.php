<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <h2>Welcome, <?= session()->get('username') ?>! 👋</h2>
    <p>You are now logged in to the Inventory System.</p>
    <a href="/logout" class="btn btn-danger">Logout</a>
</div>
</body>
</html>