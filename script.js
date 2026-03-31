document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = 60; // Fixed header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Reveal Animations on Scroll (Intersection Observer)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-up').forEach(el => {
        el.style.opacity = '0'; // Initial state
        revealObserver.observe(el);
    });

    // 3. Header background change on scroll (Optional, for better UX)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});

unction loadVideo(videoId) {
    const wrapper = document.getElementById('videoPlayer');
    // 클릭하는 순간 내부의 모든 것(이미지, 버튼, 텍스트)을 싹 지움
    wrapper.innerHTML = ''; 

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
    iframe.setAttribute('allowfullscreen', '');
    
    // CSS에서 이미 absolute 설정을 했으므로 추가 스타일 필요 없음
    wrapper.appendChild(iframe);
}
