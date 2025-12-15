// script.js - النسخة النهائية والمحدثة بالبيانات الكاملة والتصحيحات

// 🚨🚨🚨 [ بيانات الإعدادات ] 🚨🚨🚨
const WHATSAPP_PHONE_NUMBER = '201029352797'; 
const availableSizes = ['125 ج', '250 ج', '500 ج', '1000 ج']; 
const defaultSize = availableSizes[3]; 

// =======================================================
// 1. البيانات الأساسية (Data Model)
// =======================================================

const PAGE_SECTIONS = {
    'home': 'الرئيسية',
    'store': 'Store',
    'menu-page': 'Menu ',
    'who-are-we': 'Who are we?  ',
    'contact': 'Contact us ',
    'checkout': 'Payment completed', 
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
    {
        category: "",
        items: [
             ,
            ,
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
    document.querySelectorAll('.page-section').forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
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
        renderStore(productsData); 
    }

    // 🚨 التصحيح هنا: إغلاق القائمة الجانبية بعد التنقل إذا كانت مفتوحة
    closeSidebar();
    closeCartSidebar();
}

function renderStore(dataToRender = productsData) {
    const storeContainer = document.getElementById('store-content');
    if (!storeContainer) return;

    let htmlContent = '';
    
    const hasResults = dataToRender.some(category => category.items.length > 0);
    if (!hasResults && dataToRender.length > 0) {
        storeContainer.innerHTML = '<p style="text-align: center; padding: 50px;">لا توجد منتجات مطابقة لنتيجة البحث.</p>';
        return;
    }

    dataToRender.forEach(category => {
        if (category.items.length === 0) return;

        htmlContent += `<h2 class="category-title">${category.category}</h2><div class="product-grid">`;
        
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
    
    // ربط مستمعي الأحداث لتحديث السعر وتنسيق الاختيار
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

        card.querySelectorAll(`input[name="${safeName}-type"]`).forEach(radio => radio.addEventListener('change', updatePriceDisplay));
        card.querySelectorAll(`input[name="${safeName}-size"]`).forEach(radio => radio.addEventListener('change', updatePriceDisplay));
        
        // تطبيق التنسيق الأولي
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
// 4. وظيفة البحث والتطبيع (Normalization)
// =======================================================
// (لم تتغير)
function normalizeArabic(text) {
    if (!text) return '';
    let normalized = text.toLowerCase().trim(); 
    normalized = normalized.replace(/بُن/g, 'بن');
    normalized = normalized.replace(/[\u064B-\u0652]/g, ''); 
    return normalized;
}

function handleGlobalSearch() {
    const query = document.getElementById('global-search-input').value.trim();
    
    if (query.length < 2) {
        showToast('الرجاء إدخال حرفين على الأقل للبحث.', 'info');
        return;
    }
    
    const normalizedQuery = normalizeArabic(query);
    let foundPageId = null;
    let filteredResults = []; 

    for (const id in PAGE_SECTIONS) {
        if (normalizeArabic(PAGE_SECTIONS[id]).includes(normalizedQuery)) {
            foundPageId = id;
            break; 
        }
    }
    
    productsData.forEach(category => {
        const matchingItems = category.items.filter(item => {
            const normalizedName = normalizeArabic(item.name);
            return normalizedName.includes(normalizedQuery);
        });
        
        if (matchingItems.length > 0) {
            filteredResults.push({
                category: category.category,
                items: matchingItems
            });
        }
    });

    if (filteredResults.length > 0) {
        showToast(`تم العثور على منتجات مطابقة في المتجر.`, 'success');
        navigate('store');
        renderStore(filteredResults); 
    } else if (foundPageId) {
        showToast(`تم التوجه لصفحة: ${PAGE_SECTIONS[foundPageId]}`, 'success');
        navigate(foundPageId);
    } else {
        showToast('عذراً، لم يتم العثور على صفحات أو منتجات مطابقة.', 'error');
        if (document.getElementById('store').style.display === 'block') {
             renderStore(productsData);
        }
    }
}

// =======================================================
// 5. معالجة نموذج الدفع (Checkout & WhatsApp)
// =======================================================

function handleCheckoutSubmit(event) {
    event.preventDefault(); 

    if (cart.length === 0) {
        showToast('السلة فارغة. الرجاء إضافة منتجات قبل إتمام الطلب.', 'error');
        return;
    }
    
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const paymentMethodInput = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'غير محدد'; 
    
    if (!name || !phone || !address) {
        showToast('الرجاء إدخال الاسم ورقم الهاتف والعنوان بالكامل.', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

    let message = `*👋 طلب جديد من موقع Amerrcoffee*:\n\n`;
    message += `*📝 بيانات العميل:*\nالاسم: ${name}\nالهاتف: ${phone}\nالعنوان: ${address}\n`;
    if (email) message += `البريد: ${email}\n\n`;
    message += `*🛒 تفاصيل الطلب:*\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.type} (${item.size}) x ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} ج\n`;
    });
    
    message += `\n*💰 الإجمالي الكلي:* ${total} ج\n`;
    message += `*💳 طريقة الدفع المختارة:* ${paymentMethod}\n\n`;
    message += `شكراً لاختياركم بُن عامر!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappLink, '_blank');
    
    cart = [];
    saveCartAndRender();
    
    showToast('تم إعداد الطلب بنجاح! يرجى إرساله الآن عبر واتساب.', 'success');
    navigate('home'); 
}


// =======================================================
// 6. تهيئة الصفحة وربط الأحداث
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. عرض الصفحة الافتراضية
    navigate('home');
    
    // 2. تحديث عداد السلة عند التحميل
    updateCartIconCount();
    
    // 3. ربط أزرار القوائم الجانبية
    document.getElementById('sidebar-toggle').addEventListener('click', openSidebar);
    document.getElementById('cart-toggle').addEventListener('click', openCartSidebar);
    
    // 4. ربط وظيفة البحث
    const searchButton = document.getElementById('global-search-btn');
    const searchInput = document.getElementById('global-search-input');
    
    if (searchButton) {
        searchButton.addEventListener('click', handleGlobalSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleGlobalSearch();
            }
        });
    }

    // 5. ربط نموذج الدفع
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
    
    // 6. ربط أزرار التنقل (لضمان إغلاق القائمة الجانبية بعد الضغط عليها)
    document.querySelectorAll('[data-page]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(button.dataset.page);
        });
    });
});
                              
