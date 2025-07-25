// ==============================
// FUNGSI: NAVBAR & SIDEBAR
// ==============================
export function initNavbarSidebar() {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  const sidebarPlaceholder = document.getElementById("sidebar-placeholder");

  if (!navbarPlaceholder || !sidebarPlaceholder) return;

  // Load Navbar
  fetch("/components/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      navbarPlaceholder.innerHTML = data;
      feather.replace();
    });

  // Load Sidebar
  fetch("/components/sidebar.html")
    .then((res) => res.text())
    .then((data) => {
      sidebarPlaceholder.innerHTML = data;
      feather.replace();

      const sidebar = document.getElementById("sidebar");
      const toggleBtn = document.getElementById("toggleBtn");

      toggleBtn?.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
      });

      highlightActiveMenu();

      // ⬅️ Tambahkan ini setelah sidebar dimuat
      initLogout();
    })
    .catch((err) => console.error("Sidebar load error:", err));
}

export function initNavCard() {
  const navcardPlaceholder = document.getElementById("navcard-placeholder");
  if (!navcardPlaceholder) return;
  // Load NavCard
  fetch("/components/navcard.html")
    .then((res) => res.text())
    .then((data) => {
      navcardPlaceholder.innerHTML = data;
      feather.replace();
    });
}

// ==============================
// FUNGSI: Menu sidebar aktif sesuai halaman yang ditampilkan
// ==============================
function highlightActiveMenu() {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll(".menu-item");

  menuLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (currentPath.includes(href)) {
      link.classList.add("active");
    }

    if (
      href.startsWith("/pages/mentoring") &&
      currentPath.startsWith("/pages/mentoring")
    ) {
      link.classList.add("active");
    }
    if (href.startsWith("/pages/tba") && currentPath.startsWith("/pages/tba")) {
      link.classList.add("active");
    }
    if (
      href.startsWith("/pages/bibaq") &&
      currentPath.startsWith("/pages/bibaq")
    ) {
      link.classList.add("active");
    }
  });
}

// ==============================
// FUNGSI: LOGOUT
// ==============================
function initLogout() {
  const logoutDesktop = document.getElementById("logoutBtnDesktop");
  const logoutMobile = document.getElementById("logoutBtnMobile");

  [logoutDesktop, logoutMobile].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Apakah Anda yakin ingin keluar?")) {
          sessionStorage.clear();
          window.location.href = "/index.html";
        }
      });
    }
  });
}

// ==============================
// FUNGSI: SIDEBAR MOBILE (Offcanvas)
// ==============================
export function initMobileSidebar() {
  const mobileNavLinks = document.querySelectorAll("#mobileSidebar .nav-link");
  const offcanvasEl = document.getElementById("mobileSidebar");

  if (!offcanvasEl || mobileNavLinks.length === 0) return;

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    });
  });
}
