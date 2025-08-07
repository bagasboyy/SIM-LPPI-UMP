import { menteePresensi } from "./datausers.js";

// ==============================
// FUNGSI: FORM PENDAFTARAN halaman mentor
// ==============================
export function initPendaftaranFormMentor() {
  const form = document.getElementById("formPendaftaranMentor");
  const konfirmasiModal = safeModal("konfirmasiModalMentor");
  const suksesModal = safeModal("suksesModalMentor");
  const btnYaSubmit = document.getElementById("btnYaSubmitMentor");

  if (!form || !btnYaSubmit || !konfirmasiModal || !suksesModal) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Jangan kirim form langsung
    const fileSertifTBAMentor = document.getElementById("filesertiftbaMentor");

    if (!fileSertifTBAMentor || fileSertifTBAMentor.files.length === 0) {
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

// ==============================
// FUNGSI: Presensi di mentor
// ==============================

// Render tabel presensi
function renderPresensiTable() {
  const tbody = document.getElementById("attendanceTableBody");
  if (!tbody) return; // ⬅️ Cegah error jika elemen tidak ada
  tbody.innerHTML = "";

  menteePresensi.forEach((mentee, index) => {
    const tr = document.createElement("tr");

    let presensiCells = mentee.presensi
      .map((status, sesiIndex) => {
        return `
          <td>
            <select data-row="${index}" data-sesi="${sesiIndex}">
              <option value="belum" ${
                status === "belum" ? "selected" : ""
              }></option>
              <option value="hadir" ${
                status === "hadir" ? "selected" : ""
              }>✅</option>
              <option value="tidak" ${
                status === "tidak" ? "selected" : ""
              }>  </option>
            </select>
          </td>
        `;
      })
      .join("");

    const totalHadir = mentee.presensi.filter((p) => p === "hadir").length;

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${mentee.nama}</td>
      <td>${mentee.nim}</td>
      ${presensiCells}
      <td>${totalHadir}</td>
    `;

    tbody.appendChild(tr);
  });
}

// Event listener untuk ubah presensi dari dropdown
document.addEventListener("change", (e) => {
  if (e.target.matches("select[data-row][data-sesi]")) {
    const row = parseInt(e.target.dataset.row);
    const sesi = parseInt(e.target.dataset.sesi);
    const value = e.target.value;
    menteePresensi[row].presensi[sesi] = value;
    renderPresensiTable(); // refresh total hadir
  }
});

// Simulasi tombol save
export function initPresensiPage() {
  const saveButton = document.getElementById("saveButton");
  if (!saveButton) return;

  renderPresensiTable();

  saveButton.addEventListener("click", () => {
    console.log("Data tersimpan:", JSON.stringify(menteePresensi, null, 2));
    alert("Presensi berhasil disimpan!");
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

// Daftarkan fungsi ke global agar bisa diakses dari onclick di HTML
window.uploadFile = uploadFile;
window.deleteFile = deleteFile;
