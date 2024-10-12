const infoCompartir = document.querySelector("#info-compartir");
const openCompartir = document.querySelector("#openCompartir");
const closeCompartir = document.querySelector("#closeCompartir");

openCompartir.addEventListener("click", () =>{
    infoCompartir.classList.add("visible");
})
closeCompartir.addEventListener("click", () =>{
    infoCompartir.classList.remove("visible");
})