const titan = document.querySelector(".titan");
const titan_text = document.querySelector(".titan_text");
const cova = document.querySelector(".cova_t");
const titan_alt = document.querySelector(".titan_alt");
const titan_alt_p = document.querySelector(".titan_alt_p");

const enc = document.querySelector(".enceladus");
const enc_text = document.querySelector(".enceladus_text");
const cova_e = document.querySelector(".cova_e");
const enc_alt = document.querySelector(".enceladus_alt");
const enc_alt_p = document.querySelector(".enceladus_alt_p");

const iap = document.querySelector(".iapetus");
const iap_text = document.querySelector(".iapetus_text");
const cova_i = document.querySelector(".cova_i");
const iap_alt = document.querySelector(".iapetus_alt");
const iap_alt_p = document.querySelector(".iapetus_alt_p");

const rhea = document.querySelector(".rhea");
const rhea_text = document.querySelector(".rhea_text");
const cova_r = document.querySelector(".cova_r");
const rhea_alt = document.querySelector(".rhea_alt");
const rhea_alt_p = document.querySelector(".rhea_alt_p");

const mimas = document.querySelector(".mimas");
const mimas_text = document.querySelector(".mimas_text");
const cova_m = document.querySelector(".cova_m");
const mimas_alt = document.querySelector(".mimas_alt");
const mimas_alt_p = document.querySelector(".mimas_alt_p");

//click effect for Titan
let counter_t = 0;
titan.addEventListener("click", () => {
  if (counter_t % 2 === 0) {
    titan.style.transform = "translate(-22.5vw) scale(0.7, 0.7)";
    cova.style.transform = "translate(-22.5vw) scale(0.7, 0.7)";
    titan_text.style.opacity = "1";
    titan_text.style.transform = "translateX(65%) scale(1.2, 1.2)";
  }
  else {
    titan.style.transform = "";
    cova.style.transform = "";
    titan_text.style.opacity = "0";
    titan_text.style.transform = "";
  }
  counter_t++;
})

titan_alt.addEventListener("click", () => {
  if (counter_t % 2 === 0) {
    titan_alt.style.borderRadius = "50px";
    titan_alt.style.boxShadow = "none";
    titan_alt_p.style.borderRadius = "50px";
    titan_alt_p.style.opacity = "1";
    titan_alt_p.style.backdropFilter = "blur(10px)";
  }
  else {
    titan_alt.style.borderRadius = "50%";
    titan_alt.style.boxShadow = "inset -10px -5px 10px black, inset 10px 5px 20px white";
    titan_alt_p.style.borderRadius = "50%";
    titan_alt_p.style.opacity = "0";
    titan_alt_p.style.backdropFilter = "none";
  }
  counter_t++;
})

//click effect for Enceladus
let counter_e = 0;
enc.addEventListener("click", () => {
  if (counter_e % 2 === 0) {
    enc.style.transform = "translate(22.5vw) scale(0.7, 0.7)";
    cova_e.style.transform = "translate(22.5vw) scale(0.7, 0.7)";
    enc_text.style.opacity = "1";
    enc_text.style.transform = "translateX(-65%) scale(1.2, 1.2)";
  }
  else {
    enc.style.transform = "";
    cova_e.style.transform = "";
    enc_text.style.opacity = "0";
    enc_text.style.transform = "";
  }
  counter_e++;
})

enc_alt.addEventListener("click", () => {
  if (counter_e % 2 === 0) {
    enc_alt.style.borderRadius = "50px";
    enc_alt.style.boxShadow = "none";
    enc_alt_p.style.borderRadius = "50px";
    enc_alt_p.style.opacity = "1";
    enc_alt_p.style.backdropFilter = "blur(10px)";
  }
  else {
    enc_alt.style.borderRadius = "50%";
    enc_alt.style.boxShadow = "inset -10px -5px 10px black, inset 10px 5px 20px white";
    enc_alt_p.style.borderRadius = "50%";
    enc_alt_p.style.opacity = "0";
    enc_alt_p.style.backdropFilter = "none";
  }
  counter_e++;
})

