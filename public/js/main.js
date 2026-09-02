/**
 * Heart2Heart - Client-Side Interactive Behaviors
 * Handles asynchronous reactions, breathing animations, mood logging,
 * compassionate comment prompts, and themes.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDropdowns();
  initReactions();
  initBookmarks();
  initContentWarnings();
  initKindPrompts();
  initBreathingVisualizer();
  initMoodModal();
  initComposerAnonToggle();
});

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('h2h_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggles = document.querySelectorAll('[data-theme-toggle]');
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      let nextTheme = 'light';
      if (current === 'light') nextTheme = 'dark';
      else if (current === 'dark') nextTheme = 'lavender';
      else nextTheme = 'light';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('h2h_theme', nextTheme);
    });
  });
}

/* ==========================================================================
   Dropdowns (User persona switcher, etc.)
   ========================================================================== */
function initDropdowns() {
  const userBtn = document.getElementById('user-switcher-btn');
  const userMenu = document.getElementById('user-switcher-menu');

  if (userBtn && userMenu) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!userMenu.contains(e.target) && e.target !== userBtn) {
        userMenu.classList.remove('show');
      }
    });
  }
}

/* ==========================================================================
   Empathetic Reactions (Heart, Hug, Hope, etc.)
   ========================================================================== */
function initReactions() {
  document.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const postId = btn.dataset.postId;
      const reactionType = btn.dataset.reaction;

      if (!postId || !reactionType) return;

      try {
        const response = await fetch(`/api/posts/${postId}/react`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ reactionType })
        });

        if (response.ok) {
          const data = await response.json();
          const countSpan = btn.querySelector('.reaction-count');
          if (countSpan) {
            countSpan.textContent = data.count;
          }

          if (data.isAdded) {
            btn.classList.add('active');
            createFloatingEmoji(btn, getEmojiForReaction(reactionType));
          } else {
            btn.classList.remove('active');
          }
        }
      } catch (err) {
        console.error('Failed to react:', err);
      }
    });
  });
}

function getEmojiForReaction(type) {
  switch (type) {
    case 'hug': return '❤️';
    case 'hearYou': return '🤗';
    case 'hope': return '🕊️';
    case 'strong': return '💪';
    case 'relate': return '💭';
    default: return '💖';
  }
}

