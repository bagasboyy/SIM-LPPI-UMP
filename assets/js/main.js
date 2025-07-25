import { initLoginForm } from "./modules/auth.js";
import {
  initNavbarSidebar,
  initMobileSidebar,
  initNavCard,
} from "./modules/navigasi.js";
import { initPendaftaranFormSeleksi } from "./modules/seleksi.js";
import { initPendaftaranFormMentee } from "./modules/mentee.js";
import { initFeedback } from "./modules/mentee.js";
import { initPendaftaranFormMentor } from "./modules/mentor.js";
import { initPresensiPage } from "./modules/mentor.js";
import { initPendaftaranFormTBA } from "./modules/tba.js";
import { initPendaftaranFormBIBAQ } from "./modules/bibaq.js";

document.addEventListener("DOMContentLoaded", () => {
  feather.replace();
  initLoginForm();
  initNavbarSidebar();
  initNavCard();
  initPendaftaranFormSeleksi();
  initPendaftaranFormMentee();
  initPendaftaranFormMentor();
  initPendaftaranFormTBA();
  initPendaftaranFormBIBAQ();
  initFeedback();
  initMobileSidebar();
  initPresensiPage();
});
