import { registeredUsers } from "./datausers.js";

// ==============================
// FUNGSI: LOGIN FORM (index.html)
// ==============================
export function initLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  const nimInput = document.getElementById("nim");
  const passwordInput = document.getElementById("password");
  const alertContainer = document.getElementById("alertContainer");

  // Fungsi tampilkan alert Bootstrap
  function showAlert(message, type = "danger") {
    alertContainer.classList.remove("d-none"); // <-- Tambahkan ini agar muncul

    alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

    setTimeout(() => {
      const alert = bootstrap.Alert.getOrCreateInstance(
        alertContainer.querySelector(".alert")
      );
      alert.close();

      // Tambahkan ini agar kembali ke d-none setelah alert ditutup
      alertContainer.classList.add("d-none");
    }, 3000);
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nim = nimInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!nim || !password) {
      showAlert("Mohon isi semua kolom.", "warning");
      return;
    }

    document.body.classList.add("loading");

    setTimeout(() => {
      // Cek apakah user terdaftar
      const user = registeredUsers.find(
        (u) => u.nim === nim && u.password === password
      );

      if (user) {
        // Simpan session dan redirect
        sessionStorage.setItem("userLoggedIn", "true");
        sessionStorage.setItem("userNIM", nim);
        window.location.href = "dashboard.html";
      } else {
        // Jika salah, munculkan alert bootstrap dan kosongkan input
        showAlert("NIM atau Password salah!", "danger");
        nimInput.value = "";
        passwordInput.value = "";
        document.body.classList.remove("loading");
      }
    }, 1000);
  });

  // Fokus efek
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
    window.location.href = "/dashboard.html";
  }
}
