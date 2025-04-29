export function initVideoControls() {
  const video = document.getElementById('talentechVideo');
  const muteBtn = document.getElementById('muteBtn');
  if (!video || !muteBtn) return;

  const muteIcon = muteBtn.querySelector('img');

  const togglePlayPause = () => {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    },
    { root: null, threshold: 0.5 }
  );

  observer.observe(video);

  if (window.innerWidth > 992) {
    video.addEventListener('click', togglePlayPause);
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      if (muteIcon) {
        muteIcon.src = video.muted ? "/files/volume-xmark-thin.svg" : "/files/volume-off-thin.svg";
        muteIcon.alt = video.muted ? "Mute" : "Unmute";
      }
    });
  }
}
