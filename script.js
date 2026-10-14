const frases = [
    "A veces tenemos pequeños tropiezos, pero lo que siento por ti es gigantesco y siempre quiero resolverlo a tu lado.",
    "Extraño tu sonrisa tanto que daría cualquier cosa por verte sonreír ahora mismo. Perdón por la discusión.",
    "Eres mi persona favorita en el mundo entero. Ningún malentendido va a cambiar lo mucho que te amo.",
    "Reflexionando sobre nosotros, me doy cuenta de que cada momento contigo vale oro, incluso cuando no estamos de acuerdo.",
    "Quiero que sepas que mi corazón siempre elige estar contigo, en las buenas y en las pequeñas tormentas.",
    "Te extraño, extraño nuestras pláticas y extraño abrazarte. Resolvamos esto juntos, mi amor.",
    "Eres una mujer increíble, inteligente y hermosa. Lamento haberte hecho pasar un mal rato.",
    "Nuestro amor es mucho más fuerte que cualquier discusión tonta. Te adoro hoy y siempre.",
    "Cada día a tu lado es una nueva oportunidad para aprender a amarte mejor.",
    "Gracias por tener tanta paciencia conmigo. Prometo esforzarme cada día para ser el novio que te mereces."
];

const startDate = new Date(2026, 9, 14); // 14 de Octubre, 2026
const totalDays = frases.length;

const grid = document.getElementById('calendarGrid');
const modal = document.getElementById('messageModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

let openedDays = JSON.parse(localStorage.getItem('openedDays')) || [];

function renderCalendar() {
    grid.innerHTML = '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < totalDays; i++) {
        const cardDate = new Date(startDate);
        cardDate.setDate(startDate.getDate() + i);
        cardDate.setHours(0, 0, 0, 0);

        const card = document.createElement('div');
        card.classList.add('card');

        const dayNum = i + 1;
        const isOpened = openedDays.includes(dayNum);
        const isLocked = cardDate > today;

        if (isLocked) {
            card.classList.add('locked');
            card.innerHTML = `
                <span class="day-number">${dayNum}</span>
                <span class="card-icon">🔒</span>
            `;
        } else {
            if (isOpened) {
                card.classList.add('opened');
                card.innerHTML = `
                    <span class="day-number">${dayNum}</span>
                    <span class="card-icon">💖</span>
                `;
            } else {
                card.innerHTML = `
                    <span class="day-number">${dayNum}</span>
                    <span class="card-icon">💌</span>
                `;
            }
            card.addEventListener('click', () => openCard(dayNum, frases[i]));
        }

        grid.appendChild(card);
    }
}

function openCard(dayNum, message) {
    modalTitle.innerText = `Día ${dayNum} 💌`;
    modalMessage.innerText = message;
    modal.style.display = 'flex';

    if (!openedDays.includes(dayNum)) {
        openedDays.push(dayNum);
        localStorage.setItem('openedDays', JSON.stringify(openedDays));
        renderCalendar();
    }
}

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

renderCalendar();
