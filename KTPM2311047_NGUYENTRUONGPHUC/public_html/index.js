// --- Chức năng chung ---

// Hiển thị trang được chọn
function showPage(pageId) {
    // Ẩn tất cả các trang
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Hiển thị trang được chọn
    const pageElement = document.getElementById(pageId + '-page');
    if (pageElement) {
        pageElement.classList.add('active');
    }

    // Cập nhật trạng thái active cho menu
    const menuItems = document.querySelectorAll('.nav-center a');
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + pageId) {
            item.classList.add('active');
        }
    });
}

// Modal đăng nhập
function openLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.add('active');
}

function closeLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.remove('active');
}

// Modal liên hệ
function openContact() {
    const modal = document.getElementById('contact-modal');
    if (modal) modal.classList.add('active');
}

function closeContact() {
    const modal = document.getElementById('contact-modal');
    if (modal) modal.classList.remove('active');
}

// Tìm kiếm
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? searchInput.value.trim() : '';
    if (searchTerm) {
        alert(`Đang tìm kiếm: ${searchTerm}`);
        // Thực hiện tìm kiếm ở đây
    }
}

// Xử lý form đăng nhập
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username')?.value || '';
        // const password = document.getElementById('password')?.value || ''; // Không dùng
        alert(`Đăng nhập với tên: ${username}`);
        closeLogin();
    });
}

// Xử lý form liên hệ
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value || '';
        const phone = document.getElementById('contact-phone')?.value || '';
        // const message = document.getElementById('contact-message')?.value || ''; // Không dùng

        // Xử lý gửi liên hệ ở đây
        alert(`Cảm ơn ${name}! Chúng tôi sẽ liên hệ với bạn qua số ${phone} trong thời gian sớm nhất.`);
        closeContact();

        // Reset form
        contactForm.reset();
    });
}

// Đóng modal khi click bên ngoài
window.addEventListener('click', function (e) {
    const loginModal = document.getElementById('login-modal');
    const contactModal = document.getElementById('contact-modal');

    if (loginModal && e.target === loginModal) {
        closeLogin();
    }

    if (contactModal && e.target === contactModal) {
        closeContact();
    }
});

// --- Giỏ hàng ---

let cart = [];
let cartTotal = 0;

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) cartSidebar.classList.toggle('active');
}

function addToCart(name, price) {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    // Cập nhật tổng tiền (chỉ cộng thêm giá của 1 sản phẩm)
    cartTotal += price;

    // Cập nhật giao diện giỏ hàng
    updateCartUI();

    // Hiển thị thông báo
    alert(`Đã thêm ${name} vào giỏ hàng!`);
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');

    // Tính toán lại tổng tiền từ mảng cart (để tránh lỗi tích lũy)
    const newCartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal = newCartTotal; // Cập nhật biến global

    // Cập nhật số lượng sản phẩm
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;

    // Cập nhật tổng tiền hiển thị
    if (cartTotalElement) cartTotalElement.textContent = cartTotal.toLocaleString('vi-VN');

    // Cập nhật danh sách sản phẩm trong giỏ hàng
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
        } else {
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${item.price.toLocaleString('vi-VN')} VND</div>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="decreaseQuantity('${item.name.replace(/'/g, "\\'")}')">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.name.replace(/'/g, "\\'")}')">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem('${item.name.replace(/'/g, "\\'")}')">×</button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }
}

function increaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
        // Đã bỏ dòng cartTotal += item.price; vì updateCartUI sẽ tính lại total
        updateCartUI();
    }
}

function decreaseQuantity(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity -= 1;
            // Đã bỏ dòng cartTotal -= item.price; vì updateCartUI sẽ tính lại total
        } else {
            // Xóa khỏi giỏ nếu số lượng là 1
            cart.splice(itemIndex, 1);
        }
        updateCartUI();
    }
}

function removeItem(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCartUI();
    }
}


// --- Main Slideshow (Có nút điều hướng) ---

