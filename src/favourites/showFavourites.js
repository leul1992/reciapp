import { useState, useEffect } from "react";
import useAuth from "../Authenticate/authenticate";

const getFavourites = async (userId) => {
  try {
    const response = await fetch(`/api/showfavourites?userid=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('can\'t fetch');
  }
};

const ShowFavourites = () => {
  const {authentication}= useAuth();
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const favourite = await getFavourites(authentication.user.id);
      setFavourites(favourite.recipeid);
      setIsLoading(false);
    };
    fetchData();
  }, [authentication.user.id]);

  

  return (
    <> <p>{isLoading? 'yes':'no'}</p>
    {favourites ? favourites.map(fav => (
        <div key={fav}>
          <h2>{fav}</h2>
        </div>
      )) : <p>No Favourites</p>}

    </>
  );
};

export default ShowFavourites;
