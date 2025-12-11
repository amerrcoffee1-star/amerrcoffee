// script.js - النسخة النهائية والمعدلة والمصححة

// 🚨🚨🚨 [ بيانات الإعدادات ] 🚨🚨🚨
const WHATSAPP_PHONE_NUMBER = '201029352797'; 
// الأحجام المتاحة هي مفاتيح الأسعار في البيانات
const availableSizes = ['125 ج', '250 ج', '500 ج', '1000 ج']; 
const defaultSize = availableSizes[3]; // '1000 ج' - الحجم الافتراضي يكون الأكبر والأكثر وضوحاً

// =======================================================
// 1. البيانات الأساسية للموقع (Data Model) - الأسعار الموحدة
// =======================================================

const PAGE_SECTIONS = {
    'home': 'الرئيسية',
    'store': 'المتجر وقائمة المنتجات',
    'menu-page': 'المنيو المصورة',
    'who-are-we': 'من نحن',
    'contact': 'تواصل معنا',
    'checkout': 'إتمام عملية الدفع', 
};

// البيانات التي تحدد المنتجات وأسعارها (تم تحديثها وفقاً لآخر إدخال)
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
            { name: "بُن محروق - كولومبي", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 105, '250 ج': 205, '500 ج': 405, '1000 ج': 810 } },
                { type: "محوج", prices: { '125 ج': 115, '250 ج': 230, '500 ج': 460, '1000 ج': 920 } },
                { type: "محوج مخصوص", prices: { '125 ج': 125, '250 ج': 250, '500 ج': 495, '1000 ج': 990 } }
            ]},
            { name: "بُن محروق - حبشي", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 75, '250 ج': 150, '500 ج': 300, '1000 ج': 600 } },
                { type: "محوج", prices: { '125 ج': 85, '250 ج': 165, '500 ج': 330, '1000 ج': 660 } },
                { type: "محوج مخصوص", prices: { '125 ج': 100, '250 ج': 195, '500 ج': 390, '1000 ج': 780 } }
            ]},
            { name: "بُن محروق - اسبريسو", image: 'pr5.jpg', variants: [
                { type: "سادة", prices: { '125 ج': 80, '250 ج': 155, '500 ج': 310, '1000 ج': 620 } },
                { type: "محوج مخصوص", prices: { '125 ج': 120, '250 ج': 240, '500 ج': 480, '1000 ج': 960 } }
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
// 2. إدارة عربة التسوق (Cart Management)
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
        // إظهار/إخفاء العداد
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function addToCart(button) {
    const card = button.closest('.product-card');
    const productName = card.dataset.productName;
    // استخدام اسم المنتج كنص آمن (Safe Name)
    const safeName = productName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_'); 
    
    // البحث عن الخيارات المحددة بناءً على الاسم الآمن
    const selectedTypeInput = card.querySelector(`input[name="${safeName}-type"]:checked`);
    const selectedSizeInput = card.querySelector(`input[name="${safeName}-size"]:checked`);

    if (!selectedTypeInput || !selectedSizeInput) {
        showToast('الرجاء اختيار نوع القهوة (سادة/محوج/مخصوص) والحجم المطلوب.', 'error');
        return;
    }

    const type = selectedTypeInput.value;
    const size = selectedSizeInput.value;

    const productData = productsData.flatMap(c => c.items).find(i => i.name === productName);
    const variant = productData.variants.find(v => v.type === type);
    const price = variant ? variant.prices[size] : 0; 
    
    if (price <= 0) {
         showToast(`عفواً، السعر غير محدد لهذا الاختيار.`, 'error');
         return;
    }

    const productId = `${productName}-${type}-${size}`; 

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, type: type, size: size, price: price, quantity: 1 });
    }
    
    saveCartAndRender();
    openCartSidebar(); 
    showToast(`✅ تم إضافة ${productName} - ${type} (${size}) إلى السلة!`, 'success');
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutSummaryContainer = document.getElementById('checkout-items-summary');
    const checkoutTotalElement = document.getElementById('checkout-total');
    
    let total = 0;

    if (cart.length === 0) {
        const message = '<p style="text-align: center; margin-top: 20px; color: var(--color-text);">السلة فارغة حالياً.</p>';
        if (cartItemsContainer) cartItemsContainer.innerHTML = message;
        if (checkoutSummaryContainer) checkoutSummaryContainer.innerHTML = message;
        if (cartTotalElement) cartTotalElement.textContent = '0.00 ج';
        if (checkoutTotalElement) checkoutTotalElement.textContent = '0.00 ج';
        return;
    }

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
// 3. إدارة التفاعلية العامة (UI Management)
// =======================================================

