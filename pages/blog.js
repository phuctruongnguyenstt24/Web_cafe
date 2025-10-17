    // JavaScript riêng cho trang Blog
    document.addEventListener('DOMContentLoaded', function() {
      // Xử lý newsletter form
      const newsletterForm = document.querySelector('form');
      if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = this.querySelector('input[type="email"]').value;
          
          // Hiển thị thông báo thành công
          showAlert('Cảm ơn bạn đã đăng ký nhận tin!', 'success');
          this.reset();
        });
      }
      
      // Xử lý nút "Xem thêm bài viết"
      const loadMoreBtn = document.querySelector('.btn-outline-primary');
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
          this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang tải...';
          this.disabled = true;
          
          // Giả lập tải dữ liệu
          setTimeout(() => {
            showAlert('Đã tải thêm bài viết mới!', 'info');
            this.innerHTML = 'Xem Thêm Bài Viết';
            this.disabled = false;
          }, 2000);
        });
      }
      
      function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        alertDiv.style.zIndex = '1060';
        alertDiv.innerHTML = `
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Tự động xóa alert sau 4 giây
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
          }
        }, 4000);
      }
    });