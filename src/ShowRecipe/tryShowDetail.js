import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";


const detail = {
    "id": 716429,
    "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    "imageType": "jpg",
    "servings": 2,
    "readyInMinutes": 45,
    "license": "CC BY-SA 3.0",
    "sourceName": "Full Belly Sisters",
    "sourceUrl": "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
    "dishTypes": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
    ],
    "extendedIngredients": [
        
        {
            "aisle": "Produce",
            "amount": 2.0,
            "consitency": "solid",
            "id": 10011135,
            "image": "cauliflower.jpg",
            "measures": {
                "metric": {
                    "amount": 473.176,
                    "unitLong": "milliliters",
                    "unitShort": "ml"
                },
                "us": {
                    "amount": 2.0,
                    "unitLong": "cups",
                    "unitShort": "cups"
                }
            },
            "meta": [
                "frozen",
                "thawed",
                "cut into bite-sized pieces"
            ],
            "name": "cauliflower florets",
            "original": "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
            "originalName": "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
            "unit": "cups"
        },
        {
            "aisle": "Cheese",
            "amount": 2.0,
            "consitency": "solid",
            "id": 1041009,
            "image": "cheddar-cheese.png",
            "measures": {
                "metric": {
                    "amount": 2.0,
                    "unitLong": "Tbsps",
                    "unitShort": "Tbsps"
                },
                "us": {
                    "amount": 2.0,
                    "unitLong": "Tbsps",
                    "unitShort": "Tbsps"
                }
            },
            "meta": [
                "grated",
                "(I used romano)"
            ],
            "name": "cheese",
            "original": "2 tbsp grated cheese (I used romano)",
            "originalName": "grated cheese (I used romano)",
            "unit": "tbsp"
        },
        
        {
            "aisle": "Pasta and Rice",
            "amount": 6.0,
            "consitency": "solid",
            "id": 20420,
            "image": "fusilli.jpg",
            "measures": {
                "metric": {
                    "amount": 170.097,
                    "unitLong": "grams",
                    "unitShort": "g"
                },
                "us": {
                    "amount": 6.0,
                    "unitLong": "ounces",
                    "unitShort": "oz"
                }
            },
            "meta": [
                "(I used linguine)"
            ],
            "name": "pasta",
            "original": "6-8 ounces pasta (I used linguine)",
            "originalName": "pasta (I used linguine)",
            "unit": "ounces"
        },
        {
            "aisle": "Spices and Seasonings",
            "amount": 2.0,
            "consitency": "solid",
            "id": 1032009,
            "image": "red-pepper-flakes.jpg",
            "measures": {
                "metric": {
                    "amount": 2.0,
                    "unitLong": "pinches",
                    "unitShort": "pinches"
                },
                "us": {
                    "amount": 2.0,
                    "unitLong": "pinches",
                    "unitShort": "pinches"
                }
            },
            "meta": [
                "red"
            ],
            "name": "red pepper flakes",
            "original": "couple of pinches red pepper flakes, optional",
            "originalName": "couple of red pepper flakes, optional",
            "unit": "pinches"
        },
        {
            "aisle": "Spices and Seasonings",
            "amount": 2.0,
            "consitency": "solid",
            "id": 1102047,
            "image": "salt-and-pepper.jpg",
            "measures": {
                "metric": {
                    "amount": 2.0,
                    "unitLong": "servings",
                    "unitShort": "servings"
                },
                "us": {
                    "amount": 2.0,
                    "unitLong": "servings",
                    "unitShort": "servings"
                }
            },
            "meta": [
                "to taste"
            ],
            "name": "salt and pepper",
            "original": "salt and pepper, to taste",
            "originalName": "salt and pepper, to taste",
            "unit": "servings"
        },
        
    ],
    "summary": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/cauliflower-gratin-with-garlic-breadcrumbs-318375\">Cauliflower Gratin with Garlic Breadcrumbs</a>, <a href=\"https://spoonacular.com/recipes/pasta-with-cauliflower-sausage-breadcrumbs-30437\">Pasta With Cauliflower, Sausage, & Breadcrumbs</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-roasted-cauliflower-parsley-and-breadcrumbs-30738\">Pasta With Roasted Cauliflower, Parsley, And Breadcrumbs</a>.",
       
        
    
}


function fetchData() {
    return new Promise((resolve, reject) => {
        resolve(detail);
    });
}



function TryShowDetail(props) {
  const [recipeDetails, setRecipeDetails] = useState([]);

  useEffect(() => {
    fetchData().then(data => {
      setRecipeDetails(data);
    }).catch(error => {
      console.log(error);
    });
  }, [props.id]);

  const ingredients = recipeDetails && recipeDetails.extendedIngredients
    ? recipeDetails.extendedIngredients.map((ingredient) => {
        return (
            <label>
          <input type="checkbox" key={ingredient.id}/>
            {ingredient.name}: {ingredient.original}
          </label>
        );
      })
    : null;

  
  return (
    <>
      
      <div className={css(styleRecipe.whole)}>
        <h3 className={css(styleStatics.h3)}>Description Of The Food</h3>
        <div key={recipeDetails.id} className={css(styleRecipe.allRecipes)}>
          <div className={css(styleRecipe.recipe)}>
            <img src={recipeDetails.image} alt={recipeDetails.title} />
            <h2>{recipeDetails.title}</h2>
          </div>
          <p
            className={css(styleRecipe.detail)}
            dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
          ></p>
        </div>
        <button className={css(styleStatics.button)}>Save To Favourites</button>
        <h3 className={css(styleStatics.h3)}>Follow The Recipe</h3>

        {/* <div className={css(styleRecipe.recipeList)}>
  {recipeDetails.extendedIngredients.map((ingredient, index) => (
    <label>
        <input
        
        type="checkbox"
        value={ingredient['original']}
        key={index}/>
        {ingredient['original']}
        </label>
  ))}
</div> */}
<div className={css(styleRecipe.recipeList)}>
      {ingredients}
    </div>


      </div>
    </>
  );
}


const styleStatics = StyleSheet.create({
    h3: {
      margin: '0 0 0 40%',
      border: '10px ridge rgba(41, 74, 48,0.2)',
      borderRadius: '13%',
      width: '200px',
      textAlign: 'center',
      color: '#999fc4',
    },

    button: {
        backgroundColor: 'rgb(41, 74, 48,0.6)',
        width: '150px',
        cursor: 'pointer',
        marginLeft: '180px'
    }
})

const styleRecipe = StyleSheet.create({
    allRecipes: {
      display: 'flex',
      flexDirection: "row",
      /* justifyContent: 'space-between', */
      alignItems: 'center',
      marginBottom: '10px',
      paddingLeft: '100px'
      
    },
    recipe: {
      display: 'flex',
      flexDirection: 'column',
      margin: '50px 0 10px 0',
      padding: '5px',
      border: '10px ridge rgba(41, 74, 48,0.2)',
      borderRadius: '13%',
      width: '300px',
      textAlign: 'center',
      color: '#999fc4',
    },

    

    detail: {
        paddingLeft: '20px',
        paddingRight: '300px',
    },

    whole: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '60px'
    },

    recipeList: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '25%',
        width: '500px'
    }

   
  });
  

export default TryShowDetail;