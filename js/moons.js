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

let counter_t = 0;

// document.querySelectorAll(".shrink_right").forEach(() => {

// });

titan.addEventListener("click", () => {
  if (counter_t % 2 === 0) {
    titan.style.setProperty(
      "--move", "translate(-22.5vw) scale(0.7, 0.7)"
    );
    cova.style.setProperty(
      "--move", "translate(-22.5vw) scale(0.7, 0.7)"
    );
    titan_text.style.setProperty("--opac", "1");
    titan_text.style.setProperty("--out", "translateX(40%)");
  }
  else {
    titan.style.setProperty("--move", "");
    cova.style.setProperty("--move", "");
    titan_text.style.setProperty("--opac", "0");
    titan_text.style.setProperty("--out", "");
  }
  counter_t++;
})

titan_alt.addEventListener("click", () => {
  if (counter_t % 2 === 0) {
    titan_alt.style.setProperty("--bg-rd", "50px");
    titan_alt.style.setProperty("--bshad", "none");
    titan_alt_p.style.setProperty("--bg-rd", "50px");
    titan_alt_p.style.setProperty("--popc", "1");
    titan_alt_p.style.setProperty("backdrop-filter", "blur(10px)");
  }
  else {
    titan_alt.style.setProperty("--bg-rd", "50%");
    titan_alt.style.setProperty("--bshad", "inset -10px -5px 10px black, inset 10px 5px 20px white");
    titan_alt_p.style.setProperty("--bg-rd", "50%");
    titan_alt_p.style.setProperty("--popc", "0");
    titan_alt_p.style.setProperty("backdrop-filter", "none");
  }
  counter_t++;
})

let counter_e = 0;
enc.addEventListener("click", () => {
  if (counter_e % 2 === 0) {
    enc.style.setProperty(
      "--move", "translate(22.5vw) scale(0.7, 0.7)"
    );
    cova_e.style.setProperty(
      "--move", "translate(22.5vw) scale(0.7, 0.7)"
    );
    enc_text.style.setProperty("--opac", "1");
    enc_text.style.setProperty("--out", "translateX(-40%)");
  }
  else {
    enc.style.setProperty("--move", "");
    cova_e.style.setProperty("--move", "");
    enc_text.style.setProperty("--opac", "0");
    enc_text.style.setProperty("--out", "");
  }
  counter_e++;
})

enc_alt.addEventListener("click", () => {
  if (counter_e % 2 === 0) {
    enc_alt.style.setProperty("--bg-rd", "50px");
    enc_alt.style.setProperty("--bshad", "none");
    enc_alt_p.style.setProperty("--bg-rd", "50px");
    enc_alt_p.style.setProperty("--popc", "1");
    enc_alt_p.style.setProperty("backdrop-filter", "blur(10px)");
  }
  else {
    enc_alt.style.setProperty("--bg-rd", "50%");
    enc_alt.style.setProperty("--bshad", "inset -10px -5px 10px black, inset 10px 5px 20px white");
    enc_alt_p.style.setProperty("--bg-rd", "50%");
    enc_alt_p.style.setProperty("--popc", "0");
    enc_alt_p.style.setProperty("backdrop-filter", "none");
  }
  counter_e++;
})