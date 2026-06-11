export type Post = {
  id: string
  author: string
  avatar: string
  daysClean: number
  content: string
  likes: number
  comments: number
  timestamp: string
  liked: boolean
}

export type Alert = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  trigger: string
  note: string
  timestamp: string
  resolved: boolean
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'Jordan K.',
    avatar: 'JK',
    daysClean: 120,
    content: '120 days today. Never thought I would make it this far. To everyone just starting — it gets better. The first two weeks are the hardest. You can do this.',
    likes: 34,
    comments: 8,
    timestamp: '2h ago',
    liked: false,
  },
  {
    id: '2',
    author: 'Sam W.',
    avatar: 'SW',
    daysClean: 14,
    content: 'Had a really tough night. Almost gave in. But I called my sponsor and got through it. Grateful for this community and everyone who checks in on me.',
    likes: 18,
    comments: 12,
    timestamp: '4h ago',
    liked: false,
  },
  {
    id: '3',
    author: 'Maya L.',
    avatar: 'ML',
    daysClean: 60,
    content: '60 days clean! Celebrating with a run in the park. Exercise has been my anchor. If you\'re looking for a healthy outlet, try moving your body — even just a 10-min walk.',
    likes: 27,
    comments: 5,
    timestamp: '6h ago',
    liked: false,
  },
  {
    id: '4',
    author: 'Chris B.',
    avatar: 'CB',
    daysClean: 3,
    content: 'Day 3. The cravings hit hard this morning. I made a cup of tea and read some posts here. This community is what I needed. Thank you all.',
    likes: 41,
    comments: 19,
    timestamp: '8h ago',
    liked: false,
  },
  {
    id: '5',
    author: 'Priya N.',
    avatar: 'PN',
    daysClean: 200,
    content: '200 days. I got promoted at work today. Sobriety gave me my life back. I genuinely cannot believe how different everything looks from the other side.',
    likes: 89,
    comments: 22,
    timestamp: '1d ago',
    liked: true,
  },
]

export const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    title: 'Strong craving',
    severity: 'high',
    trigger: 'Social pressure',
    note: 'Friends were drinking at the party. Left early.',
    timestamp: '2 hours ago',
    resolved: false,
  },
  {
    id: '2',
    title: 'Mild urge',
    severity: 'low',
    trigger: 'Stress at work',
    note: 'Deadline pressure. Went for a walk instead.',
    timestamp: 'Yesterday',
    resolved: true,
  },
  {
    id: '3',
    title: 'Moderate craving',
    severity: 'medium',
    trigger: 'Loneliness',
    note: 'Late night, alone. Called a friend.',
    timestamp: '3 days ago',
    resolved: true,
  },
]
