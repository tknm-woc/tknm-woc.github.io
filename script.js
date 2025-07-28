document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // メニューを開閉する関数
    const toggleMenu = () => {
        const isActive = navLinks.classList.contains("active");

        if (isActive) {
            // メニューを閉じる
            // CSS側でanimating-outクラスに対するtransitionが定義されていることを前提とする
            navLinks.classList.remove("active");
            navLinks.classList.add("animating-out"); // フェードアウトアニメーション開始
            hamburger.classList.remove("active"); // ハンバーガーアイコンを元に戻す

            // 注意: navLinksのanimating-outクラスをいつ削除するかはCSSのtransitionendに任せるか、
            // JavaScriptでsetTimeoutを使ってCSSのtransition終了後に削除するかを検討
            // 今回はCSSのtransition-delayでvisibilityを制御しているため、
            // animating-outクラスは単にフェードアウトのトリガーとして使用し、
            // その後の削除はCSSのtransitionendイベントに委ねるか、
            // もしくは完全に表示になった後にのみactiveを削除する形でJSは触らないことも可能
            // 例として、完全に消えるのを待ってからanimating-outを削除する
            // var(--transition-duration)とCSSの値を一致させる
            setTimeout(() => {
                navLinks.classList.remove("animating-out");
            }, 300); // CSSのtransition時間 (例: 0.3s = 300ms) と合わせる

        } else {
            // メニューを開く
            navLinks.classList.remove("animating-out"); // 開くときはanimating-outクラスを削除
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

const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  if(navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    navLinks.classList.add('animating-out');
    setTimeout(() => navLinks.classList.remove('animating-out'), 300); // 0.3s後にクラス削除
  } else {
    navLinks.classList.add('active');
  }
});
// 60分後にアラート通知
setTimeout(() => {
    alert("最後にページを読み込んでから1時間が経過しました。最新情報を表示するために、再読み込みを推奨します。");
}, 60 * 60 * 1000);
