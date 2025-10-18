  
  const audio = document.getElementById('myAudio');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const stopBtn = document.getElementById('stopBtn');

  playBtn.addEventListener('click', () => {
    audio.play();
  });

  pauseBtn.addEventListener('click', () => {
    audio.pause();
  });

  stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
  });