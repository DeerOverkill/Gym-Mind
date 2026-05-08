// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Efeito Parallax no Hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if(!hero) return;
        const scrollPos = window.scrollY;
        if (scrollPos < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrollPos * 0.5}px`;
        }
    });

    // Lógica do Carrossel Infinito e Contínuo
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(track ? track.children : []);
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    
    if(!track || cards.length === 0) return;

    // Clona os cards para o efeito infinito
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let currentScroll = 0;
    let speed = 1.5; // Velocidade do scroll
    let isHovering = false;

    // Função principal de animação contínua
    function scrollCarousel() {
        if (!isHovering) {
            currentScroll += speed;
            
            // Calcula a largura de um conjunto original de cards
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap) || 32;
            const singleSetWidth = (cardWidth + gap) * cards.length;

            // Lógica de loop infinito
            if (currentScroll >= singleSetWidth) {
                currentScroll -= singleSetWidth;
            } else if (currentScroll <= 0) {
                currentScroll += singleSetWidth;
            }

            track.style.transform = `translateX(-${currentScroll}px)`;
        }
        requestAnimationFrame(scrollCarousel);
    }

    // Pausa no hover
    track.addEventListener('mouseenter', () => isHovering = true);
    track.addEventListener('mouseleave', () => isHovering = false);

    // Botões para acelerar/inverter o scroll
    if (nextBtn) {
        nextBtn.addEventListener('mousedown', () => speed = 6);
        nextBtn.addEventListener('mouseup', () => speed = 1.5);
        nextBtn.addEventListener('mouseleave', () => speed = 1.5);
        // Para toque em dispositivos móveis
        nextBtn.addEventListener('touchstart', (e) => { e.preventDefault(); speed = 6; }, {passive: false});
        nextBtn.addEventListener('touchend', () => speed = 1.5);
    }

    if (prevBtn) {
        prevBtn.addEventListener('mousedown', () => speed = -6);
        prevBtn.addEventListener('mouseup', () => speed = 1.5);
        prevBtn.addEventListener('mouseleave', () => speed = 1.5);
        // Para toque em dispositivos móveis
        prevBtn.addEventListener('touchstart', (e) => { e.preventDefault(); speed = -6; }, {passive: false});
        prevBtn.addEventListener('touchend', () => speed = 1.5);
    }

    // Inicia o carrossel
    requestAnimationFrame(scrollCarousel);
});
