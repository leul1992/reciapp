import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import fetchData from "../utils/utils";
import { useSelector } from "react-redux";
import saveToFavourites from "../favourites/favourites";
import ShowFavourites from "../favourites/showFavourites";
import useAuth from "../Authenticate/authenticate";
import useHelper from "./showOrHideDetail";
import ShowRecipe from "./showrecipe";


function ShowRecipeDetail(props) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const {authenticate} = useAuth();
  const {details, hideDetail} = useHelper();
  useEffect(() => {
    fetchData(props.id).then(data => {
      setRecipeDetails(data);
    }).catch(error => {
      console.log(error);
    });
  }, [props.id]);

  const handleSaveFavourite = ({onSubmit, error}) => {
    saveToFavourites(authenticate.user.id, props.id);
  }

  const handleShowDetail = () => {
    hideDetail();
  }

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
    
    {/* {!details.showDetail ? <ShowRecipe /> : */}
    <div>
      <div
      onClick={handleShowDetail}>Back</div>
        <div className={css(styleRecipe.whole)}>
          <div key={recipeDetails.id} className={css(styleRecipe.allRecipes)}>
            <div className={css(styleRecipe.recipe)}>
              <img src={recipeDetails.image} alt={recipeDetails.title} />
              <h2>{recipeDetails.title}</h2>
            </div>
            <div className={css(styleRecipe.detail)}>
          <h3 className={css(styleStatics.h3, styleStatics.decription)}>Description Of The Food</h3>
              <p
                dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
              ></p>
            </div>
          </div>
          <button
          onClick={handleSaveFavourite}
          className={css(styleStatics.button)}
          >Save To Favourites</button>
          <h3 className={css(styleStatics.h3, styleStatics.followRecipe)}>Follow The Recipe</h3>
      
          <div className={css(styleRecipe.recipeList)}>
            {ingredients}
          </div>
        </div>
    </div>
}
    </>
  );
}




const styleStatics = StyleSheet.create({
  h3: {
    border: '10px ridge rgba(41, 74, 48,0.2)',
    borderRadius: '13%',
    width: '200px',
    textAlign: 'center',
    color: '#999fc4',
  },

  decription: {
    margin: '0 0 0 20%',
  },

  followRecipe: {
    margin: '0 0 0 30%',
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
    /* justifyContent: 'space-between', */
    alignItems: 'center',
    marginBottom: '10px',
    paddingLeft: '100px',
    '@media (max-width: 800px)': {
      display: 'flex',
      flexDirection: 'column',
      flexFlow: 'column-reverse wrap',
      alignItems: 'center',
  }
      
    
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
    '@media (max-width: 800px)':{
      width: '70%',
    }
  },

  

  detail: {
      paddingLeft: '20px',
      paddingRight: '300px',
      '@media (max-width: 800px)':{
        display: 'flex',
      flexDirection: 'column',
        width: '70%',
        paddingLeft: '0',
        paddingRight: '0'
      }
  },

  whole: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '60px',
  },

  recipeList: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '25%',
      width: '40%',
      '@media (max-width: 800px)':{
        width: '70%',
      }
  }

 
});
  

export default ShowRecipeDetail;