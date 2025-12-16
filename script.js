// script.js - جميع دوال ومنطق JavaScript للواجهة والتسوق

// 🚨🚨🚨 [ بيانات الإعدادات ] 🚨🚨🚨
const WHATSAPP_PHONE_NUMBER = '201029352797'; 
const MINIMUM_ORDER_AMOUNT = 200; // الحد الأدنى للطلب (200 جنيهاً)
const availableSizes = ['125 ج', '250 ج', '500 ج', '1000 ج']; 
const defaultSize = availableSizes[3]; 

// =======================================================
// 1. البيانات الأساسية (Data Model)
// =======================================================

const PAGE_SECTIONS = {
    'home': 'الرئيسية',
    'store': 'المتجر',
    'menu-page': 'المنيو',
    'who-are-we': 'من نحن؟',
    'contact': 'اتصل بنا',
    'checkout': 'إتمام الدفع', 
};

// البيانات الكاملة للمنتجات 
const productsData = [
    {
        category: "بُن فاتح",
        items: [
            { name: "بُن فاتح - توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 70, '250 ج': 135, '500 ج': 270, '1000 ج': 540 } },
                { type: "محوج", prices: { '125 ج': 75, '250 ج': 150, '500 ج': 300, '1000 ج': 600 } },
                { type: "محوج مخصوص", prices: { '125 ج': 90, '250 ج': 180, '500 ج': 360, '1000 ج': 720 } }
            ]},
            { name: "بُن فاتح - توليفة أرابيكا", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 75, '250 ج': 150, '500 ج': 300, '1000 ج': 600 } },
                { type: "محوج", prices: { '125 ج': 85, '250 ج': 165, '500 ج': 330, '1000 ج': 660 } },
                { type: "محوج مخصوص", prices: { '125 ج': 100, '250 ج': 195, '500 ج': 390, '1000 ج': 780 } }
            ]},
        ]
    },
    {
        category: "بُن وسط",
        items: [
            { name: "بُن وسط - توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 70, '250 ج': 135, '500 ج': 270, '1000 ج': 540 } },
                { type: "محوج", prices: { '125 ج': 75, '250 ج': 150, '500 ج': 300, '1000 ج': 600 } },
                { type: "محوج مخصوص", prices: { '125 ج': 90, '250 ج': 180, '500 ج': 360, '1000 ج': 720 } }
            ]},
            { name: "بُن وسط - توليفة أرابيكا", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 75, '250 ج': 150, '500 ج': 300, '1000 ج': 600 } },
                { type: "محوج", prices: { '125 ج': 85, '250 ج': 165, '500 ج': 330, '1000 ج': 660 } },
                { type: "محوج مخصوص", prices: { '125 ج': 100, '250 ج': 195, '500 ج': 390, '1000 ج': 780 } }
            ]},
        ]
    },
    {
        category: "بُن غامق",
        items: [
            { name: "بُن غامق - توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 70, '250 ج': 140, '500 ج': 280, '1000 ج': 560 } },
                { type: "محوج", prices: { '125 ج': 80, '250 ج': 155, '500 ج': 310, '1000 ج': 620 } },
                { type: "محوج مخصوص", prices: { '125 ج': 95, '250 ج': 185, '500 ج': 370, '1000 ج': 740 } }
            ]},
            { name: "بُن غامق - توليفة أرابيكا", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 80, '250 ج': 155, '500 ج': 310, '1000 ج': 620 } },
                { type: "محوج", prices: { '125 ج': 85, '250 ج': 170, '500 ج': 340, '1000 ج': 680 } },
                { type: "محوج مخصوص", prices: { '125 ج': 100, '250 ج': 200, '500 ج': 400, '1000 ج': 800 } }
            ]},
        ]
    },
    {
        category: "بُن محروق",
        items: [
            { name: "بُن محروق - توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 75, '250 ج': 145, '500 ج': 290, '1000 ج': 580 } },
                { type: "محوج", prices: { '125 ج': 80, '250 ج': 160, '500 ج': 320, '1000 ج': 640 } },
                { type: "محوج مخصوص", prices: { '125 ج': 95, '250 ج': 190, '500 ج': 380, '1000 ج': 760 } }
            ]},
            { name: "بُن - كولومبي", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 120, '250 ج': 240, '500 ج': 480, '1000 ج': 960 } },
                { type: "محوج", prices: { '125 ج': 135, '250 ج': 270, '500 ج': 535, '1000 ج': 1070 } },
                { type: "محوج مخصوص", prices: { '125 ج': 145, '250 ج': 285, '500 ج': 570, '1000 ج': 1140 } }
            ]},
            { name: "بُن - حبشي", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 75, '250 ج': 150, '500 ج': 300, '1000 ج': 600 } },
                { type: "محوج", prices: { '125 ج': 85, '250 ج': 165, '500 ج': 330, '1000 ج': 660 } },
                { type: "محوج مخصوص", prices: { '125 ج': 100, '250 ج': 195, '500 ج': 390, '1000 ج': 780 } }
            ]},
            { name: "اسبريسو", image: 'pr5.jpg', variants: [
                { type: "70% ارابيكا", prices: { '125 ج': 80, '250 ج': 155, '500 ج': 310, '1000 ج': 620 } },
                { type: "100% ارابيكا ", prices: { '125 ج': 120, '250 ج': 240, '500 ج': 480, '1000 ج': 960 } }
            ]},
        ]
    },
    {
        category: "قهوة فلفرز",
        items: [
            { name: "قهوة عربي", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 75, '250 ج': 150, '500 ج': 300, '1000 ج': 600 } },
                { type: "محوج", prices: { '125 ج': 100, '250 ج': 195, '500 ج': 390, '1000 ج': 780 } }
            ]},
            { name: "قهوة بندق", image: 'pr5.jpg', variants: [
                { type: "اوريجينال", prices: { '125 ج': 80, '250 ج': 155, '500 ج': 310, '1000 ج': 620 } }
            ]},
            { name: "قهوة فرنساوي", image: 'pr5.jpg', variants: [
                { type: "اوريجينال", prices: { '125 ج': 75, '250 ج': 150, '500 ج': 300, '1000 ج': 600 } }
            ]},
            { name: "نسكافيه كلاسيك", image: 'pr5.jpg', variants: [
                { type: "اوريجينال", prices: { '125 ج': 165, '250 ج': 325, '500 ج': 650, '1000 ج': 1300 } }
            ]},
            { name: "نسكافيه جولد", image: 'pr5.jpg', variants: [
                { type: "اوريجينال", prices: { '125 ج': 190, '250 ج': 375, '500 ج': 750, '1000 ج': 1500 } }
            ]},
        ]
    },
];

