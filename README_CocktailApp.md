
# Cocktail DB Web Application

This is a web **Node.js** application built with **Express** that serves allows users to discover, search, and view cocktail recipes. It integrates with TheCocktailDB API to fetch cocktail data and includes features like viewing random cocktails, searching for cocktails by name, ingredient, letter and type. The app also allows users to add cocktails to their favorites.

## Features
**Random Cocktail**: Discover a random cocktail each time you visit the home page.
**Search Cocktails**: Search for cocktails based on different filters such as name, ingredient, type, letter.
**Cocktail Details**: View detailed information for a specific cocktail, including instructions and ingredients.
**Favorites**: Add, update, and remove cocktails from your favorites list.
Pagination: View paginated search results for easier navigation.

## Technologies
- Node.js and Express.js for server management.
- API: TheCocktailDB API
- EJS as template engine.
- Axios: For making HTTP requests to the Cocktail DB API.
- Express-Layouts: For organizing layouts in EJS views.
- dotenv: to manage environment variables securely.
- Frontend: HTML, CSS (Bootstrap), JavaScript
- Session Management: Express-session
- Body-Parser: Middleware to parse incoming request bodies.
- Pagination: Custom pagination utility


## Installation

**Clone the repository**: 

- git clone <repository-url>

- cd <repository-folder>

**Create an .env file in the root of the project and include the following environment variables:**:

- SESSION_SECRET=your_secret

**Install Dependencies**:
- Node.js and npm install

**Open your browser and navigate to http://localhost:3000 in order to view the app.**

## Javascript Functionality
- The DOMContentLoaded script adds interactivity to fetch and display a random cocktail when a button is clicked.

- The pagination function facilitates dividing a list of items into pages for display purposes. Accepts a list of items, the current page and the number of items per page. Returns an object containing the pagination data and the sliced list of items for display.

## File Organization

**app.js**: Main file for starting the Express server.

**views/**: Contains the EJS templates.

**public/**: Contains static files (CSS, images).

**partials/**: Contains base layout, footer and header file.ejs.

**utils/**: Contains **pagination.js** an utility function handles pagination for lists of items. It takes in the list of items, the current page number, and the number of items to display per page, and returns an object containing paginated data and navigation details.

**routes/** Contains **api.js** file that provided defines routes related to GET, POST, PUT and DELETE Request.

**index.ejs**: Contains the Random Cocktail Feature that allows users to discover a randomly selected cocktail from the API. IT includes a button that, when clicked, displays a random cocktail with its name, image, and preparation instructions.

**cocktails.ejs**: The Cocktail List Section displays and paginated list of cocktails. It contains a Dynamic Cocktail Cards. Each card shows: Cocktail image, name and a link to view details.

**cocktail-details.ejs**: The Cocktail Details Section provides information about a selected cocktail, including name, image, preparation instructions, alcohol type, and category. Click the "Vedi Dettagli" button on any cocktail card to view its detailed page.

**glasses.ejs**: This section allows users to filter cocktails by the type of glass they are served in. Glass types are rendered dynamically from the glasses array.

**ingredients.ejs**: This section enables users to search for cocktails that use a specific ingredient. Ingredients are displayed dynamically from the ingredients array. Clicking an ingredient displays all cocktails that include it.

**searchResults.ejs**: This section shows the results of a search query, including pagination for navigating through multiple pages of results.


## Routes
- **GET /**: Home page, fetches a random cocktail from the Cocktail DB API and displays it.
- **/about**: Displays the About page.
- **/contact**: Displays the Contact page.
- **/terms**: Displays the Terms & Conditions page.
- **GET /cocktails/random**: Fetches a random cocktail and returns its details in JSON format.
- **GET /cocktails/id/:id**: Fetches and displays the details of a cocktail based on its ID.
- **GET /cocktails/search**: Search for cocktails based on parameters (name, letter, ingredient, type). 
- **GET /cocktails/glasses**: Displays a list of all available glasses for cocktails.
- **GET /cocktails/glasses/:glass**: Displays cocktails that can be served in a specific type of glass.
- **GET /cocktails/ingredients**: Displays a list of available ingredients.
- **GET /cocktails/ingredients/:ingredient**: Displays cocktails containing a specific ingredient.
- **POST/PUT/DELETE /cocktails/favorites**: Allows users to add, update, or delete cocktails from their favorites list. Session management is used for storing favorites. All the POST, PUT, and DELETE actions here are just simulations on the client-side or within your application logic, as CocktailDB doesn't support these methods for actual data manipulation.

## Database

- This project does not use a database. Instead, it interacts directly with the CocktailDB API to fetch and display cocktail-related data.




























## 🛠 Skills
Node.js, Express.js, EJS, Bootstrap for styling, dotenv (for environment variable management), Axios for HTTP requests, The COCKTAILDB API



## 🚀 About Me
I'm a junior developer!

