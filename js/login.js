
(function initializeAdmin() {
    
    // 1. Lấy danh sách users hiện có từ localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 2. Thông tin tài khoản admin bạn muốn "gán cứng"
    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    // 3. Kiểm tra xem tài khoản 'admin' đã tồn tại trong mảng chưa
    const adminExists = users.find(user => user.username === adminUsername);

    // 4. Nếu admin CHƯA tồn tại:
    if (!adminExists) {
        // Tạo đối tượng admin mới
        const adminUser = {
            username: adminUsername,
            password: adminPassword
        };

        // Thêm admin vào mảng
        users.push(adminUser);

        // Lưu lại mảng (nay đã có admin) vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // (Tùy chọn) Báo cho bạn biết là đã tạo admin thành công
        console.log('Tài khoản admin (admin/admin123) đã được khởi tạo.');
    } else {
        // (Tùy chọn) Báo là admin đã có sẵn
        console.log('Tài khoản admin đã tồn tại.');
    }
})();
document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const showPasswordCheckbox = document.getElementById('show-password');
    showPasswordCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        passwordInput.type = isChecked ? 'text' : 'password';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn form submit
        const username = usernameInput.value;
        const password = passwordInput.value;
        // 1. Lấy danh sách users từ localStorage
        // 
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // 2. Tìm user
        const user = users.find(u => u.username === username && u.password === password);

        // 3. Kiểm tra kết quả
        if (user) {
            alert('Đăng nhập thành công! Chào mừng ' + user.username);
            // Lưu trạng thái đăng nhập
            localStorage.setItem('loggedInUser', user.username);
            
            // (Bạn có thể chuyển hướng về trang chủ ở đây)
            // window.location.href = 'index.html'; 
            if (user.username === 'admin') {
                // Nếu tên đăng nhập là 'admin', chuyển đến trang admin
                window.location.href = "admin.html";
            } else {
                // Nếu là user khác, chuyển đến trang chủ
                window.location.href = 'index.html';
            }
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không chính xác.');
        }
    });
});