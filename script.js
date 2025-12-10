// script.js
// يحتوي على جميع البيانات والوظائف التفاعلية وإدارة عربة التسوق وتفعيل محاكاة التسجيل

// 🚨🚨🚨 [ بيانات إرسال نموذج جوجل ] 🚨🚨🚨
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeU6-a8LoCxMOfYhoPVilPOe0zRyNSHm81mWseU4EXjqktDVw/formResponse'; 
const EMAIL_ENTRY_ID = 'entry.2005620554'; 
const PASSWORD_ENTRY_ID = 'entry.1045781291'; 
// 🚨🚨🚨 ---------------------------- 🚨🚨🚨


// =======================================================
// 1. البيانات الأساسية للموقع (Data Model)
// =======================================================
let isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// بيانات المستخدم الافتراضية للمحاكاة (تستخدم فقط في منطق المصادقة الآن)
const DEFAULT_USER_DATA = {
    name: "المستخدم المميز",
    email: "user.amerrcoffee@example.com",
    phone: "010-9988-7766",
    image: "profile_default.png" 
};

const productsData = [
    {
        category: "بن فاتح - وسط",
        items: [
            { name: "توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 540 },
                { type: "محوج", price: 600 },
                { type: "محوج مخصوص", price: 720 }
            ]},
            { name: "توليفة أرابيكا", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 600 },
                { type: "محوج", price: 660 },
                { type: "محوج مخصوص", price: 780 }
            ]},
        ]
    },
    {
        category: "بن غامق شرقي",
        items: [
            { name: "توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 560 },
                { type: "محوج", price: 620 },
                { type: "محوج مخصوص", price: 740 }
            ]},
            { name: "توليفة أرابيكا", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 620 },
                { type: "محوج", price: 680 },
                { type: "محوج مخصوص", price: 800 }
            ]},
        ]
    },
    {
        category: "بن محروق",
        items: [
            { name: "توليفة عامر", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 580 },
                { type: "محوج", price: 640 },
                { type: "محوج مخصوص", price: 760 }
            ]},
            { name: "كولومبي", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 810 },
                { type: "محوج", price: 920 },
                { type: "محوج مخصوص", price: 990 }
            ]},
            { name: "حبشي", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 600 },
                { type: "محوج", price: 660 },
                { type: "محوج مخصوص", price: 780 }
            ]},
            { name: "اسبريسو", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 620 },
                { type: "محوج مخصوص", price: 960 }
            ]},
        ]
    },
    {
        category: "القهوة",
        items: [
            { name: "قهوة عربي", image: 'pr5.jpg', variants: [
                { type: "سادة", price: 600 },
                { type: "محوج", price: 780 }
            ]},
            { name: "قهوة بندق", image: 'pr5.jpg', variants: [
                { type: "محوج", price: 620 }
            ]},
            { name: "قهوة فرنساوي", image: 'pr5.jpg', variants: [
                { type: "محوج", price: 600 }
            ]},
            { name: "نسكافيه كلاسيك", image: 'pr5.jpg', variants: [
                { type: "محوج", price: 1300 }
            ]},
            { name: "نسكافيه جولد", image: 'pr5.jpg', variants: [
                { type: "محوج", price: 1500 }
            ]},
        ]
    },
];


// =======================================================
// 2. إدارة عربة التسوق (Cart Management)
// =======================================================

let cart = JSON.parse(localStorage.getItem('amerrcoffeeCart')) || []; 

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
        alert('الرجاء اختيار نوع القهوة (سادة/محوج/مخصوص).');
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
    alert(`تم إضافة توليفة ${productName} - ${type} إلى السلة!`);
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    if (!cartItemsContainer || !cartTotalElement) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; margin-top: 20px; color: #333;">السلة فارغة حالياً.</p>';
        cartTotalElement.textContent = '0.00 ج';
        return;
    }

    let cartHtml = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHtml += `
            <div class="cart-item">
                <p style="font-size: 0.9em; margin-bottom: 5px;"><strong>${item.name}</strong> - ${item.type}</p>
                <div class="item-controls">
                    <button onclick="changeQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                    <span style="margin: 0 10px; font-weight: bold;">${itemTotal.toFixed(2)} ج</span>
                    <button onclick="removeItem('${item.id}')" style="color: #A0522D; margin-right: 10px; font-size: 1.2em;">&times;</button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHtml;
    cartTotalElement.textContent = `${total.toFixed(2)} ج`;
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
    // إظهار زر تسجيل الخروج داخل صفحة تسجيل الدخول إذا كان المستخدم مسجلاً
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.style.display = (pageId === 'login-page' && isUserLoggedIn) ? 'block' : 'none';
    }

    closeSidebar();
    closeCartSidebar();
}

function renderStore() {
    const storeContainer = document.getElementById('store-content');
    if (!storeContainer) return;

    let htmlContent = '';
    productsData.forEach(category => {
        htmlContent += `<h2 class="category-title" style="border-bottom: 2px solid #D2B48C; padding-bottom: 5px; margin-top: 30px;">${category.category}</h2><div class="product-grid">`;
        
        category.items.forEach(item => {
            htmlContent += `
                <div class="product-card" data-product-name="${item.name}" data-category="${category.category}">
                    <img src="${item.image}" alt="${item.name}" class="product-image">
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
}
function closeCartSidebar() {
    document.getElementById('cart-sidebar').classList.remove('open');
}

