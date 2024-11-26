var carousel = document.getElementById('carousel');
var scrollAmount = 0;
var scrollTime = 10000; // Temps de défilement en millisecondes

function rotateImages() {
    scrollAmount++;
    if (scrollAmount >= carousel.childElementCount) {
        scrollAmount = 0;
    }
    carousel.scrollTo({
        top: 0,
        left: scrollAmount * carousel.offsetWidth,
        behavior: 'smooth'
    });
}

function prevImage() {
    scrollAmount--;
    if (scrollAmount < 0) {
        scrollAmount = carousel.childElementCount - 1;
    }
    carousel.scrollTo({
        top: 0,
        left: scrollAmount * carousel.offsetWidth,
        behavior: 'smooth'
    });
}

function nextImage() {
    scrollAmount++;
    if (scrollAmount >= carousel.childElementCount) {
        scrollAmount = 0;
    }
    carousel.scrollTo({
        top: 0,
        left: scrollAmount * carousel.offsetWidth,
        behavior: 'smooth'
    });
}

setInterval(rotateImages, scrollTime);