"use strict";
console.clear();
class RegulatoryCard {
    constructor(data) {
        this.category = data.category;
        this.subcategory = data.subcategory;
        this.content = data.content;
        this.order = data.order;
        this.quizQuestion = data.quiz;
        this.element = this.createCardElement();
        this.placed = false;
        this.initFreeDrag();
    }

    createCardElement() {
        const card = document.createElement('div');
        card.className = 'regulatory-card';
        card.style.position = 'absolute';
        card.style.zIndex = 10;
        // Stack all cards at a fixed position (bottom left of the game area)
        card.style.left = '30px';
        card.style.bottom = '30px';
        card.style.top = '';
        card.style.right = '';
        card.dataset.prevLeft = '30px';
        card.dataset.prevTop = '';
        card.innerHTML = `
            <div class="card-header">${this.category}: ${this.subcategory}</div>
            <div class="card-content">${this.content}</div>
        `;
        return card;
    }

    initFreeDrag() {
        const card = this.element;
        let offsetX, offsetY, startX, startY, dragging = false;
        const gameContainer = document.getElementById('game');
        const getDropZones = () => Array.from(document.querySelectorAll('.drop-zone'));
        let lastDropZone = null;

        // Mouse events
        card.addEventListener('mousedown', (e) => {
            if (this.placed) return;
            dragging = true;
            card.style.zIndex = 2000;
            startX = e.clientX;
            startY = e.clientY;
            const rect = card.getBoundingClientRect();
            offsetX = startX - rect.left;
            offsetY = startY - rect.top;
            card.dataset.prevLeft = card.style.left;
            card.dataset.prevTop = card.style.top;
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!dragging || this.placed) return;
            const gameRect = gameContainer.getBoundingClientRect();
            let x = e.clientX - gameRect.left - offsetX;
            let y = e.clientY - gameRect.top - offsetY;
            x = Math.max(0, Math.min(x, gameRect.width - card.offsetWidth));
            y = Math.max(0, Math.min(y, gameRect.height - card.offsetHeight));
            card.style.left = `${x}px`;
            card.style.top = `${y}px`;

            // Always remove highlight from all zones first
            getDropZones().forEach(z => z.classList.remove('active'));
            // Highlight drop zone if over
            let found = false;
            for (const zone of getDropZones()) {
                if (this.isOverDropZone(card, zone)) {
                    zone.classList.add('active');
                    lastDropZone = zone;
                    found = true;
                    break; // Only one zone can be active
                }
            }
            if (!found) lastDropZone = null;
        });

