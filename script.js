let currentStep = 1;
let noClickCount = 0;

// Adım geçiş fonksiyonu
function nextStep(stepNumber) {
    // Mevcut adımı gizle
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Yeni adımı göster
    setTimeout(() => {
        document.getElementById(`step${stepNumber}`).classList.add('active');
        currentStep = stepNumber;
        
        // Kalp yağmuru efekti
        createHeartRain();
    }, 300);
}

// Evet cevabı
function answerYes() {
    // Büyük kutlama
    createFireworks();
    createMassiveHeartExplosion();
    
    // Kutlama adımına geç
    setTimeout(() => {
        nextStep(5);
    }, 1000);
}

// Hayır cevabı (eğlenceli)
function answerNo() {
    noClickCount++;
    const noBtn = document.getElementById('noBtn');
    
    if (noClickCount === 1) {
        noBtn.innerHTML = '<span>💔</span> Doğurdan?';
        noBtn.style.background = 'linear-gradient(135deg, #ff7675, #d63031)';
        shakeButton(noBtn);
    } else if (noClickCount === 2) {
        noBtn.innerHTML = '<span>😢</span> Bir dəqiqə düşün';
        noBtn.style.background = 'linear-gradient(135deg, #a29bfe, #6c5ce7)';
        moveButton(noBtn);
    } else if (noClickCount === 3) {
        noBtn.innerHTML = '<span>🥺</span> Son şans ver mənə';
        noBtn.style.background = 'linear-gradient(135deg, #fd79a8, #e84393)';
        shrinkButton(noBtn);
    } else {
        // Butonu gizle ve otomatik evet yap
        noBtn.style.display = 'none';
        setTimeout(() => {
            answerYes();
        }, 500);
    }
}

// Buton animasyonları
function shakeButton(button) {
    button.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
}

function moveButton(button) {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 100 - 50;
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function shrinkButton(button) {
    button.style.transform = 'scale(0.7)';
    button.style.opacity = '0.7';
}

// Kalp yağmuru
function createHeartRain() {
    const hearts = ['💖', '💕', '💗', '💝', '❤️', '💘', '🌹', '✨'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = '2rem';
            heart.style.zIndex = '998';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'fall 4s linear forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 150);
    }
}

// Havai fişek efekti
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworksContainer');
    const fireworkEmojis = ['🎆', '🎇', '✨', '🌟', '💫', '⭐'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.innerHTML = fireworkEmojis[Math.floor(Math.random() * fireworkEmojis.length)];
            
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.color = getRandomColor();
            
            fireworksContainer.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 100);
    }
}

// Büyük kalp patlaması
function createMassiveHeartExplosion() {
    const explosionContainer = document.getElementById('explosionContainer');
    const hearts = ['💖', '💕', '💗', '💝', '❤️', '💘', '🌹', '✨', '💍', '👑'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'explosion-heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const angle = (Math.PI * 2 * i) / 50;
            const distance = 50 + Math.random() * 300;
            
            heart.style.left = centerX + Math.cos(angle) * distance + 'px';
            heart.style.top = centerY + Math.sin(angle) * distance + 'px';
            heart.style.color = getRandomColor();
            
            explosionContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 30);
    }
}

// Rastgele renk
function getRandomColor() {
    const colors = ['#e91e63', '#ff6b6b', '#ee5a24', '#fd79a8', '#a55eea', '#00b894', '#00cec9'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Yeniden başlat
function restart() {
    currentStep = 1;
    noClickCount = 0;
    
    // Tüm adımları gizle
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // İlk adımı göster
    document.getElementById('step1').classList.add('active');
    
    // Hayır butonunu sıfırla
    const noBtn = document.getElementById('noBtn');
    noBtn.innerHTML = '<span>💔</span> Hayır';
    noBtn.style.background = 'linear-gradient(135deg, #fd79a8, #e84393)';
    noBtn.style.display = 'inline-block';
    noBtn.style.transform = '';
    noBtn.style.opacity = '';
}

// CSS animasyonları
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Sayfa yüklendiğinde
window.addEventListener('load', () => {
    // İlk kalp yağmuru
    setTimeout(() => {
        createHeartRain();
    }, 1000);
    
    // Periyodik kalp animasyonları
    setInterval(() => {
        const hearts = document.querySelectorAll('.hearts-bg .heart');
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
        
        randomHeart.style.animation = 'none';
        setTimeout(() => {
            randomHeart.style.animation = 'float 8s ease-in-out infinite';
        }, 100);
    }, 3000);
});

// Klavye kısayolları
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && currentStep < 4) {
        nextStep(currentStep + 1);
    } else if (e.key === 'y' || e.key === 'Y') {
        if (currentStep === 4) answerYes();
    } else if (e.key === 'n' || e.key === 'N') {
        if (currentStep === 4) answerNo();
    } else if (e.key === 'r' || e.key === 'R') {
        if (currentStep === 5) restart();
    }
});

// Mobil dokunma efektleri
let touchStartTime = 0;
document.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
});

document.addEventListener('touchend', (e) => {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration > 1000) { // Uzun basma
        createHeartRain();
    }
});