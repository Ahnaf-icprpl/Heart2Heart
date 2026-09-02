/**
 * Heart2Heart - Mock Seed Data
 * A safe space community where people share feelings, find empathy, and heal together.
 */

const users = [
  {
    id: 'user_maya',
    name: 'Maya Patel',
    handle: 'mayapatel',
    avatar: '🌸',
    avatarBg: '#fce7f3',
    bio: 'Finding light in small moments. Psychology student & plant lover. Here to listen and heal.',
    pronouns: 'she/her',
    joinedDate: 'Joined January 2026',
    hugsGiven: 142,
    hugsReceived: 89,
    circlesJoined: ['circle_anxiety', 'circle_little_wins', 'circle_late_night'],
    bookmarkedPostIds: ['post_3', 'post_5']
  },
  {
    id: 'user_jordan',
    name: 'Jordan Lee',
    handle: 'jordan_quiet',
    avatar: '🌙',
    avatarBg: '#e0e7ff',
    bio: 'Quiet observer, software dev struggling with burnout. One day at a time.',
    pronouns: 'they/them',
    joinedDate: 'Joined December 2025',
    hugsGiven: 98,
    hugsReceived: 65,
    circlesJoined: ['circle_academic', 'circle_late_night'],
    bookmarkedPostIds: ['post_1']
  },
  {
    id: 'user_samira',
    name: 'Samira K.',
    handle: 'samira_sunshine',
    avatar: '🌻',
    avatarBg: '#fef3c7',
    bio: 'Learning to love myself again after a tough breakup. Coffee enthusiast & poet.',
    pronouns: 'she/her',
    joinedDate: 'Joined February 2026',
    hugsGiven: 215,
    hugsReceived: 134,
    circlesJoined: ['circle_heartbreak', 'circle_loneliness'],
    bookmarkedPostIds: ['post_2', 'post_4']
  },
  {
    id: 'user_liam',
    name: 'Liam Chen',
    handle: 'liamc',
    avatar: '🌿',
    avatarBg: '#dcfce7',
    bio: 'Struggling with social anxiety. Trying to show up even when it feels scary.',
    pronouns: 'he/him',
    joinedDate: 'Joined November 2025',
    hugsGiven: 77,
    hugsReceived: 52,
    circlesJoined: ['circle_anxiety', 'circle_loneliness'],
    bookmarkedPostIds: []
  },
  {
    id: 'user_nora',
    name: 'Nora Evans',
    handle: 'noragrows',
    avatar: '✨',
    avatarBg: '#f3e8ff',
    bio: 'Grateful for second chances. High school teacher navigating grief and hope.',
    pronouns: 'she/her',
    joinedDate: 'Joined October 2025',
    hugsGiven: 310,
    hugsReceived: 190,
    circlesJoined: ['circle_little_wins', 'circle_heartbreak'],
    bookmarkedPostIds: ['post_6']
  }
];

