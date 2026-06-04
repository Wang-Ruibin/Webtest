package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.User;
import utils.DBUtils;

public class UserDao {

	// 判断用户是否存在
	public boolean userIsExist(String username) {
		Connection conn = DBUtils.getConnection();
		String sql = "select 1 from user where username = ?";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();
			boolean exist = rs.next();
			rs.close();
			ps.close();
			return exist;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(conn);
		}
		return false;
	}

	// 登录（只允许 status = 1）
	public User login(String username, String password) {
		Connection conn = DBUtils.getConnection();
		User user = null;
		String sql = "select * from user where username = ? and password = ? and status = 1";

		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			ps.setString(2, password);
			ResultSet rs = ps.executeQuery();

			if (rs.next()) {
				user = new User();
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getString("role"));
				user.setStatus(rs.getInt("status"));
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(conn);
		}
		return user;
	}

	// 注册用户（默认启用）
	public User register(String username, String password, String role) {
		Connection conn = DBUtils.getConnection();
		User user = null;

		try {
			if (!userIsExist(username)) {
				String sql = "insert into user(username,password,role,status) values(?,?,?,1)";
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, username);
				ps.setString(2, password);
				ps.setString(3, role);
				ps.executeUpdate();
				ps.close();

				user = new User();
				user.setUsername(username);
				user.setPassword(password);
				user.setRole(role);
				user.setStatus(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(conn);
		}
		return user;
	}

	// 分页查询
	public ArrayList<User> query_user(String search, int page, int limit) {
		Connection conn = DBUtils.getConnection();
		ArrayList<User> list = new ArrayList<>();
		String sql = "select * from user where username like ? order by username limit ?,?";

		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, "%" + search + "%");
			ps.setInt(2, (page - 1) * limit);
			ps.setInt(3, limit);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				User u = new User();
				u.setUsername(rs.getString("username"));
				u.setPassword(rs.getString("password"));
				u.setRole(rs.getString("role"));
				u.setStatus(rs.getInt("status"));
				list.add(u);
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(conn);
		}
		return list;
	}

	// 统计用户数
	public int count_user(String search) {
		Connection conn = DBUtils.getConnection();
		String sql = "select count(*) from user where username like ?";
		int count = 0;

		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, "%" + search + "%");
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				count = rs.getInt(1);
			}
			rs.close();
			ps.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(conn);
		}
		return count;
	}

	// 新增用户
	public int insert_user(String username, String password, String role, int status) {
		Connection conn = DBUtils.getConnection();
		String sql = "insert into user values(?,?,?,?)";
		int flag = 0;

		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			ps.setString(2, password);
			ps.setString(3, role);
			ps.setInt(4, status);
			flag = ps.executeUpdate();
			ps.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(conn);
		}
		return flag;
	}

	// 删除用户
	public int delete_user(String username) {
		Connection conn = DBUtils.getConnection();
		String sql = "delete from user where username = ?";
		int flag = 0;

		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			flag = ps.executeUpdate();
			ps.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(conn);
		}
		return flag;
	}

	// 修改用户
	public int alter_user(String oldUsername, String newUsername,
			String password, String role, int status) {
		Connection conn = DBUtils.getConnection();
		String sql = "update user set username=?, password=?, role=?, status=? where username=?";
		int flag = 0;

		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, newUsername);
			ps.setString(2, password);
			ps.setString(3, role);
			ps.setInt(4, status);
			ps.setString(5, oldUsername);
			flag = ps.executeUpdate();
			ps.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(conn);
		}
		return flag;
	}
}
