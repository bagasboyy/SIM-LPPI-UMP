// ==============================
// FUNGSI: FORM PENDAFTARAN halaman TBA
// ==============================
export function initPendaftaranFormTBA() {
  const form = document.getElementById("formPendaftaranTBA");
  const konfirmasiModal = safeModal("konfirmasiModalTBA");
  const suksesModal = safeModal("suksesModalTBA");
  const btnYaSubmit = document.getElementById("btnYaSubmitTBA");

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
// FUNGSI BANTUAN
// ==============================
function safeModal(id) {
  const el = document.getElementById(id);
  return el ? new bootstrap.Modal(el) : null;
}
