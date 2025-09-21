import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const leaderboardData = [
  { rank: 1, name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=1', contribution: '45%', streak: 12 },
  { rank: 2, name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=2', contribution: '35%', streak: 10 },
  { rank: 3, name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=3', contribution: '20%', streak: 8 },
  { rank: 4, name: 'Jen', avatar: 'https://i.pravatar.cc/150?img=4', contribution: '18%', streak: 7 },
  { rank: 5, name: 'Chris', avatar: 'https://i.pravatar.cc/150?img=5', contribution: '15%', streak: 5 },
];

export default function FriendsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Project Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            See who is contributing the most to the Eco-Drone project.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Contribution</TableHead>
                <TableHead className="text-right">Streak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank}>
                  <TableCell className="font-medium text-lg">{user.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.contribution}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={user.rank <= 3 ? "default" : "secondary"}>{user.streak} days</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
