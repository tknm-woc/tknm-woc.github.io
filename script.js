document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // メニューを開閉する関数
    const toggleMenu = () => {
        const isActive = navLinks.classList.contains("active");

        if (isActive) {
            navLinks.classList.remove("active");
            navLinks.classList.add("animating-out");

            // アニメーション終了後に非表示
            navLinks.addEventListener("animationend", () => {
                navLinks.classList.remove("animating-out");
            }, { once: true });

            hamburger.classList.remove("active");
            hamburger.classList.add("animating-out");
            
            hamburger.addEventListener("transitionend", () => {
                hamburger.classList.remove("animating-out");
            }, { once: true });

        } else {
            navLinks.classList.add("active");
            hamburger.classList.add("active");
        }
    };

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation(); // バブリング防止
        toggleMenu();
    });

    // 外側クリックで閉じる
    document.addEventListener("click", (e) => {
        const isMenuOpen = navLinks.classList.contains("active");
        if (isMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            toggleMenu();
        }
    });

    // ページ内リンクのスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }

            // スクロール時にメニューが開いていれば閉じる
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        });
    });
});

// iframeリロード処理（eventsFrame）
window.addEventListener("load", () => {
    const frame = document.getElementById("eventsFrame");
    if (frame) {
        frame.src = frame.src.split("?")[0] + "?t=" + new Date().getTime();
    }
});

// 60分後にアラート通知
setTimeout(() => {
    alert("最後にページを読み込んでから1時間が経過しました。最新情報を表示するために、再読み込みを推奨します。");
}, 60 * 60 * 1000);