// --- Biến Toàn Cục ---
let slideIndex = 1;
let slideInterval; // Biến giữ ID của timer tự động chuyển slide

// --- Chức Năng Hiển Thị ---
function showSlides(n) {
    // 1. Lấy tất cả các slide và dot trong container chính
    const slides = document.querySelectorAll('.slideshow-container .slide');
    const dots = document.querySelectorAll('.slideshow-container .dot');
    
    // Thoát nếu không có slide nào
    if (slides.length === 0) return;

    // 2. Logic vòng lặp vô tận (Infinite loop)
    if (n > slides.length) { slideIndex = 1; } // Nếu vượt quá slide cuối, quay về slide 1
    if (n < 1) { slideIndex = slides.length; } // Nếu lùi về trước slide 1, quay về slide cuối
    
    // 3. Ẩn tất cả và bỏ trạng thái active
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // 4. Hiển thị slide và dot hiện tại
    slides[slideIndex - 1].classList.add('active');
    // Đảm bảo dot tồn tại trước khi thêm class
    if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
}

// --- Chức Năng Điều Hướng Thủ Công ---
function plusSlides(n) {
    showSlides(slideIndex += n); // Chuyển sang slide kế tiếp (hoặc trước đó)
    resetSlideInterval(); // Đặt lại timer tự động sau khi người dùng tương tác
}

function currentSlide(n) {
    showSlides(slideIndex = n); // Chuyển trực tiếp đến slide thứ n
    resetSlideInterval(); // Đặt lại timer tự động
}

// --- Chức Năng Tự Động Chuyển Slide (Autoplay) ---
function startSlideShow() {
    // Chỉ khởi tạo timer nếu nó chưa chạy
    if (!slideInterval) {
        slideInterval = setInterval(() => {
            plusSlides(1); // Tự động chuyển slide
        }, 2000); // Tự động chuyển slide sau mỗi 5 giây
    }
}

function resetSlideInterval() {
    clearInterval(slideInterval); // Dừng timer hiện tại
    slideInterval = null;
    startSlideShow(); // Khởi động lại timer mới
}

function pauseSlideShow() {
    clearInterval(slideInterval); // Tạm dừng
    slideInterval = null;
}

// --- Xử Lý Sự Kiện Tương Tác Người Dùng (Pause on Hover) ---
function addMainSlideShowEvents() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if(slideshowContainer) {
        // Dừng khi rê chuột vào
        slideshowContainer.addEventListener('mouseenter', pauseSlideShow);
        // Chạy tiếp khi rê chuột ra
        slideshowContainer.addEventListener('mouseleave', startSlideShow);
    }
}

// --- Khởi Tạo Khi Trang Tải Xong ---
document.addEventListener('DOMContentLoaded', function () {
    // 1. Hiển thị slide đầu tiên
    showSlides(slideIndex);
    
    // 2. Bắt đầu tự động chuyển slide
    startSlideShow();

    // 3. Thiết lập các sự kiện tương tác (pause on hover)
    addMainSlideShowEvents();
    
    // ... các đoạn code khởi tạo khác (ví dụ: showPage('home'))
});


// --- Fade Slider (Hiệu ứng mờ dần) ---

let fadeIndex = 0;
let fadeInterval;

