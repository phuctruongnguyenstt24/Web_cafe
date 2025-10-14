// Menu Data
const menuData = {
    coffee: [
        {
            id: 1,
            name: "Espresso",
            price: 35000,
            image: "images/espresso.jpg",
            description: "Cà phê đậm đà, thơm ngon với hương vị nguyên bản",
            category: "coffee",
            rating: 4.5,
            special: false
        },
        {
            id: 2,
            name: "Americano",
            price: 40000,
            image: "images/americano.jpg",
            description: "Espresso pha loãng với nước nóng, hương vị tinh tế",
            category: "coffee",
            rating: 4.3,
            special: false
        },
        {
            id: 3,
            name: "Latte",
            price: 50000,
            image: "images/latte.jpg",
            description: "Espresso với sữa nóng và lớp bọt sữa mềm mại",
            category: "coffee",
            rating: 4.7,
            special: true
        },
        {
            id: 4,
            name: "Cappuccino",
            price: 45000,
            image: "images/cappuccino.jpg",
            description: "Espresso với sữa nóng và nhiều bọt sữa hấp dẫn",
            category: "coffee",
            rating: 4.6,
            special: false
        },
        {
            id: 5,
            name: "Mocha",
            price: 55000,
            image: "images/mocha.jpg",
            description: "Sự kết hợp hoàn hảo giữa espresso, sô cô la và sữa",
            category: "coffee",
            rating: 4.8,
            special: true
        },
        {
            id: 6,
            name: "Cold Brew",
            price: 45000,
            image: "images/cold-brew.jpg",
            description: "Cà phê ủ lạnh tự nhiên, hương vị đậm đà và mát lạnh",
            category: "coffee",
            rating: 4.4,
            special: false
        }
    ],
    tea: [
        {
            id: 7,
            name: "Trà đào",
            price: 35000,
            image: "images/peach-tea.jpg",
            description: "Trà đào thơm ngon, thanh mát với vị đào tươi",
            category: "tea",
            rating: 4.5,
            special: true
        },
        {
            id: 8,
            name: "Trà sữa",
            price: 40000,
            image: "images/milk-tea.jpg",
            description: "Trà sữa thơm ngon, hấp dẫn với trân châu dai giòn",
            category: "tea",
            rating: 4.6,
            special: false
        },
        {
            id: 9,
            name: "Trà xanh",
            price: 30000,
            image: "images/green-tea.jpg",
            description: "Trà xanh thanh mát, tốt cho sức khỏe và làn da",
            category: "tea",
            rating: 4.2,
            special: false
        },
        {
            id: 10,
            name: "Trà sen",
            price: 45000,
            image: "images/lotus-tea.jpg",
            description: "Trà sen hương vị tinh tế, thơm ngát hương sen",
            category: "tea",
            rating: 4.7,
            special: true
        }
    ],
    juice: [
        {
            id: 11,
            name: "Nước cam ép",
            price: 40000,
            image: "images/orange-juice.jpg",
            description: "Nước cam tươi ép, giàu vitamin C",
            category: "juice",
            rating: 4.3,
            special: false
        },
        {
            id: 12,
            name: "Sinh tố dâu",
            price: 50000,
            image: "images/strawberry-smoothie.jpg",
            description: "Sinh tố dâu tây thơm ngon, bổ dưỡng",
            category: "juice",
            rating: 4.5,
            special: false
        }
    ]
};

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentQuickViewItem = null;
let currentQuantity = 1;

// Initialize Menu
function initMenu() {
    renderMenuItems();
    setupEventListeners();
    updateCartUI();
}

// Render Menu Items
function renderMenuItems(filter = 'all') {
    const menuContainer = document.querySelector('.menu-categories');
    if (!menuContainer) return;

    let html = '';
    
    for (const category in menuData) {
        const items = menuData[category];
        const filteredItems = filter === 'all' ? items : items.filter(item => 
            filter === 'special' ? item.special : item.category === filter
        );

        if (filteredItems.length === 0) continue;

        html += `
            <div class="menu-category">
                <h3><i class="fas fa-${getCategoryIcon(category)}"></i> ${getCategoryName(category)}</h3>
                <div class="menu-items">
                    ${filteredItems.map(item => `
                        <div class="menu-item" data-id="${item.id}">
                            ${item.special ? '<span class="special-badge">Đặc biệt</span>' : ''}
                            <img src="${item.image}" alt="${item.name}" onclick="openQuickView(${item.id})">
                            <div class="item-info">
                                <h4>${item.name}</h4>
                                <p>${item.description}</p>
                                <div class="item-price">
                                    <span>${formatPrice(item.price)} VND</span>
                                    <span class="item-rating">
                                        <i class="fas fa-star"></i> ${item.rating}
                                    </span>
                                </div>
                                <button class="btn-add-cart" onclick="addToCart('${item.name}', ${item.price})">
                                    <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    menuContainer.innerHTML = html || '<p class="text-center">Không có sản phẩm nào.</p>';
}

// Get Category Icon
function getCategoryIcon(category) {
    const icons = {
        coffee: 'coffee',
        tea: 'mug-hot',
        juice: 'glass-whiskey'
    };
    return icons[category] || 'utensils';
}

// Get Category Name
function getCategoryName(category) {
    const names = {
        coffee: 'Cà phê',
        tea: 'Trà',
        juice: 'Nước ép & Sinh tố'
    };
    return names[category] || category;
}

// Format Price
function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}

