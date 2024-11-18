import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import path from "path";
import axios from "axios";
import api from "./routes/api.js";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import pagination from "./utils/pagination.js"

env.config();

const app = express();
const port = 3000;
const __dirname = path.resolve();

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts); 
app.set("view engine", "ejs");
app.set('layout', 'partials/base');

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false } 
      
    }));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(api);


app.use((req, res, next) => {
    if (!req.session) {
        return res.status(500).send("Session is not initialized.");
    }
    next(); 
});

    

app.get("/", async (req, res) => {
    try {
        const randomCocktail = await axios.get(`${API_URL}/random.php`);
        res.render("index.ejs", { 
            title: 'Home - Cocktail DB', 
            randomCocktail: randomCocktail.data.drinks[0]  
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/about", async (req, res) => {
    res.render("about.ejs");  
});

app.get("/contact", async (req, res) => {
    res.render("contact.ejs");
});

app.get("/terms", async (req, res) => {
    res.render("terms.ejs");  
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});