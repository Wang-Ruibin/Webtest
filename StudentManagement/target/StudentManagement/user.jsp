<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

	<jsp:useBean id="user" class="model.User" scope="session" />

	<% // 如果 session 里没有 user，直接跳转 if (user==null) { response.sendRedirect("login.html"); return; } %>

		<!DOCTYPE HTML>
		<html lang="zh">

		<head>
			<meta charset="UTF-8">
			<title>用户操作界面</title>
			<link rel="stylesheet" type="text/css" href="css/user&admin.css">
			<link rel="icon" type="image/x-ico" href="images/stu.ico">
		</head>

		<body>

			<header>
				<div class="title">
					<span>用户操作界面</span>
				</div>
				<nav>
					<div class="userinfo">
						<ul>
							<li>
								<%= user.getUsername() %>
							</li>
							<li>
								<%= user.getRole() %>
							</li>
							<li><a href="UserExitServlet">退出登录</a></li>
							<li><a href="login.html">返回首页</a></li>
						</ul>
					</div>
				</nav>
			</header>

			<main>
				<div class="container">
					<div class="select">
						<h3>请选择操作</h3>
						<ul id="accordion" class="accordion">

							<li>
								<div class="link">专业信息管理</div>
								<ul class="submenu">
									<li><a onclick="query_all('major')">查看所有专业</a></li>
								</ul>
							</li>

							<li>
								<div class="link">学生信息管理</div>
								<ul class="submenu">
									<li><a onclick="query_all('student')">查看所有学生</a></li>
								</ul>
							</li>

						</ul>
					</div>

					<div id="result" class="result">
						<p class="welcome">欢迎使用学生信息管理系统！</p>
					</div>
				</div>
			</main>

			<script src="js/jquery-3.1.1.min.js"></script>
			<script src="js/user.js"></script>

		</body>

		</html>