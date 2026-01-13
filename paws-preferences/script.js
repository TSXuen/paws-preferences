const TOTAL_CATS = 15
let index = 0
const likedCats = []

const container = document.getElementById("card-container")
const likeBtn = document.getElementById("like")
const dislikeBtn = document.getElementById("dislike")
const result = document.getElementById("result")
const count = document.getElementById("count")
const likedList = document.getElementById("liked-list")

function catUrl() {
  return `https://cataas.com/cat?random=${Date.now()}`
}

function createCard() {
  const card = document.createElement("div")
  card.className = "card"
  card.style.backgroundImage = `url(${catUrl()})`

  const like = document.createElement("div")
  like.className = "label like"
  like.textContent = "👍"

  const dislike = document.createElement("div")
  dislike.className = "label dislike"
  dislike.textContent = "👎"

  card.appendChild(like)
  card.appendChild(dislike)

  addSwipe(card, like, dislike)
  container.appendChild(card)
}

function addSwipe(card, likeLabel, dislikeLabel) {
  let startX = 0

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX
  })

  card.addEventListener("touchmove", e => {
    const moveX = e.touches[0].clientX - startX
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 15}deg)`
    likeLabel.style.opacity = moveX > 0 ? Math.min(moveX / 100, 1) : 0
    dislikeLabel.style.opacity = moveX < 0 ? Math.min(-moveX / 100, 1) : 0
  })

  card.addEventListener("touchend", e => {
    const moveX = e.changedTouches[0].clientX - startX
    if (Math.abs(moveX) > 120) {
      swipe(moveX > 0)
    } else {
      card.style.transform = ""
      likeLabel.style.opacity = 0
      dislikeLabel.style.opacity = 0
    }
  })
}

function swipe(isLike) {
  const card = document.querySelector(".card")
  if (!card) return

  card.style.transform = `translateX(${isLike ? 500 : -500}px)`
  card.style.opacity = 0

  if (isLike) {
    likedCats.push(card.style.backgroundImage.slice(5, -2))
  }

  setTimeout(() => {
    card.remove()
    index++
    if (index < TOTAL_CATS) {
      createCard()
    } else {
      showResult()
    }
  }, 300)
}

function showResult() {
  document.querySelector(".buttons").classList.add("hidden")
  count.textContent = likedCats.length
  result.classList.remove("hidden")

  likedCats.forEach(src => {
    const img = document.createElement("img")
    img.src = src
    likedList.appendChild(img)
  })
}

likeBtn.onclick = () => swipe(true)
dislikeBtn.onclick = () => swipe(false)

createCard()
