const audioButton = document.getElementById('load-audio');
audioButton.addEventListener('click', () => {
  const player = document.createElement('iframe');
  player.src = 'https://embed.music.apple.com/album/6803089269';
  player.title = 'QENÉ & CODE by Teme251 on Apple Music';
  player.allow = 'autoplay *; encrypted-media *; fullscreen *; clipboard-write';
  player.loading = 'lazy';
  document.getElementById('audio-player').replaceChildren(player);
  audioButton.hidden = true;
});
document.getElementById('load-video').addEventListener('click', () => {
  const player = document.createElement('iframe');
  player.src = 'https://www.youtube-nocookie.com/embed/videoseries?list=UUIlEJD_ez00ATB5yejwNp7w';
  player.title = 'Teme251 YouTube channel videos';
  player.allow = 'encrypted-media; fullscreen; picture-in-picture';
  player.allowFullscreen = true;
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  document.getElementById('video-player').replaceChildren(player);
});
document.getElementById('share-page').addEventListener('click', async () => {
  const url = 'https://teme251.github.io/teme251/music.html';
  const status = document.getElementById('share-status');
  try {
    if (navigator.share) await navigator.share({title:'Teme251 — QENÉ & CODE',url});
    else { await navigator.clipboard.writeText(url); status.textContent = 'Music page link copied.'; }
  } catch (error) {
    if (error.name !== 'AbortError') status.textContent = `Share this link: ${url}`;
  }
});
