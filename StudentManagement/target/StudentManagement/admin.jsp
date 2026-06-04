<%@page import="model.User" %>
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
		<!DOCTYPE HTML>
		<html lang="zh">

		<head>
			<meta charset="UTF-8">
			<title>管理员操作界面</title>
			<link rel="stylesheet" type="text/css" href="css/user&admin.css">
			<link rel="icon" type="image/x-ico" href="images/stu.ico">
		</head>

		<body>
			<% User user=(User) session.getAttribute("admin"); if(user !=null){ %>
				<header>
					<div class="title">
						<span>管理员操作界面</span>
					</div>
					<nav>
						<div class="userinfo">
							<ul>
								<li>
									<%=user.getUsername() %>
								</li>
								<li>
									<%=user.getRole() %>
								</li>
								<li><a href="UserExitServlet">退出登录</a></li>
								<li><a href="login.html">返回首页</a></li>
							</ul>
						</div>
					</nav>
				</header>

				<main>
					<% }else{ response.sendRedirect("login.html"); } %>

						<div class="container">
							<div class="select">
								<h3>请选择操作</h3>
								<ul id="accordion" class="accordion">

									<li>
										<div class="link">用户信息管理</div>
										<ul class="submenu">
											<li><a onclick="query_all('user')">查看所有用户</a></li>
											<li><a onclick="show_insert_user()">新增用户信息</a></li>
											<li><a onclick="show_delete('user')">删除指定用户</a></li>
											<li><a onclick="show_alter('user')">修改用户信息</a></li>
										</ul>
									</li>

									<li>
										<div class="link">专业信息管理</div>
										<ul class="submenu">
											<li><a onclick="query_all('major')">查看所有专业</a></li>
											<li><a onclick="show_insert_major()">新增专业信息</a></li>
											<li><a onclick="show_delete('major')">删除指定专业</a></li>
											<li><a onclick="show_alter('major')">修改专业信息</a></li>
										</ul>
									</li>

									<li>
										<div class="link">学生信息管理</div>
										<ul class="submenu">
											<li><a onclick="query_all('student')">查看所有学生</a></li>
											<li><a onclick="show_insert_student()">新增学生信息</a></li>
											<li><a onclick="show_delete('student')">删除指定学生</a></li>
											<li><a onclick="show_alter('student')">修改学生信息</a></li>
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
				<script src="js/admin.js"></script>
		</body>

		</html>