let cart = JSON.parse(localStorage.getItem('amerrcoffeeCart')) || []; 

// =======================================================
// 2. الدوال الرئيسية لفتح وغلق القوائم (Global Scope)
// =======================================================

function openSidebar() {
    document.getElementById('side-drawer').classList.add('open');
}
function closeSidebar() {
    document.getElementById('side-drawer').classList.remove('open');
}

function openCartSidebar() {
    document.getElementById('cart-sidebar').classList.add('open');
    renderCart(); 
}
function closeCartSidebar() {
    document.getElementById('cart-sidebar').classList.remove('open');
}

function closeAllDrawers() {
    closeSidebar();
    closeCartSidebar();
}

// دالة رسائل التوست
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast-notification'; 
    toast.classList.add(type);
    toast.classList.add('show');

    setTimeout(function(){ 
        toast.classList.remove('show');
    }, 3500);
}


// =======================================================
// 3. إدارة التنقل والصفحات (Navigation)
// =======================================================

function navigate(pageId) {
    // 1. تطبيق حركة الخروج على القسم النشط حالياً
    document.querySelectorAll('.page-section').forEach(section => {
        if (section.style.display === 'block') {
            section.classList.remove('animate-in');
            section.classList.add('animate-out');
        }
    });
    
    const targetSection = document.getElementById(pageId);
    
    // 2. التحقق من الحد الأدنى للطلب
    if (pageId === 'checkout') {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (total < MINIMUM_ORDER_AMOUNT) {
             showToast(`الحد الأدنى للطلب هو ${MINIMUM_ORDER_AMOUNT} جنيهاً.`, 'error');
             pageId = 'store'; 
        }
    }
    
    // 3. تأخير بسيط لتطبيق حركة الخروج قبل إظهار الصفحة الجديدة
    setTimeout(() => {
        // إخفاء جميع الأقسام بعد انتهاء الحركة
        document.querySelectorAll('.page-section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('animate-out');
        });

        if (targetSection) {
            targetSection.style.display = 'block';
            // تطبيق حركة الدخول
            targetSection.classList.add('animate-in');
        }
    
        // تحديث شريط التنقل السفلي
        document.querySelectorAll('.footer-nav button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === pageId) {
                btn.classList.add('active');
            }
        });

        if (pageId === 'checkout') {
            renderCart(); 
        }
        
        if (pageId === 'store') {
            // عند التوجه لصفحة المتجر، نعرض جميع المنتجات أولاً
            renderStore(productsData); 
            // ثم نتأكد من إظهارها جميعاً (لإلغاء أي فلترة سابقة)
            filterStoreProducts(null);
        }

        closeAllDrawers();
    }, 300); // 300ms يتوافق مع مدة الانيميشن في CSS 
}

