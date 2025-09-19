document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBİL MENÜ MANTIĞI ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const body = document.body;

    if (hamburger && mobileNav && mobileNavClose) {
        // Hamburger'a tıklayınca menüyü aç
        hamburger.addEventListener('click', () => {
            body.classList.add('nav-open');
        });

        // Kapatma butonuna tıklayınca menüyü kapat
        mobileNavClose.addEventListener('click', () => {
            body.classList.remove('nav-open');
        });
    }

    // --- DİL DEĞİŞTİRME MEKANİZMASI ---
    const languageSwitchers = document.querySelectorAll('.language-switcher, .language-switcher-mobile');
    
    const changeLanguage = async (lang) => {
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) { return; }
            const translations = await response.json();

            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });
            
            localStorage.setItem('language', lang);
        } catch (error) {
            console.error("Dil değiştirilirken hata oluştu:", error);
        }
    };

    if (languageSwitchers.length > 0) {
        languageSwitchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.target.getAttribute('data-set-lang');
                if (lang) {
                    changeLanguage(lang);
                    languageSwitchers.forEach(s => {
                        s.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                        const currentButton = s.querySelector(`[data-set-lang="${lang}"]`);
                        if(currentButton) currentButton.classList.add('active');
                    });
                }
            });
        });

        const currentLang = localStorage.getItem('language') || 'tr';
        changeLanguage(currentLang);
        
        languageSwitchers.forEach(s => {
            const currentButton = s.querySelector(`[data-set-lang="${currentLang}"]`);
            if(currentButton) currentButton.classList.add('active');
        });
    }

    // --- GENEL SCRIPTLER (TÜM SAYFALAR İÇİN) ---
    AOS.init({
        duration: 1000,
        once: true,
    });

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- SWIPER SLIDER (Sadece .hero-slider olan sayfalarda çalışır) ---
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const swiper = new Swiper('.hero-slider', {
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
        });
    }
});