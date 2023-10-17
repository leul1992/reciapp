import { useState, useEffect } from "react";
import useAuth from "../Authenticate/authenticate";
import { css } from "aphrodite";
import { styleFavourites } from "../styles/favourites";
import useHelper from "../ShowRecipe/showOrHide";
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { styleStatics } from "../styles/recipeStyle";
import Header from "../Header/header";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { deleteFromFavourites } from "./favourites";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";


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
  const [isReady, setIsReady] = useState(false);
  const { showDetail,showFavourite, hideFavourite } = useHelper();
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const getData = async () => {
      const favourite = await getFavourites(authentication.user.id);
      if (favourite && favourite.recipe){
        if (favourite.recipe.recipeid && favourite.recipe.recipeid.length > 0) {      const ids = favourite.recipe.recipeid.length > 1 ? favourite.recipe.recipeid.split(','):[favourite.recipe.recipeid];
      const names = favourite.recipe.recipename.split('+');
      const images = favourite.recipe.recipeimage.split('+');
      const favList = ids.map((id, index) => ({
        id,
        name: names[index],
        image: images[index]
      }))
      setFavourites(favList);
      setIsReady(true);
    }
  }
  else{
    
  }
    };
    getData();
  }, [authentication.user.id]);

  const hideFavouriteHandler = () => {
    hideFavourite();
  }
  
  const handleShowDetail = (recipeid) => {
    showDetail(recipeid);
    showFavourite();
  }
  const handleDeleteFromfavourites = async( recipeid ) => {
    try {
      await deleteFromFavourites(authentication.user.id, recipeid);

      setFavourites((prevFavourites) =>
        prevFavourites.filter((recipe) => recipe.id !== recipeid)
      );
    } catch (e) {
      console.error('Error deleting from favourites')
    }
  }

  return (
    <>
    <Header />
    <div className="flex flex-col items-center pt-16 mx-10 md:mx-0 gap-6">
    <FaArrowAltCircleLeft
      onClick={hideFavouriteHandler}
      className="self-start ml-4 text-green-500 hover:text-green-700 cursor-pointer"
      size='26'/>
      {favourites.length > 0 ?
      <>
      <h2 className="text-green-700 text-xl">Your Favourites</h2>
        <div className="flex flex-col gap-1 border p-4 rounded-bl-xl rounded-tr-xl shadow-lg outline outline-1 outline-blue-300 w-full md:w-2/3">
          {
          favourites.length > 0 ? favourites.map((recipeDetails) => (
            <div
            onClick={handleOpen}
            className="flex gap-2 items-end h-full">
              <MdOutlineCancelPresentation className="text-stone-500 cursor-pointer hover:text-gray-300 rounded-xl" size={24}/>
            <div
            key={recipeDetails.id}
            onClick={() => handleShowDetail(recipeDetails.id)}
            className="flex items-end gap-2 w-full hover:text-green-600 cursor-pointer"
            >
              {/* confirmation dialog for delete */}
              <Dialog open={open} handler={handleOpen}>
                <DialogBody>
                  <Alert className="flex justify-center" color="amber">Are you sure you want to delete this recipe?</Alert>
                </DialogBody>
                <DialogFooter>
                  <Button
                  variant="text"
                  color="green"
                  onClick={handleOpen}>
                    <span>No</span>
                  </Button>
                  <Button
                  variant="text"
                  color="red"
                  onClick={()=>{handleDeleteFromfavourites(recipeDetails.id)}}
                  >
                    <sapn>Yes</sapn>
                  </Button>
                </DialogFooter>
              </Dialog>
              <img
                className="w-16 rounded-lg"
                src={recipeDetails.image}
                alt={recipeDetails.name}
              />
              <h2>{recipeDetails.name}</h2>
            </div>
            </div>
          )): <div>{favourites['error']}</div>}
        </div>
       </>:<div className="text-red-500">No Record</div>} 
      </div>
    </>
  );
};

export default ShowFavourites;