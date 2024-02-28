# BurnFM - _recoded_
<img width="1184" alt="Screenshot 2024-01-22 at 06 11 24" src="https://github.com/ChrisDev18/burnfm-recoded/assets/95181085/8c24c2b7-5f00-4682-8528-1871792acbbc">

## Project structure

All source code can be found within `src/app`. Component-wise, this is the root directory.

- `page.tsx` files define the respective folder's webpage which will be rendered.
- `layout.tsx` files define shared UI which can be inherited by children pages.
- `app/ui/` contains React components which can be used by pages.
- `app/lib/` contains functions which can be used within components/pages.

### App Router

This project uses the new App Router architecture from Next.js.

_See [Next.js - App Routing](https://nextjs.org/docs/app/building-your-application/routing)
for information about this concept and its application._

## Editing the project and viewing changes

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to static HTML/CSS/JS

Once you are happy with your changes, you can run the following command in the terminal (open within the project) to compile everything to static files:

```bash
next build
```

This will create a `out` file within the project root. This can be put onto a web server in order to serve the website.

_See [Next.js - Deploying](https://nextjs.org/docs/app/building-your-application/deploying) for more information._

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

