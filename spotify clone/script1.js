const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("play");
const playIcon = playBtn.querySelector("img");
const progressBar = document.getElementById("progressBar");
const cards = document.querySelectorAll(".music-card");

console.log("Audio element:", audio);
console.log("Cards found:", cards.length);

cards.forEach(card => {
  card.addEventListener("click", () => {
    const src = card.dataset.audio;
    console.log("Trying to play:", src);

    audio.src = src;
    audio.play()
      .then(() => console.log("Playing"))
      .catch(err => console.error("Playback error:", err));

    playIcon.src = "svgs/pause.svg";
  });
});

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.src = "svgs/pause.svg";
  } else {
    audio.pause();
    playIcon.src = "svgs/play.svg";
  }
});

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});
