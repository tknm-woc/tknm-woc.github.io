document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // ハンバーガーメニュー外をクリックした場合に閉じる
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
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
