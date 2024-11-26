window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    var h1 = document.querySelector("h1");
    var a = document.querySelector("#entete>a");
    var imgipage = document.querySelector("img");
    var imgipanier = document.querySelector(".panier-link img");
    var nb = document.querySelector(".nombre-articles-panier");
    var panier = document.querySelector(".panier-fenetre");
    var bulle = document.querySelector(".panier-bulle");

    if (window.scrollY > 50) {
        header.classList.add("shrink");
        h1.classList.add("shrink");
        a.classList.add("shrink");
        imgipage.classList.add("shrink");
        imgipanier.classList.add("shrink");
        nb.classList.add("shrink");
        panier.classList.add("shrink");
        if (bulle !== null) {
            bulle.classList.add("shrink");
        }
    } else {
        header.classList.remove("shrink");
        h1.classList.remove("shrink");
        a.classList.remove("shrink");
        imgipage.classList.remove("shrink");
        imgipanier.classList.remove("shrink");
        nb.classList.remove("shrink");
        panier.classList.remove("shrink");
        if (bulle !== null) {
            bulle.classList.remove("shrink");
        }
    }
});
