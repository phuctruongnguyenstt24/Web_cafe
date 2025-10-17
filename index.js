    // JavaScript tối thiểu - chỉ những phần không thể thực hiện với Bootstrap
        document.addEventListener('DOMContentLoaded', function() {
            // Cart functionality
            const cartButton = document.getElementById('cart-button');
            const closeCart = document.getElementById('close-cart');
            const cartSidebar = document.getElementById('cart-sidebar');
            
            cartButton.addEventListener('click', function() {
                cartSidebar.classList.add('active');
            });
            
            closeCart.addEventListener('click', function() {
                cartSidebar.classList.remove('active');
            });
            
            // Modal functionality
            const loginButton = document.getElementById('login-button');
            const closeLogin = document.getElementById('close-login');
            const loginModal = document.getElementById('login-modal');
            
            loginButton.addEventListener('click', function() {
                loginModal.classList.add('active');
            });
            
            closeLogin.addEventListener('click', function() {
                loginModal.classList.remove('active');
            });
            
            // Contact modal functionality
            const contactButton = document.getElementById('contact-button');
            const closeContact = document.getElementById('close-contact');
            const contactModal = document.getElementById('contact-modal');
            
            contactButton.addEventListener('click', function() {
                contactModal.classList.add('active');
            });
            
            closeContact.addEventListener('click', function() {
                contactModal.classList.remove('active');
            });
            
            // Gallery slider functionality
            const galleryTrack = document.getElementById('gallery-track');
            const galleryPrev = document.getElementById('gallery-prev');
            const galleryNext = document.getElementById('gallery-next');
            let currentSlide = 0;
            const slideCount = document.querySelectorAll('.gallery-slide').length;
            const slidesToShow = window.innerWidth < 768 ? 1 : 3;
            
            function updateGallery() {
                const slideWidth = 100 / slidesToShow;
                galleryTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            }
            
            galleryPrev.addEventListener('click', function() {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateGallery();
                }
            });
            
            galleryNext.addEventListener('click', function() {
                if (currentSlide < slideCount - slidesToShow) {
                    currentSlide++;
                    updateGallery();
                }
            });
            
            // Form submission handlers
            document.getElementById('login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Đăng nhập thành công!');
                loginModal.classList.remove('active');
            });
            
            document.getElementById('contact-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Yêu cầu tư vấn đã được gửi!');
                contactModal.classList.remove('active');
            });
            
            // Search functionality
            document.getElementById('search-button').addEventListener('click', function() {
                const searchTerm = document.getElementById('search-input').value;
                if (searchTerm.trim()) {
                    alert(`Đang tìm kiếm: ${searchTerm}`);
                }
            });
            
            // Checkout functionality
            document.getElementById('checkout-button').addEventListener('click', function() {
                alert('Chức năng thanh toán đang được phát triển!');
            });
            
            // Update gallery on window resize
            window.addEventListener('resize', function() {
                const newSlidesToShow = window.innerWidth < 768 ? 1 : 3;
                if (newSlidesToShow !== slidesToShow) {
                    updateGallery();
                }
            });
        });
