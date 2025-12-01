# plain-cal-demo

Demo site for [plain-calendar](https://github.com/alosec/plain-calendar) - headless React calendar components.

![plain-calendar demo](public/demo-screenshot.png)

**[Live Demo →](https://plain-cal-demo.pages.dev)**

## Features

- **Day View** - Timeline with hourly grid
- **Week View** - 7-day layout with event overlap handling
- **Month View** - Calendar grid with event dots
- **Navigation** - Previous/Next/Today controls
- **Event Interaction** - Click events to see selection feedback

## Tech Stack

- [Vite](https://vitejs.dev/) + React 18
- [plain-calendar](https://github.com/alosec/plain-calendar) (local workspace link)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

## Deployment

This demo uses manual Cloudflare Pages deployment (not git-linked):

```bash
npm run build
wrangler pages deploy dist/ --project-name=plain-cal-demo
```

## Project Structure

```
plain-cal-demo/
├── src/
│   ├── App.tsx          # Main app with view switching
│   ├── mockEvents.ts    # Realistic schedule data
│   ├── index.css        # Minimal styling
│   └── main.tsx         # Entry point
├── public/
│   └── calendar.svg     # Favicon
├── vite.config.ts       # Vite config with path aliases
└── package.json
```

## Related

- [plain-calendar](https://github.com/alosec/plain-calendar) - The headless calendar library
- [PediCalendar](https://pedicab512.com) - Production app this was extracted from

## License

MIT
