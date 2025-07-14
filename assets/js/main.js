const LPPI_LMS = {
  auth: {
    login: function (nim, password) {},
    logout: function () {},
    checkSession: function () {},
  },
  mentoring: {
    registerMentor: function (formData) {},
    registerMentee: function (formData) {},
    uploadMaterial: function (file) {},
    submitAssignment: function (assignment) {},
  },
  tba: {
    register: function (formData) {},
    getSchedule: function () {},
    getResults: function () {},
  },
  bibaq: {
    register: function (formData) {},
    getGroups: function () {},
    downloadMaterial: function (materialId) {},
  },
  utils: {
    validateForm: function (form) {},
    uploadFile: function (file) {},
    generatePDF: function (data) {},
  },
};
