// ================== GLOBAL STATE ==================
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("play");
const playIcon = playBtn.querySelector("img");
const progressBar = document.getElementById("progressBar");

const nextBtn = document.getElementById("forward");
const prevBtn = document.getElementById("backward");
const shuffleBtn = document.getElementById("shuffle");

const nowImg = document.querySelector(".now-bar img");
const nowTitle = document.querySelector(".image-tittle-info");
const nowArtist = document.querySelector(".img-des-info");

const cards = [...document.querySelectorAll(".music-card")];

let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;

// ================== HELPERS ==================
function setActiveCard(card) {
  cards.forEach(c => c.classList.remove("playing"));
  card.classList.add("playing");
}

function loadSong(index) {
  const card = cards[index];
  const src = card.dataset.audio;
  if (!src) return;

  audio.src = src;
  nowImg.src = card.querySelector("img").src;
  nowTitle.textContent = card.querySelector(".img-title").textContent;
  nowArtist.textContent = card.querySelector(".img-description").textContent;

  setActiveCard(card);
}

function playSong() {
  audio.play();
  isPlaying = true;
  playIcon.src = "svgs/pause.svg";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playIcon.src = "svgs/play.svg";
}

// ================== CARD PLAY BUTTON ==================
cards.forEach((card, index) => {
  const btn = card.querySelector(".music-play-button");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (currentIndex === index && isPlaying) {
      pauseSong();
    } else {
      currentIndex = index;
      loadSong(currentIndex);
      playSong();
    }
  });
});

// ================== MAIN PLAY BUTTON ==================
playBtn.addEventListener("click", () => {
  if (!audio.src) {
    loadSong(currentIndex);
    playSong();
    return;
  }

  isPlaying ? pauseSong() : playSong();
});

// ================== NEXT / PREVIOUS ==================
nextBtn.addEventListener("click", () => {
  currentIndex = isShuffle
    ? Math.floor(Math.random() * cards.length)
    : (currentIndex + 1) % cards.length;

  loadSong(currentIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    currentIndex === 0 ? cards.length - 1 : currentIndex - 1;

  loadSong(currentIndex);
  playSong();
});

// ================== SHUFFLE ==================
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
});

// ================== PROGRESS BAR ==================
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progressBar.value = percent;
  progressBar.style.background = `linear-gradient(
    to right,
    #1db954 0%,
    #1db954 ${percent}%,
    #4d4d4d ${percent}%,
    #4d4d4d 100%
  )`;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
   progressBar.style.background = `linear-gradient(
    to right,
    #1db954 0%,
    #1db954 ${progressBar.value}%,
    #4d4d4d ${progressBar.value}%,
    #4d4d4d 100%
  )`;
});

// ================== AUTO NEXT ==================
audio.addEventListener("ended", () => {
  nextBtn.click();
});
