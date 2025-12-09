document.addEventListener('DOMContentLoaded', (event) => {
    
    // جميع العناصر التي نريد تطبيق الحركة عليها
    const elementsToAnimate = document.querySelectorAll(
        '.fade-in-up, .fade-in, .slide-in-right, .slide-in-left'
    );

    // Intersection Observer API لمراقبة متى يظهر العنصر في Viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إذا ظهر العنصر، أضف فئة is-visible
                entry.target.classList.add('is-visible');
                // توقف عن مراقبته بعد ظهوره
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        // يبدأ التأثير عندما يظهر 5% من العنصر في الشاشة
        threshold: 0.05 
    });

    // مراقبة كل العناصر
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
