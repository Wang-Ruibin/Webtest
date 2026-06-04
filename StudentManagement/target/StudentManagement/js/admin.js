//折叠菜单效果
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
    }

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        var $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }
    }

    new Accordion($('#accordion'), false);
});

/*-------------------------全部信息-------------------------*/

function query_all(object) {
    if (object === 'user') {
        var result = document.getElementById("result");
        result.innerHTML = `
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="请输入用户名">
                <button id="searchButton">搜索</button>
            </div>
            <div id="tableContainer"></div>
            <div id="paginationContainer"></div>
        `;

        var currentPage = 1;
        var limit = 10;
        var search = '';

        function fetchData() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    var response = JSON.parse(xmlhttp.responseText);
                    renderTable(response.data);
                    renderPagination(response.count);
                }
            }
            var url = `/StudentManagement/AdminDao?action=query_all_user&search=${search}&page=${currentPage}&limit=${limit}`;
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

        function renderTable(data) {
            var tableContainer = document.getElementById("tableContainer");
            var table = '<table><thead><tr><th>用户名</th><th>密码</th><th>角色</th><th>状态</th></tr></thead><tbody>';
            for (var i = 0; i < data.length; i++) {
                var user = data[i];
                table += `<tr>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.role}</td>
                    <td>${user.status === 1 ? '可用' : '禁用'}</td>
                </tr>`;
            }
            table += '</tbody></table>';
            tableContainer.innerHTML = table;
        }

        function renderPagination(total) {
            var paginationContainer = document.getElementById("paginationContainer");
            var totalPages = Math.ceil(total / limit);
            if (totalPages === 0) {
                paginationContainer.innerHTML = '';
                return;
            }

            var pagination = `
                <button id="prevPageBtn" class="page-btn" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
                <span class="page-info">第 ${currentPage} 页 / 共 ${totalPages} 页</span>
                <button id="nextPageBtn" class="page-btn" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>
            `;

            paginationContainer.innerHTML = pagination;

            if (currentPage > 1) {
                document.getElementById('prevPageBtn').addEventListener('click', function () {
                    currentPage--;
                    fetchData();
                });
            }

            if (currentPage < totalPages) {
                document.getElementById('nextPageBtn').addEventListener('click', function () {
                    currentPage++;
                    fetchData();
                });
            }
        }

        document.getElementById('searchButton').addEventListener('click', function () {
            search = document.getElementById('searchInput').value;
            currentPage = 1;
            fetchData();
        });

        fetchData();

    } else if (object === 'major') {
        var result = document.getElementById("result");
        result.innerHTML = `
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="请输入专业编号或名称">
                <button id="searchButton">搜索</button>
            </div>
            <div id="tableContainer"></div>
            <div id="paginationContainer"></div>
        `;

        var currentPage = 1;
        var limit = 10;
        var search = '';

        function fetchData() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    var response = JSON.parse(xmlhttp.responseText);
                    renderTable(response.data);
                    renderPagination(response.count);
                }
            }
            var url = `/StudentManagement/AdminDao?action=query_all_major&search=${search}&page=${currentPage}&limit=${limit}`;
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

        function renderTable(data) {
            var tableContainer = document.getElementById("tableContainer");
            var table = '<table><thead><tr><th>专业编号</th><th>专业名称</th></tr></thead><tbody>';
            for (var i = 0; i < data.length; i++) {
                var major = data[i];
                table += `<tr>
                    <td>${major.mno}</td>
                    <td>${major.mname}</td>
                </tr>`;
            }
            table += '</tbody></table>';
            tableContainer.innerHTML = table;
        }

        function renderPagination(total) {
            var paginationContainer = document.getElementById("paginationContainer");
            var totalPages = Math.ceil(total / limit);
            if (totalPages === 0) {
                paginationContainer.innerHTML = '';
                return;
            }

            var pagination = `
                <button id="prevPageBtn" class="page-btn" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
                <span class="page-info">第 ${currentPage} 页 / 共 ${totalPages} 页</span>
                <button id="nextPageBtn" class="page-btn" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>
            `;

            paginationContainer.innerHTML = pagination;

            if (currentPage > 1) {
                document.getElementById('prevPageBtn').addEventListener('click', function () {
                    currentPage--;
                    fetchData();
                });
            }

            if (currentPage < totalPages) {
                document.getElementById('nextPageBtn').addEventListener('click', function () {
                    currentPage++;
                    fetchData();
                });
            }
        }

        document.getElementById('searchButton').addEventListener('click', function () {
            search = document.getElementById('searchInput').value;
            currentPage = 1;
            fetchData();
        });

        fetchData();
    } else if (object === 'student') {
        var result = document.getElementById("result");
        result.innerHTML = `
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="请输入学号或姓名">
                <button id="searchButton">搜索</button>
            </div>
            <div id="tableContainer"></div>
            <div id="paginationContainer"></div>
        `;

        var currentPage = 1;
        var limit = 10;
        var search = '';

        function fetchData() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    var response = JSON.parse(xmlhttp.responseText);
                    renderTable(response.data);
                    renderPagination(response.count);
                }
            }
            var url = `/StudentManagement/AdminDao?action=query_all_student&search=${search}&page=${currentPage}&limit=${limit}`;
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

        function renderTable(data) {
            var tableContainer = document.getElementById("tableContainer");
            var table = '<table><thead><tr><th>学号</th><th>姓名</th><th>性别</th><th>专业</th><th>备注</th></tr></thead><tbody>';
            for (var i = 0; i < data.length; i++) {
                var student = data[i];
                table += `<tr>
                    <td>${student.sno}</td>
                    <td>${student.sname}</td>
                    <td>${student.ssex}</td>
                    <td>${student.major}</td>
                    <td>${student.memo}</td>
                </tr>`;
            }
            table += '</tbody></table>';
            tableContainer.innerHTML = table;
        }

        function renderPagination(total) {
            var paginationContainer = document.getElementById("paginationContainer");
            var totalPages = Math.ceil(total / limit);
            if (totalPages === 0) {
                paginationContainer.innerHTML = '';
                return;
            }

            var pagination = `
                <button id="prevPageBtn" class="page-btn" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
                <span class="page-info">第 ${currentPage} 页 / 共 ${totalPages} 页</span>
                <button id="nextPageBtn" class="page-btn" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>
            `;

            paginationContainer.innerHTML = pagination;

            if (currentPage > 1) {
                document.getElementById('prevPageBtn').addEventListener('click', function () {
                    currentPage--;
                    fetchData();
                });
            }

            if (currentPage < totalPages) {
                document.getElementById('nextPageBtn').addEventListener('click', function () {
                    currentPage++;
                    fetchData();
                });
            }
        }

        document.getElementById('searchButton').addEventListener('click', function () {
            search = document.getElementById('searchInput').value;
            currentPage = 1;
            fetchData();
        });

        fetchData();
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                document.getElementById("result").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/StudentManagement/AdminDao?action=query_all_" + object, true);
        xmlhttp.send();
    }
}

