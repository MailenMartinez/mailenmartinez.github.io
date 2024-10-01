const buttonPrev = document.getElementById('button-prev-multiP');
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
}