package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.Student;
import utils.DBUtils;

public class StudentDao {
    // 分页查询学生信息
    public ArrayList<Student> query_student(String search, int page, int limit) {
        Connection conn = DBUtils.getConnection();
        String sql = "SELECT s.Sno, s.Sname, s.Ssex, d.Mname AS Major, s.Memo " +
                     "FROM student s LEFT JOIN department d ON s.Major = d.Mno " +
                     "WHERE s.sno LIKE ? OR s.sname LIKE ? " +
                     "ORDER BY s.sno LIMIT ?, ?";
        ArrayList<Student> results = new ArrayList<Student>();
        try {
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(sql);
            ps.setString(1, "%" + search + "%");
            ps.setString(2, "%" + search + "%");
            ps.setInt(3, (page - 1) * limit);
            ps.setInt(4, limit);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Student temp = new Student();
                temp.setSno(rs.getString("Sno"));
                temp.setSname(rs.getString("Sname"));
                temp.setSsex(rs.getString("Ssex"));
                temp.setMajor(rs.getString("Major"));
                temp.setMemo(rs.getString("Memo"));
                results.add(temp);
            }
            // 关闭资源
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtils.closeConnection(conn);
        }
        return results;
    }

    // 统计学生数量
    public int count_student(String search) {
        Connection conn = DBUtils.getConnection();
        String sql = "select count(*) from student where sno like ? or sname like ?";
        int count = 0;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, "%" + search + "%");
            ps.setString(2, "%" + search + "%");
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

    // 插入学生信息，返回一个int值表示状态,1：成功，0失败
    public int insert_student(String Sno, String Sname, String Ssex, String Major, String Memo) {
        Connection conn = DBUtils.getConnection();
        String sql = "insert into student values(?,?,?,?,?);";
        int flag = 0;
        try {
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(sql);
            ps.setString(1, Sno);
            ps.setString(2, Sname);
            ps.setString(3, Ssex);
            ps.setString(4, Major);
            ps.setString(5, Memo);
            flag = ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtils.closeConnection(conn);
        }
        return flag;
    }

    // 删除学生信息，返回一个int值表示状态,1：成功，0失败
    public int delete_student(String sno) {
        Connection conn = DBUtils.getConnection();
        String sql = "delete from student where sno = ?;";
        int flag = 0;
        try {
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(sql);
            ps.setString(1, sno);
            flag = ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtils.closeConnection(conn);
        }
        return flag;
    }

    // 修改学生信息，返回一个int值表示状态,1：成功，0失败
    public int alter_student(String sno, String after_sno, String after_sname, String after_ssex, String after_major, String after_memo) {
        Connection conn = DBUtils.getConnection();
        String sql = "update student set sno = ?,sname = ?,ssex = ?,major = ?,memo = ? where sno = ?;";
        int flag = 0;
        try {
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(sql);
            ps.setString(1, after_sno);
            ps.setString(2, after_sname);
            ps.setString(3, after_ssex);
            ps.setString(4, after_major);
            ps.setString(5, after_memo);
            ps.setString(6, sno);
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
