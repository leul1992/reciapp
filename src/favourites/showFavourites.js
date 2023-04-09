import { useState, useEffect } from "react";
import useAuth from "../Authenticate/authenticate";
import { css } from "aphrodite";
import { styleFavourites } from "../styles/favourites";

const getFavourites = async (userId) => {
  try {
    const response = await fetch('/api/showfavourites', {
      method: 'POST',
      body: JSON.stringify({userId}),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('can\'t fetch');
  }
};

const ShowFavourites = () => {
  const {authentication}= useAuth();
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const favourite = await getFavourites(authentication.user.id);
      console.log(favourite)
      if (favourite && favourite.recipe){
      const ids = favourite.recipe.recipeid.split(',');
      const names = favourite.recipe.recipename.split('+');
      const images = favourite.recipe.recipeimage.split('+');
      const favList = ids.map((id, index) => ({
        id,
        name: names[index],
        image: images[index]
      }))
      setFavourites(favList);
  }
  else{
    setFavourites(favourite['error'])
  }
    };
    getData();
  }, [authentication.user.id]);

  console.log(favourites['name'])
  return (
    <>
    <div className={css(styleFavourites.whole)}>
    {favourites.id ? favourites.map((recipeDetails, index) => (
    <div
    key={recipeDetails}
    className={css(styleFavourites.specificRecipe)}>
      {<img
      className={css(styleFavourites.photo)}
      src={recipeDetails.image} alt={recipeDetails.title} />}
      <h2>{recipeDetails.name[index]}</h2>
    </div>
    ))
    : <>
    <div>{favourites}</div>
    </>
}
</div>
    </>
  );
};

export default ShowFavourites;