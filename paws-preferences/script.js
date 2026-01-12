// script.js

const cats = [
    'images/cat1.jpg',
    'images/cat2.jpg',
    'images/cat3.jpg',
    'images/cat4.jpg',
    'images/cat5.jpg',
    'images/cat6.jpg',
    'images/cat7.jpg',
    'images/cat8.jpg',
    'images/cat9.jpg',
    'images/cat10.jpg',
    'images/cat11.jpg',
    'images/cat12.jpg',
    'images/cat13.jpg',
    'images/cat14.jpg',
    'images/cat15.jpg',
];

let currentIndex = 0;
const likedCats = [];

const cardContainer = document.getElementById('card-container');
const dislikeBtn = document.getElementById('dislike-btn');
const likeBtn = document.getElementById('like-btn');
const summary = document.getElementById('summary');
const likeCount = document.getElementById('like-count');
const likedCatsDiv = document.getElementById('liked-cats');

function renderCards() {
    cardContainer.innerHTML = '';
    for (let i = cats.length - 1; i >= currentIndex; i--) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundImage = `url(${cats[i]})`;
        cardContainer.appendChild(card);
    }
}

function swipe(isLike) {
    const cards = document.querySelectorAll('.card');
    if (!cards.length) return;

    const topCard = cards[cards.length - 1];
    topCard.style.transform = `translateX(${isLike ? 500 : -500}px) rotate(${isLike ? 20 : -20}deg)`;
    topCard.style.opacity = 0;

    if (isLike) likedCats.push(cats[currentIndex]);
    currentIndex++;

    setTimeout(() => {
        renderCards();
        if (currentIndex >= cats.length) showSummary();
    }, 300);
}

function showSummary() {
    cardContainer.classList.add('hidden');
    document.querySelector('.buttons').classList.add('hidden');
    summary.classList.remove('hidden');

    likeCount.textContent = `You liked ${likedCats.length} cats!`;
    likedCats.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        likedCatsDiv.appendChild(img);
    });
}

dislikeBtn.addEventListener('click', () => swipe(false));
likeBtn.addEventListener('click', () => swipe(true));

renderCards();
