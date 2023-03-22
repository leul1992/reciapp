import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import TryShowDetail from './tryShowDetail';


const data = {
    "offset": 0,
    "number": 2,
    "results": [
        {
            "id": 716429,
            "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
            "image": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
            "imageType": "jpg",
        },
        {
            "id": 715538,
            "title": "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
            "image": "https://spoonacular.com/recipeImages/715538-312x231.jpg",
            "imageType": "jpg",
        }
    ],
    "totalResults": 86
};

function fetchData() {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
}


function TryShow() {
  const [recipes, setRecipes] = useState([]);
  const [visibleSelected, setVisibleSelected] =useState(null);

  useEffect(() => {
    fetchData().then(data => {
      setRecipes(data.results);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleRecipeClick = (recipe) => {
    setVisibleSelected(recipe)
  }


  return (
    <div>
      {visibleSelected ? (
        <TryShowDetail
        id={visibleSelected}
        />
      ) : (
      <div className={css(styleRecipe.allRecipes)}>
        {recipes.map(recipe => (
          <div
          key={recipe.id}
          className={css(styleRecipe.recipe)}
          onClick={() => handleRecipeClick(recipe.id)}
          >
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

const styleRecipe = StyleSheet.create({
  allRecipes: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px'
    
  },
  recipe: {
    margin: '50px 0 10px 0',
    padding: '10px',
    border: '10px ridge rgba(41, 74, 48,0.2)',
    borderRadius: '13%',
    width: '380px',
    textAlign: 'center',
    color: '#999fc4',
    cursor: 'pointer',
    
    
  }
});



export default TryShow;