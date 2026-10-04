import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LevelsCompletedChart } from './charts/LevelCompleted'
import { LevelDurationChart } from './charts/LevelDuration';
import { GameOverChart } from './charts/GameOver';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
function App() {
  const queryClient = new QueryClient();
  return (
    <section className='main dark'>
      <QueryClientProvider client={queryClient}>
        <Card>
          <CardHeader>Levels completed by users</CardHeader>
          <CardContent>
            <LevelsCompletedChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Time taken for users to complete level</CardHeader>
          <CardContent>
            <LevelDurationChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Reason for game play ending</CardHeader>
          <CardContent>
            <GameOverChart />
          </CardContent>
        </Card>
      </QueryClientProvider>
    </section>
  )
}

export default App
