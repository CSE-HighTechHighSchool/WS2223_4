const titan = document.querySelector(".titan");
const titan_text = document.querySelector(".titan_text");
const cova = document.querySelector(".cova");
const titan_alt = document.querySelector(".titan_alt");
const titan_alt_p = document.querySelector(".titan_alt_p");

let counter = 0;
titan.addEventListener("click", () => {
  if (counter % 2 === 0) {
    titan.style.setProperty(
    "--move", "translate(-22vw) scale(0.7, 0.7)"
  );
    cova.style.setProperty(
    "--move", "translate(-22vw) scale(0.7, 0.7)"
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
  counter++;
})

titan_alt.addEventListener("click", () => {
  if (counter % 2 === 0) {
    titan_alt.style.setProperty("--bg-rd", "50px");
    titan_alt.style.setProperty("--bshad", "none");
    titan_alt_p.style.setProperty("--bg-rd", "50px");
    titan_alt_p.style.setProperty("--popc", "1");
    titan_alt_p.style.setProperty("backdrop-filter", "blur(10px)");
  }
  else{
    titan_alt.style.setProperty("--bg-rd", "50%");
    titan_alt.style.setProperty("--bshad", "inset -10px -5px 10px black, inset 10px 5px 20px white");
    titan_alt_p.style.setProperty("--bg-rd", "50%");
    titan_alt_p.style.setProperty("--popc", "0");
    titan_alt_p.style.setProperty("backdrop-filter", "none");
  }
  counter++;
})