function navigate(pageId) {
    // إخفاء جميع الأقسام
    document.querySelectorAll('.page-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // إظهار القسم المطلوب
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // تفعيل زر التنقل في الشريط السفلي
    document.querySelectorAll('.footer-nav button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageId) {
            btn.classList.add('active');
        }
    });

    // تفعيل زر التنقل في القائمة الجانبية
    document.querySelectorAll('#side-drawer ul li button').forEach(btn => {
        btn.style.backgroundColor = 'transparent';
        if (btn.dataset.page === pageId) {
             btn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
    });

    if (pageId === 'checkout') {
        renderCart(); 
    }
    
    if (pageId === 'store') {
        renderStore(productsData); 
    }

    closeSidebar();
    closeCartSidebar();
}

function renderStore(dataToRender = productsData) {
    const storeContainer = document.getElementById('store-content');
    if (!storeContainer) return;

    let htmlContent = '';
    
    const hasResults = dataToRender.some(category => category.items.length > 0);
    if (!hasResults && dataToRender.length > 0) {
        storeContainer.innerHTML = '<p class="no-results-message" style="text-align: center; padding: 50px; font-size: 1.2em; color: var(--color-accent);">عذراً، لا توجد منتجات مطابقة لنتيجة البحث.</p>';
        return;
    }

    dataToRender.forEach(category => {
        if (category.items.length === 0) return;

        htmlContent += `<h2 class="category-title">${category.category}</h2><div class="product-grid">`;
        
        category.items.forEach(item => {
            const safeName = item.name.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_'); 
            
            // --- مُحدّد الحجم ---
            const sizeSelectorHtml = `
                <div class="size-selector variant-selector">
                    <h4 style="margin-bottom: 5px; font-size: 0.9em; color: var(--color-text);">اختر الحجم:</h4>
                    <div class="size-options" style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${availableSizes.map((size) => {
                             const isChecked = size === defaultSize ? 'checked' : '';
                             return `
                                <label class="payment-card" style="flex: 1 1 50px; padding: 10px 5px; border-radius: 5px;">
                                    <input type="radio" id="${safeName}-size-${size}" name="${safeName}-size" value="${size}" ${isChecked} class="size-radio-btn">
                                    <span class="card-content" style="font-size: 0.9em; padding: 0;">${size.replace(' ج', '')}g</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            
            // --- مُحدّد النوع/التوليفة ---
            const typeSelectorHtml = `
                <div class="type-selector variant-selector">
                    <h4 style="margin-bottom: 5px; font-size: 0.9em; color: var(--color-text);">اختر النوع:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${item.variants.map((variant, index) => `
                            <label class="payment-card" style="flex: 1 1 70px; padding: 10px 5px; border-radius: 5px;">
                                <input type="radio" id="${safeName}-type-${variant.type}" name="${safeName}-type" value="${variant.type}" ${index === 0 ? 'checked' : ''} class="type-radio-btn">
                                <span class="card-content" style="font-size: 0.9em; padding: 0;">${variant.type}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // السعر المبدئي سيكون سعر defaultSize والنوع الأول
            const initialPrice = item.variants[0].prices[defaultSize];
            const priceText = `${initialPrice.toFixed(2)} ج`;
            
            htmlContent += `
                <div class="product-card" data-product-name="${item.name}" data-category="${category.category}">
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
    
    // إضافة مستمعي الأحداث لتحديث السعر عند تغيير الاختيار
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
            priceDisplay.style.color = 'var(--color-primary)';
        };

        // ربط أحداث التغيير
        card.querySelectorAll(`input[name="${safeName}-type"]`).forEach(radio => radio.addEventListener('change', updatePriceDisplay));
        card.querySelectorAll(`input[name="${safeName}-size"]`).forEach(radio => radio.addEventListener('change', updatePriceDisplay));
        
        // تحديث السعر الافتراضي عند التحميل
        updatePriceDisplay();
    });
}

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
// 4. وظيفة البحث الشامل (Global Search)
// =======================================================

function normalizeArabic(text) {
    if (!text) return '';
    let normalized = text.toLowerCase().trim();
    normalized = normalized.replace(/بُن/g, 'بن');
    normalized = normalized.replace(/[\u064B-\u0652]/g, ''); // إزالة الحركات
    return normalized;
}

function handleGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    const query = searchInput.value.trim();
    
    if (query.length < 2) {
        showToast('الرجاء إدخال حرفين على الأقل للبحث.', 'info');
        return;
    }
    
    const normalizedQuery = normalizeArabic(query);
    let foundPage = null;
    let filteredResults = []; 

    // 1. البحث عن الصفحات
    for (const id in PAGE_SECTIONS) {
        const name = normalizeArabic(PAGE_SECTIONS[id]);
        if (name.includes(normalizedQuery)) {
            foundPage = id; 
            break;
        }
    }

    const productMap = {};
    let productFound = false;

    // 2. البحث عن المنتجات
    productsData.forEach(category => {
        const matchingItems = category.items.filter(item => {
            const itemName = normalizeArabic(item.name);
            return itemName.includes(normalizedQuery);
        });

        // إذا تطابق اسم القسم أو وُجدت منتجات مطابقة للبحث
        const categoryName = normalizeArabic(category.category);
        if (categoryName.includes(normalizedQuery) || matchingItems.length > 0) {
             
             // في حال البحث عن اسم القسم تحديداً، نظهر جميع منتجات القسم
             if (categoryName.includes(normalizedQuery) && matchingItems.length === 0) {
                 productMap[category.category] = category.items;
             } else {
                 productMap[category.category] = matchingItems;
             }
             productFound = true;
        }
    });

    filteredResults = Object.keys(productMap).map(catName => ({
        category: catName,
        items: productMap[catName]
    })).filter(cat => cat.items.length > 0);
    

    if (foundPage && !productFound) { // إذا كانت النتيجة صفحة ثابتة فقط
        navigate(foundPage);
        showToast(`✅ تم التوجيه إلى: ${PAGE_SECTIONS[foundPage]}`, 'success');
        
    } else if (productFound) {
        navigate('store');
        renderStore(filteredResults); 
        const totalItemsFound = filteredResults.reduce((sum, cat) => sum + cat.items.length, 0);
        showToast(`✅ تم العثور على ${totalItemsFound} منتج مطابق في المتجر.`, 'success');
        
    } else {
        showToast(`عذراً، لم يتم العثور على نتائج مطابقة لـ "${query}".`, 'error');
        if (document.getElementById('store').style.display === 'block') {
            renderStore([]); // إظهار رسالة "لا توجد نتائج" في المتجر
        }
    }
}


// =======================================================
// 5. وظيفة معالجة تأكيد الطلب (إرسال إلى واتساب)
// =======================================================

function handleCheckout(event) {
    event.preventDefault(); 

    if (cart.length === 0) {
        showToast("عربة التسوق فارغة! لا يمكن إرسال طلب.", 'error');
        return;
    }

    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const email = document.getElementById('customer-email').value;
    const address = document.getElementById('customer-address').value;
    
    if (!name || !phone || !address) {
        showToast("الرجاء إكمال جميع الحقول المطلوبة (الاسم، الهاتف، العنوان).", 'error');
        return;
    }

    const paymentMethodInput = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethodName = paymentMethodInput ? paymentMethodInput.value : 'الدفع عند الاستلام';

    let paymentDetails = '';
    if (paymentMethodName === 'InstaPay') {
        paymentDetails = '*حساب الدفع:* Raafate2001@instapay';
    } else if (paymentMethodName === 'Vodafone Cash') {
        paymentDetails = '*رقم فودافون كاش:* 01029352797';
    } else if (paymentMethodName === 'Telda') {
        paymentDetails = '*حساب تلدا:* @raafatemad1';
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    
    let orderDetailsList = cart.map(item => `* ${item.name} (${item.type}, ${item.size}): ${item.quantity} x ${item.price.toFixed(2)} ج`).join('\n');
    
    const whatsappMessage = 
`*🚨 طلب جديد من ستور Amerrcoffee 🚨*

*الاسم:* ${name}
*الهاتف:* ${phone}
*الإيميل:* ${email || 'لا يوجد'}
*العنوان:* ${address}
*طريقة الدفع:* ${paymentMethodName}
${paymentDetails ? paymentDetails + '\n' : ''}

*============== تفاصيل الطلب ==============*
${orderDetailsList}

*الإجمالي الكلي:* ${total} ج

---
يرجى تأكيد الطلب، وشكراً.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    // تفريغ السلة بعد إرسال الطلب
    cart = [];
    saveCartAndRender();
    
    // فتح رابط الواتساب
    window.open(whatsappUrl, '_blank'); 
    
    showToast("✅ تم توجيهك إلى الواتساب. يرجى تأكيد الإرسال هناك.", 'success');
    navigate('home'); 
}


// =======================================================
// 6. تشغيل الوظائف عند تحميل الصفحة
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ربط التنقل من الأزرار الجانبية والسفلية
    document.querySelectorAll('[data-page]').forEach(button => {
        button.addEventListener('click', () => navigate(button.dataset.page));
    });
    
    // ربط فتح وإغلاق الشرائط الجانبية
    document.getElementById('sidebar-toggle').onclick = openSidebar;
    document.getElementById('cart-toggle').onclick = openCartSidebar;
    
    // ربط نموذج الدفع
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    // ربط وظيفة البحث
    const searchBtn = document.getElementById('global-search-btn');
    const searchInput = document.getElementById('global-search-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleGlobalSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleGlobalSearch();
            }
        });
    }

    // إعداد الصفحة الابتدائية
    navigate('home'); 
    renderCart();
    updateCartIconCount();
});
