// MENÚ
const burger = document.querySelector(".burger i");
if (burger) {
    const nav = document.querySelector("nav");

    burger.addEventListener("click", () => {
    burger.classList.toggle("fa-bars");
    burger.classList.toggle("fa-xmark");
    nav.classList.toggle("menu-open");
    });
}

$(".burger").on("click", function(){
    $("nav").toggleClass("menu-open");
});
