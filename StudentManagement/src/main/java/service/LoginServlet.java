package service;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.UserDao;
import model.User;

public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        UserDao userDao = new UserDao();
        User user = userDao.login(username, password);

        // 登录成功（UserDao 已经限制 status = 1）
        if (user != null) {
            String role = user.getRole();

            if ("用户".equals(role)) {
                request.getSession().setAttribute("user", user);
                request.getRequestDispatcher("user.jsp").forward(request, response);
            } else if ("管理员".equals(role)) {
                request.getSession().setAttribute("admin", user);
                request.getRequestDispatcher("admin.jsp").forward(request, response);
            } else {
                // 角色异常兜底
                request.setAttribute("info", "错误：用户角色不合法");
                request.getRequestDispatcher("message.jsp").forward(request, response);
            }

        } else {
            // 登录失败：用户名/密码错误 或 账号被禁用
            request.setAttribute("info", "错误：用户名或密码错误，或账号已被禁用！");
            request.getRequestDispatcher("message.jsp").forward(request, response);
        }
    }
}