function createFloatingEmoji(element, emoji) {
  const rect = element.getBoundingClientRect();
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = emoji;
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top}px`;
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1000);
}

/* ==========================================================================
   Bookmarking
   ========================================================================== */
function initBookmarks() {
  document.querySelectorAll('.bookmark-toggle-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const postId = btn.dataset.postId;
      if (!postId) return;

      try {
        const response = await fetch(`/api/posts/${postId}/bookmark`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const icon = btn.querySelector('.bookmark-icon');
          const label = btn.querySelector('.bookmark-label');

          if (data.isBookmarked) {
            btn.classList.add('bookmarked');
            if (icon) icon.textContent = '🔖';
            if (label) label.textContent = 'Saved';
          } else {
            btn.classList.remove('bookmarked');
            if (icon) icon.textContent = '🏷️';
            if (label) label.textContent = 'Save';
          }
        }
      } catch (err) {
        console.error('Bookmark error:', err);
      }
    });
  });
}

/* ==========================================================================
   Content Warning Reveal Toggle
   ========================================================================== */
function initContentWarnings() {
  document.querySelectorAll('.cw-box').forEach(box => {
    const header = box.querySelector('.cw-header');
    if (header) {
      header.addEventListener('click', () => {
        box.classList.toggle('revealed');
        const triggerText = header.querySelector('.cw-trigger-text');
        if (triggerText) {
          triggerText.textContent = box.classList.contains('revealed') ? 'Hide sensitive content' : 'Show content';
        }
      });
    }
  });
}

/* ==========================================================================
   Kind Words Prompt Chips (Fill into comment textarea)
   ========================================================================== */
function initKindPrompts() {
  document.querySelectorAll('.kind-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textarea = document.getElementById('comment-textarea');
      if (textarea) {
        const text = btn.dataset.promptText || btn.textContent.trim();
        if (textarea.value.trim() === '') {
          textarea.value = text + ' ';
        } else {
          textarea.value = textarea.value.trim() + ' ' + text + ' ';
        }
        textarea.focus();
      }
    });
  });
}

/* ==========================================================================
   Breathing Visualizer Engine (4-7-8, Box Breathing, Deep Calm)
   ========================================================================== */
let breathingTimer = null;
let currentPhaseIndex = 0;
let remainingSeconds = 0;
let isBreathingActive = false;

const breathingTechniques = {
  '4-7-8': {
    name: '4-7-8 Relaxing Breath',
    phases: [
      { text: 'Inhale through nose', duration: 4, scale: 1.4, color: '#f43f5e' },
      { text: 'Hold your breath', duration: 7, scale: 1.4, color: '#8b5cf6' },
      { text: 'Exhale through mouth', duration: 8, scale: 0.9, color: '#0d9488' }
    ]
  },
  'box': {
    name: 'Box Breathing (4-4-4-4)',
    phases: [
      { text: 'Inhale deeply', duration: 4, scale: 1.4, color: '#3b82f6' },
      { text: 'Hold at top', duration: 4, scale: 1.4, color: '#8b5cf6' },
      { text: 'Exhale smoothly', duration: 4, scale: 0.9, color: '#0d9488' },
      { text: 'Hold empty', duration: 4, scale: 0.9, color: '#64748b' }
    ]
  },
  'calm': {
    name: 'Deep Calming (5-5)',
    phases: [
      { text: 'Breathe in gently', duration: 5, scale: 1.4, color: '#f43f5e' },
      { text: 'Breathe out slowly', duration: 5, scale: 0.9, color: '#0d9488' }
    ]
  }
};

let currentTechniqueKey = '4-7-8';

function initBreathingVisualizer() {
  const container = document.getElementById('breathing-room-app');
  if (!container) return;

  const startBtn = document.getElementById('breathing-start-btn');
  const stopBtn = document.getElementById('breathing-stop-btn');
  const techBtns = document.querySelectorAll('[data-breathing-tech]');

  techBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTechniqueKey = btn.dataset.breathingTech;
      stopBreathing();
      resetBreathingDisplay();
    });
  });

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (!isBreathingActive) {
        startBreathing();
      }
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      stopBreathing();
      resetBreathingDisplay();
    });
  }

  resetBreathingDisplay();
}

function startBreathing() {
  isBreathingActive = true;
  const startBtn = document.getElementById('breathing-start-btn');
  const stopBtn = document.getElementById('breathing-stop-btn');
  if (startBtn) startBtn.style.display = 'none';
  if (stopBtn) stopBtn.style.display = 'inline-flex';

  currentPhaseIndex = 0;
  runCurrentPhase();
}

function runCurrentPhase() {
  if (!isBreathingActive) return;

  const tech = breathingTechniques[currentTechniqueKey];
  const phase = tech.phases[currentPhaseIndex];

  const instructionEl = document.getElementById('breathing-instruction');
  const timerEl = document.getElementById('breathing-timer');
  const innerCircle = document.getElementById('breathing-circle-inner');
  const outerCircle = document.getElementById('breathing-circle-outer');

  if (instructionEl) instructionEl.textContent = phase.text;
  if (innerCircle) {
    innerCircle.style.transform = `scale(${phase.scale})`;
    innerCircle.style.transitionDuration = `${phase.duration}s`;
    innerCircle.style.backgroundColor = phase.color;
  }
  if (outerCircle) {
    outerCircle.style.transform = `scale(${phase.scale * 1.25})`;
    outerCircle.style.transitionDuration = `${phase.duration}s`;
  }

  remainingSeconds = phase.duration;
  if (timerEl) timerEl.textContent = remainingSeconds;

  clearInterval(breathingTimer);
  breathingTimer = setInterval(() => {
    remainingSeconds--;
    if (timerEl) timerEl.textContent = remainingSeconds;

    if (remainingSeconds <= 0) {
      clearInterval(breathingTimer);
      currentPhaseIndex = (currentPhaseIndex + 1) % tech.phases.length;
      runCurrentPhase();
    }
  }, 1000);
}

function stopBreathing() {
  isBreathingActive = false;
  clearInterval(breathingTimer);
  const startBtn = document.getElementById('breathing-start-btn');
  const stopBtn = document.getElementById('breathing-stop-btn');
  if (startBtn) startBtn.style.display = 'inline-flex';
  if (stopBtn) stopBtn.style.display = 'none';
}

function resetBreathingDisplay() {
  const instructionEl = document.getElementById('breathing-instruction');
  const timerEl = document.getElementById('breathing-timer');
  const innerCircle = document.getElementById('breathing-circle-inner');
  const outerCircle = document.getElementById('breathing-circle-outer');

  if (instructionEl) instructionEl.textContent = 'Ready to begin';
  if (timerEl) timerEl.textContent = '🌸';
  if (innerCircle) {
    innerCircle.style.transform = 'scale(1)';
    innerCircle.style.transitionDuration = '0.5s';
  }
  if (outerCircle) {
    outerCircle.style.transform = 'scale(1)';
    outerCircle.style.transitionDuration = '0.5s';
  }
}

/* ==========================================================================
   Mood Check-In Modal
   ========================================================================== */
function initMoodModal() {
  const openBtns = document.querySelectorAll('[data-open-mood-modal]');
  const modal = document.getElementById('mood-checkin-modal');
  const closeBtn = document.getElementById('close-mood-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('show');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // Mood selection within modal
  const moodPills = modal.querySelectorAll('.modal-mood-pill');
  const hiddenValueInput = document.getElementById('modal-mood-value');
  const hiddenLabelInput = document.getElementById('modal-mood-label');
  const hiddenEmojiInput = document.getElementById('modal-mood-emoji');

  moodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      moodPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');

      if (hiddenValueInput) hiddenValueInput.value = pill.dataset.moodVal;
      if (hiddenLabelInput) hiddenLabelInput.value = pill.dataset.moodName;
      if (hiddenEmojiInput) hiddenEmojiInput.value = pill.dataset.moodEmoji;
    });
  });
}

/* ==========================================================================
   Anonymous Mode Toggle Live Preview in Composer
   ========================================================================== */
function initComposerAnonToggle() {
  const anonCheckbox = document.getElementById('is-anonymous-toggle');
  const previewAuthorName = document.getElementById('composer-preview-author');
  const previewAvatar = document.getElementById('composer-preview-avatar');

  if (anonCheckbox && previewAuthorName && previewAvatar) {
    const defaultName = previewAuthorName.textContent;
    const defaultAvatar = previewAvatar.textContent;

    anonCheckbox.addEventListener('change', () => {
      if (anonCheckbox.checked) {
        previewAuthorName.textContent = 'Gentle Soul (Anonymous)';
        previewAvatar.textContent = '🕊️';
      } else {
        previewAuthorName.textContent = defaultName;
        previewAvatar.textContent = defaultAvatar;
      }
    });
  }
}
