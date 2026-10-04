import { http, HttpResponse } from 'msw';
import { LevelsCompleted } from '../../src/types/LevelsCompleted'
import { LevelsDurations } from '../../src/types/LevelsDuration';
import { GameOver } from '../../src/types/GameOver';
export const handlers = [

    http.get("https:localhost:3000/data-viz/levels-completed", () => {
        return HttpResponse.json<LevelsCompleted>([
            { level: 1, users: 100 },
            { level: 2, users: 35 },
            { level: 3, users: 10 }
        ])
    }),
    http.get("https:localhost:3000/data-viz/levels-duration", () => {
        return HttpResponse.json<LevelsDurations>([
            { level: 1, best: 10, worst: 100 },
            { level: 2, best: 15, worst: 35 },
            { level: 3, best: 12, worst: 40 }
        ])
    }),
    http.get("https:localhost:3000/data-viz/game-ended", () => {
        return HttpResponse.json<GameOver[]>([
            { category: 'complete', share: 100 },
            { category: 'fail', share: 35 },
            { category: 'quit', share: 10 }
        ])
    })
]