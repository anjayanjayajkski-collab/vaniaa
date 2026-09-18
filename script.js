/* ==========================================================
   SPESIAL UNTUK VANIA ✨ | FROM AIS WITH LOVE 💖
   Interactive Engine: Web Audio Synthesizer, Canvas FX,
   30+ Interactive Wonderland Modules, Zero Offline Lag!
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // 1. WEB AUDIO API - ZERO ASSET DEPENDENCY SYNTHESIZER
  // ==========================================================
  let audioCtx = null;
  let isMusicPlaying = false;
  let musicInterval = null;
  const musicToggleBtn = document.getElementById('music-toggle');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Nada dasar Web Audio
  function playTone(freq, type = 'sine', duration = 0.5, gainLevel = 0.15) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playPopSound() {
    initAudio();
    playTone(587.33, 'sine', 0.12, 0.15); // D5
  }

  function playChimeSound() {
    initAudio();
    playTone(659.25, 'sine', 0.4, 0.12); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.4, 0.12), 80); // G5
    setTimeout(() => playTone(1046.50, 'sine', 0.6, 0.14), 160); // C6
  }

  function playFanfareSound() {
    initAudio();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.5, 0.15), idx * 100);
    });
  }

  function playKalimbaNote(freq) {
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  }

  function playPurrSound() {
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
      setTimeout(() => playTone(880, 'sine', 0.25, 0.08), 250);
    } catch (e) {}
  }

  function playCashRegisterSound() {
    initAudio();
    playTone(987.77, 'square', 0.1, 0.08); // B5
    setTimeout(() => playTone(1318.51, 'sine', 0.5, 0.18), 90); // E6
  }

  function playSealCrackSound() {
    initAudio();
    playTone(180, 'triangle', 0.15, 0.25);
    setTimeout(() => playChimeSound(), 100);
  }

  function playSirenSound() {
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.3);
      osc.frequency.linearRampToValueAtTime(440, audioCtx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  }

  function playFireworkCrackleSound() {
    if (!audioCtx) return;
    try {
      const bufferSize = audioCtx.sampleRate * 0.15;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.5));
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2600 + Math.random() * 1000;
      filter.Q.value = 3;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
    } catch (e) {}
  }

  // Melodi Lofi Santai (Pentatonik Romantis)
  const lofiNotes = [
    261.63, 293.66, 329.63, 392.00, 440.00,
    523.25, 587.33, 659.25, 783.99, 880.00
  ];

  function startLofiMusic() {
    if (musicInterval) clearInterval(musicInterval);
    isMusicPlaying = true;
    updateMusicButtonState();

    let step = 0;
    musicInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      const note = lofiNotes[Math.floor(Math.random() * lofiNotes.length)];
      const duration = 0.8 + Math.random() * 0.7;
      playTone(note, 'sine', duration, 0.05);

      if (step % 4 === 0) {
        const bassFreq = [130.81, 146.83, 164.81, 174.61][(step / 4) % 4];
        playTone(bassFreq, 'triangle', 1.6, 0.04);
      }
      step++;
    }, 450);
  }

  function stopLofiMusic() {
    isMusicPlaying = false;
    if (musicInterval) clearInterval(musicInterval);
    updateMusicButtonState();
  }

  function updateMusicButtonState() {
    if (!musicToggleBtn) return;
    const strongEl = musicToggleBtn.querySelector('strong');
    if (isMusicPlaying) {
      musicToggleBtn.classList.add('active');
      if (strongEl) strongEl.textContent = 'Menyala 🎶';
    } else {
      musicToggleBtn.classList.remove('active');
      if (strongEl) strongEl.textContent = 'Mati';
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      initAudio();
      if (isMusicPlaying) {
        stopLofiMusic();
      } else {
        startLofiMusic();
      }
    });
  }

  // Autoplay music upon first interaction anywhere
  const enableAudioOnFirstGesture = () => {
    initAudio();
    document.removeEventListener('pointerdown', enableAudioOnFirstGesture);
  };
  document.addEventListener('pointerdown', enableAudioOnFirstGesture, { once: true });


  // ==========================================================
  // 2. TYPEWRITER EFFECT PADA HERO SUBTITLE
  // ==========================================================
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const fullText = typewriterEl.textContent.trim();
    typewriterEl.textContent = '';
    let charIdx = 0;
    function typeChar() {
      if (charIdx < fullText.length) {
        typewriterEl.textContent += fullText.charAt(charIdx);
        charIdx++;
        setTimeout(typeChar, 30);
      }
    }
    setTimeout(typeChar, 350);
  }


  // ==========================================================
  // 3. PENGHITUNG MOMEN SPESIAL
  // ==========================================================
  const daysEl = document.getElementById('days-count');
  const hoursEl = document.getElementById('hours-count');
  const minutesEl = document.getElementById('minutes-count');
  const secondsEl = document.getElementById('seconds-count');

  // Anggap titik awal kenal manis (misal 99 hari lalu)
  const baseTimestamp = new Date().getTime() - (99 * 24 * 3600 * 1000 + 14 * 3600 * 1000);

  function updateCounter() {
    const now = new Date().getTime();
    const diff = Math.max(0, now - baseTimestamp);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = mins.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = secs.toString().padStart(2, '0');
  }
  setInterval(updateCounter, 1000);
  updateCounter();


  // ==========================================================
  // 4. KANVAS 1: SPARKLE & FLOATING PARTICLES
  // ==========================================================
  const sparkleCanvas = document.getElementById('sparkle-canvas');
  let sparkleCtx = null;
  let sparkles = [];

  function resizeSparkleCanvas() {
    if (!sparkleCanvas) return;
    sparkleCanvas.width = window.innerWidth;
    sparkleCanvas.height = window.innerHeight;
  }

  if (sparkleCanvas) {
    sparkleCtx = sparkleCanvas.getContext('2d');
    resizeSparkleCanvas();
    window.addEventListener('resize', resizeSparkleCanvas);

    for (let i = 0; i < 40; i++) {
      sparkles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 3,
        speedY: -0.2 - Math.random() * 0.4,
        alpha: 0.2 + Math.random() * 0.6,
        type: Math.random() > 0.4 ? 'star' : 'heart'
      });
    }

    function animateSparkles() {
      sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

      sparkles.forEach(p => {
        p.y += p.speedY;
        if (p.y < -10) p.y = sparkleCanvas.height + 10;

        sparkleCtx.save();
        sparkleCtx.globalAlpha = p.alpha;

        if (p.type === 'star') {
          sparkleCtx.fillStyle = '#ffb703';
          sparkleCtx.beginPath();
          sparkleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          sparkleCtx.fill();
        } else {
          sparkleCtx.fillStyle = '#ff70a6';
          sparkleCtx.font = `${p.size * 3.5}px serif`;
          sparkleCtx.fillText('♥', p.x, p.y);
        }
        sparkleCtx.restore();
      });

      requestAnimationFrame(animateSparkles);
    }
    requestAnimationFrame(animateSparkles);
  }


  // ==========================================================
  // 5. KANVAS 2: KEMBANG API BUNGA AIR MANCUR & CELEBRATION
  // ==========================================================
  const fwCanvas = document.getElementById('fireworks-canvas');
  let fwCtx = null;
  let fwParticles = [];

  function resizeFwCanvas() {
    if (!fwCanvas) return;
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }

  if (fwCanvas) {
    fwCtx = fwCanvas.getContext('2d');
    resizeFwCanvas();
    window.addEventListener('resize', resizeFwCanvas);

    function createFountainParticle(x, y, isMega = false) {
      const colors = ['#ff4d6d', '#ff758f', '#ffb703', '#ffd166', '#a29bfe', '#48cae4', '#ffffff'];
      const angle = (Math.PI * 1.5) + (Math.random() - 0.5) * (isMega ? 1.4 : 0.8);
      const speed = (isMega ? 7 : 5) + Math.random() * (isMega ? 8 : 5);

      fwParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2.5 + Math.random() * 3,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.018,
        gravity: 0.16
      });
    }

    function animateFw() {
      fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

      for (let i = fwParticles.length - 1; i >= 0; i--) {
        const p = fwParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          fwParticles.splice(i, 1);
          continue;
        }

        fwCtx.save();
        fwCtx.globalAlpha = p.alpha;
        fwCtx.fillStyle = p.color;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fwCtx.fill();
        fwCtx.restore();
      }

      requestAnimationFrame(animateFw);
    }
    requestAnimationFrame(animateFw);
  }

  function launchFountain(x, y, count = 35) {
    initAudio();
    playFireworkCrackleSound();
    for (let i = 0; i < count; i++) {
      createFountainParticle(x, y);
    }
  }

  function launchFountainShow(durationSec = 6) {
    initAudio();
    const interval = setInterval(() => {
      const x = window.innerWidth * (0.2 + Math.random() * 0.6);
      const y = window.innerHeight * 0.85;
      launchFountain(x, y, 40);
    }, 280);

    setTimeout(() => {
      clearInterval(interval);
    }, durationSec * 1000);
  }

  // Click anywhere launches mini fountain
  document.addEventListener('click', (e) => {
    // Avoid triggering on buttons directly to avoid double bursts
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a')) return;
    launchFountain(e.clientX, e.clientY, 20);
  });

  // Top control & Hero Fountain buttons
  const fountainBtn = document.getElementById('fountain-btn');
  const heroFountainBtn = document.getElementById('hero-fountain-btn');
  if (fountainBtn) fountainBtn.addEventListener('click', () => launchFountainShow(6));
  if (heroFountainBtn) heroFountainBtn.addEventListener('click', () => launchFountainShow(6));

  // Confetti Button
  const confettiBtn = document.getElementById('confetti-btn');
  function triggerConfetti() {
    initAudio();
    playPopSound();
    for (let i = 0; i < 60; i++) {
      createFountainParticle(window.innerWidth * 0.5, window.innerHeight * 0.4, true);
    }
  }
  if (confettiBtn) confettiBtn.addEventListener('click', triggerConfetti);


  // ==========================================================
  // 6. THEME PICKER SYSTEM (5 THEMES)
  // ==========================================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeOptions = document.querySelectorAll('.theme-option');

  if (themeToggle && themeDropdown) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      themeDropdown.classList.add('hidden');
    });

    themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const theme = opt.getAttribute('data-set-theme');
        document.body.setAttribute('data-theme', theme);
        themeOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        playChimeSound();
        triggerConfetti();
      });
    });
  }


  // ==========================================================
  // 7. MASKOT KUCING CHIBI GEMOY (MOCHI)
  // ==========================================================
  const mochiBody = document.getElementById('mochi-body');
  const mochiBubble = document.getElementById('mochi-bubble');

  const mochiQuotes = [
    "Mochi seneng banget dielus Vania! Nyaw~ 🐾",
    "Pstt Vania, Ais tuh selalu mikirin kamu tau! 🌸",
    "Senyum manis Vania hari ini juara 1 se-dunia! ✨",
    "Semangat terus ya Vania, Ais selalu ada buat kamu! 🥰",
    "Kalau Vania capek, istirahat dan jangan overthinking yaa! 💖",
    "Mochi sayang Vania, Ais apalagi! 🐱💖"
  ];

  if (mochiBody) {
    mochiBody.addEventListener('click', () => {
      playPurrSound();
      launchFountain(window.innerWidth - 60, window.innerHeight - 100, 25);
      const randomQuote = mochiQuotes[Math.floor(Math.random() * mochiQuotes.length)];
      if (mochiBubble) {
        mochiBubble.textContent = randomQuote;
        mochiBubble.style.animation = 'none';
        setTimeout(() => mochiBubble.style.animation = 'popIn 0.3s ease', 10);
      }
    });
  }


  // ==========================================================
  // 8. ZONA 1: BUKET BUNGA INTERAKTIF
  // ==========================================================
  const flowerPickBtns = document.querySelectorAll('.flower-pick-btn');
  const flowersInVaseEl = document.getElementById('flowers-in-vase');
  const flowerCountEl = document.getElementById('flower-count');
  const wrapBouquetBtn = document.getElementById('wrap-bouquet-btn');
  const resetBouquetBtn = document.getElementById('reset-bouquet-btn');
  const bouquetCardResult = document.getElementById('bouquet-card-result');
  const meaningsListEl = document.getElementById('meanings-list');

  let pickedFlowers = [];

  flowerPickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const emoji = btn.querySelector('.flower-emoji').textContent;
      const name = btn.getAttribute('data-name');
      const meaning = btn.getAttribute('data-meaning');

      pickedFlowers.push({ emoji, name, meaning });
      playPopSound();
      updateBouquetUI();
    });
  });

  function updateBouquetUI() {
    if (!flowersInVaseEl) return;
    flowersInVaseEl.innerHTML = '';

    if (pickedFlowers.length === 0) {
      flowersInVaseEl.innerHTML = '<span class="placeholder-flower-text">Sentuh bunga di kiri untuk mulai merangkai buket Vania ✨</span>';
      if (wrapBouquetBtn) wrapBouquetBtn.disabled = true;
    } else {
      pickedFlowers.forEach(f => {
        const span = document.createElement('span');
        span.className = 'flower-flower-icon';
        span.textContent = f.emoji;
        flowersInVaseEl.appendChild(span);
      });
      if (wrapBouquetBtn) wrapBouquetBtn.disabled = false;
    }

    if (flowerCountEl) flowerCountEl.textContent = pickedFlowers.length;
  }

  if (wrapBouquetBtn) {
    wrapBouquetBtn.addEventListener('click', () => {
      playFanfareSound();
      launchFountainShow(5);

      if (meaningsListEl) {
        meaningsListEl.innerHTML = '';
        pickedFlowers.forEach(f => {
          const div = document.createElement('div');
          div.style.margin = '8px 0';
          div.innerHTML = `<strong>${f.emoji} ${f.name}</strong>: ${f.meaning}`;
          meaningsListEl.appendChild(div);
        });
      }

      if (bouquetCardResult) {
        bouquetCardResult.classList.remove('hidden');
        bouquetCardResult.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (resetBouquetBtn) {
    resetBouquetBtn.addEventListener('click', () => {
      pickedFlowers = [];
      updateBouquetUI();
      if (bouquetCardResult) bouquetCardResult.classList.add('hidden');
      playPopSound();
    });
  }


  // ==========================================================
  // 9. ZONA 1: SIRAM TANAMAN AJAIB SAMPAI MEKAR
  // ==========================================================
  const waterPlantBtn = document.getElementById('water-plant-btn');
  const plantStages = document.querySelectorAll('.plant-stage');
  const growthFill = document.getElementById('growth-fill');
  const growthText = document.getElementById('growth-text');
  let currentPlantStage = 0;

  const plantDescriptions = [
    "Fase 1/4: Biji kecil yang baru ditanam dengan sejuta harapan...",
    "Fase 2/4: Tunas hijau mulai tumbuh merekah karena kehangatan senyuman Vania!",
    "Fase 3/4: Kuncup bunga manis siap mekar menebarkan keharuman...",
    "Fase 4/4: Bunga Ajaib Vania Mekar Sempurna! Kupu-kupu berkilau menari indah! 🌸✨💖"
  ];

  if (waterPlantBtn) {
    waterPlantBtn.addEventListener('click', () => {
      playPopSound();
      currentPlantStage = (currentPlantStage + 1) % 4;

      plantStages.forEach((st, idx) => {
        st.classList.toggle('active', idx === currentPlantStage);
      });

      const percentage = ((currentPlantStage + 1) / 4) * 100;
      if (growthFill) growthFill.style.width = `${percentage}%`;
      if (growthText) growthText.textContent = plantDescriptions[currentPlantStage];

      if (currentPlantStage === 3) {
        playFanfareSound();
        launchFountainShow(5);
      }
    });
  }


  // ==========================================================
  // 10. ZONA 1: TOPLES BINTANG HARAPAN (20 PESAN KHUSUS)
  // ==========================================================
  const glassJar = document.getElementById('glass-jar');
  const pickStarBtn = document.getElementById('pick-star-btn');
  const wishContentEl = document.getElementById('wish-content');
  const wishIndexEl = document.getElementById('wish-index');

  const vaniaWishes = [
    "Vania, terima kasih sudah hadir di dunia ini dengan senyuman yang selalu berhasil bikin hari terasa lebih cerah dan menyenangkan.",
    "Kalau hari ini berat, jangan lupa tarik napas perlahan. Kamu sudah berusaha sebaik mungkin, dan Ais bangga banget sama kamu.",
    "Senyuman Vania itu punya sihir tersendiri. Begitu kamu senyum, rasanya semua masalah langsung terasa ringan.",
    "Jangan pernah ragu sama kemampuanmu ya. Vania itu pintar, gigih, dan punya hati yang luar biasa tulus.",
    "Semoga hari-hari Vania selalu dikelilingi orang-orang baik yang menghargai setiap kebaikan kecilmu.",
    "Ais selalu berdoa semoga apa pun impian yang lagi Vania perjuangkan saat ini, dipermudah dan berbuah manis.",
    "Kamu pantas mendapatkan ketenangan, kebahagiaan, dan kasih sayang yang tanpa syarat dari dunia ini.",
    "Terima kasih sudah jadi teman ngobrol yang seru dan pendengar yang baik. Setiap detik ngobrol sama Vania itu berharga.",
    "Jangan lupa makan teratur dan jaga kesehatan ya. Vania gak boleh sakit!",
    "Di mata Ais, kamu itu bukan cuma cantik luar biasa, tapi juga punya kepribadian yang bikin siapapun betah.",
    "Kalau lagi ngerasa sedih atau overthinking, ingat kalau ada Ais yang siap dengerin curhatanmu 24 jam nonstop.",
    "Vania adalah bukti nyata kalau hal-hal terindah di dunia ini bisa berupa keramahan dan ketulusan seseorang.",
    "Apapun yang terjadi esok hari, hadapi dengan tenang ya. Kamu lebih kuat dari yang pernah kamu bayangkan.",
    "Semoga malam ini tidurmu nyenyak dan besok pagi bangun dengan energi positif yang melimpah.",
    "Terima kasih sudah mengizinkan Ais mengenal sosok sehebat dan semanis Vania.",
    "Jangan pernah membandingkan dirimu dengan orang lain. Versi dirimu saat ini sudah sangat sempurna dan memesona.",
    "Kebaikan kecil yang sering Vania lakukan tanpa sadar itu menginspirasi banyak orang lho.",
    "Semoga senyuman manismu gak pernah pudar oleh hal-hal sepele.",
    "Hari ini adalah hari yang baik, karena Vania masih bisa tersenyum dan melangkah maju.",
    "Ais janji akan selalu ada di sini, mendoakan dan mendukung kebahagiaan Vania selamanya. ✨"
  ];

  let wishIdx = 0;

  function pickNewWish() {
    playChimeSound();
    launchFountain(window.innerWidth * 0.5, window.innerHeight * 0.6, 25);
    wishIdx = (wishIdx + 1) % vaniaWishes.length;

    if (wishIndexEl) wishIndexEl.textContent = `Bintang Ke-${wishIdx + 1}`;
    if (wishContentEl) {
      wishContentEl.textContent = `"${vaniaWishes[wishIdx]}"`;
      const wishPaper = document.getElementById('wish-paper');
      if (wishPaper) {
        wishPaper.style.animation = 'none';
        setTimeout(() => wishPaper.style.animation = 'unfoldPaper 0.4s ease', 10);
      }
    }
  }

  if (glassJar) glassJar.addEventListener('click', pickNewWish);
  if (pickStarBtn) pickStarBtn.addEventListener('click', pickNewWish);


  // ==========================================================
  // 11. ZONA 1: CERMIN AJAIB
  // ==========================================================
  const lookMirrorBtn = document.getElementById('look-mirror-btn');
  const mirrorReveal = document.getElementById('mirror-reveal');
  const mirrorPlaceholder = document.querySelector('.mirror-reflection-placeholder');

  if (lookMirrorBtn) {
    lookMirrorBtn.addEventListener('click', () => {
      playFanfareSound();
      triggerConfetti();
      if (mirrorPlaceholder) mirrorPlaceholder.classList.add('hidden');
      if (mirrorReveal) mirrorReveal.classList.remove('hidden');
    });
  }


  // ==========================================================
  // 12. ZONA 1: LENTERA HARAPAN KE LANGIT
  // ==========================================================
  const releaseLanternBtn = document.getElementById('release-lantern-btn');
  const lanternWishSelect = document.getElementById('lantern-wish-select');
  const floatingLanternsAnchor = document.getElementById('floating-lanterns');

  if (releaseLanternBtn && floatingLanternsAnchor) {
    releaseLanternBtn.addEventListener('click', () => {
      playChimeSound();
      const wishText = lanternWishSelect ? lanternWishSelect.options[lanternWishSelect.selectedIndex].text : "Harapan Vania";

      const lantern = document.createElement('div');
      lantern.className = 'floating-lantern-entity';
      lantern.style.left = `${20 + Math.random() * 60}%`;

      lantern.innerHTML = `
        <div class="lantern-glow">🏮</div>
        <span class="lantern-tag-text">${wishText}</span>
      `;

      floatingLanternsAnchor.appendChild(lantern);
      setTimeout(() => lantern.remove(), 8000);
    });
  }


  // ==========================================================
  // 13. ZONA 2: SURAT CINTA BERSEGEL LILIN
  // ==========================================================
  const waxSeal = document.getElementById('wax-seal');
  const letterSheet = document.getElementById('letter-sheet');

  if (waxSeal && letterSheet) {
    waxSeal.addEventListener('click', () => {
      playSealCrackSound();
      launchFountainShow(6);
      triggerConfetti();

      waxSeal.style.transform = 'scale(0.8) rotate(15deg)';
      waxSeal.style.opacity = '0.5';

      setTimeout(() => {
        waxSeal.classList.add('hidden');
        letterSheet.classList.remove('hidden');
        letterSheet.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    });
  }


  // ==========================================================
  // 14. ZONA 2: BUKU HARIAN 3D (FLIPBOOK)
  // ==========================================================
  const diaryPages = document.querySelectorAll('.diary-page');
  const diaryPrevBtn = document.getElementById('diary-prev-btn');
  const diaryNextBtn = document.getElementById('diary-next-btn');
  const diaryIndicator = document.getElementById('diary-indicator');
  let currentDiaryPage = 1;

  function updateDiaryUI() {
    diaryPages.forEach(p => {
      const pageNum = parseInt(p.getAttribute('data-page'), 10);
      p.classList.toggle('active', pageNum === currentDiaryPage);
    });

    if (diaryPrevBtn) diaryPrevBtn.disabled = (currentDiaryPage === 1);
    if (diaryNextBtn) diaryNextBtn.disabled = (currentDiaryPage === diaryPages.length);
    if (diaryIndicator) diaryIndicator.textContent = `${currentDiaryPage} dari ${diaryPages.length}`;
  }

  if (diaryPrevBtn) {
    diaryPrevBtn.addEventListener('click', () => {
      if (currentDiaryPage > 1) {
        playPopSound();
        currentDiaryPage--;
        updateDiaryUI();
      }
    });
  }

  if (diaryNextBtn) {
    diaryNextBtn.addEventListener('click', () => {
      if (currentDiaryPage < diaryPages.length) {
        playPopSound();
        currentDiaryPage++;
        updateDiaryUI();
      }
    });
  }


  // ==========================================================
  // 15. ZONA 2: MESIN STRUK KASIR ESTETIK
  // ==========================================================
  const printReceiptBtn = document.getElementById('print-receipt-btn');
  const receiptPaper = document.getElementById('receipt-paper');
  const receiptTime = document.getElementById('receipt-time');

  if (printReceiptBtn && receiptPaper) {
    printReceiptBtn.addEventListener('click', () => {
      playCashRegisterSound();
      triggerConfetti();

      const now = new Date();
      const timeStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} • ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')} WIB`;
      if (receiptTime) receiptTime.textContent = timeStr;

      receiptPaper.classList.remove('hidden');
      receiptPaper.scrollIntoView({ behavior: 'smooth' });
    });
  }


  // ==========================================================
  // 16. ZONA 2: WAVEFORM VN PLAYER
  // ==========================================================
  const vnPlayBtn = document.getElementById('vn-play-btn');
  const vnCard = document.querySelector('.vn-player-card');
  const vnPlayIcon = document.getElementById('vn-play-icon');
  let isVnPlaying = false;
  let vnToneInterval = null;

  if (vnPlayBtn && vnCard) {
    vnPlayBtn.addEventListener('click', () => {
      initAudio();
      isVnPlaying = !isVnPlaying;

      if (isVnPlaying) {
        vnCard.classList.add('playing');
        if (vnPlayIcon) vnPlayIcon.textContent = '❚❚';
        let vnNotes = [523.25, 659.25, 587.33, 783.99, 880.00];
        let idx = 0;
        vnToneInterval = setInterval(() => {
          playTone(vnNotes[idx % vnNotes.length], 'sine', 0.6, 0.12);
          idx++;
        }, 500);
      } else {
        vnCard.classList.remove('playing');
        if (vnPlayIcon) vnPlayIcon.textContent = '▶';
        if (vnToneInterval) clearInterval(vnToneInterval);
      }
    });
  }


  // ==========================================================
  // 17. ZONA 2: PETA HARTA KARUN
  // ==========================================================
  const islands = document.querySelectorAll('.map-island');
  const islandStoryCard = document.getElementById('island-story-card');

  const islandStories = {
    "1": "<strong>Pulau Pertama Kenal:</strong> Titik mula sebuah cerita manis. Siapa sangka perkenalan sederhana itu bakal membawa begitu banyak senyuman dan hari-hari berwarna untuk Ais.",
    "2": "<strong>Tanjung Senyum Vania:</strong> Di koordinat ini, senyuman manismu resmi mencuri perhatian Ais. Sejak saat itu, melihat Vania tertawa selalu jadi hal yang paling ditunggu.",
    "3": "<strong>Pelabuhan Hati Ais:</strong> Tempat berlabuh yang tenang dan abadi. Sebuah janji tulus bahwa Ais akan selalu ada untuk menemani dan mendukung Vania."
  };

  islands.forEach(isl => {
    isl.addEventListener('click', () => {
      playChimeSound();
      const id = isl.getAttribute('data-island');
      if (islandStoryCard && islandStories[id]) {
        islandStoryCard.innerHTML = islandStories[id];
        islandStoryCard.style.animation = 'none';
        setTimeout(() => islandStoryCard.style.animation = 'popIn 0.3s ease', 10);
      }
    });
  });


  // ==========================================================
  // 18. ZONA 3: THE RUNAWAY "GAK" BUTTON
  // ==========================================================
  const runawayNoBtn = document.getElementById('runaway-no-btn');
  const runawayYesBtn = document.getElementById('runaway-yes-btn');
  const runawayContainer = document.getElementById('runaway-container');
  const runawayDialog = document.getElementById('runaway-dialog');
  const runawayCelebration = document.getElementById('runaway-celebration');

  const runawayPhrases = [
    "Eits gak kena! 😜",
    "Wlee gak bisa disentuh! 🏃‍♀️",
    "Kok mau ngeklik yang ini sih! 🥺",
    "Harus klik yang Mau pokoknya! 💖",
    "Jangan sombong wlee! 🥰",
    "Klik Mau Banget aja yaa manis!"
  ];
  let runawayAttempt = 0;

  function moveNoButton() {
    playPopSound();
    const containerRect = runawayContainer.getBoundingClientRect();
    const btnRect = runawayNoBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = 80;

    const randomX = (Math.random() - 0.5) * (maxX * 0.8);
    const randomY = (Math.random() - 0.5) * maxY;

    runawayNoBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    if (runawayDialog) {
      runawayDialog.textContent = runawayPhrases[runawayAttempt % runawayPhrases.length];
      runawayAttempt++;
    }
  }

  if (runawayNoBtn) {
    runawayNoBtn.addEventListener('mouseenter', moveNoButton);
    runawayNoBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      moveNoButton();
    });
  }

  if (runawayYesBtn) {
    runawayYesBtn.addEventListener('click', () => {
      playFanfareSound();
      launchFountainShow(7);
      triggerConfetti();
      if (runawayCelebration) {
        runawayCelebration.classList.remove('hidden');
        runawayCelebration.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // ==========================================================
  // 19. ZONA 3: LOVE GACHA MESIN KAPSUL
  // ==========================================================
  const pullGachaBtn = document.getElementById('pull-gacha-btn');
  const gachaTicketResult = document.getElementById('gacha-ticket-result');
  const ticketTitle = document.getElementById('ticket-title');
  const ticketDesc = document.getElementById('ticket-desc');
  const ticketClaimBtn = document.getElementById('ticket-claim-btn');

  const gachaCoupons = [
    {
      title: "🎟️ Kupon Ditraktir Boba / Kopi Favorit",
      desc: "Vania bebas pilih mau varian minuman apa aja, Ais yang langsung traktir sampai kenyang!"
    },
    {
      title: "🎟️ Kupon Anti-Ngambek Seharian",
      desc: "Vania boleh ngambek sepuasnya, Ais wajib bujuk pakai lelucon dan cemilan sampai tersenyum lagi!"
    },
    {
      title: "🎟️ Kupon Dengerin Curhat 24 Jam Nonstop",
      desc: "Kapan pun Vania butuh teman cerita, Ais siap dengerin tanpa di-skip dan tanpa dinilai."
    },
    {
      title: "🎟️ Kupon Bebas Pilih Tempat Makan & Main",
      desc: "Hari ini Vania jadi ratunya! Vania yang tentukan mau makan apa dan jalan ke mana!"
    },
    {
      title: "🎟️ Kupon Hadiah Misterius dari Ais",
      desc: "Klaim tiket ini dan Ais akan memberikan kado kejutan khusus buat Vania!"
    }
  ];

  if (pullGachaBtn) {
    pullGachaBtn.addEventListener('click', () => {
      playPopSound();
      playChimeSound();
      triggerConfetti();

      const chosen = gachaCoupons[Math.floor(Math.random() * gachaCoupons.length)];
      if (ticketTitle) ticketTitle.textContent = chosen.title;
      if (ticketDesc) ticketDesc.textContent = chosen.desc;

      if (ticketClaimBtn) {
        const text = encodeURIComponent(`Hai Ais! Aku dapet "${chosen.title}" nih dari mesin Love Gacha di web kamu! Mau aku klaim sekarang yaa 🥰`);
        ticketClaimBtn.href = `https://wa.me/?text=${text}`;
      }

      if (gachaTicketResult) {
        gachaTicketResult.classList.remove('hidden');
        gachaTicketResult.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // ==========================================================
  // 20. ZONA 3: MINI GAME TANGKAP KELINCI 15 DETIK
  // ==========================================================
  const whackStartBtn = document.getElementById('whack-start-btn');
  const whackTimerEl = document.getElementById('whack-timer');
  const whackScoreEl = document.getElementById('whack-score');
  const whackHoles = document.querySelectorAll('.whack-hole');
  const whackTrophyCard = document.getElementById('whack-trophy-card');

  let whackScore = 0;
  let whackTimeLeft = 15;
  let whackTimerId = null;
  let whackMoleTimerId = null;
  let isWhacking = false;

  function popRandomMole() {
    whackHoles.forEach(h => h.classList.remove('up'));
    if (!isWhacking) return;
    const randomIdx = Math.floor(Math.random() * whackHoles.length);
    whackHoles[randomIdx].classList.add('up');
  }

  whackHoles.forEach(hole => {
    hole.addEventListener('click', () => {
      if (hole.classList.contains('up') && isWhacking) {
        playPopSound();
        whackScore++;
        if (whackScoreEl) whackScoreEl.textContent = whackScore;
        hole.classList.remove('up');
      }
    });
  });

  if (whackStartBtn) {
    whackStartBtn.addEventListener('click', () => {
      playChimeSound();
      whackScore = 0;
      whackTimeLeft = 15;
      isWhacking = true;
      if (whackScoreEl) whackScoreEl.textContent = '0';
      if (whackTimerEl) whackTimerEl.textContent = '15';
      if (whackTrophyCard) whackTrophyCard.classList.add('hidden');
      whackStartBtn.disabled = true;

      whackMoleTimerId = setInterval(popRandomMole, 700);

      whackTimerId = setInterval(() => {
        whackTimeLeft--;
        if (whackTimerEl) whackTimerEl.textContent = whackTimeLeft;

        if (whackTimeLeft <= 0) {
          clearInterval(whackTimerId);
          clearInterval(whackMoleTimerId);
          isWhacking = false;
          whackHoles.forEach(h => h.classList.remove('up'));
          whackStartBtn.disabled = false;
          playFanfareSound();
          triggerConfetti();

          if (whackTrophyCard) {
            whackTrophyCard.classList.remove('hidden');
            const resTxt = document.getElementById('whack-result-text');
            if (resTxt) resTxt.textContent = `Vania berhasil menangkap ${whackScore} kelinci gemoy! Refleksmu benar-benar tingkat master! 🏆`;
          }
        }
      }, 1000);
    });
  }


  // ==========================================================
  // 21. ZONA 3: GAME TANGKAP BINTANG CANVAS
  // ==========================================================
  const gameCanvas = document.getElementById('game-canvas');
  const gameScoreEl = document.getElementById('game-score');
  const gameStatusEl = document.getElementById('game-status');
  const gameStartBtn = document.getElementById('game-start-btn');
  const gameWinCard = document.getElementById('game-win-card');
  const gameHint = document.getElementById('game-hint');

  let gameCtx = null;
  let isGameActive = false;
  let gameScore = 0;
  const gameTarget = 30;
  let fallingItems = [];
  let basketX = 250;
  const basketWidth = 90;
  const basketHeight = 25;

  if (gameCanvas) {
    gameCtx = gameCanvas.getContext('2d');

    function updateBasketPosition(clientX) {
      const rect = gameCanvas.getBoundingClientRect();
      const scaleX = gameCanvas.width / rect.width;
      const x = (clientX - rect.left) * scaleX;
      basketX = Math.max(0, Math.min(gameCanvas.width - basketWidth, x - basketWidth / 2));
    }

    gameCanvas.addEventListener('mousemove', (e) => {
      if (isGameActive) updateBasketPosition(e.clientX);
    });

    gameCanvas.addEventListener('touchmove', (e) => {
      if (isGameActive && e.touches[0]) {
        updateBasketPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    function gameLoop() {
      if (!isGameActive) return;

      gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

      // Draw Basket
      gameCtx.fillStyle = '#ff4d6d';
      gameCtx.beginPath();
      gameCtx.roundRect(basketX, gameCanvas.height - 35, basketWidth, basketHeight, [0, 0, 15, 15]);
      gameCtx.fill();

      gameCtx.fillStyle = '#ffffff';
      gameCtx.font = 'bold 12px sans-serif';
      gameCtx.textAlign = 'center';
      gameCtx.fillText('Vania 💖', basketX + basketWidth / 2, gameCanvas.height - 18);

      // Spawn items
      if (Math.random() < 0.05) {
        const types = ['star', 'star', 'heart', 'cloud'];
        const type = types[Math.floor(Math.random() * types.length)];
        fallingItems.push({
          x: 20 + Math.random() * (gameCanvas.width - 40),
          y: -20,
          type: type,
          speed: 2 + Math.random() * 2.5
        });
      }

      // Update & Draw Items
      for (let i = fallingItems.length - 1; i >= 0; i--) {
        const item = fallingItems[i];
        item.y += item.speed;

        let icon = '⭐';
        if (item.type === 'heart') icon = '💖';
        if (item.type === 'cloud') icon = '🌧️';

        gameCtx.font = '22px serif';
        gameCtx.fillText(icon, item.x, item.y);

        // Collision Check with basket
        if (item.y >= gameCanvas.height - 40 && item.y <= gameCanvas.height - 10) {
          if (item.x >= basketX - 10 && item.x <= basketX + basketWidth + 10) {
            if (item.type === 'star') {
              gameScore += 1;
              playPopSound();
            } else if (item.type === 'heart') {
              gameScore += 2;
              playChimeSound();
            } else if (item.type === 'cloud') {
              gameScore = Math.max(0, gameScore - 2);
            }
            if (gameScoreEl) gameScoreEl.textContent = gameScore;
            fallingItems.splice(i, 1);

            if (gameScore >= gameTarget) {
              endGame(true);
              return;
            }
            continue;
          }
        }

        if (item.y > gameCanvas.height + 20) {
          fallingItems.splice(i, 1);
        }
      }

      requestAnimationFrame(gameLoop);
    }

    function endGame(isWin) {
      isGameActive = false;
      if (gameStatusEl) gameStatusEl.textContent = isWin ? 'Target Tercapai! 🎉' : 'Berhenti';
      if (isWin) {
        playFanfareSound();
        launchFountainShow(6);
        if (gameWinCard) gameWinCard.classList.remove('hidden');
      }
    }

    if (gameStartBtn) {
      gameStartBtn.addEventListener('click', () => {
        playChimeSound();
        gameScore = 0;
        fallingItems = [];
        isGameActive = true;
        if (gameScoreEl) gameScoreEl.textContent = '0';
        if (gameStatusEl) gameStatusEl.textContent = 'Sedang Bermain...';
        if (gameWinCard) gameWinCard.classList.add('hidden');
        if (gameHint) gameHint.classList.add('hidden');
        gameLoop();
      });
    }
  }


  // ==========================================================
  // 22. ZONA 3: DAPUR DONAT IMPIAN
  // ==========================================================
  const glazeBtns = document.querySelectorAll('.btn-glaze');
  const toppingBtns = document.querySelectorAll('.btn-topping');
  const donutGlazeEl = document.getElementById('donut-glaze');
  const donutToppingEl = document.getElementById('donut-topping');
  const toggleCandleBtn = document.getElementById('toggle-candle-btn');
  const donutCandleEl = document.getElementById('donut-candle');
  const donutOrderBtn = document.getElementById('donut-order-btn');

  const glazeColors = {
    strawberry: '#ff70a6',
    chocolate: '#6f4e37',
    matcha: '#90be6d',
    caramel: '#f4a261'
  };

  const toppingIcons = {
    rainbow: '🌈 🍬 🌟',
    stars: '⭐ ✨ 🌟',
    'choco-chips': '🍫 🍪 🍫',
    marshmallow: '🍬 ☁️ 🍬'
  };

  let selectedGlaze = 'strawberry';
  let selectedTopping = 'rainbow';

  glazeBtns.forEach(b => {
    b.addEventListener('click', () => {
      glazeBtns.forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      selectedGlaze = b.getAttribute('data-glaze');
      if (donutGlazeEl) donutGlazeEl.style.background = glazeColors[selectedGlaze];
      playPopSound();
      updateDonutOrderLink();
    });
  });

  toppingBtns.forEach(b => {
    b.addEventListener('click', () => {
      toppingBtns.forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      selectedTopping = b.getAttribute('data-topping');
      if (donutToppingEl) donutToppingEl.textContent = toppingIcons[selectedTopping];
      playPopSound();
      updateDonutOrderLink();
    });
  });

  if (toggleCandleBtn && donutCandleEl) {
    toggleCandleBtn.addEventListener('click', () => {
      donutCandleEl.classList.toggle('hidden');
      playChimeSound();
    });
  }

  function updateDonutOrderLink() {
    if (!donutOrderBtn) return;
    const msg = encodeURIComponent(`Hai Ais! Aku baru aja ngeracik donat impian rasa ${selectedGlaze} dengan topping ${selectedTopping} di webmu! Kapan nih mau ditraktir beneran? 🍩🥰`);
    donutOrderBtn.href = `https://wa.me/?text=${msg}`;
  }


  // ==========================================================
  // 23. ZONA 3: KUIS KELAYAKAN ORANG TERGEMOY
  // ==========================================================
  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizStepEl = document.getElementById('quiz-step');
  const quizContainer = document.getElementById('quiz-container');
  const quizCertCard = document.getElementById('quiz-certificate-card');

  const quizQuestions = [
    {
      q: "Soal 1: Siapa perempuan paling manis yang selalu bikin Ais terpesona?",
      opts: ["A. Vania", "B. Vania juga", "C. Pasti Vania!"]
    },
    {
      q: "Soal 2: Kalau Vania lagi bad mood atau capek, Ais harus ngapain?",
      opts: ["A. Kirim makanan & boba favorit", "B. Dengerin curhat sampai lega", "C. Semuanya dilakukan dengan senang hati!"]
    },
    {
      q: "Soal 3: Seberapa berharga Vania untuk dunia ini?",
      opts: ["A. Sangat berharga", "B. Nomor 1 di alam semesta", "C. Tak terhingga nilainya! 💖"]
    }
  ];
  let currentQuizStep = 0;

  function loadQuizQuestion() {
    if (currentQuizStep >= quizQuestions.length) {
      if (quizContainer) quizContainer.classList.add('hidden');
      if (quizCertCard) {
        quizCertCard.classList.remove('hidden');
        quizCertCard.scrollIntoView({ behavior: 'smooth' });
      }
      playFanfareSound();
      triggerConfetti();
      return;
    }

    const item = quizQuestions[currentQuizStep];
    if (quizQuestionEl) quizQuestionEl.textContent = item.q;
    if (quizStepEl) quizStepEl.textContent = currentQuizStep + 1;

    if (quizOptionsEl) {
      quizOptionsEl.innerHTML = '';
      item.opts.forEach(optText => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.textContent = optText;
        btn.addEventListener('click', () => {
          playPopSound();
          currentQuizStep++;
          loadQuizQuestion();
        });
        quizOptionsEl.appendChild(btn);
      });
    }
  }
  loadQuizQuestion();


  // ==========================================================
  // 24. ZONA 4: KOTAK P3K CINTA
  // ==========================================================
  const p3kBtns = document.querySelectorAll('.p3k-item-btn');
  const p3kResponseCard = document.getElementById('p3k-response-card');

  const p3kRemedies = {
    plaster: "<strong>Plester Anti Bad Day 🩹:</strong> Tempelkan ini di hatimu ya Vania. Apapun yang terjadi hari ini, kamu tetap hebat dan sudah melangkah sejauh ini!",
    ointment: "<strong>Salep Anti Overthinking 🧴:</strong> Usapkan perlahan. Tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik. Pikiranmu bakal tenang kembali.",
    candy: "<strong>Permen Mood Booster 🍬:</strong> Rasa stroberi manis alami yang langsung menaikkan hormon kebahagiaan Vania 1000%!",
    vitamin: "<strong>Vitamin Perhatian Ais 🧃:</strong> Dosis: 1x senyuman Vania sehari agar dunia selalu terasa indah dan damai."
  };

  p3kBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playPopSound();
      const key = btn.getAttribute('data-p3k');
      if (p3kResponseCard && p3kRemedies[key]) {
        p3kResponseCard.innerHTML = p3kRemedies[key];
        p3kResponseCard.style.animation = 'none';
        setTimeout(() => p3kResponseCard.style.animation = 'popIn 0.3s ease', 10);
      }
    });
  });


  // ==========================================================
  // 25. ZONA 4: BOLA KRISTAL KEBERUNTUNGAN
  // ==========================================================
  const touchCrystalBtn = document.getElementById('touch-crystal-btn');
  const crystalBall = document.getElementById('crystal-ball');
  const crystalResult = document.getElementById('crystal-result');

  const crystalFortunes = [
    "🔮 Ramalan Hari Ini: Vania diprediksi 1000% bakal selalu cantik dan disayang banyak orang!",
    "🔮 Ramalan Hari Ini: Akan ada kejutan manis dan kabar gembira yang menghampiri harimu.",
    "🔮 Peringatan Ramalan: Hati-hati, senyuman manis Vania hari ini berpotensi bikin Ais gak bisa tidur!",
    "🔮 Ramalan Hari Ini: Segala urusan dan pekerjaan Vania bakal dimudahkan oleh semesta."
  ];

  function rubCrystalBall() {
    playChimeSound();
    triggerConfetti();
    const fortune = crystalFortunes[Math.floor(Math.random() * crystalFortunes.length)];
    if (crystalResult) {
      crystalResult.innerHTML = `<strong>${fortune}</strong>`;
      crystalResult.style.animation = 'none';
      setTimeout(() => crystalResult.style.animation = 'popIn 0.3s ease', 10);
    }
  }

  if (touchCrystalBtn) touchCrystalBtn.addEventListener('click', rubCrystalBall);
  if (crystalBall) crystalBall.addEventListener('click', rubCrystalBall);


  // ==========================================================
  // 26. ZONA 4: KOTAK MUSIK KALIMBA PASTEL
  // ==========================================================
  const kalimbaKeys = document.querySelectorAll('.k-key');
  const kalimbaPlayMelodyBtn = document.getElementById('kalimba-play-melody-btn');

  kalimbaKeys.forEach(k => {
    k.addEventListener('click', () => {
      const freq = parseFloat(k.getAttribute('data-freq'));
      playKalimbaNote(freq);
      k.classList.add('pressed');
      setTimeout(() => k.classList.remove('pressed'), 120);
    });
  });

  const sweetMelodyFrequencies = [
    261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00, // Twinkle motif
    349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63
  ];

  if (kalimbaPlayMelodyBtn) {
    kalimbaPlayMelodyBtn.addEventListener('click', () => {
      initAudio();
      sweetMelodyFrequencies.forEach((freq, idx) => {
        setTimeout(() => {
          playKalimbaNote(freq);
          // Flash matching key visually
          kalimbaKeys.forEach(k => {
            if (Math.abs(parseFloat(k.getAttribute('data-freq')) - freq) < 2) {
              k.classList.add('pressed');
              setTimeout(() => k.classList.remove('pressed'), 200);
            }
          });
        }, idx * 350);
      });
    });
  }


  // ==========================================================
  // 27. ZONA 4: RASI BINTANG HUBUNGKAN TITIK "VANIA"
  // ==========================================================
  const constCanvas = document.getElementById('constellation-canvas');
  const constStatus = document.getElementById('constellation-status');
  const resetConstBtn = document.getElementById('reset-constellation-btn');

  let constCtx = null;
  const starNodes = [
    { id: 1, x: 100, y: 100, label: "1" },
    { id: 2, x: 170, y: 220, label: "2" },
    { id: 3, x: 240, y: 90,  label: "3" },
    { id: 4, x: 310, y: 230, label: "4" },
    { id: 5, x: 380, y: 110, label: "5" },
    { id: 6, x: 450, y: 210, label: "6" },
    { id: 7, x: 520, y: 100, label: "7" }
  ];
  let connectedNodes = [];

  if (constCanvas) {
    constCtx = constCanvas.getContext('2d');

    function drawConstellation() {
      constCtx.clearRect(0, 0, constCanvas.width, constCanvas.height);

      // Draw background small stars
      constCtx.fillStyle = 'rgba(255,255,255,0.4)';
      for (let i = 0; i < 20; i++) {
        constCtx.fillRect((i * 47) % constCanvas.width, (i * 31) % constCanvas.height, 2, 2);
      }

      // Draw connected lines
      if (connectedNodes.length > 1) {
        constCtx.strokeStyle = '#ffd166';
        constCtx.lineWidth = 3;
        constCtx.shadowColor = '#ffd166';
        constCtx.shadowBlur = 10;
        constCtx.beginPath();
        constCtx.moveTo(connectedNodes[0].x, connectedNodes[0].y);
        for (let i = 1; i < connectedNodes.length; i++) {
          constCtx.lineTo(connectedNodes[i].x, connectedNodes[i].y);
        }
        constCtx.stroke();
        constCtx.shadowBlur = 0;
      }

      // Draw star nodes
      starNodes.forEach(node => {
        const isConn = connectedNodes.includes(node);
        constCtx.fillStyle = isConn ? '#ff4d6d' : '#ffffff';
        constCtx.beginPath();
        constCtx.arc(node.x, node.y, isConn ? 9 : 7, 0, Math.PI * 2);
        constCtx.fill();

        constCtx.fillStyle = '#fff';
        constCtx.font = 'bold 12px sans-serif';
        constCtx.fillText(node.label, node.x - 4, node.y - 12);
      });

      // If all connected, draw shining text VANIA
      if (connectedNodes.length === starNodes.length) {
        constCtx.fillStyle = '#ff70a6';
        constCtx.font = 'bold 26px serif';
        constCtx.textAlign = 'center';
        constCtx.fillText('✨ RASI BINTANG: VANIA TERSAYANG ✨', constCanvas.width / 2, constCanvas.height - 30);
      }
    }
    drawConstellation();

    constCanvas.addEventListener('click', (e) => {
      const rect = constCanvas.getBoundingClientRect();
      const scaleX = constCanvas.width / rect.width;
      const scaleY = constCanvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      starNodes.forEach(node => {
        const dist = Math.hypot(node.x - clickX, node.y - clickY);
        if (dist < 25) {
          const nextExpected = connectedNodes.length + 1;
          if (node.id === nextExpected) {
            connectedNodes.push(node);
            playTone(400 + node.id * 80, 'triangle', 0.4, 0.15);
            drawConstellation();

            if (constStatus) {
              if (connectedNodes.length === starNodes.length) {
                constStatus.textContent = "Rasi Bintang Selesai! Mengukir nama Vania di Langit! 🌟";
                playFanfareSound();
                launchFountainShow(5);
              } else {
                constStatus.textContent = `Lanjut ke Titik Bintang ${connectedNodes.length + 1}...`;
              }
            }
          }
        }
      });
    });

    if (resetConstBtn) {
      resetConstBtn.addEventListener('click', () => {
        connectedNodes = [];
        drawConstellation();
        if (constStatus) constStatus.textContent = "Mulai dari Titik Bintang 1...";
        playPopSound();
      });
    }
  }


  // ==========================================================
  // 28. ZONA 4: TIKET GOSOK SCRATCH-OFF CANVAS
  // ==========================================================
  const scratchCanvas = document.getElementById('scratch-canvas');
  const scratchText = document.getElementById('scratch-text');
  let scratchCtx = null;
  let isScratching = false;

  if (scratchCanvas) {
    scratchCtx = scratchCanvas.getContext('2d');
    scratchCtx.fillStyle = '#c0c0c0';
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

    scratchCtx.fillStyle = '#666666';
    scratchCtx.font = 'bold 15px sans-serif';
    scratchCtx.textAlign = 'center';
    scratchCtx.fillText('🪙 GOSOK DI SINI DENGAN JARI / MOUSE 🪙', scratchCanvas.width / 2, scratchCanvas.height / 2 + 5);

    function scratch(e) {
      if (!isScratching) return;
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const x = (clientX - rect.left) * (scratchCanvas.width / rect.width);
      const y = (clientY - rect.top) * (scratchCanvas.height / rect.height);

      scratchCtx.globalCompositeOperation = 'destination-out';
      scratchCtx.beginPath();
      scratchCtx.arc(x, y, 22, 0, Math.PI * 2);
      scratchCtx.fill();

      checkScratchPercentage();
    }

    let checkCooldown = 0;
    function checkScratchPercentage() {
      checkCooldown++;
      if (checkCooldown % 15 !== 0) return;

      const imgData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
      let cleared = 0;
      for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] === 0) cleared++;
      }
      const pct = Math.floor((cleared / (imgData.data.length / 4)) * 100);
      if (scratchText) scratchText.textContent = `Gosok layarnya! (${pct}% terbuka)`;

      if (pct > 45) {
        scratchCanvas.style.display = 'none';
        if (scratchText) scratchText.textContent = "✨ 100% Terbuka! Selamat Vania! ✨";
        playFanfareSound();
        triggerConfetti();
      }
    }

    scratchCanvas.addEventListener('mousedown', () => isScratching = true);
    scratchCanvas.addEventListener('mouseup', () => isScratching = false);
    scratchCanvas.addEventListener('mousemove', scratch);

    scratchCanvas.addEventListener('touchstart', () => isScratching = true, { passive: true });
    scratchCanvas.addEventListener('touchend', () => isScratching = false);
    scratchCanvas.addEventListener('touchmove', scratch, { passive: true });
  }


  // ==========================================================
  // 29. ZONA 4: MOOD BOOSTER & BUBBLE WRAP
  // ==========================================================
  const moodBtns = document.querySelectorAll('.mood-btn');
  const moodResponseArea = document.getElementById('mood-response-area');
  const bubbleWrapArea = document.getElementById('bubble-wrap-area');
  const bubbleGrid = document.getElementById('bubble-grid');

  const moodReplies = {
    tired: "🥺 <strong>Lagi Capek ya?</strong> Istirahat sejenak ya Vania. Ais kirim peluk virtual paling hangat buat kamu. Kamu udah berjuang hebat hari ini!",
    annoyed: "😤 <strong>Lagi Kesel?</strong> Nih, pecahkan gelembung bubble wrap di bawah ini sampai puas biar rasa keselnya hilang!",
    happy: "🥰 <strong>Lagi Senang?</strong> Ikut seneng banget dengernya! Semoga senyuman manis Vania awet terus yaa!",
    sleepy: "😴 <strong>Lagi Ngantuk?</strong> Yuk rebahan, pasang selimut tebal, dan mimpi indah. Selamat istirahat Vania!"
  };

  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playPopSound();
      const mood = btn.getAttribute('data-mood');
      if (moodResponseArea && moodReplies[mood]) {
        moodResponseArea.innerHTML = `<div class="mood-card-box">${moodReplies[mood]}</div>`;
      }

      if (bubbleWrapArea) {
        if (mood === 'annoyed') {
          bubbleWrapArea.classList.remove('hidden');
          setupBubbleGrid();
        } else {
          bubbleWrapArea.classList.add('hidden');
        }
      }
    });
  });

  function setupBubbleGrid() {
    if (!bubbleGrid) return;
    bubbleGrid.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble-item';
      bubble.addEventListener('click', () => {
        if (!bubble.classList.contains('popped')) {
          playPopSound();
          bubble.classList.add('popped');
        }
      });
      bubbleGrid.appendChild(bubble);
    }
  }


  // ==========================================================
  // 30. ZONA 4: TOMBOL DARURAT TEDDY BEAR
  // ==========================================================
  const emergencyBtn = document.getElementById('emergency-btn');

  if (emergencyBtn) {
    emergencyBtn.addEventListener('click', () => {
      playSirenSound();
      launchFountainShow(6);

      const items = ['🧸', '🐰', '🍭', '🌸', '💖'];
      for (let i = 0; i < 25; i++) {
        setTimeout(() => {
          const el = document.createElement('div');
          el.className = 'falling-bear';
          el.textContent = items[Math.floor(Math.random() * items.length)];
          el.style.left = `${Math.random() * 95}vw`;
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 3600);
        }, i * 120);
      }
    });
  }


  // ==========================================================
  // 31. ZONA 4: LOVE METER OVERLOAD 99999%
  // ==========================================================
  const testMeterBtn = document.getElementById('test-meter-btn');
  const meterFill = document.getElementById('meter-fill');
  const meterNumber = document.getElementById('meter-number');
  const meterStatus = document.getElementById('meter-status');

  if (testMeterBtn) {
    testMeterBtn.addEventListener('click', () => {
      playChimeSound();
      let currentVal = 10;
      testMeterBtn.disabled = true;

      const meterInterval = setInterval(() => {
        currentVal += 1500;
        if (meterNumber) meterNumber.textContent = `${currentVal}%`;
        if (meterFill) meterFill.style.width = '100%';

        if (currentVal > 99999) {
          clearInterval(meterInterval);
          if (meterNumber) meterNumber.textContent = '99999%+ 🔥';
          if (meterStatus) meterStatus.textContent = 'ALAT PENGUKUR RUSAK KARENA VANIA TERLALU SPESIAL & LUAR BIASA! 💥💖';
          playFanfareSound();
          launchFountainShow(6);
          triggerConfetti();
          testMeterBtn.disabled = false;
        }
      }, 50);
    });
  }


  // ==========================================================
  // 32. ZONA 4: SPOTIFY PLAYER DENGAN LIRIK BERJALAN
  // ==========================================================
  const spotifyPlayBtn = document.getElementById('spotify-play-btn');
  const spotifyCard = document.querySelector('.spotify-card');
  const trackFill = document.getElementById('track-fill');
  const lyricLines = document.querySelectorAll('.lyric-line');
  let isSpotifyPlaying = false;
  let spotifyInterval = null;
  let trackSec = 0;

  if (spotifyPlayBtn) {
    spotifyPlayBtn.addEventListener('click', () => {
      initAudio();
      isSpotifyPlaying = !isSpotifyPlaying;

      if (isSpotifyPlaying) {
        spotifyCard.classList.add('playing');
        spotifyPlayBtn.textContent = 'Jeda Lagu ❚❚';
        trackSec = 0;

        spotifyInterval = setInterval(() => {
          trackSec++;
          const pct = (trackSec / 25) * 100;
          if (trackFill) trackFill.style.width = `${pct}%`;

          lyricLines.forEach(l => {
            const s = parseInt(l.getAttribute('data-sec'), 10);
            l.classList.toggle('active', s <= trackSec && trackSec < s + 6);
          });

          if (trackSec % 4 === 0) {
            playTone(440 + (trackSec * 20), 'sine', 0.5, 0.1);
          }

          if (trackSec >= 25) {
            trackSec = 0;
          }
        }, 1000);
      } else {
        spotifyCard.classList.remove('playing');
        spotifyPlayBtn.textContent = 'Putar Lagu & Lirik ▶';
        if (spotifyInterval) clearInterval(spotifyInterval);
      }
    });
  }


  // ==========================================================
  // 33. ZONA 4: SIMULASI CHAT SALTING
  // ==========================================================
  const chatReplyBtns = document.querySelectorAll('.btn-chat-reply');
  const chatMessages = document.getElementById('chat-messages');
  const typingStatus = document.getElementById('typing-status');

  const chatAnswers = {
    "1": "Soalnya Vania itu spesial banget, jadi websitenya juga harus yang paling lucu dan gak boleh ada tandingannya! 🥰✨",
    "2": "Mau makan apa Vania? Langsung kirim list-nya ya, nanti Ais yang siapin/anterin khusus buat kamu! 🍕🍜",
    "3": "Gak usah ditanya lagi... selalu kepikiran kamu setiap hari tau! 🙈💖"
  };

  chatReplyBtns.forEach(b => {
    b.addEventListener('click', () => {
      playPopSound();
      const replyKey = b.getAttribute('data-reply');
      const userText = b.textContent.replace(/"/g, '');

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'message msg-sent';
      userMsg.textContent = userText;
      chatMessages.appendChild(userMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      if (typingStatus) typingStatus.textContent = "Ais sedang mengetik...";

      setTimeout(() => {
        playChimeSound();
        if (typingStatus) typingStatus.textContent = "Online";
        const replyMsg = document.createElement('div');
        replyMsg.className = 'message msg-received';
        replyMsg.textContent = chatAnswers[replyKey];
        chatMessages.appendChild(replyMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    });
  });


  // ==========================================================
  // 34. ZONA 5: KOREAN 4-CUT PHOTO STRIP
  // ==========================================================
  const printStripBtn = document.getElementById('print-strip-btn');
  const photoStrip = document.getElementById('photo-strip');

  if (printStripBtn && photoStrip) {
    printStripBtn.addEventListener('click', () => {
      playCashRegisterSound();
      triggerConfetti();
      photoStrip.style.animation = 'none';
      setTimeout(() => photoStrip.style.animation = 'printSlideDown 0.6s ease', 10);
    });
  }


  // ==========================================================
  // 35. ZONA 5: BUKA KADO 3D
  // ==========================================================
  const openGiftBtn = document.getElementById('open-gift-btn');
  const giftLid = document.getElementById('gift-lid');
  const giftOpenedResult = document.getElementById('gift-opened-result');

  if (openGiftBtn && giftLid) {
    openGiftBtn.addEventListener('click', () => {
      playFanfareSound();
      launchFountainShow(6);
      triggerConfetti();

      giftLid.style.transform = 'translateY(-60px) rotate(-15deg)';

      setTimeout(() => {
        if (giftOpenedResult) {
          giftOpenedResult.classList.remove('hidden');
          giftOpenedResult.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    });
  }


  // ==========================================================
  // 36. ZONA 5: BRANKAS SANDI RAHASIA
  // ==========================================================
  const passcodeIn = document.getElementById('passcode-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const vaultIcon = document.getElementById('vault-icon');
  const vaultPrize = document.getElementById('vault-prize');
  const passcodeFeedback = document.getElementById('passcode-feedback');

  const validCodes = ['vania', 'ais', 'cantik', 'gemas', '123', 'cinta', '1004', 'ayang'];

  function attemptUnlock() {
    const val = (passcodeIn.value || '').trim().toLowerCase();

    if (validCodes.includes(val)) {
      playFanfareSound();
      launchFountainShow(7);
      triggerConfetti();

      if (vaultIcon) vaultIcon.textContent = '🔓';
      if (passcodeFeedback) {
        passcodeFeedback.className = 'feedback-msg success';
        passcodeFeedback.textContent = "Kata sandi benar! Brankas berhasil dibuka! 🎉";
      }

      if (vaultPrize) {
        vaultPrize.classList.remove('hidden');
        vaultPrize.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      playTone(160, 'sawtooth', 0.25, 0.2);
      if (passcodeFeedback) {
        passcodeFeedback.className = 'feedback-msg error';
        passcodeFeedback.textContent = "Kata sandi salah. Coba ketik 'vania' atau 'ais' yaa!";
      }
    }
  }

  if (unlockBtn) unlockBtn.addEventListener('click', attemptUnlock);
  if (passcodeIn) {
    passcodeIn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptUnlock();
    });
  }


  // ==========================================================
  // 37. ZONA 5: THE GRAND FINALE 360 FIREWORKS
  // ==========================================================
  const grandFinaleBtn = document.getElementById('grand-finale-btn');
  const finaleCard = document.getElementById('finale-celebration-card');

  if (grandFinaleBtn) {
    grandFinaleBtn.addEventListener('click', () => {
      playFanfareSound();
      launchFountainShow(10);
      triggerConfetti();

      // Mega 360 celebration bursts
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          triggerConfetti();
        }, i * 800);
      }

      if (finaleCard) {
        finaleCard.classList.remove('hidden');
        finaleCard.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // ==========================================================
  // 38. SCROLL SPY UNTUK BOTTOM WONDERLAND DOCK
  // ==========================================================
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('header.hero-section, main.wonderland-zone, section.wonderland-zone');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.getAttribute('id');
      }
    });

    dockItems.forEach(item => {
      const href = item.getAttribute('href').replace('#', '');
      item.classList.toggle('active', href === currentId);
    });
  }, { passive: true });


  // ==========================================================
  // 39. MODE LAMPU TIDUR & KUNANG-KUNANG (COZY SLEEP MODE)
  // ==========================================================
  const sleepModeBtn = document.getElementById('sleep-mode-btn');
  const sleepOverlay = document.getElementById('sleep-overlay');
  const closeSleepBtn = document.getElementById('close-sleep-btn');
  const firefliesContainer = document.getElementById('fireflies-container');
  let isSleepModeActive = false;
  let sleepLullabyInterval = null;

  function spawnFireflies() {
    if (!firefliesContainer) return;
    firefliesContainer.innerHTML = '';
    for (let i = 0; i < 28; i++) {
      const fly = document.createElement('div');
      fly.className = 'firefly';
      fly.style.left = `${Math.random() * 96}%`;
      fly.style.top = `${10 + Math.random() * 85}%`;
      fly.style.animationDelay = `${Math.random() * 4}s, ${Math.random() * 6}s`;
      fly.style.animationDuration = `${2 + Math.random() * 2}s, ${10 + Math.random() * 8}s`;
      firefliesContainer.appendChild(fly);
    }
  }

  function toggleSleepMode() {
    initAudio();
    isSleepModeActive = !isSleepModeActive;

    if (isSleepModeActive) {
      if (sleepOverlay) sleepOverlay.classList.remove('hidden');
      spawnFireflies();
      playChimeSound();

      // Update Mochi Mascot message
      if (mochiBubble) {
        mochiBubble.textContent = "Ssshh... Vania mau istirahat ya? Selamat tidur nyenyak, mimpi indah yaa Vania! 🌙💤";
      }

      // Soft bedtime lullaby notes
      const lullabyNotes = [329.63, 392.00, 440.00, 523.25, 659.25];
      let lIdx = 0;
      sleepLullabyInterval = setInterval(() => {
        playTone(lullabyNotes[lIdx % lullabyNotes.length], 'sine', 1.4, 0.04);
        lIdx++;
      }, 900);
    } else {
      if (sleepOverlay) sleepOverlay.classList.add('hidden');
      if (sleepLullabyInterval) clearInterval(sleepLullabyInterval);
      if (mochiBubble) {
        mochiBubble.textContent = "Hai Vania! Aku Mochi, salam hangat dari Ais yaa! 🌸";
      }
    }
  }

  if (sleepModeBtn) sleepModeBtn.addEventListener('click', toggleSleepMode);
  if (closeSleepBtn) closeSleepBtn.addEventListener('click', toggleSleepMode);

});