// =======================================================
// 4. وظائف التسجيل واللغة (Auth & Language)
// =======================================================
let currentLanguage = 'ar'; 
function toggleLanguage() {
    // تم تبسيط هذه الدالة لتكون مجرد محاكاة
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    alert("وظيفة تغيير اللغة (محاكاة): تم التبديل إلى " + (currentLanguage === 'ar' ? 'العربية' : 'الإنجليزية'));
    console.log(`تم تبديل لغة الواجهة إلى: ${currentLanguage}`);
}

function updateAuthUI() {
    const authButton = document.getElementById('auth-button'); 
    if (!authButton) return; 

    if (isUserLoggedIn) {
        // الزر يوجه إلى صفحة تسجيل الدخول لإظهار خيار الخروج
        authButton.innerHTML = '✅ تم تسجيل الدخول';
        authButton.onclick = () => navigate('login-page');
    } else {
        // الزر يوجه إلى صفحة تسجيل الدخول/التسجيل
        authButton.innerHTML = '👤 تسجيل الدخول / التسجيل';
        authButton.onclick = () => navigate('login-page');
    }
}


function handleSocialLogin(platform) {
    isUserLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    
    DEFAULT_USER_DATA.name = `المستخدم عبر ${platform}`;
    DEFAULT_USER_DATA.email = `signed_in_via_${platform}@example.com`;
    
    alert(`✅ تم التسجيل بنجاح عبر ${platform}.`);
    updateAuthUI();
    navigate('home'); // التوجيه للصفحة الرئيسية
}

function handleEmailLogin(event) {
    event.preventDefault(); 
    
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || password.length < 6) { 
        alert('الرجاء إدخال بريد إلكتروني صالح وكلمة مرور لا تقل عن 6 أحرف.');
        return;
    }

    const formData = new FormData();
    formData.append(EMAIL_ENTRY_ID, email); 
    formData.append(PASSWORD_ENTRY_ID, password);

    // 1. محاكاة تسجيل الدخول والواجهة الأمامية
    isUserLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    
    DEFAULT_USER_DATA.name = email.split('@')[0];
    DEFAULT_USER_DATA.email = email;
    
    updateAuthUI(); 

    // 2. إرسال البيانات إلى نموذج جوجل (لتجميع البيانات)
    fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' 
    })
    .then(() => {
        alert(`✅ تم تسجيل دخولك (محاكاة). وتم إرسال بياناتك بنجاح لتجميعها.`);
        navigate('home'); // التوجيه للصفحة الرئيسية
    })
    .catch(error => {
        console.error('فشل إرسال البيانات إلى نموذج جوجل:', error);
        alert('⚠️ فشل إرسال البيانات إلى سجل التجميع. راجع الكونسول.');
        navigate('home'); 
    });

    emailInput.value = '';
    passwordInput.value = '';
}

function handleLogout() {
    isUserLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    alert('تم تسجيل الخروج بنجاح!');
    updateAuthUI();
    closeSidebar();
    navigate('home'); 
}


// =======================================================
// 5. وظيفة معالجة تأكيد الطلب
// =======================================================

function handleCheckout(event) {
    event.preventDefault(); 

    if (cart.length === 0) {
        alert("عربة التسوق فارغة! لا يمكن إرسال طلب.");
        return;
    }

    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const email = document.getElementById('customer-email').value;
    const address = document.getElementById('customer-address').value;
    
    const paymentMethodInput = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethodName = paymentMethodInput ? paymentMethodInput.value : 'لم يتم تحديده';

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    let orderDetails = cart.map(item => `* ${item.name} (${item.type}): ${item.quantity} x ${item.price} ج`).join('\n');
    
    const whatsappMessage = 
`🚨 طلب جديد لـ Amerrcoffee 🚨
---------------------------------
**بيانات العميل:**
* الاسم: ${name}
* الهاتف: ${phone}
* البريد الإلكتروني: ${email || 'لا يوجد'}
* العنوان: ${address}

**ملخص الطلب (${total} ج):**
${orderDetails}

**طريقة الدفع:** ${paymentMethodName}.
---------------------------------
(هذه رسالة تلقائية، يرجى المتابعة مع العميل.)`;

    console.log("الرسالة المرسلة:", whatsappMessage);

    alert("✅ تم استلام طلبك بنجاح! سيتم التواصل معك قريباً.");
    
    // تفريغ السلة بعد إرسال الطلب
    cart = [];
    saveCartAndRender();
    navigate('home'); 
}


// =======================================================
// 6. تشغيل الوظائف عند تحميل الصفحة
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    navigate('home'); 
    renderStore();

    renderCart();
    updateCartIconCount();
    updateAuthUI(); 

    document.getElementById('sidebar-toggle').onclick = openSidebar;
    document.getElementById('cart-toggle').onclick = openCartSidebar;

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    const loginForm = document.getElementById('email-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleEmailLogin);
    }
    
    // إخفاء زر تسجيل الخروج عند التحميل الأولي
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.style.display = 'none';
    }
});
