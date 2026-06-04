# 🌸 学生信息管理系统

> 河海大学 2023 级 Web 技术课程考试项目

一个基于 Java Servlet + JSP 的学生信息管理系统，支持用户注册登录、学生/专业信息的增删改查～

## ✨ 功能特性

- 🔐 用户注册与登录（角色区分：管理员 / 普通用户）
- 👨‍🎓 学生信息管理（查看、新增、修改、删除）
- 🎓 专业信息管理（查看、新增、修改、删除）
- 👤 用户信息管理（管理员专属）

## 🛠️ 技术栈

| 层次 | 技术 |
|------|------|
| 前端 | HTML + CSS + jQuery |
| 后端 | Java Servlet + JSP |
| 数据库 | MySQL |
| 构建工具 | Maven |

## 📁 项目结构

```
StudentManagement/
├── src/main/java/
│   ├── dao/          # 数据访问层
│   ├── model/        # 实体类
│   ├── service/      # Servlet 控制层
│   └── utils/        # 工具类（数据库连接）
├── src/main/webapp/
│   ├── css/          # 样式文件
│   ├── js/           # 脚本文件
│   ├── images/       # 图片资源
│   ├── login.html    # 登录页
│   ├── register.html # 注册页
│   ├── user.jsp      # 用户界面
│   ├── admin.jsp     # 管理员界面
│   └── message.jsp   # 消息提示页
└── pom.xml
```

## 🎬 演示视频

项目根目录下的 `演示视频.mp4` 包含完整的功能演示～

## 🚀 快速开始

1. 导入数据库脚本 `create_database_schema.sql`
2. 修改 `utils/DBUtils.java` 中的数据库连接信息
3. 使用 Maven 打包：`mvn package`
4. 将生成的 `war` 包部署到 Tomcat 服务器
5. 访问 `http://localhost:8080/StudentManagement/login.html`

## 📝 致谢 & License

本项目改编自 [Soarkey/StudentManagement](https://github.com/Soarkey/StudentManagement)，基于 [MIT License](LICENSE) 开源，感谢原作者的开源贡献 💖

---

<div align="center">

**如果觉得还不错，就点个 ⭐ 鼓励一下叭～ (◕ᴗ◕✿)**

</div>
