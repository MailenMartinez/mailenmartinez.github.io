/*const buttonPrev = document.getElementById('button-prev-multiP');
const buttonNext = document.getElementById('button-next-multiP');
const track = document.getElementById('track');
const carruselMP =  document.getElementById('carousel-multiplayer');
const multiPlayerCards = document.querySelectorAll('.slick');

track.style.left = '0px';

const slickWidth = multiPlayerCards[0].offsetWidth;

buttonPrev.onclick = () => Move(1);
buttonNext.onclick = () => Move(2);

function Move(value){
    const trackWidth = track.scrollWidth; // Cambiado a scrollWidth para obtener el tamaño total del contenido
    const carruselMpWidth = carruselMP.offsetWidth;

    // Si left no está definido, la posición es 0
    let leftPosition = track.style.left === "" ? 0 : parseFloat(track.style.left.replace('px', ''));

    // Si se mueve hacia adelante
    if (leftPosition > -(trackWidth - carruselMpWidth) && value === 2) {
        track.style.left = `${leftPosition - slickWidth}px`; // Desplazamiento a la izquierda
    }
    // Si se mueve hacia atrás
    else if (leftPosition < 0 && value === 1) {
        track.style.left = `${leftPosition + slickWidth}px`; // Desplazamiento a la derecha
    }
}*/

document.querySelectorAll('.carousel').forEach(carousel => {
    const buttonPrev = carousel.querySelector('[data-button="button-prev"]');
    const buttonNext = carousel.querySelector('[data-button="button-next"]');
    const track = carousel.querySelector('.carousel-track');
    const carruselElement = carousel.querySelector('.carousel-list');
    const slickItems = carousel.querySelectorAll('.slick');

    // Establecer la posición inicial del track
    track.style.left = '0px';

    // Obtener el ancho de un item
    const slickWidth = slickItems[0].offsetWidth;

    buttonPrev.onclick = () => moveTrack(1);
    buttonNext.onclick = () => moveTrack(2);

    function moveTrack(direction) {
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
    }
});