        document.addEventListener('mouseup', async (e) => {
            if (!dragging || this.placed) return;
            dragging = false;
            card.style.zIndex = 10;
            document.body.style.userSelect = '';
            // Check if over a drop zone
            let matched = false;
            for (const zone of getDropZones()) {
                if (this.isOverDropZone(card, zone)) {
                    // Check match
                    const expectedOrder = parseInt(zone.dataset.order);
                    if (this.order === expectedOrder) {
                        // Quiz/feedback
                        const correct = await window.currentGame.showQuiz(this.quizQuestion);
                        if (correct && !this.placed) {
                            this.placed = true;
                            const dropZoneOrder = parseInt(zone.dataset.order);
                            if (!window.currentGame.filledDropZones.has(dropZoneOrder)) {
                                window.currentGame.filledDropZones.add(dropZoneOrder);
                            }
                            window.currentGame.placeCard(this, zone, true);
                        } else {
                            if (lastDropZone) handleIncorrectAction(lastDropZone, window.currentGame.scoreElement);
                            // Keep the card where it was dropped
                            card.dataset.prevLeft = card.style.left;
                            card.dataset.prevTop = card.style.top;
                        }
                    } else {
                        if (lastDropZone) handleIncorrectAction(lastDropZone, window.currentGame.scoreElement);
                        // Keep the card where it was dropped
                        card.dataset.prevLeft = card.style.left;
                        card.dataset.prevTop = card.style.top;
                    }
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                // Keep the card where it was dropped
                card.dataset.prevLeft = card.style.left;
                card.dataset.prevTop = card.style.top;
            }
            // Remove highlight
            getDropZones().forEach(zone => zone.classList.remove('active'));
        });

        // Touch events
        card.addEventListener('touchstart', (e) => {
            if (this.placed) return;
            dragging = true;
            card.style.zIndex = 2000;
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            const rect = card.getBoundingClientRect();
            offsetX = startX - rect.left;
            offsetY = startY - rect.top;
            card.dataset.prevLeft = card.style.left;
            card.dataset.prevTop = card.style.top;
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('touchmove', (e) => {
            if (!dragging || this.placed) return;
            const touch = e.touches[0];
            const gameRect = gameContainer.getBoundingClientRect();
            let x = touch.clientX - gameRect.left - offsetX;
            let y = touch.clientY - gameRect.top - offsetY;
            x = Math.max(0, Math.min(x, gameRect.width - card.offsetWidth));
            y = Math.max(0, Math.min(y, gameRect.height - card.offsetHeight));
            card.style.left = `${x}px`;
            card.style.top = `${y}px`;

            // Always remove highlight from all zones first
            getDropZones().forEach(z => z.classList.remove('active'));
            // Highlight drop zone if over
            let found = false;
            for (const zone of getDropZones()) {
                if (this.isOverDropZone(card, zone)) {
                    zone.classList.add('active');
                    lastDropZone = zone;
                    found = true;
                    break; // Only one zone can be active
                }
            }
            if (!found) lastDropZone = null;
        });

        document.addEventListener('touchend', async (e) => {
            if (!dragging || this.placed) return;
            dragging = false;
            card.style.zIndex = 10;
            document.body.style.userSelect = '';

            // Check if over a drop zone
            let matched = false;
            for (const zone of getDropZones()) {
                if (this.isOverDropZone(card, zone)) {
                    // Check match
                    const expectedOrder = parseInt(zone.dataset.order);
                    if (this.order === expectedOrder) {
                        // Quiz/feedback
                        const correct = await window.currentGame.showQuiz(this.quizQuestion);
                        if (correct && !this.placed) {
                            this.placed = true;
                            const dropZoneOrder = parseInt(zone.dataset.order);
                            if (!window.currentGame.filledDropZones.has(dropZoneOrder)) {
                                window.currentGame.filledDropZones.add(dropZoneOrder);
                            }
                            window.currentGame.placeCard(this, zone, true);
                        } else {
                            if (lastDropZone) handleIncorrectAction(lastDropZone, window.currentGame.scoreElement);
                            // Keep the card where it was dropped
                            card.dataset.prevLeft = card.style.left;
                            card.dataset.prevTop = card.style.top;
                        }
                    } else {
                        if (lastDropZone) handleIncorrectAction(lastDropZone, window.currentGame.scoreElement);
                        // Keep the card where it was dropped
                        card.dataset.prevLeft = card.style.left;
                        card.dataset.prevTop = card.style.top;
                    }
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                // Keep the card where it was dropped
                card.dataset.prevLeft = card.style.left;
                card.dataset.prevTop = card.style.top;
            }
            // Remove highlight
            getDropZones().forEach(zone => zone.classList.remove('active'));
        });
    }

    isOverDropZone(card, zone) {
        const cardRect = card.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();
        return !(
            cardRect.right < zoneRect.left ||
            cardRect.left > zoneRect.right ||
            cardRect.bottom < zoneRect.top ||
            cardRect.top > zoneRect.bottom
        );
    }
}

class RegulatoryGame {
    constructor() {
        this.state = 'READY';
        this.score = 0;
        this.cards = [];
        this.dropZones = [];
        this.currentCard = null;
        this.gameContainer = document.getElementById('game');
        this.container = document.getElementById('container');
        this.scoreElement = document.getElementById('score');
        this.instructionsElement = document.getElementById('instructions');
        this.gameOverElement = document.querySelector('.game-over');
        this.startButton = document.getElementById('start-button');
        this.gameReadyElement = document.querySelector('.game-ready');
        this.dropZonesContainer = null;
        this.cardsPlaced = 0;
        this.filledDropZones = new Set(); // Track filled drop zones by order
        this.setupEventListeners();
        this.setState('READY');
        window.currentGame = this;
    }

    initializeGame() {
        // Clear previous drop zones and cards
        if (this.dropZonesContainer) this.dropZonesContainer.remove();
        this.cards.forEach(card => card.element.remove());
        this.cards = [];
        this.dropZones = [];
        this.cardsPlaced = 0;
        this.filledDropZones = new Set();
        // Create drop zones container
        this.dropZonesContainer = document.createElement('div');
        this.dropZonesContainer.className = 'drop-zones-container';
        this.gameContainer.appendChild(this.dropZonesContainer);
        // Create drop zones
        this.createDropZones(this.dropZonesContainer);
        // Move the game-ready (Start button) below drop zones
        this.gameContainer.appendChild(this.gameReadyElement);
        // Generate cards (one for each entry in lifecycle data)
        this.generateCards();
    }

    createDropZones(container) {
        // Find the max order in the lifecycle data
        const maxOrder = Math.max(...regulatoryData.lifecycle.map(item => item.order));
        for (let i = 1; i <= maxOrder; i++) {
            const dropZone = document.createElement('div');
            dropZone.className = 'drop-zone';
            dropZone.dataset.order = i;
            dropZone.innerHTML = `<div class=\"drop-zone-label\">Stage ${i}</div>`;
            container.appendChild(dropZone);
            this.dropZones.push(dropZone);
        }
    }

    generateCards() {
        // Shuffle the lifecycle data
        const shuffledData = [...regulatoryData.lifecycle].sort(() => Math.random() - 0.5);
        shuffledData.forEach(data => {
            const card = new RegulatoryCard(data);
            this.cards.push(card);
        });
    }

    setupEventListeners() {
        // Start button
        if (this.startButton) {
            this.startButton.addEventListener('click', () => {
                this.startGame();
            });
        }
        // Restart game
        if (this.gameOverElement) {
            this.gameOverElement.addEventListener('click', () => this.restartGame());
        }
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.state === 'ENDED') {
                this.restartGame();
            }
        });
    }

