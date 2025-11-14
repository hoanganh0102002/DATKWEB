document.addEventListener('DOMContentLoaded', function() {   
        // 1. Tìm nút "Đăng xuất" bằng ID
        const logoutButton = document.getElementById('logout-button');
        // 2. Gán sự kiện "click"
        if (logoutButton) {
            logoutButton.addEventListener('click', function(event) { 
                // 3. Ngăn trang chuyển hướng ngay lập tức
                event.preventDefault(); 
                // 4. Xóa thông tin đăng nhập đã lưu trong localStorage
                localStorage.removeItem('loggedInUser');
                // (Nếu bạn có dùng userRole, hãy xóa cả nó)
                // localStorage.removeItem('userRole'); 
                // 5. Thông báo và chuyển về trang đăng nhập
                alert('Bạn đã đăng xuất.');
                // (Giả sử login.html cùng thư mục /user)
                window.location.href = 'login.html'; 
            });
        }
    });