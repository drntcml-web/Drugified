import { AlertTriangle, Instagram, Twitter, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/cn'

type FlaggedContent = {
  id: string
  platform: 'instagram' | 'tiktok' | 'twitter'
  type: 'post' | 'reel' | 'tweet'
  preview: string
  flaggedTerms: string[]
  detectedAt: string
  url?: string
  riskLevel: 'low' | 'medium' | 'high'
}

const FLAGGED: FlaggedContent[] = [
  {
    id: '1',
    platform: 'tiktok',
    type: 'reel',
    preview: 'A video appeared on your FYP showing a group of people at a party with visible drug use in the background. The caption used several slang terms associated with stimulant use.',
    flaggedTerms: ['party favors', 'molly', 'roll'],
    detectedAt: '2 hours ago',
    riskLevel: 'high',
  },
  {
    id: '2',
    platform: 'instagram',
    type: 'post',
    preview: 'An Instagram Explore post from an account promoting a "chill vibe" with images of pills and the caption mentioning "420 every day" with a large following.',
    flaggedTerms: ['420', 'chill pills', 'blaze'],
    detectedAt: '5 hours ago',
    riskLevel: 'medium',
  },
  {
    id: '3',
    platform: 'tiktok',
    type: 'reel',
    preview: 'A TikTok trend showing people pretending to "wake up after a bender" — glamorizing heavy substance use as humorous content. Appeared 3 times in your FYP.',
    flaggedTerms: ['bender', 'blacked out', 'wasted'],
    detectedAt: 'Yesterday',
    riskLevel: 'medium',
  },
  {
    id: '4',
    platform: 'twitter',
    type: 'tweet',
    preview: 'A promoted tweet from an account in your area advertising an "afterparty" with emojis commonly used to signal drug sales.',
    flaggedTerms: ['❄️', '🍃', 'afterparty'],
    detectedAt: '2 days ago',
    riskLevel: 'high',
  },
  {
    id: '5',
    platform: 'instagram',
    type: 'post',
    preview: 'A story re-shared by someone you follow showing what appears to be recreational drug use framed as "self-care" with over 10k likes.',
    flaggedTerms: ['self-medicate', 'stress relief', 'vibe'],
    detectedAt: '3 days ago',
    riskLevel: 'low',
  },
]

const platformIcon = (p: FlaggedContent['platform']) => {
  if (p === 'instagram') return <Instagram size={14} />
  if (p === 'twitter') return <Twitter size={14} />
  return <span className="text-[11px] font-bold">TK</span>
}

const platformLabel = (p: FlaggedContent['platform']) => {
  if (p === 'tiktok') return 'TikTok'
  if (p === 'instagram') return 'Instagram'
  return 'X / Twitter'
}

const riskConfig = {
  low: 'text-accent bg-accent/10 border-accent/20',
  medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  high: 'text-destructive bg-destructive/10 border-destructive/20',
}

export default function SocialHistory() {
  return (
    <div className="px-4 py-5 flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold">Social Media History</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Drug-related content detected on your feeds. Knowing your triggers is the first step.
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-primary/8 border border-primary/20 rounded-xl p-3 flex gap-2">
        <AlertTriangle size={16} className="text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80">
          This feed shows content from your social media that may be a trigger. Reviewing it helps you understand what you're exposed to and build awareness.
        </p>
      </div>

      {/* Flagged items */}
      <div className="flex flex-col gap-3">
        {FLAGGED.map(item => (
          <div key={item.id} className="bg-card border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  {platformIcon(item.platform)}
                </div>
                <div>
                  <p className="text-xs font-semibold">{platformLabel(item.platform)}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{item.type} · {item.detectedAt}</p>
                </div>
              </div>
              <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize', riskConfig[item.riskLevel])}>
                {item.riskLevel} risk
              </span>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">{item.preview}</p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.flaggedTerms.map(term => (
                <span key={term} className="text-[10px] bg-destructive/8 text-destructive border border-destructive/15 px-2 py-0.5 rounded-full">
                  {term}
                </span>
              ))}
            </div>

            <button className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 hover:text-primary transition-colors">
              <ExternalLink size={12} />
              Review original content
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground pb-2">
        Consider adjusting your social media algorithm by not engaging with flagged content.
      </p>
    </div>
  )
}
