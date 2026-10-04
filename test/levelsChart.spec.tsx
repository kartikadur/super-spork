import { describe, expect, it } from 'vitest';
import { GameOverChart } from '../src/charts/GameOver';
import { LevelsCompletedChart } from '../src/charts/LevelCompleted';
import { LevelDurationChart } from '../src/charts/LevelDuration';
import { renderWithQuery } from './testUtils';

describe("LevelsCompleted Chart", () => {
    it('should render chart for users that completed levels', async () => {
        const { findByText } = renderWithQuery(<LevelsCompletedChart />)

        const textFound = await findByText("Users")
        expect(textFound).toBeDefined()
    })
    it('should render chart for duration users needed to complete levels', async () => {
        const { findByText } = renderWithQuery(<LevelDurationChart />)

        const textFound = await findByText("Time to complete level")
        expect(textFound).toBeDefined()
    })
    it('should render chart for reasons users stopped playing', async () => {
        const { findByText } = renderWithQuery(<GameOverChart />)

        const textFound = await findByText("Time to complete level")
        expect(textFound).toBeDefined()
    })
})