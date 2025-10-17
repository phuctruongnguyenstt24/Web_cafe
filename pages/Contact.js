  // JavaScript riêng cho trang Contact
    document.addEventListener('DOMContentLoaded', function() {
      const contactForm = document.getElementById('contactForm');
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu form
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value,
          newsletter: document.getElementById('newsletter').checked
        };
        
        // Hiển thị thông báo thành công
        showAlert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.', 'success');
        
        // Reset form
        contactForm.reset();
      });
      
      function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        alertDiv.style.zIndex = '1060';
        alertDiv.innerHTML = `
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Tự động xóa alert sau 5 giây
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
          }
        }, 5000);
      }
    });