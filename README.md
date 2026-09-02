# 💖 Heart2Heart

> **A safe space where people can share their problems, express their feelings, and connect with others who understand and support them.**

Heart2Heart is a warm, empathetic social media platform and emotional sanctuary built with **Node.js, Express, and EJS**. It empowers individuals to be vulnerable without fear of judgment, find solace in dedicated support circles, practice grounding mindfulness exercises, and receive authentic peer encouragement.

---

## 🌸 Key Features

### 1. 🏡 Safe Feed & Story Stream
- **Empathetic Feeds**: Browse heartfelt stories, emotional vents, small victories, and requests for gentle perspective.
- **Dynamic Mood Filters**: Filter stories instantly by emotional state (*Overwhelmed 🌪️*, *Exhausted 😮‍💨*, *Lonely 🥀*, *Hopeful 🌱*, *Healing 🩹*, *Overthinking 💭*, *Grateful ✨*).
- **Sorting Options**: Sort by *Recent*, *Most Hugs ❤️*, or *Conversations 💬*.
- **Content Warnings (CW)**: Built-in sensitive content protection with gentle reveal toggles.

### 2. ✍️ Compassionate Post Creation
- **Safe Posting Modes**: Choose to post under your profile or toggle **Anonymous Mode 🕊️** with custom soothing pseudonyms.
- **Support-Type Tags**: Explicitly specify what kind of response you need:
  - 💜 *Virtual Hugs Only* (No advice, just warmth & validation)
  - 💛 *Gentle Advice Welcome* (Open to kind perspectives)
  - 💚 *Just Need to Vent* (Listening ear only)
  - 💙 *Looking for Similar Experiences* (Relatable peer connection)

### 3. 🤗 Empathetic Micro-Interactions
- **Five Heartfelt Reactions**:
  - ❤️ **Send Hug**: Send warm virtual embrace
  - 🤗 **I Hear You**: Validate someone's emotional reality
  - 🕊️ **Sending Hope**: Offer light and optimism
  - 💪 **Stay Strong**: Uplift courage
  - 💭 **Relate**: Connect over shared experiences
- **Animated Floating Hearts**: Visual particle effect on reaction clicks.
- **Comfort Bookmarks**: Save soothing posts to your personal sanctuary.

### 4. 💬 Supportive Responses & Kind Words Helper
- **Compassionate Sentence Starters**: One-click chips that insert gentle affirmations (*"I hear you, and your feelings are completely valid"*, *"Sending you the warmest hug"*).
- **Anonymous Comments**: Support peers while maintaining personal privacy.

### 5. 🫧 Themed Support Circles
Dedicated rooms gathered around shared emotional journeys:
- 🌊 **Anxiety & Overwhelm**: Grounding tools, panic attacks, and coping techniques.
- 🌙 **Late Night Thoughts**: Midnight ruminations and quiet reflections for restless minds.
- 📚 **Academic & Career Pressure**: Burnout recovery, exam stress, and imposter syndrome.
- 💔 **Healing from Heartbreak**: Relationship grief, letting go, and rediscovery.
- ✨ **Little Wins & Gratitude**: Celebrating tiny steps forward.
- 🕯️ **Loneliness & Belonging**: For anyone searching for gentle connection.

### 6. 🫁 Peaceful Breathing Room
- Interactive visualizer with expanding aura and rhythm timers.
- **Techniques**:
  - **4-7-8 Relaxing Breath** (Inhale 4s → Hold 7s → Exhale 8s)
  - **Box Breathing** (4-4-4-4 for nervous system stabilization)
  - **Deep Calming** (5-5 rhythmic balance)

### 7. 📈 Emotional Heart Tracker & Check-In
- Interactive 5-level mood logging with private journal notes.
- Historical timeline of your emotional journey.

### 8. 🛟 Safe Haven & Crisis Toolkit
- Verified 24/7 emergency hotlines (US/Canada 988, Crisis Text Line 741741, UK Samaritans 116 123, Lifeline Australia, The Trevor Project LGBTQ+, International Directory).
- Sensory grounding guides (5-4-3-2-1 technique, TIPP cold water shock, self-care checklists).

### 9. 👤 Persona Switcher (Multi-User Demo)
- Instantly switch between mock personas (*Maya Patel*, *Jordan Lee*, *Samira K.*, *Liam Chen*, *Nora Evans*) to demo peer-to-peer interactions, empathy metrics, and personalized bookmarks.

### 10. 🎨 Custom Themes
- **Warm Peach/Rose** (Comforting daytime palette)
- **Calming Midnight** (Dark mode for sensitive eyes and late nights)
- **Lavender Dawn** (Soothing twilight aesthetic)

---

## 🏗️ Architecture & Project Structure

The project follows standard MVC architecture with an Express server, modular routers, controllers, and EJS views:

```
Heart2Heart/
├── src/
│   ├── app.js                   # Express application setup & middleware
│   ├── controllers/
│   │   ├── circleController.js  # Support circles handlers
│   │   ├── feedController.js    # Feed, search, and moods handlers
│   │   ├── postController.js    # Posts CRUD, reactions, comments
│   │   ├── profileController.js # Profiles, persona switcher, mood logs
│   │   └── resourceController.js# Crisis toolkit & breathing room
│   ├── data/
│   │   ├── seedData.js          # Realistic mock dataset
│   │   └── store.js             # Thread-safe in-memory data store
│   ├── middleware/
│   │   ├── currentUser.js       # Injects active persona & template helpers
│   │   └── errorHandler.js      # Custom 404 & 500 error handlers
│   ├── routes/
│   │   ├── apiRouter.js         # JSON API endpoints for AJAX micro-interactions
│   │   ├── circleRouter.js      # /circles routes
│   │   ├── indexRouter.js       # /, /search, /moods routes
│   │   ├── postRouter.js        # /posts routes
│   │   ├── profileRouter.js     # /profile routes
│   │   └── resourcesRouter.js   # /resources, /resources/breathing routes
│   └── views/
│       ├── layouts/
│       │   └── main.ejs         # Master HTML5 layout
│       ├── pages/
│       │   ├── 404.ejs
│       │   ├── 500.ejs
│       │   ├── breathing.ejs
│       │   ├── circle-detail.ejs
│       │   ├── circles.ejs
│       │   ├── create-post.ejs
│       │   ├── feed.ejs
│       │   ├── moods.ejs
│       │   ├── post-detail.ejs
│       │   ├── profile.ejs
│       │   ├── resources.ejs
│       │   └── search.ejs
│       └── partials/
│           ├── flash.ejs
│           ├── footer.ejs
│           ├── mood-modal.ejs
│           ├── navbar.ejs
│           ├── post-card.ejs
│           ├── sidebar-left.ejs
│           └── sidebar-right.ejs
├── public/
│   ├── css/
│   │   └── style.css            # Responsive styles & theme tokens
│   └── js/
│       └── main.js              # Client reactions, breathing visualizer, theme switcher
├── index.js                     # Server entrypoint
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
# Production mode
npm start

# Development mode with watch
npm run dev
```

### 3. Open in Browser
Visit **[http://localhost:3000](http://localhost:3000)**

---

## 💾 In-Memory Data Storage
- Initial seed data is pre-populated with realistic posts, comments, support circles, and users.
- All new posts, comments, reactions, bookmarks, circle memberships, and mood logs are safely stored **in-memory** during the runtime of the server without requiring an external database setup.
