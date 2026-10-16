# MatchDay

A frontend-only football fixture dashboard built with Angular, TypeScript,
and CSS. Created as a practical learning project covering components,
routing, reactive forms, signals, RxJS, and browser persistence.

Match data is fictional. Scores are sample values, not live updates.

## Features

- Browse football fixtures and view match details.
- Search by home or away team.
- Filter favourite matches.
- View total, live, and favourite match counts.
- Create fixtures using a validated reactive form.
- Preserve fixtures and favourites after refreshing the browser.
- Responsive dark interface with keyboard focus styles.
- Dedicated page for unknown routes.

## Requirements

- Node.js 24 LTS
- npm
- Git and access to this repository

A globally installed Angular CLI is not required to run the npm scripts.

## Getting started

Clone the repository:

```bash
git clone git@github.com:stoyan1103/matchday-angular-demo.git
cd matchday-angular-demo
```

If you use multiple GitHub SSH profiles, replace `github.com` in the clone
URL with your personal SSH host alias when necessary.

Install the locked dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm start
```

Open http://localhost:4200 in your browser.

## Using the application

1. Browse fixtures on the Match Centre dashboard.
2. Search for a team or enable the favourites filter.
3. Toggle favourites from a card or the match details page.
4. Select **Create fixture** to add a match.
5. Enter different home and away teams, select a competition, and choose
   a kickoff date and time.
6. Submit the form to open the new fixture's details.

Search and favourites filters work together. Summary counts describe
the complete collection, regardless of the active filters.

Kickoff is entered in your local time and stored as an ISO timestamp.

## Routes

| Route | Purpose |
| --- | --- |
| `/matches` | Dashboard |
| `/matches/new` | Create a fixture |
| `/matches/:id` | Match details |
| `/errors/not-found` | Page not found |

The root URL redirects to `/matches`. Unknown URLs redirect to the
not-found page. A missing match ID displays a message in the details page.

## Architecture

- Standalone components with OnPush change detection.
- Feature routes loaded using `loadChildren`.
- Pages loaded using `loadComponent`.
- Signals for shared state and computed values for derived data.
- Component inputs and outputs for match cards.
- Reactive forms with field and cross-field validation.
- RxJS search processing with `debounceTime`, `distinctUntilChanged`,
  and `toSignal`.
- Custom score formatting pipe.
- Separate services for match state and browser storage.
- An effect that saves match state when it changes.

## Project structure

```text
src/app/
  app.routes.ts
  core/
    services/
      local-storage.service.ts
  matches/
    matches.routes.ts
    components/
      match-card/
    pages/
      dashboard/
      match-details/
      match-form/
    models/
    services/
    validators/
    data/
  errors/
    errors.routes.ts
    pages/
      not-found/
  pipes/
```

## Persistence

Matches are stored in localStorage under:

```text
matchday.matches.v1
```

On startup, the application validates the saved data, including checking
for duplicate IDs. If the data is missing or invalid, it loads the mock
fixtures.

Storage is specific to the browser and origin. It is not shared between
devices, and there is no backend or account system.

To restore the initial mock fixtures:

1. Open browser DevTools.
2. Find Local Storage for the application's origin.
3. Delete `matchday.matches.v1`.
4. Refresh the page.

Once valid saved data exists, changes to the mock-data file will not
replace it automatically.

## Production build

```bash
npm run build
```

Build output is generated in `dist/`.

When deploying, configure the web host to serve `index.html` for application
routes so that opening or refreshing a nested route works.

## Manual verification

- Search matches by either team.
- Combine search with the favourites filter.
- Toggle favourites and verify that dashboard and details stay consistent.
- Check required fields, whitespace-only names, and identical team names.
- Verify form reset and cancellation.
- Create a fixture and refresh its details page.
- Confirm favourites survive a refresh.
- Check unknown routes and missing match IDs.
- Check mobile layout and keyboard navigation.

Automated tests are not included in this learning demo.