const audio = document.getElementById('invitationAudio');
const audioButton = document.getElementById('audioButton');
const miniPlayer = document.getElementById('miniPlayer');
const miniPlay = document.getElementById('miniPlay');
const audioIcon = document.getElementById('audioIcon');
const audioLabel = document.getElementById('audioLabel');
const audioHint = document.getElementById('audioHint');
const progressBar = document.getElementById('progressBar');
const timeLabel = document.getElementById('timeLabel');

function formatTime(value){
  if (!Number.isFinite(value)) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateAudioUI(){
  const playing = !audio.paused && !audio.ended;
  audioButton.setAttribute('aria-pressed', String(playing));
  audioIcon.textContent = playing ? '❚❚' : '▶';
  miniPlay.textContent = playing ? '❚❚' : '▶';
  audioLabel.textContent = playing ? 'Тоқтату' : (audio.ended ? 'Қайта тыңдау' : 'Шақыруды тыңдау');
  audioHint.textContent = playing ? 'Дыбыстық шақыру ойнатылуда' : 'Дыбыстық шақыру мен әуенді қосу';
}

async function toggleAudio(){
  try {
    if (audio.ended) audio.currentTime = 0;
    if (audio.paused) {
      await audio.play();
      miniPlayer.hidden = false;
    } else {
      audio.pause();
    }
    updateAudioUI();
  } catch (error) {
    audioHint.textContent = 'Аудионы іске қосу мүмкін болмады';
    console.error(error);
  }
}

audioButton.addEventListener('click', toggleAudio);
miniPlay.addEventListener('click', toggleAudio);
audio.addEventListener('play', updateAudioUI);
audio.addEventListener('pause', updateAudioUI);
audio.addEventListener('ended', updateAudioUI);
audio.addEventListener('timeupdate', () => {
  const ratio = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressBar.style.width = `${ratio}%`;
  timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

const target = new Date('2026-11-14T14:00:00+05:00').getTime();
const ids = ['days','hours','minutes','seconds'];
function updateCountdown(){
  let distance = Math.max(0, target - Date.now());
  const values = [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000)
  ];
  ids.forEach((id,index) => document.getElementById(id).textContent = values[index]);
}
updateCountdown();
setInterval(updateCountdown, 1000);