// =======================================================
// 4. إدارة المتجر وعرض المنتجات (Store Rendering)
// =======================================================

function renderStore(dataToRender = productsData) {
    const storeContainer = document.getElementById('store-content');
    if (!storeContainer) return;

    let htmlContent = '';
    
    dataToRender.forEach(category => {
        if (category.items.length === 0) return;

        // 🚨 إضافة data-category-name و data-category-grid للمساعدة في الفلترة
        htmlContent += `<h2 class="category-title" data-category-name="${category.category}">${category.category}</h2><div class="product-grid" data-category-grid="${category.category}">`;
        
        category.items.forEach(item => {
            const safeName = item.name.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_'); 
            
            // مُحدّد الحجم
            const sizeSelectorHtml = `
                <div class="size-selector variant-selector">
                    <h4 style="margin-bottom: 5px;">اختر الحجم:</h4>
                    <div class="size-options">
                        ${availableSizes.map((size) => {
                             const isChecked = size === defaultSize ? 'checked' : '';
                             return `
                                <label class="payment-card size-card">
                                    <input type="radio" id="${safeName}-size-${size}" name="${safeName}-size" value="${size}" ${isChecked} class="size-radio-btn">
                                    <span class="card-content">${size.replace(' ج', '')}g</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            
            // مُحدّد النوع/التوليفة
            const typeSelectorHtml = `
                <div class="type-selector variant-selector">
                    <h4 style="margin-bottom: 5px;">اختر النوع:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${item.variants.map((variant, index) => `
                            <label class="payment-card type-card">
                                <input type="radio" id="${safeName}-type-${variant.type}" name="${safeName}-type" value="${variant.type}" ${index === 0 ? 'checked' : ''} class="type-radio-btn">
                                <span class="card-content">${variant.type}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
            
            const initialPrice = item.variants[0].prices[defaultSize];
            const priceText = `${initialPrice.toFixed(2)} ج`;
            
            // 🚨 إضافة كلاس 'store-product' لكل بطاقة للمساعدة في الفلترة
            htmlContent += `
                <div class="product-card store-product" data-product-name="${item.name}" data-category="${category.category}">
                    <img src="${item.image}" alt="${item.name}" class="product-image" loading="lazy">
                    <h3>${item.name}</h3>
                    
                    ${typeSelectorHtml}
                    ${sizeSelectorHtml} 
                    
                    <strong class="product-price-display" id="${safeName}-price-display" style="color: var(--color-primary); margin: 15px 0 10px; font-size: 1.3em;">
                        ${priceText}
                    </strong>
                    
                    <button class="add-to-cart-btn" onclick="addToCart(this)">أضف إلى السلة</button>
                </div>
            `;
        });
        htmlContent += `</div>`;
    });
    storeContainer.innerHTML = htmlContent;
    
    // ربط مستمعي الأحداث لتحديث السعر وتنسيق الاختيار (نفس الكود السابق)
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.dataset.productName;
        const safeName = productName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_');
        const priceDisplay = document.getElementById(`${safeName}-price-display`);
        const productData = productsData.flatMap(c => c.items).find(i => i.name === productName);

        const updatePriceDisplay = () => {
            const selectedTypeInput = card.querySelector(`input[name="${safeName}-type"]:checked`);
            const selectedSizeInput = card.querySelector(`input[name="${safeName}-size"]:checked`);
            
            if (!selectedTypeInput || !selectedSizeInput) return;

            const selectedType = selectedTypeInput.value;
            const selectedSize = selectedSizeInput.value;
            
            const variant = productData.variants.find(v => v.type === selectedType);
            const price = variant ? variant.prices[selectedSize] : 0;
            
            priceDisplay.textContent = `${price.toFixed(2)} ج`;

            // تحديث حالة الاختيار لـ CSS (لإضافة الكلاس selected)
            card.querySelectorAll('.size-card').forEach(label => label.classList.remove('selected'));
            selectedSizeInput.closest('label').classList.add('selected');
            
            card.querySelectorAll('.type-card').forEach(label => label.classList.remove('selected'));
            selectedTypeInput.closest('label').classList.add('selected');
        };

        // تفعيل الاستماع لتغيير النوع والحجم لتحديث السعر والتنسيق
        card.querySelectorAll(`input[name="${safeName}-type"]`).forEach(radio => radio.addEventListener('change', updatePriceDisplay));
        card.querySelectorAll(`input[name="${safeName}-size"]`).forEach(radio => radio.addEventListener('change', updatePriceDisplay));
        
        // تطبيق التنسيق الأولي
        updatePriceDisplay();
    });
}