    enableDragAndDrop() {
        // Add cards to the game area
        this.cards.forEach(card => {
            this.gameContainer.appendChild(card.element);
            card.element.addEventListener('dragstart', (e) => {
                if (card.placed) {
                    e.preventDefault();
                    return;
                }
                this.currentCard = card;
                e.dataTransfer.setData('text/plain', '');
                card.element.classList.add('dragging');
            });
            card.element.addEventListener('dragend', () => {
                card.element.classList.remove('dragging');
            });
        });
        // Drop zone events
        this.dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!zone.querySelector('.regulatory-card')) {
                    zone.classList.add('active');
                }
            });
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('active');
            });
            zone.addEventListener('drop', (e) => {
            e.preventDefault();
                zone.classList.remove('active');
                this.onDrop(zone);
            });
        });
    }

    async onDrop(zone) {
        if (!this.currentCard || this.currentCard.placed) return;
        const expectedOrder = parseInt(zone.dataset.order);
        const cardOrder = this.currentCard.order;
        // Only allow drop if zone is empty
        if (!zone.querySelector('.regulatory-card') && cardOrder === expectedOrder) {
            const correct = await this.showQuiz(this.currentCard.quizQuestion);
            if (correct) {
                this.placeCard(this.currentCard, zone, true);
            } else {
                this.currentCard.element.classList.add('incorrect');
                handleIncorrectAction(zone, this.scoreElement);
                setTimeout(() => {
                    this.currentCard.element.classList.remove('incorrect');
                    this.currentCard.element.style.left = this.currentCard.element.dataset.prevLeft;
                    this.currentCard.element.style.top = this.currentCard.element.dataset.prevTop;
                }, 600);
            }
        } else {
            this.currentCard.element.classList.add('incorrect');
            handleIncorrectAction(zone, this.scoreElement);
            setTimeout(() => {
                this.currentCard.element.classList.remove('incorrect');
                this.currentCard.element.style.left = this.currentCard.element.dataset.prevLeft;
                this.currentCard.element.style.top = this.currentCard.element.dataset.prevTop;
            }, 600);
        }
        this.currentCard = null;
    }

    showQuiz(quiz) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'quiz-modal';
            modal.style.position = 'fixed';
            modal.style.zIndex = '9999';
            modal.innerHTML = `
                <div class="quiz-content">
                    <h3>${quiz.question}</h3>
                    <div class="quiz-options">
                        ${quiz.options.map((option, index) => `
                            <button class="quiz-btn" data-index="${index}">${option}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const handleAnswer = (selectedIndex) => {
                const correct = selectedIndex === quiz.correctIndex;
                modal.remove();
                resolve(correct);
            };

            modal.querySelectorAll('.quiz-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const selectedIndex = parseInt(button.dataset.index);
                    handleAnswer(selectedIndex);
                });
            });
        });
    }

    placeCard(card, zone, markPlaced) {
        // Place card in drop zone
        card.element.style.position = '';
        card.element.style.top = '';
        card.element.style.left = '';
        card.element.style.right = '';
        card.element.style.bottom = '';
        card.element.style.margin = '';
        card.element.style.width = '300px'; // Keep width for consistency
        card.element.draggable = false;
        card.placed = true;
        // Hide the description when placed
        const desc = card.element.querySelector('.card-content');
        if (desc) desc.style.display = 'none';
        zone.appendChild(card.element);
        // Add success flash effect to drop zone
        zone.classList.add('success-flash');
        setTimeout(() => {
            zone.classList.remove('success-flash');
        }, 700);
        this.cardsPlaced++;
        this.score += 1;
        // Update score as X/Y
        this.scoreElement.textContent = `${this.cardsPlaced}/${this.cards.length}`;
        // Add pop effect to score
        this.scoreElement.classList.add('score-pop');
        setTimeout(() => {
            this.scoreElement.classList.remove('score-pop');
        }, 500);
        card.element.classList.add('placed');
        // Check if all cards are placed
        if (this.cardsPlaced === this.cards.length) {
            this.endGame();
        }
    }

    setState(state) {
        this.state = state;
        this.container.className = state.toLowerCase();
        switch (state) {
            case 'LOADING':
                if (this.instructionsElement) this.instructionsElement.style.opacity = '0';
                if (this.scoreElement) this.scoreElement.style.opacity = '0';
                if (this.gameReadyElement) this.gameReadyElement.style.opacity = '0';
                break;
            case 'READY':
                if (this.instructionsElement) this.instructionsElement.style.opacity = '1';
                if (this.scoreElement) this.scoreElement.style.opacity = '0';
                if (this.gameReadyElement) this.gameReadyElement.style.opacity = '1';
                this.initializeGame();
                // Set initial score as 0/Y
                if (this.scoreElement) this.scoreElement.textContent = `0/${this.cards.length}`;
                break;
            case 'PLAYING':
                if (this.instructionsElement) this.instructionsElement.style.opacity = '1';
                if (this.scoreElement) this.scoreElement.style.opacity = '1';
                if (this.gameReadyElement) this.gameReadyElement.style.opacity = '0';
                this.enableDragAndDrop();
                // Set initial score as 0/Y
                if (this.scoreElement) this.scoreElement.textContent = `${this.cardsPlaced}/${this.cards.length}`;
                break;
            case 'ENDED':
                if (this.instructionsElement) this.instructionsElement.style.opacity = '0';
                if (this.scoreElement) this.scoreElement.style.opacity = '1';
                if (this.gameReadyElement) this.gameReadyElement.style.opacity = '0';
                break;
        }
    }

    startGame() {
        this.setState('PLAYING');
    }

    endGame() {
        // Do nothing (disabled)
        // this.setState('ENDED');
    }

    restartGame() {
        this.setState('READY');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new RegulatoryGame();
    game.setState('PLAYING'); // Force game to start in PLAYING state for debugging
    window.currentGame = game;
});

// Example: In the function that handles incorrect card drops or quiz answers
function handleIncorrectAction(dropZone, scoreElement) {
  dropZone.classList.add('error-flash');
  scoreElement.classList.add('score-pop-error');
  setTimeout(() => {
    dropZone.classList.remove('error-flash');
    scoreElement.classList.remove('score-pop-error');
  }, 700); // Match the animation duration
}