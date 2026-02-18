    const totalSlides = 11;
    let current = 0;

    // Создаём индикаторы
    const indicatorsEl = document.getElementById('indicators');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'indicator' + (i === 0 ? ' active' : '');
        dot.onclick = () => goTo(i);
        indicatorsEl.appendChild(dot);
    }

    function updateUI() {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');

        slides.forEach((s, i) => {
            s.classList.remove('active', 'prev');
            if (i === current) s.classList.add('active');
            else if (i < current) s.classList.add('prev');
        });

        indicators.forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });

        document.getElementById('counter').textContent = `${current + 1} / ${totalSlides}`;
        document.getElementById('prevBtn').disabled = current === 0;
        document.getElementById('nextBtn').disabled = current === totalSlides - 1;

        const pct = ((current) / (totalSlides - 1)) * 100;
        document.getElementById('progressBar').style.width = pct + '%';
    }

    function goTo(index) {
        if (index < 0 || index >= totalSlides) return;
        current = index;
        updateUI();
    }

    function changeSlide(dir) {
        goTo(current + dir);
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            changeSlide(1);
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            changeSlide(-1);
        }
    });

    // Свайп для мобильных
    let touchStartX = 0;
    document.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });
    document.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            changeSlide(diff > 0 ? 1 : -1);
        }
    });

    updateUI();