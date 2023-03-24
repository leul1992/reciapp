import React, { useState, useEffect, useReducer } from 'react';
import fetchData from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';
import ShowRecipeDetail from './showRecipeDetail';
import SelectPreference from '../preferences/preferences';
import { preferencesReducer } from '../reducers/preferenceReducer';
import { useSelector, useDispatch } from 'react-redux';
import useHelper from './showOrHideDetail';
import { hideDetails } from '../actions';

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
    /* hideDetail(); */
    setVisibleSelected(true);
  }

  const handleShowPrefer = () => {
    setShowPrefer(!showPrefer);
  }


  return (
    <div>
      {visibleSelected ? (
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
              <img src={recipe.image} alt={recipe.title} />
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
    
    
  },
  h3: {
    border: '10px ridge rgba(41, 74, 48,0.2)',
    borderRadius: '13%',
    width: '180px',
    textAlign: 'center',
    color: '#999fc4',
    cursor: 'pointer',
  },
});

export default ShowRecipe;
