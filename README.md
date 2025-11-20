## Suitcase e-shop: Multi-page online store.

 This project is a simple web application built with JavaScript and styled with Sass. It demonstrates how to structure a modern frontend workflow.

## Features

- Multi-page layout (Home, Catalog, Product Details, Cart, Contact)
- Responsive design (layouts support both portrait and landscape orientations)
- Modular SCSS structure with `@use` and partials
- Live reload development server
- JS and SCSS linters with autofix
- Clean project structure: `src/`, `sass/`, `dist/`
- Automatic CSS compilation on file changes

## Installation & Setup

1. Clone the repository. You need to write next comand in bash:
   ```bash
   `git clone https://autocode.git.epam.com/k3300189ctv/fundamentals-project-template.`
   `cd project-template-ua`

2. Install dependencies
   Make sure you have Node.js and npm installed. Then run:
   `npm install`

3. Compile SASS manually
   You can use `node-sass` or `sass` to complite `.scss` to `.css.` Example:
   
   `npx sass src/sass/style.scss dist/style.css`

4. Run SCSS linter
   `npm run lint:scss`

5. Run JavaScript linter
  `npm run lint:js`

6. Automatically fix lint errors (if possible)
   `npm run lint:fix`

4. Run the project locally
   `npm run dev`

8. Build for prodaction
   `npm run build`   

## Project Structure

project/
│
|               
├── src/                # HTML, JS, images, static assets
│   ├── index.html
│   ├── js/
│   ├── assets/
|   ├── scss/           # All SCSS partials + main.scss
|   ├── html/
|   └──  dist/main.css      # Compiled CSS output
|  
│
└── package.json

## Requirements: 
1. Node.js(v 14+ recomened)
2. npm
3. Sass (installed via npm or globally)

## Development Workflow

1. Run:
    `npm run dev`

2. Modify HTML/JS files in src/

3. Modify SCSS files in sass/

4. CSS compiles automatically into dist/main.css

5. Live server reloads the browser instantly

## Additional Commands

1. Format / check code quality:

   npm run lint — run all linters
   npm run lint:fix — fix JS/SCSS formatting issues

2. CSS Rebuild:

   npm run sass — one-time compilation
   npm run sass:watch — watch mode (used in dev)

## Deployment

    Since index.html is located in src/, make sure your hosting platform is configured to use that folder as root.
    For GitHub Pages, you must move index.html to the project root or use a custom build step.   

## Notes

1. All SCSS files (except main.scss) start with _ and are imported using @use

2. SCSS → CSS output always goes to dist/main.css

3. No CSS should ever be created inside sass/ or src/

# Project Implementation checklist  63,5 from 64
