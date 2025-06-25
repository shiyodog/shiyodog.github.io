// Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement; // Get the <html> element

        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            htmlElement.classList.add(currentTheme);
            if (currentTheme === 'dark-theme') {
                themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            }
        }

        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark-theme');
            if (htmlElement.classList.contains('dark-theme')) {
                themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark-theme');
            } else {
                themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
                localStorage.removeItem('theme'); // Or set to 'light-theme'
            }
        });

        function copyCA(button) {
            const caText = document.getElementById('ca').innerText;
            navigator.clipboard.writeText(caText).then(() => {
                const iconWrapper = button.querySelector('.icon-wrapper');
                
                iconWrapper.classList.add('copied');
                button.classList.add('copied'); // Keep this for button styling if needed
                makeItRainBones();
                
                setTimeout(() => {
                    iconWrapper.classList.remove('copied');
                    button.classList.remove('copied'); // Keep this for button styling if needed
                }, 2000);

            }, (err) => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy.');
            });
        }

        const modal = document.getElementById('video-modal');
        const openBtn = document.getElementById('open-modal-button');
        const closeBtn = document.getElementById('close-modal-button');
        const videoContainer = document.getElementById('modal-video-container');

        function openModal() {
            modal.classList.add('visible');
            
            if (videoContainer.innerHTML === '') {
                const tiktokEmbed = document.createElement('blockquote');
                tiktokEmbed.className = 'tiktok-embed';
                tiktokEmbed.cite = 'https://www.tiktok.com/@shiyo.dq60/video/7504672847080541482';
                tiktokEmbed.setAttribute('data-video-id', '7504672847080541482');
                tiktokEmbed.style.maxWidth = '325px';
                tiktokEmbed.style.minWidth = '325px';
                
                const section = document.createElement('section');
                tiktokEmbed.appendChild(section);
                videoContainer.appendChild(tiktokEmbed);
                
                if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
                    const tiktokScript = document.createElement('script');
                    tiktokScript.async = true;
                    tiktokScript.src = 'https://www.tiktok.com/embed.js';
                    document.body.appendChild(tiktokScript);
                } else {
                    window.tiktok.load();
                }
            }
        }

        function closeModal() {
            modal.classList.remove('visible');
            videoContainer.innerHTML = '';
        }

        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // --- Falling Bones Animation ---
        document.addEventListener('click', (e) => {
            // Don't trigger on buttons or links
            if (e.target.closest('.button') || e.target.closest('a') || e.target.closest('.main-image')) {
                return;
            }
            createFallingBone(e.clientX);
        });

        function createFallingBone(xPosition) {
            const bone = document.createElement('div');
            bone.innerHTML = '🦴';
            bone.className = 'falling-bone';
            
            const duration = Math.random() * 2 + 3; // 3-5 seconds
            bone.style.left = xPosition ? `${xPosition}px` : `${Math.random() * 100}vw`;
            bone.style.animationDuration = `${duration}s`;
            // Adjust starting position if it comes from a click
            if (xPosition) {
                bone.style.top = '-50px';
            }
            
            document.body.appendChild(bone);
            
            setTimeout(() => {
                bone.remove();
            }, duration * 1000);
        }

        setInterval(() => createFallingBone(null), (Math.random() * 2000) + 3000);

        // --- Coin Spin Animation ---
        const imageContainer = document.querySelector('.image-container');
        const mainImage = document.querySelector('.main-image');
        const originalImageSrc = mainImage.src;
        let isSpinning = false;

        mainImage.addEventListener('click', () => {
            if (isSpinning) return;
            
            makeItRainBones();
            isSpinning = true;
            mainImage.src = 'coin.png';
            mainImage.classList.add('is-spinning');

            mainImage.addEventListener('animationend', () => {
                mainImage.classList.remove('is-spinning');
                mainImage.src = originalImageSrc;
                isSpinning = false;
            }, { once: true });
        });

        // --- Petting Animation ---
        mainImage.addEventListener('mouseenter', () => {
            if(isSpinning) return;
            mainImage.classList.add('petted');
            for (let i = 0; i < 7; i++) {
                createHeart();
            }
        });

        mainImage.addEventListener('mouseleave', () => {
            if(isSpinning) return;
            mainImage.classList.remove('petted');
        });

        function createHeart() {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 80 + 10}%`;
            heart.style.top = `${Math.random() * 80 + 10}%`;
            imageContainer.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 800);
        }

        function makeItRainBones() {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createFallingBone();
                }, i * 100);
            }
        }

        // Konami Code-like Easter Egg
        const konamiCode = ['s', 'h', 'i', 'y', 'o'];
        let konamiCodePosition = 0;
        let themeInterval;
        let boneInterval;

        document.addEventListener('keydown', (e) => {
            // Spacebar for bones
            if (e.code === 'Space') {
                createFallingBone();
            }

            // Easter Egg logic
            if (e.key === konamiCode[konamiCodePosition]) {
                konamiCodePosition++;
                if (konamiCodePosition === konamiCode.length) {
                    activateEasterEgg();
                    konamiCodePosition = 0; // Reset for next activation
                }
            } else {
                konamiCodePosition = 0; // Reset if sequence is broken
            }
        });

        function activateEasterEgg() {
            const h1Element = document.querySelector('h1');
            const originalH1FontSize = h1Element.style.fontSize;
            const originalH1Transform = h1Element.style.transform;

            // Theme flashing
            let isDark = htmlElement.classList.contains('dark-theme');
            themeInterval = setInterval(() => {
                if (isDark) {
                    htmlElement.classList.remove('dark-theme');
                    themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
                } else {
                    htmlElement.classList.add('dark-theme');
                    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
                }
                isDark = !isDark;
            }, 300);

            // Lots of bones
            boneInterval = setInterval(() => {
                for (let i = 0; i < 2; i++) { // Drop 2 bones at a time (5 / 3 = ~1.66, округляем до 2)
                    createFallingBone();
                }
            }, 100); // Drop every 100ms

            // SHIYO text larger and vibrating
            h1Element.classList.add('easter-egg-h1');

            // Deactivate after 3 seconds
            setTimeout(() => {
                clearInterval(themeInterval);
                clearInterval(boneInterval);
                h1Element.classList.remove('easter-egg-h1');
                // Restore original theme based on localStorage or default
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark-theme') {
                    htmlElement.classList.add('dark-theme');
                    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
                } else {
                    htmlElement.classList.remove('dark-theme');
                    themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
                }
            }, 3000);
        }
