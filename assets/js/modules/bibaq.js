// ==============================
// FUNGSI: FORM PENDAFTARAN halaman bibaq
// ==============================
export function initPendaftaranFormBIBAQ() {
  console.log("Fungsi initPendaftaranFormBIBAQ dipanggil");

  const form = document.getElementById("formPendaftaranBIBAQ");
  const konfirmasiModal = safeModal("konfirmasiModalBIBAQ");
  const suksesModal = safeModal("suksesModalBIBAQ");
  const btnYaSubmit = document.getElementById("btnYaSubmitBIBAQ");

  if (!form || !btnYaSubmit || !konfirmasiModal || !suksesModal) {
    console.log("Ada elemen yang tidak ditemukan");
    return;
  }

  form.addEventListener("submit", (e) => {
    console.log("Form disubmit");
    e.preventDefault();

    const pernyataanTextarea = document.getElementById("pernyataanBIBAQ");

    if (!pernyataanTextarea || pernyataanTextarea.value.trim() === "") {
      alert("Silakan isi pernyataan terlebih dahulu.");
      return;
    }

    console.log("Validasi berhasil, tampilkan modal");
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
