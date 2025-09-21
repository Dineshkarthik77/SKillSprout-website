import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';
import { mockFeedPosts } from '@/lib/mock-data';
import { PostCard } from '@/components/feed/post-card';

export default function FeedPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Newspaper className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-headline text-2xl">Community Feed</CardTitle>
                  <CardDescription>
                    See what others are learning and sharing.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {mockFeedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