// Filter Menu
function filterMenu(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderMenuItems(category);
}

// Search Functionality


// Display Search Results


// Hide Search Results


// Select Search Result


// Quick View Modal
function openQuickView(itemId) {
    const item = findItemById(itemId);
    if (!item) return;
    
    currentQuickViewItem = item;
    currentQuantity = 1;
    
    const modal = document.getElementById('quick-view-modal');
    const content = modal.querySelector('.quick-view-content');
    
    content.innerHTML = `
        <div class="quick-view-header">
            <h3>${item.name}</h3>
            <button class="close-quick-view" onclick="closeQuickView()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="quick-view-body">
            <div class="quick-view-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="quick-view-info">
                <div class="item-rating">
                    <i class="fas fa-star"></i> ${item.rating} 
                    ${item.special ? '<span class="special-badge">Đặc biệt</span>' : ''}
                </div>
                <div class="quick-view-price">${formatPrice(item.price)} VND</div>
                <p class="quick-view-description">${item.description}</p>
                
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                    <span class="quantity-display">${currentQuantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                </div>
                
                <button class="btn-add-cart" onclick="addToCartFromQuickView()">
                    <i class="fas fa-shopping-cart"></i> 
                    Thêm vào giỏ - ${formatPrice(item.price * currentQuantity)} VND
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeQuickView() {
    document.getElementById('quick-view-modal').style.display = 'none';
    currentQuickViewItem = null;
    currentQuantity = 1;
}

function changeQuantity(change) {
    currentQuantity = Math.max(1, currentQuantity + change);
    document.querySelector('.quantity-display').textContent = currentQuantity;
    
    const totalPrice = currentQuickViewItem.price * currentQuantity;
    document.querySelector('.btn-add-cart').innerHTML = `
        <i class="fas fa-shopping-cart"></i> 
        Thêm vào giỏ - ${formatPrice(totalPrice)} VND
    `;
}

function addToCartFromQuickView() {
    if (currentQuickViewItem) {
        for (let i = 0; i < currentQuantity; i++) {
            addToCart(currentQuickViewItem.name, currentQuickViewItem.price);
        }
        closeQuickView();
    }
}

// Enhanced Cart Functions
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1,
            image: findItemImageByName(name)
        });
    }

    updateCartUI();
    saveCartToLocalStorage();
    
    // Show notification
    showNotification(`Đã thêm ${name} vào giỏ hàng!`);
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
    saveCartToLocalStorage();
    showNotification(`Đã xóa ${name} khỏi giỏ hàng!`);
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShipping = document.getElementById('cart-shipping');
    const cartDiscount = document.getElementById('cart-discount');

    if (cartCount) cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100000 ? 0 : 15000;
    const discount = subtotal > 150000 ? subtotal * 0.1 : 0;
    const total = subtotal + shipping - discount;

    if (cartTotalElement) cartTotalElement.textContent = formatPrice(total);
    if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
    if (cartShipping) cartShipping.textContent = formatPrice(shipping);
    if (cartDiscount) cartDiscount.textContent = formatPrice(discount);

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${formatPrice(item.price)} VND</div>
                        <div class="cart-item-actions">
                            <button onclick="decreaseQuantity('${item.name.replace(/'/g, "\\'")}')">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button onclick="increaseQuantity('${item.name.replace(/'/g, "\\'")}')">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeItem('${item.name.replace(/'/g, "\\'")}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
}

function increaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
        updateCartUI();
        saveCartToLocalStorage();
    }
}

function decreaseQuantity(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCartUI();
        saveCartToLocalStorage();
    }
}

// Helper Functions
function findItemById(id) {
    for (const category in menuData) {
        const item = menuData[category].find(item => item.id === id);
        if (item) return item;
    }
    return null;
}

function findItemImageByName(name) {
    for (const category in menuData) {
        const item = menuData[category].find(item => item.name === name);
        if (item) return item.image;
    }
    return 'images/default.jpg';
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Search input events

    
    // Quick view modal close
    const quickViewModal = document.getElementById('quick-view-modal');
    if (quickViewModal) {
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) {
                closeQuickView();
            }
        });
    }
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderDetails = cart.map(item => 
        `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)} VND`
    ).join('\n');
    
    alert(`Đặt hàng thành công!\n\nChi tiết đơn hàng:\n${orderDetails}\n\nTổng cộng: ${formatPrice(total)} VND\n\nCảm ơn bạn đã đặt hàng!`);
    
    // Clear cart
    cart = [];
    updateCartUI();
    saveCartToLocalStorage();
    toggleCart();
}

// Cart Functions - Thêm các hàm này
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        // Ngăn sự kiện click lan ra ngoài
        event.stopPropagation();
    }
}

// Đóng giỏ hàng khi click bên ngoài
document.addEventListener('click', function(e) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartButton = document.querySelector('.btn-cart');
    
    if (cartSidebar && cartSidebar.classList.contains('active') && 
        !cartSidebar.contains(e.target) && 
        !cartButton.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
})

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMenu();
    
    // Add search results container if not exists
  
    // Add quick view modal if not exists
    if (!document.getElementById('quick-view-modal')) {
        const modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'quick-view-modal';
        modal.innerHTML = '<div class="quick-view-content"></div>';
        document.body.appendChild(modal);
    }
});

