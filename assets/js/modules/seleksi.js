// ==============================
// FUNGSI: FORM PENDAFTARAN halaman Seleksi
// ==============================
export function initPendaftaranFormSeleksi() {
  const form = document.getElementById("formPendaftaran");
  const konfirmasiModal = safeModal("konfirmasiModal");
  const suksesModal = safeModal("suksesModal");
  const btnYaSubmit = document.getElementById("btnYaSubmit");

  if (!form || !btnYaSubmit || !konfirmasiModal || !suksesModal) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Jangan kirim form langsung

    const selectedValue = document.getElementById("inputGroupSelect01").value;
    const fileMotivasi = document.getElementById("filemotivasi");
    const fileTranskripNilai = document.getElementById("filetranskripnilai");
    const fileSertifTBA = document.getElementById("filesertiftba");
    const fileSertifMentoring = document.getElementById("filesertifmentoring");
    const fileRekomendasi = document.getElementById("filerekomendasi");

    if (!selectedValue) {
      alert("Silakan pilih peran Anda terlebih dahulu.");
      return;
    }

    if (!fileMotivasi || fileMotivasi.files.length === 0) {
      alert("Silakan upload file terlebih dahulu.");
      return;
    }
    if (!fileTranskripNilai || fileTranskripNilai.files.length === 0) {
      alert("Silakan upload file terlebih dahulu.");
      return;
    }
    if (!fileSertifTBA || fileSertifTBA.files.length === 0) {
      alert("Silakan upload file terlebih dahulu.");
      return;
    }
    if (!fileSertifMentoring || fileSertifMentoring.files.length === 0) {
      alert("Silakan upload file terlebih dahulu.");
      return;
    }
    if (!fileRekomendasi || fileRekomendasi.files.length === 0) {
      alert("Silakan upload file terlebih dahulu.");
      return;
    }

    // Tampilkan modal konfirmasi
    konfirmasiModal.show();
  });

  btnYaSubmit.addEventListener("click", () => {
    // Tutup modal konfirmasi, tampilkan modal sukses
    konfirmasiModal.hide();
    suksesModal.show();

    // Reset form setelah 1 detik
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
