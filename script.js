const frases = [
    "A veces tenemos pequeños tropiezos, pero lo que siento por tí KENIA es gigantesco y siempre quiero resolverlo a tu lado, porque es la mejor manera de aprender juntos.",
    "Extraño tu sonrisa tanto que daría cualquier cosa por verte sonreír ahora mismo. Perdón por la discusión, muchas veces tratamos de ser perfectos.",
    "KENIA, eres mi persona favorita en el mundo entero, eres siempre mi prioridad. Nada ni nadie va a cambiar lo mucho que te amo, de eso estoy seguro, prometí amarte siempre.",
    "Reflexionando sobre nosotros, me doy cuenta de que cada momento contigo vale oro, quizas soy un poco intenso, pero siempre valoro todo lo que haces por mi,  incluso cuando no estamos de acuerdo.",
    "Quiero que sepas que mi corazón siempre elige estar contigo, y siempre sera tú y solo tú, en las buenas, en las malas y en las pequeñas tormentas, TÚ siempre serás esa luz que me ilumine.",
    "Te extraño, extraño nuestras chismes, extraño nuestros juegos, extraño despertar y verte al lado mío, extraño besarte, extraño abrazarte. Resolvamos esto juntos, mi FRANIA.",
    "Eres una mujer increíble, inteligente y hermosa. Lamento haberte hecho pasar un mal rato, quiero ser yo quien despierte siempre a tu lado, quizas no se cocinar, pero quiero ser yo quien te lleve el desayuno, alguien que mires y digas él es mi vida.",
    "Nuestro amor es mucho más fuerte que cualquier discusión. hemos pasado muchas cosa, de las cuales seguimos aprendiendo, Te adoro hoy, mañana y siempre cucha hermosa.",
    "Cada día a tu lado es una nueva oportunidad para aprender a amarte mejor, para superar todas las adevrsidades que nos ponga el mundo, que sepas que siempre estare presente para ti, no importa como, siempre llegare.",
    "Gracias por tener tanta paciencia conmigo. Prometo esforzarme cada día para ser el novio que te mereces, para convertirme en el esposo de tus sueños, y que hoy por hoy, delante de Dios siempre te amare."
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
