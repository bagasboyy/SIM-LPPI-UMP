document.addEventListener("DOMContentLoaded", () => {
  feather.replace();
  initLoginForm();
  initNavbarSidebar();
  initPendaftaranForm();
  initFeedback();
  initLogout();
  initMobileSidebar();
});

// ==============================
// FUNGSI: LOGIN FORM (index.html)
// ==============================
function initLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  const nimInput = document.getElementById("nim");
  const passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nim = nimInput?.value;
    const password = passwordInput?.value;
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

  // Otomatis redirect jika sudah login
  if (sessionStorage.getItem("userLoggedIn") === "true") {
    window.location.href = "dashboard.html";
  }
}

// ==============================
// FUNGSI: NAVBAR & SIDEBAR
// ==============================
function initNavbarSidebar() {
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
    })
    .catch((err) => console.error("Sidebar load error:", err));
}

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
  });
}

// ==============================
// FUNGSI: FORM PENDAFTARAN
// ==============================
function initPendaftaranForm() {
  const form = document.getElementById("formPendaftaran");
  const konfirmasiModal = safeModal("konfirmasiModal");
  const suksesModal = safeModal("suksesModal");
  const btnYaSubmit = document.getElementById("btnYaSubmit");

  if (!form || !btnYaSubmit || !konfirmasiModal || !suksesModal) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    konfirmasiModal.show();
  });

  btnYaSubmit.addEventListener("click", () => {
    konfirmasiModal.hide();
    suksesModal.show();
    setTimeout(() => form.reset(), 1000);
  });
}

// ==============================
// FUNGSI: FEEDBACK FORM
// ==============================
function initFeedback() {
  window.konfirmasiFeedback = function () {
    const feedbackInput = document.getElementById("feedback");
    const feedback = feedbackInput?.value.trim();

    if (!feedback) {
      alert("Feedback tidak boleh kosong!");
      return;
    }

    const modalKonfirmasi = safeModal("modalKonfirmasi");
    modalKonfirmasi?.show();
  };

  window.kirimFeedback = function () {
    const modalKonfirmasi = bootstrap.Modal.getInstance(
      document.getElementById("modalKonfirmasi")
    );
    modalKonfirmasi?.hide();

    setTimeout(() => {
      const modalSukses = safeModal("modalSukses");
      modalSukses?.show();

      const feedbackInput = document.getElementById("feedback");
      if (feedbackInput) feedbackInput.value = "";
    }, 500);
  };
}

// ==============================
// FUNGSI: SIDEBAR MOBILE (Offcanvas)
// ==============================
function initMobileSidebar() {
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

// ==============================
// FUNGSI: materimentor
// ==============================

let fileStates = {
  materi: false,
  tugas: false,
};

let deleteType = "";

function uploadFile(type) {
  fileStates[type] = true;
  updateFileUI(type);
}

function deleteFile(type) {
  deleteType = type;
  const modalElement = document.getElementById("confirmDeleteModal");

  if (!modalElement) {
    console.error("Elemen modal 'confirmDeleteModal' tidak ditemukan.");
    return;
  }

  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  document.getElementById("btnConfirmDelete").onclick = () => {
    fileStates[deleteType] = false;
    updateFileUI(deleteType);
    modal.hide();
  };
}

function updateFileUI(type) {
  const actionDiv = document.getElementById(`${type}Action`);
  if (!actionDiv) return;

  if (fileStates[type]) {
    actionDiv.innerHTML = `
        <a href="#" class="btn btn-outline-success btn-sm me-2">Lihat</a>
        <button class="btn btn-outline-danger btn-sm" onclick="deleteFile('${type}')">Hapus</button>
      `;
  } else {
    actionDiv.innerHTML = `
        <button class="btn btn-outline-primary btn-sm" onclick="uploadFile('${type}')">Upload</button>
      `;
  }
}

// ==============================
// FUNGSI: LOGOUT
// ==============================
function initLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      sessionStorage.clear();
      window.location.href = "index.html";
    }
  });
}

// ==============================
// FUNGSI BANTUAN
// ==============================
function safeModal(id) {
  const el = document.getElementById(id);
  return el ? new bootstrap.Modal(el) : null;
}
