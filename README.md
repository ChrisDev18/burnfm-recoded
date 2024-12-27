# BurnFM - _recoded_
<img width="1184" alt="Screenshot 2024-01-22 at 06 11 24" src="https://github.com/ChrisDev18/burnfm-recoded/assets/95181085/8c24c2b7-5f00-4682-8528-1871792acbbc">

## Project structure

All source code for the frontend can be found within `src`. Backend config files and php files can be found in `server`.

### App Routing

This project uses the new App Router architecture from Next.js. 
Below is some information about how this project is organised using this router.

- Each folder containing a `page.tsx` file represents a page on the website.
- For example:
[`app/page.tsx`](src/app/page.tsx) defines [burnfm.com](https://www.burnfm.com), and [`app/about/page.tsx`](src/app/about/page.tsx) defines [burnfm.com/about](https://www.burnfm.com/about).


- `layout.tsx` files define shared UI which can be inherited by children pages 
  a similar concept to templates).
- For example: [`app/layout.tsx`](src/app/layout.tsx) defines the overall layout of the app (navbar at top, content below).

_See [Next.js - App Routing](https://nextjs.org/docs/app/building-your-application/routing) for information about 
 this concept and its application._


### Further files

Outside of these two special files, there are more places where code is organised:

- [`app/components/`](src/app/components) contains React components which can be used elsewhere.
  (e.g. [RadioPlayer](src/app/components/RadioPlayer))

- [`app/styles/`](src/app/styles) contains stylesheets which can be used within components. 
  (e.g. [buttons.module.css](src/app/styles/buttons.module.css))

- [`app/lib/`](src/lib) contains functions which can be called within code elsewhere.
  (e.g. [api.ts](src/lib/api.ts))

- [`app/contexts/`](src/lib) contains React contexts which can be used to share data with children components easily.
  (e.g. [AudioContext.tsx](src/contexts/AudioContext.tsx))



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

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the website running locally.

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

