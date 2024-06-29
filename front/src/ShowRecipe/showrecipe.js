import React, { useState, useEffect } from 'react';
import fetchData from '../utils/utils';
import ShowRecipeDetail from './showRecipeDetail';
import SelectPreference from '../preferences/preferences';
import { useSelector } from 'react-redux';
import useHelper from './showOrHide';
import ShowFavourites from '../favourites/showFavourites';
import { FaAngleRight } from 'react-icons/fa';
import Header from '../Header/header';
import {
  Drawer,
} from "@material-tailwind/react";

function ShowRecipe() {
  const [recipes, setRecipes] = useState([]);
  const preferneces = useSelector(state => state.preferences);
  const {details, showDetail} = useHelper();
  const [open, setOpen] = React.useState(false);
 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);


  useEffect(() => {
    fetchData('',preferneces.type,preferneces.diet,preferneces.intolerance,preferneces.maxTime).then(data => {
      setRecipes(data.results);
    }).catch(error => {
      console.log('Error fetching');
    });
  }, [preferneces]);

  const handleRecipeClick = (recipeid) => {
    showDetail(recipeid);
  }

  return (
    <>
      {details.showDetail ?
      <ShowRecipeDetail
      id={details.showDetail}
      /> :(
      details.showFavourite ? 
        <ShowFavourites /> : (
        <div className="flex flex-col">
        <Header />
        <div
        onClick={openDrawer}
        className='flex items-center pt-16 cursor-pointer text-green-800 text-xl font-semibold'><FaAngleRight size={30}/> Select Options</div>
        <Drawer open={open} onClose={closeDrawer} className="p-4 overflow-auto scrollbar-sm">
          <SelectPreference />
        </Drawer>
            <div className="grid justify-self-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 items-center justify-center px-6 md:px-32 md:ml-10 py-4">
          {recipes.map(recipe => (
            <div
            key={recipe.id}
            className="cursor-pointer w-full hover:border-b-2 hover:border-l-2 border-green-500 rounded-lg"
            onClick={() => handleRecipeClick(recipe.id)}
            >
              <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-lg w-full"
              />
            </div>
          ))}
                </div>
        </div>
      ))}
    </>
  );
}



export default ShowRecipe;
