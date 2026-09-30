// Shared behaviour for the case study pages
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Autoplaying videos (hero, silent gallery loops) hold still for reduced-motion visitors
function syncVideos() {
    document.querySelectorAll('video[autoplay]').forEach(video => {
        if (reducedMotion.matches) {
            video.pause();
        } else {
            video.play().catch(() => {});
        }
    });
}
syncVideos();
reducedMotion.addEventListener('change', syncVideos);

// Click a gallery picture to see it full screen
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');

    document.querySelectorAll('.media img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.currentSrc || img.src;
            lightboxImg.alt = img.alt;
            lightbox.showModal();
        });
    });

    lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('close', () => lightboxImg.removeAttribute('src'));
}

const year = document.getElementById('footer-year');
if (year) year.textContent = new Date().getFullYear();
