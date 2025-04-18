let isAutoplayActive = false;
let currentSubcategoryIndex = 0;
let subcategories = [];
let isPaused = true;
let currentVideo = null;

function initAutoplay() {
    // Get all subcategories in order
    subcategories = Array.from(document.querySelectorAll('.subCategory'));
    
    // Add click handler to Hamlyn logo
    const hamlynLogo = document.querySelector('#HamlynLogo');
    if (hamlynLogo) {
        hamlynLogo.style.cursor = 'pointer';
        hamlynLogo.addEventListener('click', (event) => {
            event.stopPropagation();
            // Add animation class
            hamlynLogo.classList.add('clicked');
            // Remove class after animation completes
            setTimeout(() => {
                hamlynLogo.classList.remove('clicked');
            }, 300);
            toggleAutoplay();
        });
    }

    // Add click handler to play icon
    const playIcon = document.querySelector('#playIcon');
    if (playIcon) {
        playIcon.addEventListener('click', async (event) => {
            event.stopPropagation();
            const video = document.querySelector('#categoryVideo');
            if (video) {
                try {
                    await video.play();
                    isPaused = false;
                    updateControlState();
                    // Add ended event listener for single video playback
                    video.addEventListener('ended', () => {
                        isPaused = true;
                        updateControlState();
                    }, { once: true });
                } catch (error) {
                    console.error('Error playing video:', error);
                }
            }
        });
    }

    // Add click handler to pause icon
    const pauseIcon = document.querySelector('#pauseIcon');
    if (pauseIcon) {
        pauseIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            const video = document.querySelector('#categoryVideo');
            if (video) {
                video.pause();
                isPaused = true;
                updateControlState();
            }
        });
    }

    // Initially disable play button until autoplay is started
    updateControlState();
}

function pausePlayback() {
    isPaused = true;
    const video = document.querySelector('#categoryVideo');
    if (video) {
        video.pause();
    }
    updateControlState();
}

function resumePlayback() {
    isPaused = false;
    const video = document.querySelector('#categoryVideo');
    if (video) {
        video.play().catch(error => console.error('Error resuming video:', error));
        if (isAutoplayActive) {
            video.addEventListener('ended', playNextSubcategory, { once: true });
        } else {
            video.addEventListener('ended', () => {
                isPaused = true;
                updateControlState();
            }, { once: true });
        }
    }
    updateControlState();
}

function updateControlState() {
    const playIcon = document.querySelector('#playIcon');
    const pauseIcon = document.querySelector('#pauseIcon');
    const video = document.querySelector('#categoryVideo');

    // Enable/disable play button
    if (video) {
        playIcon.classList.remove('disabled');
        pauseIcon.classList.remove('disabled');
        
        if (isPaused) {
            playIcon.style.opacity = '1';
            pauseIcon.style.opacity = '0.5';
        } else {
            playIcon.style.opacity = '0.5';
            pauseIcon.style.opacity = '1';
        }
    } else {
        playIcon.classList.add('disabled');
        pauseIcon.classList.add('disabled');
        playIcon.style.opacity = '0.5';
        pauseIcon.style.opacity = '0.5';
    }
}

function toggleAutoplay() {
    if (isAutoplayActive) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

function startAutoplay() {
    isAutoplayActive = true;
    isPaused = false;
    currentSubcategoryIndex = 0;
    
    const hamlynLogo = document.querySelector('#HamlynLogo');
    hamlynLogo.classList.add('clicked');
    setTimeout(() => hamlynLogo.classList.remove('clicked'), 300);
    
    // Start from the first subcategory
    if (subcategories.length > 0) {
        // Trigger the subcategory click using clickSubCategoryPart
        clickSubCategoryPart(currentSubcategoryIndex, "subCategory");
        
        // Find and play video
        const video = document.querySelector('#categoryVideo');
        if (video) {
            let videoStarted = false;
            
            // Set up the onended handler first
            video.onended = () => {
                if (videoStarted && !isPaused) {
                    currentSubcategoryIndex++;
                    playNextSubcategory();
                }
            };

            // Wait for video to be visible
            const checkVideoVisibility = setInterval(() => {
                if (video.style.opacity !== "0") {
                    clearInterval(checkVideoVisibility);
                    // Reset video
                    video.currentTime = 0;
                    
                    // Play video if not paused
                    if (!isPaused) {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                videoStarted = true;
                            }).catch(error => {
                                console.log("Video play failed:", error);
                                if (!isPaused) {
                                    currentSubcategoryIndex++;
                                    playNextSubcategory();
                                }
                            });
                        }
                    }
                }
            }, 100);

            // Timeout after 5 seconds if video never becomes visible
            setTimeout(() => {
                clearInterval(checkVideoVisibility);
                if (!videoStarted && !isPaused) {
                    currentSubcategoryIndex++;
                    playNextSubcategory();
                }
            }, 5000);
        }
    }
    updateControlState();
}

function stopAutoplay() {
    isAutoplayActive = false;
    isPaused = true;
    const video = document.querySelector('#categoryVideo');
    if (video) {
        video.pause();
        video.removeEventListener('ended', playNextSubcategory);
    }
    updateControlState();
}

function playNextSubcategory() {
    if (!isAutoplayActive || isPaused) return;

    if (currentSubcategoryIndex >= subcategories.length) {
        stopAutoplay();
        return;
    }
    
    // Trigger the subcategory click using clickSubCategoryPart
    clickSubCategoryPart(currentSubcategoryIndex, "subCategory");
    
    // Find and play video
    const video = document.querySelector('#categoryVideo');
    if (video) {
        let videoStarted = false;

        // Set up the onended handler first
        video.onended = () => {
            if (videoStarted && !isPaused) {
                currentSubcategoryIndex++;
                playNextSubcategory();
            }
        };

        // Wait for video to be visible
        const checkVideoVisibility = setInterval(() => {
            if (video.style.opacity !== "0") {
                clearInterval(checkVideoVisibility);
                // Reset video
                video.currentTime = 0;
                
                // Play video if not paused
                if (!isPaused) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            videoStarted = true;
                        }).catch(error => {
                            console.log("Video play failed:", error);
                            if (!isPaused) {
                                currentSubcategoryIndex++;
                                playNextSubcategory();
                            }
                        });
                    }
                }
            }
        }, 100);

        // Timeout after 5 seconds if video never becomes visible
        setTimeout(() => {
            clearInterval(checkVideoVisibility);
            if (!videoStarted && !isPaused) {
                currentSubcategoryIndex++;
                playNextSubcategory();
            }
        }, 5000);
    } else {
        // If no video, move to next subcategory after a delay
        if (!isPaused) {
            setTimeout(() => {
                currentSubcategoryIndex++;
                playNextSubcategory();
            }, 2000);
        }
    }
}

function highlightSubCategory(subCategory) {
    // Remove highlight from current subcategory
    const currentHighlight = document.querySelector('.subCategory.highlight');
    if (currentHighlight) {
        currentHighlight.classList.remove('highlight');
        const video = document.querySelector('#categoryVideo');
        if (video) {
            video.pause();
            video.removeEventListener('ended', playNextSubcategory);
        }
    }

    // Add highlight to new subcategory
    subCategory.classList.add('highlight');
    updateControlState();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAutoplay); 