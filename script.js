// script.js - النسخة النهائية (تعديل البحث وإزالة "حسابي" وتحديث أسماء المنتجات)

// 🚨🚨🚨 [ بيانات الإعدادات ] 🚨🚨🚨
const WHATSAPP_PHONE_NUMBER = '201029352797'; 
// =======================================================


// =======================================================
// 1. البيانات الأساسية للموقع (Data Model)
// =======================================================

const PAGE_SECTIONS = {
    'home': 'الرئيسية',
    'store': 'المتجر وقائمة المنتجات',
    'menu-page': 'قائمة المنيو المصورة',
    'who-are-we': 'صفحة من نحن',
    'contact': 'صفحة تواصل معنا',
};

const productsData = [
    {
        category: "بُن فاتح",
        items: [
            { name: "بُن فاتح - توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 540 },
                { type: "محوج", price: 600 },
                { type: "محوج مخصوص", price: 720 }
            ]},
            { name: "بُن فاتح - توليفة أرابيكا", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 600 },
                { type: "محوج", price: 660 },
                { type: "محوج مخصوص", price: 780 }
            ]},
        ]
    },
    // ⬇️⬇️⬇️ تمت إضافة فئة "بُن وسط" الجديدة هنا ⬇️⬇️⬇️
    {
        category: "بُن وسط",
        items: [
            { name: "بُن وسط - توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 540 }, // سعر تقريبي
                { type: "محوج", price: 600 },
                { type: "محوج مخصوص", price: 720 }
            ]},
            { name: "بُن وسط - توليفة أرابيكا", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 600 },
                { type: "محوج", price: 660 },
                { type: "محوج مخصوص", price: 780 }
            ]},
        ]
    },
    // ⬆️⬆️⬆️ نهاية الفئة الجديدة ⬆️⬆️⬆️
    {
        category: "بُن غامق",
        items: [
            { name: "بُن غامق - توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 560 },
                { type: "محوج", price: 620 },
                { type: "محوج مخصوص", price: 740 }
            ]},
            { name: "بُن غامق - توليفة أرابيكا", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 620 },
                { type: "محوج", price: 680 },
                { type: "محوج مخصوص", price: 800 }
            ]},
        ]
    },
    {
        category: "بُن محروق",
        items: [
            { name: "بُن محروق - توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 580 },
                { type: "محوج", price: 640 },
                { type: "محوج مخصوص", price: 760 }
            ]},
            { name: "بُن محروق - كولومبي", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 810 },
                { type: "محوج", price: 920 },
                { type: "محوج مخصوص", price: 990 }
            ]},
            { name: "بُن محروق - حبشي", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 600 },
                { type: "محوج", price: 660 },
                { type: "محوج مخصوص", price: 780 }
            ]},
            { name: "بُن محروق - اسبريسو", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 620 },
                { type: "محوج مخصوص", price: 960 }
            ]},
        ]
    },
    {
        category: "قهوة فلفرز",
        items: [
            { name: "قهوة عربي", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 600 },
                { type: "محوج", price: 780 }
            ]},
            { name: "قهوة بندق", image: 'pr5.jpg', variants: [
                { type: "اوريجينال", price: 620 }
            ]},
            { name: "قهوة فرنساوي", image: 'pr5.jpg', variants: [
                { type: "اوريجينال", price: 600 }
            ]},
            { name: "نسكافيه كلاسيك", image: 'pr5.jpg', variants: [
                { type: "اوريجينال", price: 1300 }
            ]},
            { name: "نسكافيه جولد", image: 'pr5.jpg', variants: [
                { type: "اوريجينال", price: 1500 }
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
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function addToCart(button) {
    const card = button.closest('.product-card');
    const productName = card.dataset.productName;
    const selectedVariant = card.querySelector(`input[name="${productName}-variant"]:checked`);
    
    if (!selectedVariant) {
        showToast('الرجاء اختيار نوع القهوة (سادة/محوج/مخصوص).', 'error');
        return;
    }

    const type = selectedVariant.value;
    const price = parseFloat(selectedVariant.dataset.price);
    const productId = `${productName}-${type}`; 

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, type: type, price: price, quantity: 1 });
    }
    
    saveCartAndRender();
    openCartSidebar(); 
    showToast(`✅ تم إضافة ${productName} - ${type} إلى السلة!`, 'success');
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutSummaryContainer = document.getElementById('checkout-items-summary');
    const checkoutTotalElement = document.getElementById('checkout-total');
    
    let total = 0;
    if (!cartItemsContainer || !cartTotalElement) return;

    if (cart.length === 0) {
        const message = '<p style="text-align: center; margin-top: 20px; color: #555;">السلة فارغة حالياً.</p>';
        cartItemsContainer.innerHTML = message;
        if (checkoutSummaryContainer) checkoutSummaryContainer.innerHTML = message;
        cartTotalElement.textContent = '0.00 ج';
        if (checkoutTotalElement) checkoutTotalElement.textContent = '0.00 ج';
        return;
    }

    let cartHtml = '';
    let summaryHtml = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHtml += `
            <div class="cart-item">
                <p><strong>${item.name}</strong> - ${item.type}</p>
                <div class="item-controls">
                    <button onclick="changeQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                    <span>${itemTotal.toFixed(2)} ج</span>
                    <button onclick="removeItem('${item.id}')" style="color: var(--color-error);">&times;</button>
                </div>
            </div>
        `;
        summaryHtml += `
            <div class="summary-item">
                <span>${item.name} (${item.type}) x ${item.quantity}</span>
                <span>${itemTotal.toFixed(2)} ج</span>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHtml;
    if (checkoutSummaryContainer) checkoutSummaryContainer.innerHTML = summaryHtml;
    cartTotalElement.textContent = `${total.toFixed(2)} ج`;
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

    closeSidebar();
    closeCartSidebar();
}

function renderStore() {
    const storeContainer = document.getElementById('store-content');
    if (!storeContainer) return;

    let htmlContent = '';
    productsData.forEach(category => {
        htmlContent += `<h2 class="category-title">${category.category}</h2><div class="product-grid">`;
        
        category.items.forEach(item => {
            htmlContent += `
                <div class="product-card" data-product-name="${item.name}" data-category="${category.category}">
                    <img src="${item.image}" alt="${item.name}" class="product-image" loading="lazy">
                    <h3>${item.name}</h3>
                    
                    <div class="variant-selector">
                        ${item.variants.map((variant, index) => `
                            <div class="variant-option">
                                <input type="radio" id="${item.name}-${variant.type}" name="${item.name}-variant" value="${variant.type}" data-price="${variant.price}" ${index === 0 ? 'checked' : ''}>
                                <label for="${item.name}-${variant.type}">${variant.type} (${variant.price} ج)</label>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="add-to-cart-btn" onclick="addToCart(this)">أضف إلى السلة</button>
                </div>
            `;
        });
        htmlContent += `</div>`;
    });
    storeContainer.innerHTML = htmlContent;
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
// 4. وظيفة البحث الشامل (Global Search) - محسّن
// =======================================================

function handleGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length < 2) {
        showToast('الرجاء إدخال حرفين على الأقل للبحث.', 'info');
        return;
    }

    let foundPage = null;
    let foundProduct = false;

    // 1. البحث في أقسام الموقع الثابتة (للتوجيه المباشر للصفحة)
    for (const id in PAGE_SECTIONS) {
        const name = PAGE_SECTIONS[id].toLowerCase();
        if (name.includes(query)) {
            foundPage = id; // حفظ ID الصفحة المطابقة
            break;
        }
    }

    // 2. البحث في المنتجات والأقسام (للتأكيد على وجود نتيجة في المتجر)
    productsData.forEach(category => {
        if (category.category.toLowerCase().includes(query)) {
            foundProduct = true;
        }
        category.items.forEach(item => {
            if (item.name.toLowerCase().includes(query)) {
                foundProduct = true;
            }
        });
    });

    
    if (foundPage || foundProduct) {
        let destination = '';

        if (foundPage) {
            // الأولوية للتوجيه إلى صفحة موقع ثابتة
            navigate(foundPage);
            destination = PAGE_SECTIONS[foundPage];
        } else if (foundProduct) {
            // إذا لم يتم العثور على صفحة ثابتة ولكن تم العثور على منتج/قسم، توجه للمتجر
            navigate('store');
            destination = 'المتجر (تم العثور على منتج أو تصنيف)';
        }
        
        showToast(`✅ تم العثور على نتائج. جاري التوجيه إلى: ${destination}`, 'success');
        
    } else {
        showToast(`عذراً، لم يتم العثور على نتائج مطابقة لـ "${query}" في الموقع.`, 'error');
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
    const paymentMethodName = paymentMethodInput ? paymentMethodInput.value : 'لم يتم تحديده';

    // إضافة معلومات الحساب للدفع إذا لم يكن الدفع عند الاستلام
    let paymentDetails = '';
    if (paymentMethodName === 'InstaPay') {
        paymentDetails = '*حساب الدفع:* Raafate2001@instapay';
    } else if (paymentMethodName === 'Vodafone Cash') {
        paymentDetails = '*رقم فودافون كاش:* 01029352797';
    } else if (paymentMethodName === 'Telda') {
        paymentDetails = '*حساب تلدا:* @raafatemad1';
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    let orderDetailsList = cart.map(item => `* ${item.name} (${item.type}): ${item.quantity} x ${item.price} ج`).join('\n');
    
    const whatsappMessage = 
`*🚨 طلب جديد من موقع Amerrcoffee 🚨*

*الاسم:* ${name}
*الهاتف:* ${phone}
*الإيميل:* ${email || 'لا يوجد'}
*العنوان:* ${address}
*طريقة الدفع:* ${paymentMethodName}
${paymentDetails}

*============== تفاصيل الطلب ==============*
${orderDetailsList}

*الإجمالي الكلي:* ${total} ج

---
يرجى تأكيد الطلب، وشكراً.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    cart = [];
    saveCartAndRender();
    
    window.open(whatsappUrl, '_blank'); 
    
    showToast("✅ تم توجيهك إلى الواتساب. يرجى تأكيد الإرسال هناك.", 'success');
    navigate('home'); 
}


// =======================================================
// 6. تشغيل الوظائف عند تحميل الصفحة
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('[data-page]').forEach(button => {
        button.addEventListener('click', () => navigate(button.dataset.page));
    });
    
    navigate('home'); 
    renderStore();

    renderCart();
    updateCartIconCount();

    document.getElementById('sidebar-toggle').onclick = openSidebar;
    document.getElementById('cart-toggle').onclick = openCartSidebar;

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    // ربط البحث الشامل
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
});
        