function insert(object) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("result").innerHTML = xmlhttp.responseText;
        }
    }
    var url = null;
    if (object === "user") {
        var inputs = document.getElementById("show_insert_user").getElementsByTagName("input");
        var username = inputs[0].value;
        var password = inputs[1].value;
        var role = inputs[2].checked ? inputs[2].value : inputs[3].value;
        var status = inputs[4].checked ? inputs[4].value : inputs[5].value;
        url = "/StudentManagement/AdminDao?action=insert_user"
            + "&username=" + username
            + "&password=" + password
            + "&role=" + role
            + "&status=" + status;
    }
    else if (object == "major") {
        var major = document.getElementById("show_insert_major").getElementsByTagName("input");
        var mno = major[0].value.toString();
        var mname = major[1].value.toString();
        url = "/StudentManagement/AdminDao?action=insert_major&mno=" + mno + "&mname=" + mname;
    }
    else if (object == "student") {
        var studentForm = document.getElementById("show_insert_student");
        var inputs = studentForm.getElementsByTagName("input");
        var select = studentForm.getElementsByTagName("select")[0];
        var sno = inputs[0].value.toString();
        var sname = inputs[1].value.toString();
        var ssex = inputs[2].checked ? inputs[2].value : inputs[3].value;
        var major = select.value;
        var memo = inputs[4].value;
        url = `/StudentManagement/AdminDao?action=insert_student&sno=${sno}&sname=${sname}&ssex=${ssex}&major=${major}&memo=${memo}`;
    }
    else {
        url = "/StudentManagement/message.jsp";
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function show_delete(object) {
    var result = document.getElementById("result");
    var show = null;
    if (object == "user") {
        show = "<div id='delete_" + object + "'  class='d_form'>"
            + "<h3>请输入删除用户信息</h3>"
            + "<input type='text' autofocus='autofocus' name='username' value placeholder='用户名'  required>"
            + "<input id='submit' onclick='delete_user()' type='button' name='submit' value='删除'>"
            + "</div>";
    }
    else if (object == "major") {
        show = "<div id='delete_" + object + "'  class='d_form'>"
            + "<h3>请输入删除专业信息</h3>"
            + "<input type='text' autofocus='autofocus' name='mno' value placeholder='专业编号' required>"
            + "<input id='submit' onclick='delete_major()' type='button' name='submit' value='删除'>"
            + "</div>";
    }
    else if (object == "student") {
        show = "<div id='delete_student'  class='d_form'>"
            + "<h3>请输入删除学生信息</h3>"
            + "<input type='text' autofocus='autofocus' name='sno' value placeholder='学号' required>"
            + "<input id='submit' onclick='delete_student()' type='button' name='submit' value='删除'>"
            + "</div>";
    }
    result.innerHTML = show;
}

function show_alter(object) {
    var result = document.getElementById("result");
    var show = null;
    if (object == "user") {
    show = "<div id='alter_user' class='d_form'>"
        + "<h3>请输入需要修改的用户信息</h3>"
        + "<p>修改前</p>"
        + "<input type='text' autofocus='autofocus' name='username' placeholder='修改前用户名' required>"
        + "<p>修改后</p>"
        + "<input type='text' name='after_username' placeholder='用户名' required>"
        + "<input type='password' name='after_password' placeholder='密码（不修改可留空）'>"
        + "<p>角色</p>"
        + "<div class='radio'>"
        + "<input type='radio' name='after_role' value='用户' checked><span>用户</span>"
        + "<input type='radio' name='after_role' value='管理员'><span>管理员</span>"
        + "</div>"
        + "<p>状态</p>"
        + "<div class='radio'>"
        + "<input type='radio' name='after_status' value='1' checked><span>启用</span>"
        + "<input type='radio' name='after_status' value='0'><span>禁用</span>"
        + "</div>"
        + "<input id='submit' onclick='alter_user()' type='button' value='修改'>"
        + "</div>";
    }
    else if (object == "major") {
        show = "<div id='alter_major'  class='d_form'>"
            + "<h3>请输入需要修改的专业信息</h3>"
            + "<p>修改前</p>"
            + "<input type='text' autofocus='autofocus' name='mno' value placeholder='专业编号' required>"
            + "<p>修改后</p>"
            + "<input type='text' name='after_mno' value placeholder='专业编号' required>"
            + "<input type='text' name='after_mname' value placeholder='专业名称'>"
            + "<input id='submit' onclick='alter_major()' type='button' name='submit' value='修改'>"
            + "</div>";
    }
    else if (object == "student") {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var majors = JSON.parse(xmlhttp.responseText);
                var majorOptions = '';
                for (var i = 0; i < majors.length; i++) {
                    majorOptions += `<option value="${majors[i].mno}">${majors[i].mname}</option>`;
                }

                show = "<div id='alter_student'  class='d_form'>"
                    + "<h3>请输入需要修改的学生信息</h3>"
                    + "<p>修改前</p>"
                    + "<input type='text' autofocus='autofocus' name='sno' value placeholder='学号' required>"
                    + "<p>修改后</p>"
                    + "<input type='text' name='after_sno' value placeholder='学号' required>"
                    + "<input type='text' name='after_sname' value placeholder='姓名'>"
                    + "<p>性别</p>"
                    + "<div id='radio' class='radio'>"
                    + "<input type='radio' name='after_ssex' value='男' checked='checked'><span>男</span>"
                    + "<input type='radio' name='after_ssex' value='女'><span>女</span>"
                    + "</div>"
                    + "<p>专业</p>"
                    + `<select name='after_major'>${majorOptions}</select>`
                    + "<input type='text' name='after_memo' value placeholder='备注'>"
                    + "<input id='submit' onclick='alter_student()' type='button' name='submit' value='修改'>"
                    + "</div>";
                result.innerHTML = show;
            }
        }
        xmlhttp.open("GET", "/StudentManagement/AdminDao?action=get_all_majors", true);
        xmlhttp.send();
    }
    result.innerHTML = show;
}
/*------------------------------------显示插入-------------------------------*/
//显示插入用户
function show_insert_user() {
    var result = document.getElementById("result");
    var show = ""
        + "<div id='show_insert_user' class='d_form'>"
        + "<h3>请输入新增用户信息</h3>"
        + "<input type='text' name='username' placeholder='用户名' required>"
        + "<input type='password' name='password' placeholder='密码' required>"
        + "<p>角色</p>"
        + "<div class='radio'>"
        + "<input type='radio' name='role' value='用户' checked='checked'><span>用户</span>"
        + "<input type='radio' name='role' value='管理员'><span>管理员</span>"
        + "</div>"
        + "<p>状态</p>"
        + "<div class='radio'>"
        + "<input type='radio' name='status' value='1' checked='checked'><span>启用</span>"
        + "<input type='radio' name='status' value='0'><span>禁用</span>"
        + "</div>"
       + "<input id='submit' onclick=insert('user') type='button' name='submit' value='插入'>"
        + "</div>";
    result.innerHTML = show;
}

