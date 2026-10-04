# React + TypeScript + Vite

## Libraries
  - shadcn/components - ui
  - tailwind - ui
  - tanstack/charts - for displaying data from the firebase
  - tanstack/react-query - for fetching data from server and maintaining cached state in the frontend.
  - msw + vitest - for testing

## Set up and launch
  - `npm install` to setup the project
  - `npm run dev` to start a local instance of React available at `http://localhost:3185`. the port was changed to allow for this frontend to run at the same time as the neon snake game which runs on port `3175`.
  - ensure the project at `https://github.com/kartikadur/improved-doodle` has been downloaded, setup, and is running locally before trying to view the charts in the browser. Otherwise only errors due to failed requests will be shown.

## Next Steps
  - Improve the UI
  - Add more tests for error and edge cases
  - possibly try to setup zod for validation in the frontend as well.
