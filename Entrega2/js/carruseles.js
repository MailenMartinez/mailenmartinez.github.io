

document.querySelectorAll('.carousel').forEach(carousel => {
    const buttonPrev = carousel.querySelector('[data-button="button-prev"]');
    const buttonNext = carousel.querySelector('[data-button="button-next"]');
    const track = carousel.querySelector('.carousel-track');
    const carruselElement = carousel.querySelector('.carousel-list');
    const slickItems = carousel.querySelectorAll('.slick');

    // Establecer la posición inicial del track
    track.style.left = '30px';
    buttonPrev.classList.add('invisible');
    // Obtener el ancho de un item
    const slickWidth = slickItems[0].offsetWidth;

    buttonPrev.onclick = () => moveTrack(1);
    buttonNext.onclick = () => moveTrack(2);

    function moveTrack(direction) {
        if(track.style.left=='30px'){
            buttonPrev.classList.add('invisible');
        }
        buttonPrev.classList.remove('invisible');
        const trackWidth = track.scrollWidth;
        const carruselWidth = carruselElement.offsetWidth;
        let leftPosition = track.style.left === "" ? 0 : parseFloat(track.style.left.replace('px', ''));
        
        // Mover hacia adelante
        if (leftPosition > -(trackWidth - carruselWidth) && direction === 2) {
            track.style.left = `${leftPosition - slickWidth}px`;
        }
        // Mover hacia atrás
        else if (leftPosition < 0 && direction === 1) {
            track.style.left = `${leftPosition + slickWidth}px`;
        }
        if(track.style.left=='30px'){
            buttonPrev.classList.add('invisible');
        }
    }
});