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

    // 1.1 Inquiry Toggle
    const inquiryToggleBtn = document.getElementById('inquiry-toggle-btn');
    const inquiryCard = document.querySelector('.inquiry-card');

    inquiryToggleBtn.addEventListener('click', () => {
        inquiryCard.classList.toggle('active');
    });

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
        do {
            bonusNum = Math.floor(Math.random() * 45) + 1;
        } while (mainNumbers.includes(bonusNum));

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
        // Clear previous
        winningDisplay.innerHTML = '';
        displayArea.innerHTML = '';
        
        // Winning Numbers
        const winningRow = createWinningRow();
        winningDisplay.appendChild(winningRow);
        
        // 5 sets
        for (let i = 0; i < 5; i++) {
            const numbers = generateNumbers(6);
            const row = createLottoRow(numbers);
            row.style.animationDelay = `${(i + 1) * 0.1}s`;
            displayArea.appendChild(row);
        }
    });

    initTheme();
});
