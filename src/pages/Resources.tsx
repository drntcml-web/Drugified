import { Phone, ExternalLink, BookOpen, Heart } from 'lucide-react'

const hotlines = [
  {
    name: 'VNN — Verslavingszorg Noord Nederland',
    number: '050 - 522 17 00',
    desc: 'Main addiction care centre in Groningen. Free intake, counselling & detox support.',
    available: 'Mon–Fri 8:30–17:00',
    address: 'Hereweg 80, Groningen',
  },
  {
    name: 'VNN Crisis / 24hr Line',
    number: '0800 - 022 44 88',
    desc: 'Round-the-clock crisis support from VNN. Free to call.',
    available: '24/7',
    address: null,
  },
  {
    name: 'GGD Groningen — Mental Health Crisis',
    number: '0900 - 144',
    desc: 'Regional health authority — mental health and substance crisis line.',
    available: '24/7',
    address: null,
  },
  {
    name: 'Leger des Heils Groningen',
    number: '050 - 313 11 55',
    desc: 'Salvation Army Groningen — shelter, social work and addiction support.',
    available: 'Office hours',
    address: 'Steentilstraat 8, Groningen',
  },
  {
    name: 'Jellinek Landelijke Lijn',
    number: '088 - 505 12 20',
    desc: 'National addiction helpline. Advice and referral to local care.',
    available: 'Mon–Fri 9:00–17:00',
    address: null,
  },
]

const articles = [
  {
    title: 'What is addiction? How drugs affect the brain',
    category: 'Education',
    readTime: '6 min',
    url: 'https://www.druginfo.nl/drugs-en-verslaving/wat-is-verslaving',
  },
  {
    title: 'Early signs of drug dependency — a guide',
    category: 'Awareness',
    readTime: '5 min',
    url: 'https://www.jellinek.nl/informatie-over-alcohol-drugs/drugs/',
  },
  {
    title: "How to talk to someone you're worried about",
    category: 'Support',
    readTime: '4 min',
    url: 'https://www.trimbos.nl/kennis/verslaving/',
  },
  {
    title: 'MDMA, cocaine, cannabis: what the research says',
    category: 'Drug Info',
    readTime: '8 min',
    url: 'https://www.druginfo.nl',
  },
  {
    title: 'Naloxone: the overdose reversal medication',
    category: 'Safety',
    readTime: '3 min',
    url: 'https://www.vnn.nl/behandeling',
  },
  {
    title: 'Recovery stories: real people, real journeys',
    category: 'Community',
    readTime: '7 min',
    url: 'https://www.jellinek.nl/herstel/',
  },
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
        <p className="text-sm text-muted-foreground">Help is always available — especially in Groningen.</p>
      </div>

      {/* Hotlines */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Phone size={16} className="text-primary" />
          <h3 className="font-semibold">Groningen Help & Crisis Lines</h3>
        </div>
        <div className="flex flex-col gap-3">
          {hotlines.map(h => (
            <div key={h.name} className="bg-card border rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm">{h.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{h.desc}</p>
                  {h.address && <p className="text-xs text-muted-foreground">{h.address}</p>}
                  <p className="text-sm font-bold text-primary mt-2">{h.number}</p>
                </div>
                <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20 shrink-0 whitespace-nowrap">
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
          <h3 className="font-semibold">Articles & Information</h3>
        </div>
        <div className="flex flex-col gap-2">
          {articles.map(a => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border rounded-xl p-4 flex items-center justify-between group hover:border-primary/40 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.category} · {a.readTime} read</p>
              </div>
              <ExternalLink size={14} className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors ml-2" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
