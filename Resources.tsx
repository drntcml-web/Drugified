import { Phone, ExternalLink, BookOpen, Heart } from 'lucide-react'

const hotlines = [
  { name: 'SAMHSA National Helpline', number: '1-800-662-4357', desc: '24/7 free, confidential treatment referral', available: '24/7' },
  { name: 'Crisis Text Line', number: 'Text HOME to 741741', desc: 'Text-based crisis support', available: '24/7' },
  { name: 'National Suicide Prevention', number: '988', desc: 'Call or text 988 for mental health crisis', available: '24/7' },
]

const articles = [
  { title: 'Understanding Addiction: A Beginner\'s Guide', category: 'Education', readTime: '5 min' },
  { title: 'Coping Strategies That Actually Work', category: 'Recovery', readTime: '7 min' },
  { title: 'Building a Support System', category: 'Community', readTime: '4 min' },
  { title: 'Managing Triggers and Cravings', category: 'Recovery', readTime: '6 min' },
  { title: 'When to Seek Professional Help', category: 'Health', readTime: '3 min' },
]

const tips = [
  'Call someone you trust when a craving hits',
  'Delay the decision by 15 minutes — cravings pass',
  'Change your environment immediately',
  'Use the 5-4-3-2-1 grounding technique',
  'Exercise: even a 5-minute walk helps',
]

export default function Resources() {
  return (
    <div className="px-4 py-5 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">Resources</h2>
        <p className="text-sm text-muted-foreground">Help is always available.</p>
      </div>

      {/* Hotlines */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Phone size={16} className="text-primary" />
          <h3 className="font-semibold">Crisis Hotlines</h3>
        </div>
        <div className="flex flex-col gap-3">
          {hotlines.map(h => (
            <div key={h.name} className="bg-card border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{h.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{h.desc}</p>
                  <p className="text-sm font-bold text-primary mt-2">{h.number}</p>
                </div>
                <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20 shrink-0">
                  {h.available}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick tips */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Heart size={16} className="text-primary" />
          <h3 className="font-semibold">When you feel a craving</h3>
        </div>
        <div className="bg-card border rounded-xl divide-y">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={16} className="text-primary" />
          <h3 className="font-semibold">Articles</h3>
        </div>
        <div className="flex flex-col gap-2">
          {articles.map(a => (
            <button key={a.title} className="bg-card border rounded-xl p-4 text-left flex items-center justify-between group hover:border-primary/30 transition-colors">
              <div>
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.category} · {a.readTime} read</p>
              </div>
              <ExternalLink size={14} className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
