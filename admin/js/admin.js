// Chờ cho toàn bộ nội dung trang được tải xong
document.addEventListener('DOMContentLoaded', function() {

    // Lấy "tấm vải" (canvas) mà chúng ta đã tạo
    const ctx = document.getElementById('customerDonutChart').getContext('2d');

    // 1. Dữ liệu (Data)
    const data = {
        // Chúng ta không cần labels vì chú thích đã ở ngoài
        // labels: ['Khách hàng mới', 'Khách hàng cũ'],
        datasets: [{
            data: [70, 30], // Dữ liệu %
            backgroundColor: [
                '#00bcd4', // Màu cho 70% (giống màu trong ảnh)
                '#f44336'  // Màu cho 30% (giống màu trong ảnh)
            ],
            borderColor: '#ffffff', // Màu viền ngăn cách
            borderWidth: 3,         // Độ dày viền
            // Cắt một lỗ ở giữa để nó thành 'doughnut'
            cutout: '80%' 
        }]
    };

    // 2. Cấu hình (Options)
    const options = {
        type: 'doughnut', // Loại biểu đồ là 'doughnut'
        data: data,       // Dữd liệu từ bên trên
        options: {
            responsive: true, // Tự co giãn theo container
            maintainAspectRatio: false, // Tắt duy trì tỷ lệ để vừa vặn
            plugins: {
                // Tắt chú thích (legend) mặc định của Chart.js
                // vì chúng ta đã tự tạo chú thích bằng HTML
                legend: {
                    display: false
                },
                tooltip: {
                    // Tắt tooltip khi di chuột vào
                    enabled: false
                }
            }
        }
    };

    // 3. Khởi tạo và vẽ biểu đồ
    new Chart(ctx, options);
    const ctxBar = document.getElementById('topBarChart').getContext('2d');
    new Chart(ctxBar, {
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [
                // Dataset 1: Các cột màu xanh
                {
                    type: 'bar', // Loại là 'bar'
                    label: 'Doanh số',
                    data: [350, 510, 480, 530, 600, 450], // Dữ liệu (tôi đoán từ ảnh)
                    backgroundColor: '#2196F3',
                    order: 2 // Ưu tiên hiển thị
                },
                // Dataset 2: Đường ngang màu cam
                {
                    type: 'line', // Loại là 'line'
                    label: 'Trung bình',
                    data: [500, 500, 500, 500, 500, 500], // Cùng 1 giá trị để tạo đường ngang
                    borderColor: '#FF9800',
                    borderWidth: 2,
                    pointRadius: 0, // Ẩn các điểm chấm
                    fill: false,
                    order: 1 // Ưu tiên hiển thị (đè lên trên cột)
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Ẩn chú thích (Monday, Tuesday...)
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value; // Thêm $ vào trục Y
                        }
                    }
                }
            }
        }
    });


    // === BIỂU ĐỒ KẾT HỢP (HÀNG DƯỚI) ===
    const ctxCombo = document.getElementById('comboChart').getContext('2d');
    
    // Dữ liệu (tôi đoán từ ảnh)
    const comboLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const barData = [5000000, 3000000, 6000000, 4500000, 2000000, 8000000, 3500000, 4000000, 5200000, 6800000, 7500000, 7200000];
    const lineData = [2.5, 1.5, 4, 2, 1, 6.5, 3, 2.5, 4.5, 6, 5.5, 5];

    new Chart(ctxCombo, {
        type: 'bar', // Loại mặc định là 'bar'
        data: {
            labels: comboLabels,
            datasets: [
                {
                    type: 'bar', // Biểu đồ cột
                    label: 'Doanh thu',
                    data: barData,
                    backgroundColor: '#2196F3',
                    yAxisID: 'y_doanhthu' // Gán vào trục Y bên trái
                },
                {
                    type: 'line', // Biểu đồ đường
                    label: 'Chạy Ads',
                    data: lineData,
                    borderColor: '#FF9800',
                    borderWidth: 2,
                    fill: false,
                    yAxisID: 'y_ads' // Gán vào trục Y bên phải
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom' // Chú thích ở bên dưới (giống ảnh)
                }
            },
            scales: {
                // Trục Y bên trái (cho Doanh thu)
                y_doanhthu: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return (value / 1000000) + 'tr'; // Hiển thị 5tr, 6tr...
                        }
                    }
                },
                // Trục Y bên phải (cho Ads)
                y_ads: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    // Ẩn lưới của trục Y thứ 2 để đỡ rối
                    grid: {
                        drawOnChartArea: false 
                    }
                }
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
        
        // 1. Tìm nút "Thoát" bằng ID
        const logoutButton = document.getElementById('logout-button');

        // 2. Gán sự kiện "click" cho nó
        if (logoutButton) {
            logoutButton.addEventListener('click', function(event) {
                // Ngăn chặn hành vi mặc định của thẻ <a> (ngăn nó nhảy trang)
                event.preventDefault(); 

                // 3. Xóa thông tin đăng nhập đã lưu
                localStorage.removeItem('loggedInUser');
                // (Nếu bạn có lưu 'userRole', hãy xóa cả nó)
                // localStorage.removeItem('userRole');

                // 4. Thông báo và chuyển hướng về trang đăng nhập
                alert('Bạn đã đăng xuất thành công!');
                
                // Đường dẫn về trang login (từ /admin/admin.html về /user/login.html)
                window.location.href = '../user/login.html'; 
            });
        }
    });