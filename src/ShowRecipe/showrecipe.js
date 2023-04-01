import React, { useState, useEffect, useReducer } from 'react';
import fetchData from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';
import ShowRecipeDetail from './showRecipeDetail';
import SelectPreference from '../preferences/preferences';
import { useSelector, useDispatch } from 'react-redux';
import useHelper from './showOrHideDetail';
import ShowFavourites from '../favourites/showFavourites';

function ShowRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [visibleSelected, setVisibleSelected] =useState(null);
  const preferneces = useSelector(state => state.preferences);
  const [showPrefer, setShowPrefer] = useState(false);
  const {details, showDetail, hideDetail} = useHelper();
  const dispatch = useDispatch();

console.log(preferneces);
  useEffect(() => {
    fetchData('',preferneces.type,preferneces.diet,preferneces.intolerance,preferneces.maxTime).then(data => {
      setRecipes(data.results);
    }).catch(error => {
      console.log(error);
    });
  }, [preferneces]);

  const handleRecipeClick = (recipe) => {
    setVisibleSelected(recipe);
    showDetail();
  }

  const handleShowPrefer = () => {
    setShowPrefer(!showPrefer);
  }
  

  

  return (
    <div>
      <ShowFavourites />
      {details.showDetail ? (
        <ShowRecipeDetail
        id={visibleSelected}
        />
      ) : (
        <>

          <p
          onClick={handleShowPrefer}
          className={css(styleRecipe.h3)}>{showPrefer ? 'Hide Preference':'Show Preference'}</p>
            {showPrefer && <SelectPreference />}
                <div className={css(styleRecipe.allRecipes)}>
          {recipes.map(recipe => (
            <div
            key={recipe.id}
            className={css(styleRecipe.recipe)}
            onClick={() => handleRecipeClick(recipe.id)}
            >
              <img
              src={recipe.image}
              alt={recipe.title}
              className={css(styleRecipe.image)}
              />
              <h2>{recipe.title}</h2>
            </div>
          ))}
                </div>
        </>
      )}
    </div>
  );
}

const styleRecipe = StyleSheet.create({
  allRecipes: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px'
    
  },
  
  recipe: {
    margin: '50px 0 10px 0',
    padding: '10px',
    border: '10px none rgba(41, 74, 48,0.2)',
    borderRadius: '13%',
    width: '380px',
    textAlign: 'center',
    color: '#999fc4',
    cursor: 'pointer',
    
    
    
  },
  h3: {
    border: '10px ridge rgba(41, 74, 48,0.2)',
    borderRadius: '13%',
    width: '180px',
    textAlign: 'center',
    color: '#999fc4',
    cursor: 'pointer',
  },

  image: {
    borderRadius: '5%',
    ':hover':{
      width: '101%'
    }
  }
});

export default ShowRecipe;
