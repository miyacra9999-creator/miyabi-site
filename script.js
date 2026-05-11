document.addEventListener('DOMContentLoaded', () => {
    
    // ハンバーガーメニューの開閉
    const hamburger = document.querySelector('.js-hamburger');
    const drawer = document.querySelector('.js-drawer');
    const drawerLinks = document.querySelectorAll('.js-drawer a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        drawer.classList.toggle('is-active');
    });

    // メニュー内リンククリックで閉じる
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            drawer.classList.remove('is-active');
        });
    });

    // スムーススクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    const headerHeight = document.querySelector('.js-header').offsetHeight;

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロールフェードイン アニメーション (Intersection Observer)
    const fadeEls = document.querySelectorAll('.js-fadein');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // 画面の下から10%入ったら発火
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                obs.unobserve(entry.target); // 一度発火したら監視終了
            }
        });
    }, observerOptions);

    fadeEls.forEach(el => {
        observer.observe(el);
    });
});