const circles = [
  {
    id: 'circle_anxiety',
    slug: 'anxiety-and-overwhelm',
    name: 'Anxiety & Overwhelm',
    tagline: 'Grounding tools, panic attacks, and daily coping strategies.',
    icon: '🌊',
    bannerGradient: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 100%)',
    description: 'When the world feels too loud or your chest feels tight, this is a sanctuary to pause, breathe, and remind yourself that you are safe in this moment.',
    memberCount: 1420,
    rules: [
      'No unsolicited medical diagnoses or prescription advice.',
      'Always add content warnings for explicit triggers (e.g. panic symptoms).',
      'Validate feelings without minimizing someone’s distress.'
    ]
  },
  {
    id: 'circle_late_night',
    slug: 'late-night-thoughts',
    name: 'Late Night Thoughts',
    tagline: 'For insomnia, midnight ruminations, and quiet reflections.',
    icon: '🌙',
    bannerGradient: 'linear-gradient(135deg, #475569 0%, #1e1b4b 100%)',
    description: 'When the rest of the world is asleep and your mind won’t stop racing. A gentle place for midnight thoughts and sleepless souls.',
    memberCount: 2310,
    rules: [
      'Be gentle — nighttime vulnerability is delicate.',
      'No aggressive debating or hostile language.'
    ]
  },
  {
    id: 'circle_academic',
    slug: 'academic-and-career-pressure',
    name: 'Academic & Career Pressure',
    tagline: 'Exam stress, career crossroads, and burnout recovery.',
    icon: '📚',
    bannerGradient: 'linear-gradient(135deg, #fbcfe8 0%, #db2777 100%)',
    description: 'You are more than your grades, your productivity, or your resume. Share your fatigue, imposter syndrome, and career anxiety freely.',
    memberCount: 980,
    rules: [
      'Remember that rest is productive.',
      'Celebrate effort, not just perfection.'
    ]
  },
  {
    id: 'circle_heartbreak',
    slug: 'healing-from-heartbreak',
    name: 'Healing from Heartbreak',
    tagline: 'Navigating relationship grief, letting go, and rediscovering yourself.',
    icon: '💔',
    bannerGradient: 'linear-gradient(135deg, #fed7aa 0%, #ea580c 100%)',
    description: 'Heartbreak takes many shapes — romantic ends, lost friendships, family estrangement. We hold space for your healing without judgment.',
    memberCount: 1840,
    rules: [
      'Avoid blaming or hateful rants against entire groups.',
      'Respect everyone’s unique timeline of grief.'
    ]
  },
  {
    id: 'circle_little_wins',
    slug: 'little-wins-and-gratitude',
    name: 'Little Wins & Gratitude',
    tagline: 'Celebrating the tiny victories that keep us moving forward.',
    icon: '✨',
    bannerGradient: 'linear-gradient(135deg, #fef08a 0%, #ca8a04 100%)',
    description: 'Drank a glass of water? Got out of bed? Made it through a hard conversation? Every single step matters here. Let us cheer for you!',
    memberCount: 3120,
    rules: [
      'No win is too small to be celebrated.',
      'Cheer for others with genuine kindness.'
    ]
  },
  {
    id: 'circle_loneliness',
    slug: 'loneliness-and-belonging',
    name: 'Loneliness & Belonging',
    tagline: 'For anyone feeling like an outsider searching for gentle connection.',
    icon: '🕯️',
    bannerGradient: 'linear-gradient(135deg, #cbd5e1 0%, #475569 100%)',
    description: 'You are not invisible here. Even when you feel disconnected from everyone in your physical life, you are warmly welcomed in this room.',
    memberCount: 1650,
    rules: [
      'Welcome new faces with warmth.',
      'Respect boundaries while offering companionship.'
    ]
  }
];

