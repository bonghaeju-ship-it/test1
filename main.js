document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const winningDisplay = document.getElementById('winning-numbers-display');
    const displayArea = document.getElementById('lotto-display-area');

    // 1. Theme Management
    const initTheme = () => {
        const savedTheme = localStorage.getItem('lotto-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggleButton(savedTheme);
    };

    const updateThemeToggleButton = (theme) => {
        themeToggle.innerText = theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('lotto-theme', newTheme);
        updateThemeToggleButton(newTheme);
    });

    // 1.1 Side Cards Toggle Logic
    const toggleButtons = [
        { btn: 'info-toggle-btn', card: '.info-card' },
        { btn: 'inquiry-toggle-btn', card: '.inquiry-card' },
        { btn: 'comments-toggle-btn', card: '.comments-card' }
    ];

    toggleButtons.forEach(item => {
        const button = document.getElementById(item.btn);
        const card = document.querySelector(item.card);
        
        button.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            // Close all cards
            document.querySelectorAll('.info-card, .inquiry-card, .comments-card').forEach(c => c.classList.remove('active'));
            // Toggle clicked card
            if (!isActive) card.classList.add('active');
        });
    });

    // 1.2 Legal Modal Logic
    const modal = document.getElementById('legal-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');

    const legalContent = {
        privacy: `<h2>개인정보처리방침</h2><p>본 사이트는 사용자의 어떠한 개인정보도 서버에 저장하지 않습니다. 테마 설정 등은 사용자의 브라우저(LocalStorage)에만 저장됩니다. 광고 서비스 제공을 위해 Google AdSense 및 Disqus 댓글 서비스가 쿠키를 사용할 수 있습니다.</p>`,
        terms: `<h2>이용약관</h2><p>본 사이트에서 생성된 모든 번호는 무작위 추첨에 의한 것이며, 실제 로또 당첨과는 무관합니다. 결과에 따른 어떠한 법적 책임도 지지 않음을 명시합니다. 서비스는 예고 없이 변경되거나 중단될 수 있습니다.</p>`
    };

    const openModal = (type) => {
        modalBody.innerHTML = legalContent[type];
        modal.style.display = 'block';
    };

    privacyLink.addEventListener('click', (e) => { e.preventDefault(); openModal('privacy'); });
    termsLink.addEventListener('click', (e) => { e.preventDefault(); openModal('terms'); });
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

    // 2. Lotto Generation Logic
    const generateNumbers = (count = 6) => {
        const numbers = new Set();
        while (numbers.size < count) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const getBallColorClass = (num) => {
        if (num <= 10) return 'num-1-10';
        if (num <= 20) return 'num-11-20';
        if (num <= 30) return 'num-21-30';
        if (num <= 40) return 'num-31-40';
        return 'num-41-45';
    };

    const createBall = (num) => {
        const ball = document.createElement('div');
        ball.className = `ball ${getBallColorClass(num)}`;
        ball.innerText = num;
        return ball;
    };

    const createWinningRow = () => {
        const mainNumbers = generateNumbers(6);
        let bonusNum;
        do { bonusNum = Math.floor(Math.random() * 45) + 1; } while (mainNumbers.includes(bonusNum));
        const row = document.createElement('div');
        row.className = 'lotto-row';
        mainNumbers.forEach(num => row.appendChild(createBall(num)));
        const plus = document.createElement('div');
        plus.className = 'plus-sign';
        plus.innerText = '+';
        row.appendChild(plus);
        row.appendChild(createBall(bonusNum));
        return row;
    };

    const createLottoRow = (numbers) => {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        numbers.forEach(num => row.appendChild(createBall(num)));
        return row;
    };

    // 3. Action
    generateBtn.addEventListener('click', () => {
        winningDisplay.innerHTML = '';
        displayArea.innerHTML = '';
        winningDisplay.appendChild(createWinningRow());
        for (let i = 0; i < 5; i++) {
            const row = createLottoRow(generateNumbers(6));
            row.style.animationDelay = `${(i + 1) * 0.1}s`;
            displayArea.appendChild(row);
        }
    });

    initTheme();
});