//显示插入专业
function show_insert_major() {
    var result = document.getElementById("result");
    var show = "<div id='show_insert_major'  class='d_form'>"
        + "<h3>请输入新增专业信息</h3>"
        + "<input type='text' autofocus='autofocus' name='mno' value placeholder='专业编号' required>"
        + "<input type='text' name='mname' value placeholder='专业名称'>"
        + "<input id='submit' onclick=insert('major') type='button' name='submit' value='插入'>"
        + "</div>";
    result.innerHTML = show;
}
//显示插入学生
function show_insert_student() {
    var result = document.getElementById("result");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var majors = JSON.parse(xmlhttp.responseText);
            var majorOptions = '';
            for (var i = 0; i < majors.length; i++) {
                majorOptions += `<option value="${majors[i].mno}">${majors[i].mname}</option>`;
            }

            var show = "<div id='show_insert_student'  class='d_form'>"
                + "<h3>请输入新增学生信息</h3>"
                + "<input type='text' autofocus='autofocus' name='sno' value placeholder='学号' required>"
                + "<input type='text' name='sname' value placeholder='姓名'>"
                + "<p>性别</p>"
                + "<div class='radio'>"
                + "<input type='radio' name='ssex' value='男' checked='checked'><span>男</span>"
                + "<input type='radio' name='ssex' value='女'><span>女</span>"
                + "</div>"
                + "<p>专业</p>"
                + `<select name='major'>${majorOptions}</select>`
                + "<input type='text' name='memo' value placeholder='备注'>"
                + "<input id='submit' onclick=insert('student') type='button' name='submit' value='插入'>"
                + "</div>";
            result.innerHTML = show;
        }
    }
    xmlhttp.open("GET", "/StudentManagement/AdminDao?action=get_all_majors", true);
    xmlhttp.send();
}
/*-------------------------------------删除------------------------------*/
//删除用户
function delete_user() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("result").innerHTML = xmlhttp.responseText;
        }
    }
    var username = document.getElementById("delete_user").getElementsByTagName("input")[0].value;
    xmlhttp.open("GET", "/StudentManagement/AdminDao?action=delete_user&username=" + username, true);
    xmlhttp.send();
}
//删除专业
function delete_major() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("result").innerHTML = xmlhttp.responseText;
        }
    }
    var all = document.getElementById("delete_major").getElementsByTagName("input");
    var mno = all[0].value.toString();
    var url = "/StudentManagement/AdminDao?action=delete_major&mno=" + mno;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//删除学生
