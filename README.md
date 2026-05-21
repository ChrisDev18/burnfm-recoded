# Burn FM - _recoded_

#### Burn FM's website: [burnfm.com](https://burnfm.com), recoded with Next.js since 2024

<br>

<img width="1348" alt="Burn FM Screenshot" src="https://github.com/user-attachments/assets/4b7b1ec9-4195-48d2-b716-8efc0ba2881d" />

## Getting started

### Prerequisites

You'll need [node.js](https://nodejs.org/en/download) installed on your computer for this to run.


### 1. Install required node modules

All node.js projects have a package.json file which indicates what node libraries are required in the project.
First, you will need to download these via:

```bash 
npm install
```


### 2. Run development server

Then, run the development server with:

```bash 
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### 3. Editing and see changes in real-time with Fast Refresh

You can start editing any page by modifying its respective page.tsx file.
The page will auto-update as you edit the file.

> [!NOTE]
> The website's styling is being transitioned to TailwindCSS; prefer this over plain CSS.


## Deployment on Vercel

This repository is linked to Vercel which will automatically build a deployment each time someone pushes to a branch.

> [!IMPORTANT]
> Pushes to the main branch trigger a production build.

You can test on your computer whether your code will build before pushing to GitHub by running the following:

```bash
next build
```

This will create a `out` file within the project root.

_See [Next.js - Deploying](https://nextjs.org/docs/app/building-your-application/deploying) for more information._


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

- [`app/components/`](src/components) contains React components which can be used elsewhere.
  (e.g. [RadioPlayer](src/components/RadioPlayer))

- [`app/styles/`](src/app/styles) contains stylesheets which can be used within components.
  (e.g. [buttons.module.css](src/app/styles/buttons.module.css))

- [`app/lib/`](src/lib) contains functions which can be called within code elsewhere.
  (e.g. [api.ts](src/lib/api.ts))

- [`app/contexts/`](src/lib) contains React contexts which can be used to share data with children components easily.
  (e.g. [AudioContext.tsx](src/contexts/AudioContext.tsx))


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