// =======================================================
// 5. إدارة عربة التسوق (Cart Management)
// =======================================================

function saveCartAndRender() {
    localStorage.setItem('amerrcoffeeCart', JSON.stringify(cart));
    renderCart(); 
    updateCartIconCount();
}

function updateCartIconCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function addToCart(button) {
    const card = button.closest('.product-card');
    const productName = card.dataset.productName;
    const safeName = productName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_'); 
    
    const selectedTypeInput = card.querySelector(`input[name="${safeName}-type"]:checked`);
    const selectedSizeInput = card.querySelector(`input[name="${safeName}-size"]:checked`);

    if (!selectedTypeInput || !selectedSizeInput) {
        showToast('الرجاء اختيار نوع القهوة والحجم المطلوب.', 'error');
        return;
    }

    const type = selectedTypeInput.value;
    const size = selectedSizeInput.value;

    const productData = productsData.flatMap(c => c.items).find(i => i.name === productName);
    const variant = productData.variants.find(v => v.type === type);
    const price = variant ? variant.prices[size] : 0; 
    
    if (price <= 0) {
         showToast(`السعر غير محدد لهذا الاختيار.`, 'error');
         return;
    }

    const productId = `${productName}-${type}-${size}`; 

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, type: type, size: size, price: price, quantity: 1 });
    }
    
    // تشغيل حركة النبض على أيقونة السلة 
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.classList.add('active-pulse');
        setTimeout(() => {
            cartToggle.classList.remove('active-pulse');
        }, 600); 
    }

    saveCartAndRender();
    openCartSidebar(); 
    showToast(`✅ تم إضافة المنتج إلى السلة!`, 'success');
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutSummaryContainer = document.getElementById('checkout-items-summary');
    const checkoutTotalElement = document.getElementById('checkout-total');
    
    let total = 0;

    if (cart.length === 0) {
        const message = '<p style="text-align: center; margin-top: 20px; color: #777;">السلة فارغة حالياً.</p>';
        if (cartItemsContainer) cartItemsContainer.innerHTML = message;
        if (checkoutSummaryContainer) checkoutSummaryContainer.innerHTML = message;
        if (cartTotalElement) cartTotalElement.textContent = '0.00 ج';
        if (checkoutTotalElement) checkoutTotalElement.textContent = '0.00 ج';
        total = 0; 
    } else {
        let cartHtml = '';
        let summaryHtml = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const itemDetails = `${item.type} (${item.size})`; 

            cartHtml += `
                <div class="cart-item">
                    <p><strong>${item.name}</strong><br><span style="font-size: 0.9em; color: #777;">${itemDetails}</span></p>
                    <div class="item-controls">
                        <button onclick="changeQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity('${item.id}', 1)">+</button>
                        <span style="min-width: 60px; text-align: left;">${itemTotal.toFixed(2)} ج</span>
                        <button onclick="removeItem('${item.id}')" style="color: var(--color-error); border-color: var(--color-error); margin-left: 5px;">&times;</button>
                    </div>
                </div>
            `;
            summaryHtml += `
                <div class="summary-item">
                    <span>${item.name} (${itemDetails}) x ${item.quantity}</span>
                    <span>${itemTotal.toFixed(2)} ج</span>
                </div>
            `;
        });
        if (cartItemsContainer) cartItemsContainer.innerHTML = cartHtml;
        if (checkoutSummaryContainer) checkoutSummaryContainer.innerHTML = summaryHtml;
        if (cartTotalElement) cartTotalElement.textContent = `${total.toFixed(2)} ج`;
        if (checkoutTotalElement) checkoutTotalElement.textContent = `${total.toFixed(2)} ج`;
    }

    // تطبيق الحد الأدنى للطلب
    const isMinAmountMet = total >= MINIMUM_ORDER_AMOUNT;

    // تحديث زر إتمام الطلب في القائمة الجانبية للسلة
    const cartCheckoutBtn = document.querySelector('#cart-sidebar .checkout-btn');
    if (cartCheckoutBtn) {
        cartCheckoutBtn.disabled = !isMinAmountMet;
        if (!isMinAmountMet) {
             cartCheckoutBtn.textContent = `الإجمالي غير كافٍ (الحد الأدنى ${MINIMUM_ORDER_AMOUNT}.00 ج)`;
             cartCheckoutBtn.classList.add('disabled-btn');
        } else {
             cartCheckoutBtn.textContent = 'إتمام الطلب والدفع';
             cartCheckoutBtn.classList.remove('disabled-btn');
        }
    }
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeItem(productId);
        } else {
            saveCartAndRender();
        }
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartAndRender();
    showToast('تم حذف المنتج من السلة.', 'info');
}