const posts = [
  {
    id: 'post_1',
    authorId: 'user_maya',
    isAnonymous: false,
    authorName: 'Maya Patel',
    authorHandle: 'mayapatel',
    authorAvatar: '🌸',
    authorAvatarBg: '#fce7f3',
    circleId: 'circle_anxiety',
    circleName: 'Anxiety & Overwhelm',
    title: 'The physical exhaustion after a panic attack that nobody warns you about',
    content: `I had a severe panic attack earlier this afternoon while trying to finish my research proposal. Now that the adrenaline has worn off, my entire body feels like I ran a marathon while carrying concrete blocks. My chest is sore, my eyelids feel heavy, and I have zero energy left to even speak.\n\nIf you are going through this today, please remember to be extraordinarily soft with your body. Drink some room-temperature water, put on a cozy blanket, and don't force yourself to be "productive" for the rest of the evening. We survived the storm. That is enough.`,
    mood: 'Exhausted',
    moodEmoji: '😮‍💨',
    supportType: 'Virtual Hugs Only',
    supportBadgeColor: 'purple',
    contentWarning: '',
    tags: ['panic-attack', 'recovery', 'self-compassion', 'rest'],
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(), // 42 mins ago
    reactions: {
      hug: 48,
      hearYou: 31,
      hope: 19,
      strong: 25,
      relate: 39
    },
    userReactions: {
      user_jordan: ['hug', 'relate'],
      user_samira: ['hug', 'hope']
    },
    comments: [
      {
        id: 'comm_1_1',
        authorId: 'user_liam',
        isAnonymous: false,
        authorName: 'Liam Chen',
        authorAvatar: '🌿',
        authorAvatarBg: '#dcfce7',
        content: 'Thank you for this reminder, Maya. That post-panic hangover is so real and people who have never had panic attacks think you just bounce back immediately. Rest up tonight.',
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        hugs: 14
      },
      {
        id: 'comm_1_2',
        authorId: 'user_jordan',
        isAnonymous: false,
        authorName: 'Jordan Lee',
        authorAvatar: '🌙',
        authorAvatarBg: '#e0e7ff',
        content: 'Sending you so much warmth. Putting a weighted blanket on and having warm chamomile tea really helps reset my nervous system. Be kind to yourself! 🤍',
        createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        hugs: 8
      }
    ]
  },
  {
    id: 'post_2',
    authorId: 'anon_1',
    isAnonymous: true,
    authorName: 'A Quiet Wanderer',
    authorHandle: 'anonymous',
    authorAvatar: '🍃',
    authorAvatarBg: '#e2e8f0',
    circleId: 'circle_loneliness',
    circleName: 'Loneliness & Belonging',
    title: 'Surrounded by people at university but feeling completely invisible',
    content: `I sit in lecture halls with 200 people, walk through crowded student unions, and live in a shared flat with 3 roommates, but I haven't had a real, sincere conversation in weeks.\n\nEveryone seems to have formed their tight-knit friend groups already. When I try to chime in, I feel like an awkward background character. Does anyone else feel this strange paradox of being constantly in crowds yet utterly alone? How do you cope when loneliness feels like a physical ache in your chest?`,
    mood: 'Lonely',
    moodEmoji: '🥀',
    supportType: 'Looking for Similar Experiences',
    supportBadgeColor: 'blue',
    contentWarning: '',
    tags: ['loneliness', 'college-life', 'feeling-invisible', 'connection'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(), // 2.5 hours ago
    reactions: {
      hug: 62,
      hearYou: 54,
      hope: 22,
      strong: 18,
      relate: 73
    },
    userReactions: {
      user_maya: ['hug', 'hearYou', 'relate']
    },
    comments: [
      {
        id: 'comm_2_1',
        authorId: 'user_samira',
        isAnonymous: false,
        authorName: 'Samira K.',
        authorAvatar: '🌻',
        authorAvatarBg: '#fef3c7',
        content: 'I felt this in my soul. In my first two years of college, I spent so many Friday nights eating alone in my car. What helped me was joining one small niche club (pottery club for me!) where the activity took away the pressure of making conversation immediately. You are not broken, and you are not invisible here.',
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        hugs: 23
      },
      {
        id: 'comm_2_2',
        authorId: 'user_nora',
        isAnonymous: false,
        authorName: 'Nora Evans',
        authorAvatar: '✨',
        authorAvatarBg: '#f3e8ff',
        content: 'You write so poignantly: "loneliness feels like a physical ache". Science actually shows the brain processes social rejection and isolation through the same pathways as physical pain. Treat yourself gently today. You matter to us.',
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        hugs: 19
      }
    ]
  },
  {
    id: 'post_3',
    authorId: 'user_nora',
    isAnonymous: false,
    authorName: 'Nora Evans',
    authorHandle: 'noragrows',
    authorAvatar: '✨',
    authorAvatarBg: '#f3e8ff',
    circleId: 'circle_little_wins',
    circleName: 'Little Wins & Gratitude',
    title: 'I washed my hair and opened the blinds today after 5 days of darkness',
    content: `It sounds small, almost silly to write out, but severe depression made getting out of bed feel like climbing Mount Everest this past week.\n\nToday, I managed to stand in a warm shower, wash my hair, put on clean clothes, and open the bedroom blinds to let the morning sunlight touch the floor. I made myself a simple cup of tea.\n\nIf you are stuck in the heavy fog right now, you don't have to fix your entire life today. Just one tiny action is a victory worth celebrating. Here's to little steps. ☀️`,
    mood: 'Hopeful',
    moodEmoji: '🌱',
    supportType: 'Just Need to Vent',
    supportBadgeColor: 'emerald',
    contentWarning: '',
    tags: ['depression', 'small-wins', 'healing', 'self-care'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    reactions: {
      hug: 104,
      hearYou: 45,
      hope: 88,
      strong: 92,
      relate: 40
    },
    userReactions: {
      user_maya: ['hope', 'strong', 'hug']
    },
    comments: [
      {
        id: 'comm_3_1',
        authorId: 'user_maya',
        isAnonymous: false,
        authorName: 'Maya Patel',
        authorAvatar: '🌸',
        authorAvatarBg: '#fce7f3',
        content: 'This is NOT small at all! When the fog is thick, washing your hair takes monumental courage. So proud of you, Nora! Keep soaking in that sunlight.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        hugs: 31
      }
    ]
  },
  {
    id: 'post_4',
    authorId: 'user_samira',
    isAnonymous: false,
    authorName: 'Samira K.',
    authorHandle: 'samira_sunshine',
    authorAvatar: '🌻',
    authorAvatarBg: '#fef3c7',
    circleId: 'circle_heartbreak',
    circleName: 'Healing from Heartbreak',
    title: 'Deleted our chat history today. My hands were trembling, but I did it.',
    content: `For 4 months after the breakup, I kept reading our old messages whenever I couldn't sleep. It was keeping the wound fresh, like picking at a scab every night.\n\nToday, with my best friend holding my hand over FaceTime, I pressed delete. 3 years of memories gone from my screen. I cried for an hour afterwards, but underneath the sadness, there is a weird, quiet sliver of peace. The past cannot be rewritten, but today I made room for my future.`,
    mood: 'Healing',
    moodEmoji: '🩹',
    supportType: 'Gentle Advice Welcome',
    supportBadgeColor: 'amber',
    contentWarning: 'Mentions emotional breakup & grief',
    tags: ['breakup', 'letting-go', 'heartbreak', 'boundaries', 'closure'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    reactions: {
      hug: 82,
      hearYou: 41,
      hope: 63,
      strong: 79,
      relate: 51
    },
    userReactions: {},
    comments: [
      {
        id: 'comm_4_1',
        authorId: 'user_jordan',
        isAnonymous: false,
        authorName: 'Jordan Lee',
        authorAvatar: '🌙',
        authorAvatarBg: '#e0e7ff',
        content: 'That takes such intense bravery. That quiet sliver of peace will grow wider every single week. You chose yourself today.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        hugs: 17
      }
    ]
  },
  {
    id: 'post_5',
    authorId: 'user_jordan',
    isAnonymous: false,
    authorName: 'Jordan Lee',
    authorHandle: 'jordan_quiet',
    authorAvatar: '🌙',
    authorAvatarBg: '#e0e7ff',
    circleId: 'circle_academic',
    circleName: 'Academic & Career Pressure',
    title: 'Paralyzed by perfectionism: How do you start when you are terrified of doing it wrong?',
    content: `I have a major deliverable due in 48 hours. I have been sitting in front of a blank screen for 6 hours. Every sentence I type looks childish and inadequate, so I immediately backspace it.\n\nMy imposter syndrome is whispering that everyone is going to realize I don't know what I'm doing. I feel stuck in fight-or-flight freeze mode. How do you break out of the "if it can't be perfect, I can't start" loop?`,
    mood: 'Overwhelmed',
    moodEmoji: '🌪️',
    supportType: 'Gentle Advice Welcome',
    supportBadgeColor: 'rose',
    contentWarning: '',
    tags: ['perfectionism', 'procrastination', 'imposter-syndrome', 'burnout'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    reactions: {
      hug: 57,
      hearYou: 68,
      hope: 27,
      strong: 20,
      relate: 89
    },
    userReactions: {
      user_maya: ['relate', 'hug']
    },
    comments: [
      {
        id: 'comm_5_1',
        authorId: 'user_liam',
        isAnonymous: false,
        authorName: 'Liam Chen',
        authorAvatar: '🌿',
        authorAvatarBg: '#dcfce7',
        content: 'Give yourself permission to write the absolute worst, garbage first draft possible. Tell yourself: "I am going to write complete nonsense for 15 minutes." Once the words exist on paper, editing is 100x easier than generating from a blank void.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
        hugs: 42
      }
    ]
  },
  {
    id: 'post_6',
    authorId: 'anon_2',
    isAnonymous: true,
    authorName: 'Gentle Starlight',
    authorHandle: 'anonymous',
    authorAvatar: '🌟',
    authorAvatarBg: '#fef9c3',
    circleId: 'circle_late_night',
    circleName: 'Late Night Thoughts',
    title: '3:15 AM: Wishing my brain had an "off" switch for overthinking past conversations',
    content: `Why does the brain decide that 3 AM is the premier time to re-analyze an awkward thing you said to a cashier in 2021, or how someone's tone changed in a meeting 3 weeks ago?\n\nIf you are awake right now looking at your ceiling, drop a note below so we know we aren't alone in the quiet hours. May our busy minds find rest soon.`,
    mood: 'Overthinking',
    moodEmoji: '💭',
    supportType: 'Looking for Similar Experiences',
    supportBadgeColor: 'indigo',
    contentWarning: '',
    tags: ['insomnia', 'overthinking', 'late-night', 'racing-thoughts'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    reactions: {
      hug: 93,
      hearYou: 88,
      hope: 34,
      strong: 28,
      relate: 110
    },
    userReactions: {},
    comments: [
      {
        id: 'comm_6_1',
        authorId: 'user_maya',
        isAnonymous: false,
        authorName: 'Maya Patel',
        authorAvatar: '🌸',
        authorAvatarBg: '#fce7f3',
        content: 'Here with you from under my duvet! Drinking warm oat milk and doing 4-7-8 breathing. Hope you drift off to sweet dreams soon.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString(),
        hugs: 16
      }
    ]
  }
];

const dailyAffirmations = [
  {
    quote: "You don't have to carry the entire weight of tomorrow today. Just breathe through right now.",
    author: "Gentle Reminder",
    mood: "Calm"
  },
  {
    quote: "Your worth is not defined by how productive you were today.",
    author: "Heart2Heart Care",
    mood: "Peace"
  },
  {
    quote: "It is okay to be a work in progress and a masterpiece at the same time.",
    author: "Self Compassion",
    mood: "Growth"
  },
  {
    quote: "Feelings are like clouds passing in the sky; you are the vast, enduring sky.",
    author: "Mindfulness Note",
    mood: "Grounded"
  },
  {
    quote: "You have survived 100% of your hardest days so far. You are stronger than you think.",
    author: "Daily Encouragement",
    mood: "Strength"
  },
  {
    quote: "Allow yourself to rest before you are completely depleted.",
    author: "Gentle Boundary",
    mood: "Rest"
  }
];

const moodLogs = [
  {
    id: 'mood_1',
    userId: 'user_maya',
    moodValue: 3,
    moodLabel: 'A Bit Tired',
    moodEmoji: '🥱',
    note: 'Long week of lectures, looking forward to resting.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: 'mood_2',
    userId: 'user_maya',
    moodValue: 2,
    moodLabel: 'Anxious & Overwhelmed',
    moodEmoji: '🌧️',
    note: 'Panic attack after study session, resting now.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
  },
  {
    id: 'mood_3',
    userId: 'user_maya',
    moodValue: 4,
    moodLabel: 'Grateful & Calmer',
    moodEmoji: '✨',
    note: 'Read kind comments on Heart2Heart. Feeling seen.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
  }
];

const crisisResources = {
  helplines: [
    {
      country: 'United States & Canada',
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      actionUrl: 'tel:988',
      textSupport: 'Text HOME to 741741 (Crisis Text Line)',
      hours: '24/7, Free & Confidential',
      description: 'Immediate support for anyone experiencing mental health distress, suicidal thoughts, or emotional pain.'
    },
    {
      country: 'United Kingdom',
      name: 'Samaritans',
      number: '116 123',
      actionUrl: 'tel:116123',
      textSupport: 'Text SHOUT to 85258',
      hours: '24 hours a day, 365 days a year',
      description: 'Compassionate, non-judgmental listening support for whatever you are going through.'
    },
    {
      country: 'Australia',
      name: 'Lifeline Australia',
      number: '13 11 14',
      actionUrl: 'tel:131114',
      textSupport: 'Text 0477 13 11 14',
      hours: '24/7 Crisis Support',
      description: 'Support service providing all Australians experiencing emotional distress with access to 24-hour crisis services.'
    },
    {
      country: 'International & LGBTQ+ Youth',
      name: 'The Trevor Project',
      number: '1-866-488-7386',
      actionUrl: 'tel:18664887386',
      textSupport: 'Text START to 678-678',
      hours: '24/7 LGBTQ+ Suicide Prevention & Crisis Support',
      description: 'Crisis intervention and suicide prevention for lesbian, gay, bisexual, transgender, queer, and questioning young people.'
    },
    {
      country: 'International Directory',
      name: 'Befrienders Worldwide / Find A Helpline',
      number: 'findahelpline.com',
      actionUrl: 'https://findahelpline.com/',
      textSupport: 'Free, confidential support across 130+ countries',
      hours: 'Global Directory',
      description: 'Find verified, free, local crisis hotlines in your country and native language.'
    }
  ],
  groundingTechniques: [
    {
      title: '5-4-3-2-1 Sensory Grounding',
      icon: '🖐️',
      summary: 'Re-anchors your nervous system to the present reality during anxiety spikes.',
      steps: [
        'Acknowledge 5 things you can SEE around you (e.g. a shadow, a pen, your shoes).',
        'Acknowledge 4 things you can TOUCH / FEEL (e.g. fabric of your shirt, cold desk).',
        'Acknowledge 3 things you can HEAR (e.g. distant traffic, clock ticking, wind).',
        'Acknowledge 2 things you can SMELL (e.g. coffee, fresh air, clean soap).',
        'Acknowledge 1 thing you can TASTE (or take a gentle sip of cool water).'
      ]
    },
    {
      title: 'Box Breathing (4-4-4-4)',
      icon: '📦',
      summary: 'Used by first responders to immediately calm the sympathetic nervous system.',
      steps: [
        'Inhale slowly through your nose for 4 seconds.',
        'Hold that breath gently at the top for 4 seconds.',
        'Exhale smoothly through your mouth for 4 seconds.',
        'Hold empty at the bottom for 4 seconds. Repeat 4 times.'
      ]
    },
    {
      title: 'The Cold Water Shock (TIPP Skill)',
      icon: '🧊',
      summary: 'Triggers the mammalian dive reflex to drop heart rate during panic attacks.',
      steps: [
        'Fill a bowl with cold water or hold an ice cube in the palm of your hand.',
        'Lean forward and hold the cold compress against your cheeks and temples for 15-30 seconds.',
        'Take slow, deep breaths. Notice the physical sensation breaking the mental panic loop.'
      ]
    }
  ]
};

module.exports = {
  users,
  circles,
  posts,
  dailyAffirmations,
  moodLogs,
  crisisResources
};