function showFadeSlide(index) {
    const slides = document.querySelectorAll('.fade-slider .fade-slide');
    const dots = document.querySelectorAll('.fade-slider .fade-dot');

    if (slides.length === 0) return;
    
    let nextIndex = index;
    if (nextIndex >= slides.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = slides.length - 1;
    
    // Ẩn tất cả slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Hiển thị slide hiện tại
    slides[nextIndex].classList.add('active');
    if (dots[nextIndex]) dots[nextIndex].classList.add('active');
    
    fadeIndex = nextIndex;
}

function nextFadeSlide() {
    showFadeSlide(fadeIndex + 1);
}

function prevFadeSlide() {
    showFadeSlide(fadeIndex - 1);
}

function startFadeAutoSlide() {
    if (!fadeInterval) {
        fadeInterval = setInterval(nextFadeSlide, 2000); // 4 giây mỗi slide
    }
}

function stopFadeAutoSlide() {
    clearInterval(fadeInterval);
    fadeInterval = null;
}

function addFadeSlideShowEvents() {
    const fadeSlider = document.querySelector('.fade-slider');
    if (fadeSlider) {
        fadeSlider.addEventListener('mouseenter', stopFadeAutoSlide);
        fadeSlider.addEventListener('mouseleave', startFadeAutoSlide);
    }
}

// --- Gallery Slider (3 ảnh hiển thị) ---

let galleryIndex = 0;
let galleryAutoslideInterval;
const GALLERY_SLIDES_TO_SHOW = 3;

function showGallerySlide(index) {
    const track = document.querySelector('.gallery-slider .gallery-track');
    const slides = document.querySelectorAll('.gallery-slider .gallery-slide');
    const total = slides.length;

    if (!track || total === 0) return;

    // Tính toán lại index
    let nextIndex = index;
    if (nextIndex > total - GALLERY_SLIDES_TO_SHOW) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = total - GALLERY_SLIDES_TO_SHOW;
    }

    galleryIndex = nextIndex;

    // Mỗi ảnh chiếm 100 / GALLERY_SLIDES_TO_SHOW %
    const slideWidth = 100 / GALLERY_SLIDES_TO_SHOW;
    track.style.transform = `translateX(-${galleryIndex * slideWidth}%)`;
}

function galleryNext() {
    showGallerySlide(galleryIndex + 1);
}

function galleryPrev() {
    showGallerySlide(galleryIndex - 1);
}

function startGalleryAutoslide() {
    if (!galleryAutoslideInterval) {
        galleryAutoslideInterval = setInterval(galleryNext, 3000); // 3 giây
    }
}

function stopGalleryAutoslide() {
    clearInterval(galleryAutoslideInterval);
    galleryAutoslideInterval = null;
}

function addGallerySlideShowEvents() {
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        gallerySlider.addEventListener('mouseenter', stopGalleryAutoslide);
        gallerySlider.addEventListener('mouseleave', startGalleryAutoslide);
    }
}

function initSliders() {
    // Main slideshow
    const mainSlides = document.querySelectorAll('.slideshow-container .slide');
    if (mainSlides.length > 0) {
        showSlides(slideIndex);
        startSlideShow();
        addMainSlideShowEvents();
    }

    // Fade slider
    const fadeSlides = document.querySelectorAll('.fade-slider .fade-slide');
    if (fadeSlides.length > 0) {
        showFadeSlide(0);
        startFadeAutoSlide();
        addFadeSlideShowEvents();
    }

    // Gallery slider
    const gallerySlides = document.querySelectorAll('.gallery-slider .gallery-slide');
    if (gallerySlides.length > 0) {
        showGallerySlide(0);
        startGalleryAutoslide();
        addGallerySlideShowEvents();
    }
    // Auto slider (infinite scroll) - Giữ nguyên logic CSS nếu có
}

// --- Khởi tạo và Sự kiện DOMContentLoaded ---

function startAllAutoSlides() {
    startSlideShow();
    startFadeAutoSlide();
    startGalleryAutoslide();
}

function stopAllAutoSlides() {
    pauseSlideShow();
    stopFadeAutoSlide();
    stopGalleryAutoslide();
}

document.addEventListener('DOMContentLoaded', function () {
    // Mặc định hiển thị trang chủ
    showPage('home');

    // Khởi tạo tất cả sliders
    initSliders();

    // Thêm sự kiện cho thanh tìm kiếm
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Gán sự kiện cho các nút Gallery Slider (Đảm bảo HTML đã có)
    // Ví dụ: document.querySelector('.gallery-prev').onclick = galleryPrev;
    // document.querySelector('.gallery-next').onclick = galleryNext;
});

// Pause sliders when page is not visible
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        stopAllAutoSlides();
    } else {
        startAllAutoSlides();
    }
});