package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.Major;
import utils.DBUtils;

public class MajorDao {

    // 分页查询专业信息
    public ArrayList<Major> query_major(String search, int page, int limit) {
        Connection conn = DBUtils.getConnection();
        ArrayList<Major> list = new ArrayList<>();
        String sql = "select * from department where Mno like ? or Mname like ? order by Mno limit ?,?";

        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, "%" + search + "%");
            ps.setString(2, "%" + search + "%");
            ps.setInt(3, (page - 1) * limit);
            ps.setInt(4, limit);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Major m = new Major();
                m.setMno(rs.getString("Mno"));
                m.setMname(rs.getString("Mname"));
                list.add(m);
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

    // 统计专业数量
    public int count_major(String search) {
        Connection conn = DBUtils.getConnection();
        String sql = "select count(*) from department where Mno like ? or Mname like ?";
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

    // 插入专业信息
    public int insert_major(String mno, String mname) {
        Connection conn = DBUtils.getConnection();
        String sql = "insert into department values(?,?);";
        int flag = 0;
        try {
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(sql);
            ps.setString(1, mno);
            ps.setString(2, mname);
            flag = ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtils.closeConnection(conn);
        }
        return flag;
    }

    // 删除专业信息
    public int delete_major(String mno) {
        Connection conn = DBUtils.getConnection();
        String sql = "delete from department where mno = ?;";
        int flag = 0;
        try {
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(sql);
            ps.setString(1, mno);
            flag = ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtils.closeConnection(conn);
        }
        return flag;
    }

    // 修改专业信息
    public int alter_major(String mno, String after_mno, String after_mname) {
        Connection conn = DBUtils.getConnection();
        String sql = "update department set mno = ?,mname = ? where mno = ?;";
        int flag = 0;
        try {
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(sql);
            ps.setString(1, after_mno);
            ps.setString(2, after_mname);
            ps.setString(3, mno);
            flag = ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtils.closeConnection(conn);
        }
        return flag;
    }

    // 获取所有专业信息
    public ArrayList<Major> query_all_majors() {
        Connection conn = DBUtils.getConnection();
        String sql = "select * from department order by Mno;";
        ArrayList<Major> results = new ArrayList<Major>();
        try {
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Major temp = new Major();
                temp.setMno(rs.getString("Mno"));
                temp.setMname(rs.getString("Mname"));
                results.add(temp);
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtils.closeConnection(conn);
        }
        return results;
    }
}