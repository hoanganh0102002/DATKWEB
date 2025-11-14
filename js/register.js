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
    
    const registerForm = document.getElementById('register-form');
    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-password-confirm');
    const showPasswordCheckbox = document.getElementById('show-password');

    // 1. Chức năng "Hiện mật khẩu"
    showPasswordCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        passwordInput.type = isChecked ? 'text' : 'password';
        confirmPasswordInput.type = isChecked ? 'text' : 'password';
    });

    // 2. Chức năng "Đăng Ký"
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn form tải lại trang

        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Kiểm tra mật khẩu khớp
        if (password !== confirmPassword) {
            alert('Mật khẩu nhập lại không khớp!');
            return;
        }
        // Lấy danh sách users đã lưu (hoặc tạo mảng rỗng)
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // Kiểm tra tên đăng nhập tồn tại
        if (users.find(user => user.username === username)) {
            alert('Tên đăng nhập đã tồn tại.');
            return;
        }
        // Nếu mọi thứ OK, lưu user mới
        const newUser = { username, password };
        users.push(newUser);
        // Lưu mảng mới vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert('Đăng ký thành công! Sẽ chuyển đến trang Đăng nhập.');
        window.location.href = 'login.html'; // Tự động chuyển trang
    });
});