// =======================================================
// 6. وظيفة البحث والتطبيع والفلترة (Search and Normalization)
// =======================================================

function normalizeArabic(text) {
    if (!text) return '';
    let normalized = text.toLowerCase().trim(); 
    normalized = normalized.replace(/بُن/g, 'بن');
    normalized = normalized.replace(/[\u064B-\u0652]/g, ''); // إزالة التشكيل
    return normalized;
}

// 🚨 دالة الفلترة (إخفاء/إظهار المنتجات)
function filterStoreProducts(query) {
    const normalizedQuery = query ? normalizeArabic(query) : null;
    let productsFound = false;
    
    // 1. فلترة المنتجات الفردية
    document.querySelectorAll('.store-product').forEach(card => {
        const name = card.dataset.productName;
        const normalizedName = normalizeArabic(name);
        
        if (!normalizedQuery || normalizedName.includes(normalizedQuery)) {
            card.style.display = 'flex'; // إظهار المنتج
            productsFound = true;
        } else {
            card.style.display = 'none'; // إخفاء المنتج
        }
    });

    // 2. إخفاء/إظهار عناوين الفئات
    document.querySelectorAll('.category-title').forEach(title => {
        const categoryName = title.dataset.categoryName;
        const associatedGrid = document.querySelector(`[data-category-grid="${categoryName}"]`);
        
        // التحقق من وجود أي منتج ظاهر في هذه الفئة
        const visibleProductsInGrid = associatedGrid ? associatedGrid.querySelector('.store-product[style*="flex"]') : null;

        if (visibleProductsInGrid) {
            title.style.display = 'block';
            associatedGrid.style.display = 'grid';
        } else {
            title.style.display = 'none';
            associatedGrid.style.display = 'grid'; 
        }
    });

    if (!productsFound && normalizedQuery) {
        showToast('لا توجد منتجات مطابقة لنتيجة البحث في المتجر.', 'error');
    } else if (productsFound && normalizedQuery) {
         showToast(`تم العثور على نتائج مطابقة لـ "${query}" في المتجر.`, 'success');
    }
}


function handleGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    const query = searchInput.value.trim();
    
    if (query.length < 2) {
        showToast('الرجاء إدخال حرفين على الأقل للبحث.', 'info');
        return;
    }
    
    const normalizedQuery = normalizeArabic(query);
    let foundPageId = null;

    // 1. البحث في الصفحات (للتنقل المباشر)
    for (const id in PAGE_SECTIONS) {
        if (normalizeArabic(PAGE_SECTIONS[id]).includes(normalizedQuery)) {
            foundPageId = id;
            break; 
        }
    }
    
    if (foundPageId && foundPageId !== 'store') {
        navigate(foundPageId);
        showToast(`تم التوجيه إلى صفحة: ${PAGE_SECTIONS[foundPageId]}`, 'info');
    } else {
        // التوجه للمتجر أولاً (إذا لم نكن فيه) لضمان وجود المنتجات للعرض
        if (document.getElementById('store').style.display === 'none') {
            navigate('store'); 
        }
        
        // تطبيق الفلترة على المنتجات الحالية
        filterStoreProducts(query);
        
        // 🚨 مسح حقل البحث بعد ظهور النتائج
        searchInput.value = '';
    }
}


// =======================================================
// 7. التهيئة الأولية (Initialization)
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // تفعيل التنقل الأولي (والذي يشغل انيميشن الدخول)
    navigate('home'); 
    
    // 🚨 ربط ضغطة Enter في حقل البحث بدالة البحث
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // منع الإرسال التلقائي للنموذج
                handleGlobalSearch();
            }
        });
    }
    
    // ربط نموذج الدفع
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع البيانات
            const formData = new FormData(checkoutForm);
            const customerName = formData.get('customer-name');
            const customerPhone = formData.get('customer-phone');
            const customerAddress = formData.get('customer-address');
            const paymentMethod = formData.get('payment-method');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            let orderMessage = `*طلب جديد من متجر بُن عامر*\n\n`;
            orderMessage += `*الإجمالي:* ${total.toFixed(2)} ج\n`;
            orderMessage += `*الاسم:* ${customerName}\n`;
            orderMessage += `*الهاتف:* ${customerPhone}\n`;
            orderMessage += `*العنوان:* ${customerAddress}\n`;
            orderMessage += `*طريقة الدفع:* ${paymentMethod}\n\n`;
            
            orderMessage += `*تفاصيل الطلب:*\n`;
            cart.forEach(item => {
                orderMessage += `• ${item.name} (${item.type}, ${item.size}) x ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} ج\n`;
            });

            
            // إنشاء رابط واتساب
            const whatsappURL = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(orderMessage)}`;
            
            // إعادة تعيين السلة وتوجيه المستخدم
            cart = [];
            saveCartAndRender(); 
            showToast('✅ تم إرسال الطلب بنجاح! جاري تحويلك إلى واتساب.', 'success');
            
            // فتح نافذة واتساب بعد التأكيد
            setTimeout(() => {
                 window.open(whatsappURL, '_blank');
            }, 1000);
            
            checkoutForm.reset(); 
        });
    }

    updateCartIconCount(); // تحديث العداد عند التحميل
});
