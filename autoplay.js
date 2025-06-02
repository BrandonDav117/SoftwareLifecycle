let isAutoplayActive = false;
let currentSubcategoryIndex = 0;
let currentSubcategoryPartIndex = 0;
let subcategories = [];
let subcategoryParts = [];
let isPaused = true;
let currentVideo = null;
let isPlayingSubcategoryPart = false;
let animationInterval = null;

function animateLogo() {
    const hamlynLogo = document.querySelector('#HamlynLogo');
    if (!hamlynLogo) return;
    
    let scale = 1;
    let rotation = 0;
    let direction = 1;
    
    animationInterval = setInterval(() => {
        if (!isAutoplayActive) {
            clearInterval(animationInterval);
            hamlynLogo.style.transform = 'translateY(-40px) scale(1) rotate(0deg)';
            return;
        }
        
        scale = 1 + Math.sin(Date.now() / 1000 * Math.PI) * 0.05;
        rotation = Math.sin(Date.now() / 1000 * Math.PI * 2) * 2;
        hamlynLogo.style.transform = `translateY(-40px) scale(${scale}) rotate(${rotation}deg)`;
    }, 16); // ~60fps
}

function initAutoplay() {
    // Get all subcategories in order
    subcategories = Array.from(document.querySelectorAll('.subCategory'));
    
    // Add click handler to autoplay button
    const autoplayIcon = document.querySelector('#autoplayIcon');
    if (autoplayIcon) {
        autoplayIcon.addEventListener('click', (event) => {
            event.stopPropagation();

            if (isAutoplayActive) {
                // If autoplay is active, stop it and reset to first section
                stopAutoplay();
                // Reset to first section
                currentSubcategoryIndex = 0;
                currentSubcategoryPartIndex = 0;
                isPlayingSubcategoryPart = false;
                // Clear all highlighting classes
                document.querySelectorAll('.subCategoryPart.active, .subCategoryPartContinuous.active').forEach(part => {
                    part.classList.remove('active');
                });
                autoplayIcon.classList.remove('active');
            } else {
                // If autoplay is not active, start it
                startAutoplay();
                autoplayIcon.classList.add('active');
            }
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

    // Add document click handler to stop autoplay when clicking anywhere else
    document.addEventListener('click', (event) => {
        // Check if the click was on the autoplay icon, play icon, or pause icon
        const isAutoplayClick = event.target.closest('#autoplayIcon');
        const isPlayClick = event.target.closest('#playIcon');
        const isPauseClick = event.target.closest('#pauseIcon');
        
        // If click was not on any of these elements and autoplay is active, stop it
        if (!isAutoplayClick && !isPlayClick && !isPauseClick && isAutoplayActive) {
            stopAutoplay();
            const autoplayIcon = document.querySelector('#autoplayIcon');
            if (autoplayIcon) {
                autoplayIcon.classList.remove('active');
            }
        }
    });

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
    const autoplayIcon = document.querySelector('#autoplayIcon');
    const video = document.querySelector('#categoryVideo');

    // Enable/disable play button
    if (video) {
        playIcon.classList.remove('disabled');
        pauseIcon.classList.remove('disabled');
        autoplayIcon.classList.remove('disabled');
        
        if (isAutoplayActive) {
            // When autoplay is active, remove active state from play/pause buttons
            playIcon.style.opacity = '0.5';
            pauseIcon.style.opacity = '0.5';
            playIcon.classList.remove('active');
            pauseIcon.classList.remove('active');
            autoplayIcon.style.opacity = '1';
            autoplayIcon.classList.add('active');
        } else if (isPaused) {
            playIcon.style.opacity = '1';
            pauseIcon.style.opacity = '0.5';
            autoplayIcon.style.opacity = '0.5';
            playIcon.classList.add('active');
            pauseIcon.classList.remove('active');
            autoplayIcon.classList.remove('active');
        } else {
            playIcon.style.opacity = '0.5';
            pauseIcon.style.opacity = '1';
            autoplayIcon.style.opacity = '0.5';
            playIcon.classList.remove('active');
            pauseIcon.classList.add('active');
            autoplayIcon.classList.remove('active');
        }
    } else {
        playIcon.classList.add('disabled');
        pauseIcon.classList.add('disabled');
        autoplayIcon.classList.add('disabled');
        playIcon.style.opacity = '0.5';
        pauseIcon.style.opacity = '0.5';
        autoplayIcon.style.opacity = '0.5';
        playIcon.classList.remove('active');
        pauseIcon.classList.remove('active');
        autoplayIcon.classList.remove('active');
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
    currentSubcategoryPartIndex = 0;
    isPlayingSubcategoryPart = false;
    
    // Clear all highlighting classes
    document.querySelectorAll('.subCategoryPart.active, .subCategoryPartContinuous.active').forEach(part => {
        part.classList.remove('active');
    });
    
    const autoplayIcon = document.querySelector('#autoplayIcon');
    if (autoplayIcon) {
        autoplayIcon.classList.add('active');
    }
    
    // Start from the first subcategory
    if (subcategories.length > 0) {
        playCurrentContent();
    }
    updateControlState();
}

function playCurrentContent() {
    if (!isAutoplayActive || isPaused) return;

    if (currentSubcategoryIndex >= subcategories.length) {
        stopAutoplay();
        return;
    }

    const currentSubcategory = subcategories[currentSubcategoryIndex];
    const currentTitle = currentSubcategory.querySelector('#titleLeftDisplay')?.textContent.trim();
    
    // Clear any active subcategory parts from previous subcategory
    document.querySelectorAll('.subCategoryPart.active').forEach(part => {
        part.classList.remove('active');
    });
    
    if (!isPlayingSubcategoryPart) {
        // Play the main subcategory video
        clickSubCategoryPart(currentSubcategoryIndex, "subCategory");
        const video = document.querySelector('#categoryVideo');
        if (video) {
            let videoStarted = false;
            
            video.onended = () => {
                if (videoStarted && !isPaused) {
                    // After main video, start playing subcategory parts
                    isPlayingSubcategoryPart = true;
                    currentSubcategoryPartIndex = 0;
                    playSubcategoryParts();
                }
            };

            const checkVideoVisibility = setInterval(() => {
                if (video.style.opacity !== "0") {
                    clearInterval(checkVideoVisibility);
                    video.currentTime = 0;
                    
                    if (!isPaused) {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                videoStarted = true;
                            }).catch(error => {
                                console.log("Video play failed:", error);
                                if (!isPaused) {
                                    isPlayingSubcategoryPart = true;
                                    currentSubcategoryPartIndex = 0;
                                    playSubcategoryParts();
                                }
                            });
                        }
                    }
                }
            }, 100);

            setTimeout(() => {
                clearInterval(checkVideoVisibility);
                if (!videoStarted && !isPaused) {
                    isPlayingSubcategoryPart = true;
                    currentSubcategoryPartIndex = 0;
                    playSubcategoryParts();
                }
            }, 5000);
        }
    } else {
        playSubcategoryParts();
    }
}

function playSubcategoryParts() {
    if (!isAutoplayActive || isPaused) return;

    const currentSubcategory = subcategories[currentSubcategoryIndex];
    const currentTitle = currentSubcategory.querySelector('#titleLeftDisplay')?.textContent.trim();
    const subcategoryParts = Array.from(currentSubcategory.querySelectorAll('.subCategoryPart'));
    
    // Special handling for QMS section
    if (currentTitle === "QMS") {
        // First check if we need to play regular subcategory parts
        if (currentSubcategoryPartIndex < subcategoryParts.length) {
            const subcategoryPart = subcategoryParts[currentSubcategoryPartIndex];
            if (subcategoryPart) {
                subcategoryPart.click();
                
                const video = document.querySelector('#categoryVideo');
                if (video) {
                    let videoStarted = false;
                    
                    video.onended = () => {
                        if (videoStarted && !isPaused) {
                            currentSubcategoryPartIndex++;
                            playSubcategoryParts();
                        }
                    };

                    const checkVideoVisibility = setInterval(() => {
                        if (video.style.opacity !== "0") {
                            clearInterval(checkVideoVisibility);
                            video.currentTime = 0;
                            
                            if (!isPaused) {
                                const playPromise = video.play();
                                if (playPromise !== undefined) {
                                    playPromise.then(() => {
                                        videoStarted = true;
                                    }).catch(error => {
                                        console.log("Video play failed:", error);
                                        if (!isPaused) {
                                            currentSubcategoryPartIndex++;
                                            playSubcategoryParts();
                                        }
                                    });
                                }
                            }
                        }
                    }, 100);

                    setTimeout(() => {
                        clearInterval(checkVideoVisibility);
                        if (!videoStarted && !isPaused) {
                            currentSubcategoryPartIndex++;
                            playSubcategoryParts();
                        }
                    }, 5000);
                }
            } else {
                currentSubcategoryPartIndex++;
                playSubcategoryParts();
            }
        } else {
            // After regular subcategory parts, play continuous videos
            const continuousVideos = subCategoryPartContinuousContent.filter(item => item.title === "QMS");
            const continuousIndex = currentSubcategoryPartIndex - subcategoryParts.length;
            
            if (continuousIndex < continuousVideos.length) {
                const videoContent = continuousVideos[continuousIndex];
                updateRightDisplay(videoContent);
                
                // Find and highlight the corresponding subcategory part
                const heading = videoContent.heading;
                // Find the continuous part by its text content
                const matchingPart = Array.from(document.querySelectorAll('.subCategoryPartContinuous')).find(part => {
                    const partText = part.querySelector('#sub-heading2')?.textContent.trim();
                    return partText === heading;
                });
                
                // Remove highlight from any previously active parts
                document.querySelectorAll('.subCategoryPart.active, .subCategoryPartContinuous.active').forEach(part => {
                    part.classList.remove('active');
                });
                
                // Add highlight to the current part
                if (matchingPart) {
                    matchingPart.classList.add('active');
                }
                
                const video = document.querySelector('#categoryVideo');
                if (video) {
                    let videoStarted = false;
                    
                    video.onended = () => {
                        if (videoStarted && !isPaused) {
                            currentSubcategoryPartIndex++;
                            playSubcategoryParts();
                        }
                    };

                    const checkVideoVisibility = setInterval(() => {
                        if (video.style.opacity !== "0") {
                            clearInterval(checkVideoVisibility);
                            video.currentTime = 0;
                            
                            if (!isPaused) {
                                const playPromise = video.play();
                                if (playPromise !== undefined) {
                                    playPromise.then(() => {
                                        videoStarted = true;
                                    }).catch(error => {
                                        console.log("Video play failed:", error);
                                        if (!isPaused) {
                                            currentSubcategoryPartIndex++;
                                            playSubcategoryParts();
                                        }
                                    });
                                }
                            }
                        }
                    }, 100);

                    setTimeout(() => {
                        clearInterval(checkVideoVisibility);
                        if (!videoStarted && !isPaused) {
                            currentSubcategoryPartIndex++;
                            playSubcategoryParts();
                        }
                    }, 5000);
                }
            } else {
                // All videos played, move to next subcategory
                isPlayingSubcategoryPart = false;
                currentSubcategoryIndex++;
                playCurrentContent();
            }
        }
    } else {
        // For non-QMS sections
        if (currentSubcategoryPartIndex >= subcategoryParts.length) {
            // All subcategory parts played, move to next subcategory
            isPlayingSubcategoryPart = false;
            currentSubcategoryIndex++;
            playCurrentContent();
            return;
        }

        const subcategoryPart = subcategoryParts[currentSubcategoryPartIndex];
        if (subcategoryPart) {
            subcategoryPart.click();
            
            const video = document.querySelector('#categoryVideo');
            if (video) {
                let videoStarted = false;
                
                video.onended = () => {
                    if (videoStarted && !isPaused) {
                        currentSubcategoryPartIndex++;
                        playSubcategoryParts();
                    }
                };

                const checkVideoVisibility = setInterval(() => {
                    if (video.style.opacity !== "0") {
                        clearInterval(checkVideoVisibility);
                        video.currentTime = 0;
                        
                        if (!isPaused) {
                            const playPromise = video.play();
                            if (playPromise !== undefined) {
                                playPromise.then(() => {
                                    videoStarted = true;
                                }).catch(error => {
                                    console.log("Video play failed:", error);
                                    if (!isPaused) {
                                        currentSubcategoryPartIndex++;
                                        playSubcategoryParts();
                                    }
                                });
                            }
                        }
                    }
                }, 100);

                setTimeout(() => {
                    clearInterval(checkVideoVisibility);
                    if (!videoStarted && !isPaused) {
                        currentSubcategoryPartIndex++;
                        playSubcategoryParts();
                    }
                }, 5000);
            }
        } else {
            currentSubcategoryPartIndex++;
            playSubcategoryParts();
        }
    }
}

function stopAutoplay() {
    isAutoplayActive = false;
    isPaused = true;
    
    const autoplayIcon = document.querySelector('#autoplayIcon');
    if (autoplayIcon) {
        autoplayIcon.classList.remove('active');
    }
    
    // Clear all highlighting classes
    document.querySelectorAll('.subCategoryPart.active, .subCategoryPartContinuous.active').forEach(part => {
        part.classList.remove('active');
    });
    
    // Stop any playing video
    const video = document.querySelector('#categoryVideo');
    if (video) {
        video.pause();
    }
    
    updateControlState();
}

function highlightSubCategory(subCategory) {
    // Remove highlight from current subcategory
    const currentHighlight = document.querySelector('.subCategory.highlight');
    if (currentHighlight) {
        currentHighlight.classList.remove('highlight');
        const currentSvg = currentHighlight.querySelector('.icon');
        if (currentSvg) {
            currentSvg.classList.remove('active');
        }
        const video = document.querySelector('#categoryVideo');
        if (video) {
            video.pause();
            video.removeEventListener('ended', playNextSubcategory);
        }
    }

    // Add highlight to new subcategory
    subCategory.classList.add('highlight');
    const newSvg = subCategory.querySelector('.icon');
    if (newSvg) {
        newSvg.classList.add('active');
    }
    updateControlState();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAutoplay); 