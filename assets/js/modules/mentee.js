// ==============================
// FUNGSI: FORM PENDAFTARAN halaman Mentee
// ==============================
export function initPendaftaranFormMentee() {
  const form = document.getElementById("formPendaftaranMentee");
  const konfirmasiModal = safeModal("konfirmasiModalMentee");
  const suksesModal = safeModal("suksesModalMentee");
  const btnYaSubmit = document.getElementById("btnYaSubmitMentee");

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
export function initFeedback() {
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
// FUNGSI BANTUAN
// ==============================
function safeModal(id) {
  const el = document.getElementById(id);
  return el ? new bootstrap.Modal(el) : null;
}
