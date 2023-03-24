import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAuth from "../Authenticate/authenticate";

const getFavourites = async (userId) => {
  try {
    const response = await fetch('/api/showfavourites', {
      method: 'POST',
      body: JSON.stringify({ userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('can\'t fetch');
  }
};

const ShowFavourites = () => {
  const {authenticate}= useAuth();
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFavourites(authenticate.user.id);
      setFavourites(data);
    };
    fetchData();
  }, [authenticate.user.id]);

  return (
    <>
  
      {favourites.map(fav => (
        <div key={fav}>
          <h2>{fav}</h2>
        </div>
      ))}
    </>
  );
};

export default ShowFavourites;
