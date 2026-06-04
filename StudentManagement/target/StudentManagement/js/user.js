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
