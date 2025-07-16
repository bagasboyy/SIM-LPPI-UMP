document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  // Cek jika ada login form (khusus index.html)
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nim = document.getElementById("nim").value;
      const password = document.getElementById("password").value;

      document.body.classList.add("loading");

      setTimeout(() => {
        if (nim && password) {
          sessionStorage.setItem("userLoggedIn", "true");
          sessionStorage.setItem("userNIM", nim);

          window.location.href = "dashboard.html";
        } else {
          alert("Please fill in all fields");
          document.body.classList.remove("loading");
        }
      }, 1500);
    });

    // Input animasi
    document.querySelectorAll(".form-control").forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });
    });

    // Cegah akses login kalau udah login
    if (sessionStorage.getItem("userLoggedIn") === "true") {
      window.location.href = "dashboard.html";
    }
  }

  // Cek jika halaman punya navbar dan sidebar
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  const sidebarPlaceholder = document.getElementById("sidebar-placeholder");

  if (navbarPlaceholder && sidebarPlaceholder) {
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

        // Toggle Sidebar
        const sidebar = document.getElementById("sidebar");
        const toggleBtn = document.getElementById("toggleBtn");

        toggleBtn?.addEventListener("click", () => {
          sidebar.classList.toggle("collapsed");
        });

        // Highlight menu aktif
        const currentPath = window.location.pathname;
        const menuLinks = document.querySelectorAll(".menu-item");

        menuLinks.forEach((link) => {
          const href = link.getAttribute("href");

          // Jika menu mengarah ke folder mentoring, dan path saat ini juga mengandung mentoring
          if (href && currentPath.includes(href)) {
            link.classList.add("active");
          }

          // Tambahan: Jika link menu adalah /pages/mentoring/ dan current path juga di dalamnya
          if (
            href &&
            href.startsWith("/pages/mentoring") &&
            currentPath.startsWith("/pages/mentoring")
          ) {
            link.classList.add("active");
          }
        });
      })
      .catch((err) => console.error("Sidebar load error:", err));
  }

  // Tombol Logout
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const confirmLogout = confirm("Apakah Anda yakin ingin keluar?");
      if (confirmLogout) {
        sessionStorage.clear();
        window.location.href = "index.html";
      }
    });
  }
});