//click effect for Iapetus
let counter_i = 0;
iap.addEventListener("click", () => {
  if (counter_i % 2 === 0) {
    iap.style.transform = "translate(-22.5vw) scale(0.7, 0.7)";
    cova_i.style.transform = "translate(-22.5vw) scale(0.7, 0.7)";
    iap_text.style.opacity = "1";
    iap_text.style.transform = "translateX(65%) scale(1.2, 1.2)";
  }
  else {
    iap.style.transform = "";
    cova_i.style.transform = "";
    iap_text.style.opacity = "0";
    iap_text.style.transform = "";
  }
  counter_i++;
})

iap_alt.addEventListener("click", () => {
  if (counter_i % 2 === 0) {
    iap_alt.style.borderRadius = "50px";
    iap_alt.style.boxShadow = "none";
    iap_alt_p.style.borderRadius = "50px";
    iap_alt_p.style.opacity = "1";
    iap_alt_p.style.backdropFilter = "blur(10px)";
  }
  else {
    iap_alt.style.borderRadius = "50%";
    iap_alt.style.boxShadow = "inset -10px -5px 10px black, inset 10px 5px 20px white";
    iap_alt_p.style.borderRadius = "50%";
    iap_alt_p.style.opacity = "0";
    iap_alt_p.style.backdropFilter = "none";
  }
  counter_i++;
})

//click effect for Rhea
let counter_r = 0;
rhea.addEventListener("click", () => {
  if (counter_r % 2 === 0) {
    rhea.style.transform = "translate(22.5vw) scale(0.7, 0.7)";
    cova_r.style.transform = "translate(22.5vw) scale(0.7, 0.7)";
    rhea_text.style.opacity = "1";
    rhea_text.style.transform = "translateX(-65%) scale(1.2, 1.2)";
  }
  else {
    rhea.style.transform = "";
    cova_r.style.transform = "";
    rhea_text.style.opacity = "0";
    rhea_text.style.transform = "";
  }
  counter_r++;
})

rhea_alt.addEventListener("click", () => {
  if (counter_r % 2 === 0) {
    rhea_alt.style.borderRadius = "50px";
    rhea_alt.style.boxShadow = "none";
    rhea_alt_p.style.borderRadius = "50px";
    rhea_alt_p.style.opacity = "1";
    rhea_alt_p.style.backdropFilter = "blur(10px)";
  }
  else {
    rhea_alt.style.borderRadius = "50%";
    rhea_alt.style.boxShadow = "inset -10px -5px 10px black, inset 10px 5px 20px white";
    rhea_alt_p.style.borderRadius = "50%";
    rhea_alt_p.style.opacity = "0";
    rhea_alt_p.style.backdropFilter = "none";
  }
  counter_r++;
})

//Mimas click effect
let counter_m = 0;
mimas.addEventListener("click", () => {
  if (counter_m % 2 === 0) {
    mimas.style.transform = "translate(-22.5vw) scale(0.7, 0.7)";
    cova_m.style.transform = "translate(-22.5vw) scale(0.7, 0.7)";
    mimas_text.style.opacity = "1";
    mimas_text.style.transform = "translateX(65%) scale(1.2, 1.2)";
  }
  else {
    mimas.style.transform = "";
    cova_m.style.transform = "";
    mimas_text.style.opacity = "0";
    mimas_text.style.transform = "";
  }
  counter_m++;
})

mimas_alt.addEventListener("click", () => {
  if (counter_m % 2 === 0) {
    mimas_alt.style.borderRadius = "50px";
    mimas_alt.style.boxShadow = "none";
    mimas_alt_p.style.borderRadius = "50px";
    mimas_alt_p.style.opacity = "1";
    mimas_alt_p.style.backdropFilter = "blur(10px)";
  }
  else {
    mimas_alt.style.borderRadius = "50%";
    mimas_alt.style.boxShadow = "inset -10px -5px 10px black, inset 10px 5px 20px white";
    mimas_alt_p.style.borderRadius = "50%";
    mimas_alt_p.style.opacity = "0";
    mimas_alt_p.style.backdropFilter = "none";
  }
  counter_m++;
})