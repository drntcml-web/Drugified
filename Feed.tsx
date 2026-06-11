import { useState } from 'react'
import { Heart, MessageCircle, Send } from 'lucide-react'
import { MOCK_POSTS, type Post } from '@/lib/mockData'
import { useAuth } from '@/lib/AuthContext'
import { toast } from '@/components/ui/toaster'
import { cn } from '@/lib/cn'

export default function Feed() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS)
  const [newPost, setNewPost] = useState('')

  const handlePost = () => {
    if (!newPost.trim()) return
    const p: Post = {
      id: Date.now().toString(),
      author: user?.name ?? 'You',
      avatar: user?.avatar ?? 'ME',
      daysClean: user?.daysClean ?? 0,
      content: newPost.trim(),
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      liked: false,
    }
    setPosts([p, ...posts])
    setNewPost('')
    toast('Post shared with the community!')
  }

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  return (
    <div className="flex flex-col">
      {/* Compose */}
      <div className="px-4 py-3 border-b bg-card">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
            {user?.avatar}
          </div>
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Share how you're feeling, a milestone, or encouragement..."
            rows={2}
            className="flex-1 text-sm bg-transparent resize-none focus:outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={handlePost}
            disabled={!newPost.trim()}
            className="shrink-0 p-2 bg-primary text-primary-foreground rounded-full disabled:opacity-40 transition-opacity"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-col divide-y">
        {posts.map(post => (
          <article key={post.id} className="px-4 py-4">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{post.author}</span>
                  <span className="text-[10px] text-accent font-medium bg-accent/10 px-1.5 py-0.5 rounded-full">
                    {post.daysClean}d clean
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">{post.timestamp}</span>
                </div>
                <p className="text-sm mt-1.5 leading-relaxed">{post.content}</p>
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={cn('flex items-center gap-1.5 text-xs transition-colors', post.liked ? 'text-destructive' : 'text-muted-foreground')}
                  >
                    <Heart size={14} fill={post.liked ? 'currentColor' : 'none'} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MessageCircle size={14} />
                    {post.comments}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
