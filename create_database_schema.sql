-- ==================================
-- 创建并选择数据库
-- ==================================
CREATE DATABASE IF NOT EXISTS StudentInfoManagement;

USE StudentInfoManagement;

-- ==================================
-- 删除旧表（按依赖反向）
-- ==================================
DROP TABLE IF EXISTS Student;

DROP TABLE IF EXISTS Department;

DROP TABLE IF EXISTS User;

-- ==================================
-- 建表
-- ==================================

-- 专业表
CREATE TABLE Department (
    Mno CHAR(12),
    Mname CHAR(12),
    CONSTRAINT PK_Department PRIMARY KEY (Mno)
);

-- 学生表（Major 改为外键，指向 Department.Mno）
CREATE TABLE Student (
    Sno CHAR(12),
    Sname CHAR(8),
    Ssex CHAR(2) CHECK (Ssex IN ('男', '女')),
    Major CHAR(12), -- 专业编号
    Memo VARCHAR(255),
    CONSTRAINT PK_Student PRIMARY KEY (Sno),
    CONSTRAINT FK_Student_Department FOREIGN KEY (Major) REFERENCES Department (Mno)
);

-- 用户表
CREATE TABLE User (
    username CHAR(12),
    password CHAR(12) NOT NULL,
    role CHAR(6) CHECK (role IN ('用户', '管理员')),
    status INT CHECK (status IN (0, 1)),
    CONSTRAINT PK_User PRIMARY KEY (username)
);

-- ==================================
-- 插入测试数据
-- ==================================

-- 专业表数据
INSERT INTO Department (Mno, Mname) VALUES ('201501', '工商管理');

INSERT INTO Department (Mno, Mname) VALUES ('201502', '市场营销');

INSERT INTO Department (Mno, Mname) VALUES ('201503', '会计学');

INSERT INTO Department (Mno, Mname) VALUES ('201504', '财务管理');

INSERT INTO Department (Mno, Mname) VALUES ('201505', '国际商务');

-- 学生表数据（Major 改为专业编号）
INSERT INTO
    Student (Sno, Sname, Ssex, Major, Memo)
VALUES (
        '2015010312',
        '张明',
        '男',
        '201501',
        '班长'
    );

INSERT INTO
    Student (Sno, Sname, Ssex, Major, Memo)
VALUES (
        '2015010313',
        '秦羽',
        '女',
        '201501',
        '学习委员'
    );

INSERT INTO
    Student (Sno, Sname, Ssex, Major, Memo)
VALUES (
        '2015010314',
        '刘翔',
        '男',
        '201502',
        ''
    );

-- 用户表数据
INSERT INTO
    User (
        username,
        password,
        role,
        status
    )
VALUES ('admin', '666', '管理员', 1);

INSERT INTO
    User (
        username,
        password,
        role,
        status
    )
VALUES ('user', '123', '用户', 1);