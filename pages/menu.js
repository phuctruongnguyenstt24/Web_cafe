// menu.js - JavaScript riêng cho trang Menu

// Menu data với hình ảnh thực tế
const menuItems = [
    {
        id: 1,
        name: "Cà Phê Đen Đá",
        category: "coffee",
        price: 35000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfBToUNkTITiyxr40Lrpxpv7urOsuN0lJd-A&s",
        description: "Cà phê đen truyền thống, đậm đà hương vị nguyên bản"
    },
    {
        id: 2,
        name: "Cà Phê Sữa Đá",
        category: "coffee",
        price: 40000,
        image: "https://cdn.hstatic.net/products/1000075078/ca_phe_phin_nau_da_73fed306bafb4f87b4cb44573c900388_master.png",
        description: "Cà phê pha với sữa đặc, thơm ngon đậm đà"
    },
    {
        id: 3,
        name: "Bạc Xỉu",
        category: "coffee",
        price: 45000,
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop",
        description: "Cà phê sữa đá kiểu Sài Gòn, ngọt ngào tinh tế"
    },
    {
        id: 4,
        name: "Espresso",
        category: "coffee",
        price: 45000,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop",
        description: "Cà phê espresso nguyên chất, đậm đà hương vị"
    },
    {
        id: 5,
        name: "Trà Sữa Trân Châu",
        category: "tea",
        price: 45000,
        image: "https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/kinh-nghiem-meo-hay/n%E1%BA%A5u%20%C4%83n/cach-lam-tran-chau-tra-sua_1.jpg",
        description: "Trà sữa thơm ngon kèm trân châu dai giòn"
    },
    {
        id: 6,
        name: "Trà Đào Cam Sả",
        category: "tea",
        price: 40000,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
        description: "Trà đào thanh mát, thơm hương đào tự nhiên"
    },
    {
        id: 7,
        name: "Trà Vải",
        category: "tea",
        price: 40000,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
        description: "Trà vải tươi mát, ngọt thanh tự nhiên"
    },
    {
        id: 8,
        name: "Nước Cam Ép",
        category: "juice",
        price: 50000,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        description: "Nước cam tươi nguyên chất, giàu vitamin C"
    },
    {
        id: 9,
        name: "Sinh Tố Xoài",
        category: "juice",
        price: 45000,
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop",
        description: "Sinh tố xoài thơm ngon, bổ dưỡng"
    },
    {
        id: 10,
        name: "Nước Ép Dứa",
        category: "juice",
        price: 45000,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        description: "Nước ép dứa tươi mát, giàu vitamin"
    },
    {
        id: 11,
        name: "Cappuccino",
        category: "special",
        price: 55000,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
        description: "Cappuccino Ý với lớp bọt sữa mịn"
    },
    {
        id: 12,
        name: "Latte Nghệ Thuật",
        category: "special",
        price: 60000,
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop",
        description: "Latte với hình nghệ thuật độc đáo"
    }
];

// Cart data
let cart = [];

// DOM elements
const menuItemsContainer = document.getElementById('menu-items');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('menu-search');
const searchBtn = document.getElementById('search-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartShipping = document.getElementById('cart-shipping');
const cartDiscount = document.getElementById('cart-discount');
const cartTotal = document.getElementById('cart-total');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderMenuItems(menuItems);
    setupEventListeners();
    updateCart();
});

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterMenuItems(filter);
            
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

// Render menu items
function renderMenuItems(items) {
    menuItemsContainer.innerHTML = '';
    
    if (items.length === 0) {
        menuItemsContainer.innerHTML = '<p class="text-center text-muted w-100">Không tìm thấy món nào phù hợp</p>';
        return;
    }
    
    items.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col';
        
        const categoryNames = {
            'coffee': 'Cà phê',
            'tea': 'Trà',
            'juice': 'Nước ép',
            'special': 'Đặc biệt'
        };
        
        col.innerHTML = `
            <div class="card menu-item-card h-100 border-0 shadow-sm" data-category="${item.category}">
                <div class="position-relative">
                    <img src="${item.image}" class="card-img-top menu-item-img" alt="${item.name}">
                    <span class="badge bg-primary category-badge">${categoryNames[item.category]}</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text flex-grow-1 text-muted">${item.description}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <span class="price-tag">${formatPrice(item.price)}</span>
                        <button class="btn btn-primary add-to-cart" data-id="${item.id}">
                            <i class="fas fa-cart-plus me-1"></i>Thêm
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        menuItemsContainer.appendChild(col);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            addToCart(itemId);
        });
    });
}

// Filter menu items
function filterMenuItems(category) {
    let filteredItems;
    
    if (category === 'all') {
        filteredItems = menuItems;
    } else {
        filteredItems = menuItems.filter(item => item.category === category);
    }
    
    renderMenuItems(filteredItems);
}

// Search menu items
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        // If search is empty, show all items
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        filterMenuItems(activeFilter);
        return;
    }
    
    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
    );
    
    renderMenuItems(filteredItems);
}

// Cart functions
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    
    if (!item) return;
    
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show success message
    showToast(`Đã thêm ${item.name} vào giỏ hàng`, 'success');
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-muted text-center pt-3 empty-cart">Giỏ hàng của bạn đang trống</p>';
    } else {
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-1">${formatPrice(item.price)}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-id="${item.id}">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary increase-quantity" data-id="${item.id}">+</button>
                        <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add event listeners to cart buttons
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                changeQuantity(itemId, 1);
            });
        });
        
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                changeQuantity(itemId, -1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }
    
    // Update cart totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15000 : 0;
    const discount = 0; // You can implement discount logic here
    const total = subtotal + shipping - discount;
    
    cartSubtotal.textContent = formatPrice(subtotal);
    cartShipping.textContent = formatPrice(shipping);
    cartDiscount.textContent = formatPrice(discount);
    cartTotal.textContent = formatPrice(total);
}

function changeQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCart();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'warning');
}

function checkout() {
    if (cart.length === 0) {
        showToast('Giỏ hàng của bạn đang trống!', 'danger');
        return;
    }
    
    showToast('Chức năng thanh toán đang được phát triển!', 'info');
    // Here you would typically redirect to a checkout page or show a checkout form
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0 position-fixed bottom-0 end-0 m-3`;
    toast.style.zIndex = '1060';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        document.body.removeChild(toast);
    });
}