function delete_student() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("result").innerHTML = xmlhttp.responseText;
        }
    }
    var all = document.getElementById("delete_student").getElementsByTagName("input");
    var sno = all[0].value.toString();
    var url = "/StudentManagement/AdminDao?action=delete_student&sno=" + sno;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
/*-----------------------------------修改---------------------------------*/
//修改用户
function alter_user() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("result").innerHTML = xmlhttp.responseText;
        }
    }

    var inputs = document.getElementById("alter_user").getElementsByTagName("input");

    var username = inputs[0].value;
    var after_username = inputs[1].value;
    var after_password = inputs[2].value;
    var after_role = inputs[3].checked ? inputs[3].value : inputs[4].value;
    var after_status = inputs[5].checked ? inputs[5].value : inputs[6].value;

    var url = "/StudentManagement/AdminDao?action=alter_user"
        + "&username=" + username
        + "&after_username=" + after_username
        + "&after_password=" + after_password
        + "&after_role=" + after_role
        + "&after_status=" + after_status;

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//修改专业
function alter_major() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("result").innerHTML = xmlhttp.responseText;
        }
    }
    var all = document.getElementById("alter_major").getElementsByTagName("input");
    var mno = all[0].value.toString();
    var after_mno = all[1].value.toString();
    var after_mname = all[2].value.toString();
    var url = "/StudentManagement/AdminDao?action=alter_major&mno=" + mno + "&after_mno=" + after_mno + "&after_mname=" + after_mname;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//修改学生
function alter_student() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("result").innerHTML = xmlhttp.responseText;
        }
    }
    var studentForm = document.getElementById("alter_student");
    var inputs = studentForm.getElementsByTagName("input");
    var select = studentForm.getElementsByTagName("select")[0];
    var sno = inputs[0].value.toString();
    var after_sno = inputs[1].value.toString();
    var after_sname = inputs[2].value.toString();
    var after_ssex = inputs[3].checked ? inputs[3].value : inputs[4].value;
    var after_major = select.value;
    var after_memo = inputs[5].value;
    var url = `/StudentManagement/AdminDao?action=alter_student&sno=${sno}&after_sno=${after_sno}&after_sname=${after_sname}&after_ssex=${after_ssex}&after_major=${after_major}&after_memo=${after_memo}`;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}