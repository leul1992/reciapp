import React, { useState, useEffect } from "react";
import fetchData from "../utils/utils";
import ShowRecipeDetail from "./showRecipeDetail";
import SelectPreference from "../preferences/preferences";
import { useSelector } from "react-redux";
import useHelper from "./showOrHide";
import ShowFavourites from "../favourites/showFavourites";
import { MdStarBorder, MdStar } from "react-icons/md";
import Header from "../Header/header";
import { getFavourites, saveToFavourites, deleteFromFavourites } from "../controller/favourites";
import useAuth from "../Authenticate/authenticate";

function ShowRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const preferences = useSelector((state) => state.preferences);
  const { details, showDetail } = useHelper();
  const { authentication } = useAuth();

  useEffect(() => {
    fetchData('', preferences.type, preferences.diet, preferences.intolerance, preferences.maxTime)
      .then(data => {
        setRecipes(data.results);
      })
      .catch(error => {
        console.log('Error fetching');
      });

    const fetchFavourites = async () => {
      const favouriteData = await getFavourites(authentication.user.id);
      if (favouriteData && favouriteData.recipe) {
        const ids = favouriteData.recipe.recipeid.split(",");
        setFavourites(ids);
      }
    };

    fetchFavourites();
  }, [preferences, authentication.user.id]);

  const handleRecipeClick = (recipeid) => {
    showDetail(recipeid);
  };

  const handleFavouriteClick = async (recipe) => {
    if (favourites.includes(recipe.id.toString())) {
      await deleteFromFavourites(authentication.user.id, recipe.id);
      setFavourites((prevFavourites) =>
        prevFavourites.filter((id) => id !== recipe.id.toString())
      );
    } else {
      await saveToFavourites(
        authentication.user.id,
        recipe.id,
        recipe.title,
        recipe.image
      );
      setFavourites((prevFavourites) => [...prevFavourites, recipe.id.toString()]);
    }
  };

  return (
    <>
      {details.showDetail ? (
        <ShowRecipeDetail id={details.showDetail} />
      ) : details.showFavourite ? (
        <ShowFavourites />
      ) : (
        <div className="flex flex-col">
          <Header />
          <div className="flex items-center pt-16 cursor-pointer text-green-800 text-xl font-semibold">
            <SelectPreference />
          </div>
          <div className="grid justify-self-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center px-6 md:px-32 md:ml-10 py-4">
            {recipes.map((recipe) => (
              <div
                onClick={() => handleRecipeClick(recipe.id)}
                key={recipe.id}
                className="relative cursor-pointer w-full rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white"
                style={{ minHeight: "300px" }} // Ensure all cards have a minimum height
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from bubbling up to the parent div
                    handleFavouriteClick(recipe);
                  }}
                  className="absolute bottom-2 left-2 text-black bg-transparent hover:scale-110 rounded-full p-1 cursor-pointer"
                >
                  {favourites.includes(recipe.id.toString()) ? (
                    <MdStar className="text-yellow-400" size={24} />
                  ) : (
                    <MdStarBorder className="text-blue-300" size={24} />
                  )}
                </div>
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-2">
                  <h2 className="text-center text-sm font-sans font-bold">
                    {recipe.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ShowRecipe;
