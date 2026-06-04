package service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.MajorDao;
import model.Major;
import dao.StudentDao;
import dao.UserDao;
import model.Student;
import model.User;

public class AdminDao extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	private String action;// 存储操作描述
	// 接收请求

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		action = request.getParameter("action");
		// 判断所执行操作
		switch (action) {
			// 用户操作
			case "query_all_user":
				query_all_user(request, response);
				break;
			case "insert_user":
				insert_user(request, response);
				break;
			case "delete_user":
				delete_user(request, response);
				break;
			case "alter_user":
				alter_user(request, response);
				break;
			// 专业操作
			case "query_all_major":
				query_all_major(request, response);
				break;
			case "insert_major":
				insert_major(request, response);
				break;
			case "delete_major":
				delete_major(request, response);
				break;
			case "alter_major":
				alter_major(request, response);
				break;
			case "get_all_majors":
				get_all_majors(request, response);
				break;
			// 学生操作
			case "query_all_student":
				query_all_student(request, response);
				break;
			case "insert_student":
				insert_student(request, response);
				break;
			case "delete_student":
				delete_student(request, response);
				break;
			case "alter_student":
				alter_student(request, response);
				break;
			default:
				break;
		}
	}

	/* ================= 用户 ================= */

	// 查询所有用户
	protected void query_all_user(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json;charset=utf-8");
		String search = request.getParameter("search");
		int page = Integer.parseInt(request.getParameter("page"));
		int limit = Integer.parseInt(request.getParameter("limit"));

		UserDao userDao = new UserDao();
		ArrayList<User> results = userDao.query_user(search, page, limit);
		int count = userDao.count_user(search);

		PrintWriter out = response.getWriter();
		StringBuilder json = new StringBuilder();
		json.append("{\"code\":0,\"msg\":\"\",\"count\":" + count + ",\"data\":[");
		for (int i = 0; i < results.size(); i++) {
			User u = results.get(i);
			json.append("{\"username\":\"" + u.getUsername() + "\",");
			json.append("\"password\":\"" + u.getPassword() + "\",");
			json.append("\"role\":\"" + u.getRole() + "\",");
			json.append("\"status\":" + u.getStatus() + "}");
			if (i < results.size() - 1) {
				json.append(",");
			}
		}
		json.append("]}");
		out.write(json.toString());
		out.close();
	}

	// 新增用户
	protected void insert_user(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");

		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String role = request.getParameter("role");
		String statusStr = request.getParameter("status");
		int status = 1; // 默认启用
		if (statusStr != null) {
			status = Integer.parseInt(statusStr);
		}

		int flag = new UserDao().insert_user(username, password, role, status);

		PrintWriter out = response.getWriter();
		out.write("<div class='error'>");
		out.write("<div>" + (flag == 1 ? "用户添加成功！" : "用户添加失败！") + "</div>");
		out.write("</div>");
		out.close();
	}

	// 删除用户
	protected void delete_user(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		String username = request.getParameter("username");

		int flag = new UserDao().delete_user(username);

		PrintWriter out = response.getWriter();
		out.write("<div class='error'>");
		out.write("<div>" + (flag == 1 ? "删除成功！" : "删除失败！") + "</div>");
		out.write("</div>");
		out.close();
	}

	// 修改用户
	protected void alter_user(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");

		String username = request.getParameter("username");
		String after_username = request.getParameter("after_username");
		String after_password = request.getParameter("after_password");
		String after_role = request.getParameter("after_role");
		int after_status = Integer.parseInt(request.getParameter("after_status"));
		

		int flag = new UserDao().alter_user(
				username,
				after_username,
				after_password,
				after_role,
				after_status);

		PrintWriter out = response.getWriter();
		out.write("<div class='error'>");
		out.write("<div>" + (flag == 1 ? "用户修改成功！" : "用户修改失败！") + "</div>");
		out.write("</div>");
		out.close();
	}

	/*-------------------------------- 专业-----------------------------------*/
	// 查询所有专业
	protected void query_all_major(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json;charset=utf-8");
		String search = request.getParameter("search");
		int page = Integer.parseInt(request.getParameter("page"));
		int limit = Integer.parseInt(request.getParameter("limit"));

		MajorDao majorDao = new MajorDao();
		ArrayList<Major> results = majorDao.query_major(search, page, limit);
		int count = majorDao.count_major(search);

		PrintWriter out = response.getWriter();
		StringBuilder json = new StringBuilder();
		json.append("{\"code\":0,\"msg\":\"\",\"count\":" + count + ",\"data\":[");
		for (int i = 0; i < results.size(); i++) {
			Major m = results.get(i);
			json.append("{\"mno\":\"" + m.getMno() + "\",");
			json.append("\"mname\":\"" + m.getMname() + "\"}");
			if (i < results.size() - 1) {
				json.append(",");
			}
		}
		json.append("]}");
		out.write(json.toString());
		out.close();
	}

	// 插入专业
	protected void insert_major(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		String mno = request.getParameter("mno");
		String mname = request.getParameter("mname");
		int flag = new MajorDao().insert_major(mno, mname);
		String info = null;
		PrintWriter out = response.getWriter();
		if (flag == 1) {
			info = "专业" + mname + "插入成功！";
		} else {
			info = "错误：专业插入失败！";
		}
		out.write("<div class='error'>");
		out.write("<div>" + info + "</div>");
		out.write("</div>");
		out.flush();
		out.close();
	}

	// 删除专业
	protected void delete_major(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		String mno = request.getParameter("mno");
		int flag = new MajorDao().delete_major(mno);
		String info = null;
		PrintWriter out = response.getWriter();
		if (flag == 1) {
			info = "成功删除" + mno + "号专业！";
		} else {
			info = "错误：删除专业失败！";
		}
		out.write("<div class='error'>");
		out.write("<div>" + info + "</div>");
		out.write("</div>");
		out.flush();
		out.close();
	}

	// 修改专业
	protected void alter_major(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		String mno = request.getParameter("mno");
		String after_mno = request.getParameter("after_mno");
		String after_mname = request.getParameter("after_mname");
		int flag = new MajorDao().alter_major(mno, after_mno, after_mname);
		String info = null;
		PrintWriter out = response.getWriter();
		if (flag == 1) {
			info = mno + "号专业修改成功！";
		} else {
			info = "错误：修改专业失败!";
		}
		out.write("<div class='error'>");
		out.write("<div>" + info + "</div>");
		out.write("</div>");
		out.flush();
		out.close();
	}

	// 获取所有专业
	protected void get_all_majors(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json;charset=utf-8");
		MajorDao majorDao = new MajorDao();
		ArrayList<Major> results = majorDao.query_all_majors();
		PrintWriter out = response.getWriter();
		StringBuilder json = new StringBuilder();
		json.append("[");
		for (int i = 0; i < results.size(); i++) {
			Major m = results.get(i);
			json.append("{\"mno\":\"" + m.getMno() + "\",");
			json.append("\"mname\":\"" + m.getMname() + "\"}");
			if (i < results.size() - 1) {
				json.append(",");
			}
		}
		json.append("]");
		out.write(json.toString());
		out.close();
	}

	/*-------------------------------- 学生-----------------------------------*/
	// 查询所有学生
	protected void query_all_student(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json;charset=utf-8");
		String search = request.getParameter("search");
		int page = Integer.parseInt(request.getParameter("page"));
		int limit = Integer.parseInt(request.getParameter("limit"));

		StudentDao studentDao = new StudentDao();
		ArrayList<Student> results = studentDao.query_student(search, page, limit);
		int count = studentDao.count_student(search);

		PrintWriter out = response.getWriter();
		StringBuilder json = new StringBuilder();
		json.append("{\"code\":0,\"msg\":\"\",\"count\":" + count + ",\"data\":[");
		for (int i = 0; i < results.size(); i++) {
			Student s = results.get(i);
			json.append("{\"sno\":\"" + s.getSno() + "\",");
			json.append("\"sname\":\"" + s.getSname() + "\",");
			json.append("\"ssex\":\"" + s.getSsex() + "\",");
			json.append("\"major\":\"" + s.getMajor() + "\",");
			json.append("\"memo\":\"" + s.getMemo() + "\"}");
			if (i < results.size() - 1) {
				json.append(",");
			}
		}
		json.append("]}");
		out.write(json.toString());
		out.close();
	}

	// 插入学生
	protected void insert_student(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		String sno = request.getParameter("sno");
		String sname = request.getParameter("sname");
		String ssex = request.getParameter("ssex");
		String major = request.getParameter("major");
		String memo = request.getParameter("memo");
		int flag = new StudentDao().insert_student(sno, sname, ssex, major, memo);
		String info = null;
		PrintWriter out = response.getWriter();
		if (flag == 1) {
			info = "学生" + sname + "插入成功！";
		} else {
			info = "错误：学生插入失败！";
		}
		out.write("<div class='error'>");
		out.write("<div>" + info + "</div>");
		out.write("</div>");
		out.flush();
		out.close();
	}

	// 删除学生
	protected void delete_student(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		String sno = request.getParameter("sno");
		int flag = new StudentDao().delete_student(sno);
		String info = null;
		PrintWriter out = response.getWriter();
		if (flag == 1) {
			info = "成功删除" + sno + "号学生！";
		} else {
			info = "错误：删除学生失败！";
		}
		out.write("<div class='error'>");
		out.write("<div>" + info + "</div>");
		out.write("</div>");
		out.flush();
		out.close();
	}

	// 修改学生信息
	protected void alter_student(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		String sno = request.getParameter("sno");
		String after_sno = request.getParameter("after_sno");
		String after_sname = request.getParameter("after_sname");
		String after_ssex = request.getParameter("after_ssex");
		String after_major = request.getParameter("after_major");
		String after_memo = request.getParameter("after_memo");
		int flag = new StudentDao().alter_student(sno, after_sno, after_sname, after_ssex, after_major, after_memo);
		String info = null;
		PrintWriter out = response.getWriter();
		if (flag == 1) {
			info = "学生" + sno + "信息修改成功！";
		} else {
			info = "错误：修改学生信息失败!";
		}
		out.write("<div class='error'>");
		out.write("<div>" + info + "</div>");
		out.write("</div>");
		out.flush();
		out.close();
	}

}
