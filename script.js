const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const overlay = document.getElementById("loginOverlay");

const loginWindow = document.querySelector(".login-window");
const loginBrand = document.getElementById("loginBrand");
const loginTitle = document.getElementById("loginTitle");
const loginSubtitle = document.getElementById("loginSubtitle");
const loginMessage = document.getElementById("loginMessage");
const loginForm = document.getElementById("demoLoginForm");

const platformInfo = {
    facebook: {
        name: "facebook",
        title: "Log in to Facebook",
        subtitle: "Connect with friends and the world around you."
    },

    instagram: {
        name: "Instagram",
        title: "Log in to Instagram",
        subtitle: "Share your moments and connect with people."
    },

    tiktok: {
        name: "TikTok",
        title: "Log in to TikTok",
        subtitle: "Discover videos and creative communities."
    }
};

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});

function openLogin(platform) {
    const info = platformInfo[platform];

    if (!info) return;

    loginWindow.className = "login-window " + platform;

    loginBrand.textContent = info.name;
    loginTitle.textContent = info.title;
    loginSubtitle.textContent = info.subtitle;

    loginMessage.textContent = "";

    loginForm.reset();

    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    document.getElementById("demoUser").focus();
}

function closeLogin() {
    overlay.classList.remove("active");

    overlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

document.querySelectorAll("[data-platform]").forEach(button => {
    button.addEventListener("click", () => {
        openLogin(button.dataset.platform);
    });
});

document.getElementById("closeLogin").addEventListener("click", closeLogin);

document.getElementById("backLogin").addEventListener("click", closeLogin);

overlay.addEventListener("click", event => {
    if (event.target === overlay) {
        closeLogin();
    }
});

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        overlay.classList.contains("active")
    ) {
        closeLogin();
    }
});

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    loginMessage.textContent =
        "Demo only — no account was signed in and no information was saved.";

    loginForm.reset();
});