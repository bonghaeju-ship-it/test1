document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
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

    // 2. Lotto Number Generation
    const generateNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            numbers.add(num);
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

    const createLottoRow = (numbers) => {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        
        numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = `ball ${getBallColorClass(num)}`;
            ball.innerText = num;
            row.appendChild(ball);
        });
        
        return row;
    };

    generateBtn.addEventListener('click', () => {
        // Clear area
        displayArea.innerHTML = '';
        
        // Generate 5 rows
        for (let i = 0; i < 5; i++) {
            const numbers = generateNumbers();
            const row = createLottoRow(numbers);
            // Staggered animation
            row.style.animationDelay = `${i * 0.1}s`;
            displayArea.appendChild(row);
        }
    });

    // Initialize
    initTheme();
});
