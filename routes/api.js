import express from "express";
import axios from "axios";
import pagination from "../utils/pagination.js"

const router = express.Router();

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";
const COCKTAILS_PER_PAGE = 6;

// Funzione per ricerca per parametri

const searchCocktail = async (params) => {
    try {
        const { name, letter, ingredient, type} = params;
        let url = `${API_URL}/search.php`;

        if (name) {
            url = `${API_URL}/search.php?s=${name}`;
        } else if (letter) {
            url = `${API_URL}/search.php?f=${letter}`;
        } else if (ingredient) {
            url = `${API_URL}/filter.php?i=${ingredient}`;
        } else if (type) {
            url = `${API_URL}/filter.php?a=${type}`;
        } else {
            console.error('Invalid type. Expected "Alcoholic" or "Non_Alcoholic".');
        }

        console.log("Fetching URL:", url); 

        const response = await axios.get(url);
        console.log(response.data); 

        return Array.isArray(response.data.drinks)  ? response.data.drinks : [];
    } catch (error) {
        console.error("Error fetching data from CocktailDB:", error.message);
        return [];
    }
};

router.get('/cocktails/random', async (req, res) => {
    try {
        const randomCocktail = await axios.get(`${API_URL}/random.php`);
        res.json(randomCocktail.data.drinks[0]); 
    } catch(error) {
        res.status(500).send(error.message);
    }
});

router.get('/cocktails/id/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await axios.get(`${API_URL}/lookup.php?i=${id}`);
        const cocktail = result.data.drinks[0] || [];

        if (!cocktail) {
            return res.status(404).send('Cocktail non trovato');
        }

        res.render("cocktail-details.ejs", { cocktail, searchQuery: "" });
    } catch(error) {
        console.error("Errore nel recupero dei dettagli del cocktail:", error.message);
        res.status(500).send("Errore nel recupero dei dettagli del cocktail");
    }
});

router.get('/cocktails/search/', async (req, res) => {
    const { filter, query } = req.query;
    const page = parseInt(req.query.page) || 1;

    console.log("Search params:", { filter, query});

    try {
        const params = {};
        if (filter && query) {
            params[filter] = query;
        } else {
            console.error("Filtro o query mancante.");
            return res.status(400).send("Filtro o query mancante.");
        }

        const cocktails = await searchCocktail(params);
        const paginatedData = pagination(cocktails, page, COCKTAILS_PER_PAGE);
    
        res.render("searchResults.ejs", { cocktails: paginatedData.items,
            params: req.query,
            pagination: paginatedData 
         });
    } catch(error) {
        res.status(500).send(error.message);
    }
});


router.get('/cocktails/glasses', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 20; 
    try {
        const glassesResponse = await axios.get(`${API_URL}/list.php?g=list`);
        const glasses = glassesResponse.data.drinks || [];

        const paginatedData = pagination(glasses, page, itemsPerPage);

        res.render("glasses.ejs", { glasses: paginatedData.items,
            pagination: paginatedData
         });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/cocktails/glasses/:glass', async (req, res) => {
    const { glass } = req.params;
    const page = parseInt(req.query.page) || 1;
    try {
        const response = await axios.get(`${API_URL}/filter.php?g=${encodeURIComponent(glass)}`);
        const cocktails = response.data.drinks || [];
        const paginatedData = pagination(cocktails, page, COCKTAILS_PER_PAGE)

        res.render("cocktails.ejs", { cocktails: paginatedData.items, title: `Cocktails serviti in ${glass}`,
            searchQuery: "", pagination: paginatedData
         });
    } catch(error) {
        res.status(500).send(error.message);
    }
});

router.get('/cocktails/ingredients', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 20; 
    try {
        const ingredientsResponse = await axios.get(`${API_URL}/list.php?i=list`);
        const ingredients = ingredientsResponse.data.drinks || [];

        const paginatedData = pagination(ingredients, page, itemsPerPage);

        res.render("ingredients.ejs", { ingredients: paginatedData.items,
            pagination: paginatedData
         });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/cocktails/ingredients/:ingredient', async (req, res) => {
    let { ingredient } = req.params;
    const page = parseInt(req.query.page) || 1;

    if (ingredient.includes(' ')) {
        ingredient = ingredient.replace(' ', '_');
    }

    console.log(`Ingredient requested: ${ingredient}`);

    try {
        const response = await axios.get(`${API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
        const cocktails = response.data.drinks || [];
        console.log('Cocktails array:', cocktails);
        console.log('API response:', response.data);

        const paginatedData = pagination(cocktails, page, COCKTAILS_PER_PAGE)
        console.log('Paginated cocktails:', paginatedData.data);

        res.render("cocktails.ejs", {
            cocktails: paginatedData.items,
            searchQuery: "",
            pagination: paginatedData,
            title: `Cocktails con ${ingredient}`,
        });
    } catch (error) {
        console.error("Error fetching cocktails:", error.message);
        res.status(500).send("Errore nel recupero dei cocktail");
    }
});

router.post('/cocktails/favorites', async (req, res) => {
    const { cocktailId } = req.body; 

    console.log('Session before adding:', req.session);

    if (!req.session) {
        return res.status(400).send("Session not initialized.");
    }

    try {
        req.session.favorites = req.session.favorites || [];
        req.session.favorites.push(cocktailId);

        res.status(201).json({ message: "Cocktail added to favorites", favorites: req.session.favorites });
    } catch (error) {
        console.error("Error adding to favorites:", error.message);
        res.status(500).send("Error adding cocktail to favorites.");
    }
});

router.put('/cocktails/favorites', async (req, res) => {
    const { oldCocktailId, newCocktailId } = req.body;

    console.log('Session before updating:', req.session);
    console.log('Old cocktail ID:', oldCocktailId);
    console.log('New cocktail ID:', newCocktailId);

    if (!req.session || !req.session.favorites) {
        req.session.favorites = [];
    }


    const index = req.session.favorites.indexOf(oldCocktailId);

    if (index === -1) {
        return res.status(404).send("Cocktail not found in favorites.");
    }

    try {
        req.session.favorites[index] = newCocktailId;
        console.log('Updated favorites list:', req.session.favorites);

        res.status(200).json({
            message: "Cocktail updated in favorites",
            favorites: req.session.favorites
        });
    } catch (error) {
        console.error("Error updating favorites:", error.message);
        res.status(500).send("Error updating cocktail in favorites.");
    }
});

router.delete('/cocktails/favorites', async (req, res) => {
    const { cocktailId } = req.body;

    console.log('Session before deleting:', req.session);
    console.log('Cocktail ID to delete:', cocktailId);
    console.log('Current favorites:', req.session.favorites);

    if (!req.session || !req.session.favorites) {
        return res.status(400).send("Favorites not found.");
    }

    const index = req.session.favorites.indexOf(cocktailId);

    if (index === -1) {
        return res.status(404).send("Cocktail not found in favorites.");
    }

    req.session.favorites.splice(index, 1);

    res.status(200).json({
        message: "Cocktail removed from favorites",
        favorites: req.session.favorites
    });
});


export default router;