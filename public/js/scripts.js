document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#randomCocktail');
    const randomCocktailContainer = document.querySelector('#randomCocktailContainer');
    const cocktailTitle = document.querySelector('#cocktailTitle'); 
    const cocktailInstructions = document.querySelector('#cocktailInstructions'); 
    const cocktailImage = document.querySelector('#cocktailImage'); 

    if (button && randomCocktailContainer) {
        button.addEventListener('click', async (e) => {
            e.preventDefault(); 
            try {
                const response = await fetch('/cocktails/random');
                const randomCocktail = await response.json();

                randomCocktailContainer.style.display = 'block';
                
                cocktailTitle.textContent = randomCocktail.strDrink;
                cocktailInstructions.textContent = randomCocktail.strInstructionsIT || randomCocktail.strInstructions;
                cocktailImage.src = randomCocktail.strDrinkThumb;
                cocktailImage.alt = randomCocktail.strDrink;
            } catch (error) {
                console.error('Failed to fetch a random cocktail:', error);
            }
        });
    }
});
