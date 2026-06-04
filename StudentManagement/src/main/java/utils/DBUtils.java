package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtils {

	private static final String URL = "jdbc:mysql://localhost:3306/studentinfomanagement"
			+ "?useUnicode=true"
			+ "&characterEncoding=UTF-8"
			+ "&useSSL=false"
			+ "&serverTimezone=Asia/Shanghai";

	private static final String USER = "root"; // 改成你的数据库用户名
	private static final String PASSWORD = "qw12qw12@"; // 改成你的数据库密码

	static {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver"); // ✅ 新驱动
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static Connection getConnection() {
		try {
			return DriverManager.getConnection(URL, USER, PASSWORD);
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static void closeConnection(Connection conn) {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
