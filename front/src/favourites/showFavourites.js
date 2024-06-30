import { useState, useEffect } from "react";
import useAuth from "../Authenticate/authenticate";
import useHelper from "../ShowRecipe/showOrHide";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Header from "../Header/header";
import { MdCancel } from "react-icons/md";
import { deleteFromFavourites, getFavourites } from "../controller/favourites";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";

const ShowFavourites = () => {
  const { authentication } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const { showDetail, showFavourite, hideFavourite } = useHelper();
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleOpen = (recipeId) => {
    setSelectedRecipe(recipeId);
    setOpen(!open);
  };

  useEffect(() => {
    const getData = async () => {
      const favourite = await getFavourites(authentication.user.id);
      if (favourite && favourite.recipe) {
        if (favourite.recipe.recipeid && favourite.recipe.recipeid.length > 0) {
          const ids =
            favourite.recipe.recipeid.length > 1
              ? favourite.recipe.recipeid.split(",")
              : [favourite.recipe.recipeid];
          const names = favourite.recipe.recipename.split("+");
          const images = favourite.recipe.recipeimage.split("+");
          const favList = ids.map((id, index) => ({
            id,
            name: names[index],
            image: images[index],
          }));
          setFavourites(favList);
          setIsReady(true);
        }
      }
    };
    getData();
  }, [authentication.user.id]);

  const hideFavouriteHandler = () => {
    hideFavourite();
  };

  const handleShowDetail = (recipeid) => {
    showDetail(recipeid);
    showFavourite();
  };

  const handleDeleteFromfavourites = async () => {
    try {
      await deleteFromFavourites(authentication.user.id, selectedRecipe);
      setFavourites((prevFavourites) =>
        prevFavourites.filter((recipe) => recipe.id !== selectedRecipe)
      );
      handleOpen();
    } catch (e) {
      console.error("Error deleting from favourites");
    }
  };

  return (
    <>
      <Header />
      <div className="flex pb-10 flex-col items-center pt-16 mx-10 md:mx-0 gap-6">
        <FaArrowAltCircleLeft
          onClick={hideFavouriteHandler}
          className="self-start ml-4 text-green-500 hover:text-green-700 cursor-pointer"
          size="26"
        />
        {favourites.length > 0 ? (
          <>
            <h2 className="text-green-700 text-xl mb-4">Your Favourites</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 px-2 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {favourites.map((recipeDetails) => (
                <div key={recipeDetails.id} className="relative group">
                  <div
                    onClick={() => handleOpen(recipeDetails.id)}
                    className="absolute top-2 right-2 text-white bg-blue-200 rounded-full p-1 cursor-pointer hover:bg-blue-400 z-10"
                  >
                    <MdCancel size={24} />
                  </div>
                  <div
                    onClick={() => handleShowDetail(recipeDetails.id)}
                    className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                  >
                    <img
                      className="w-full h-32 object-cover"
                      src={recipeDetails.image}
                      alt={recipeDetails.name}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h2 className="text-white text-xs px-2">{recipeDetails.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-red-500">No Record</div>
        )}
      </div>

      <Dialog open={open} handler={() => handleOpen(selectedRecipe)}>
        <DialogBody>
          <Alert className="flex justify-center" color="grey">
            Are you sure you want to REMOVE this recipe?
          </Alert>
        </DialogBody>
        <DialogFooter>
          <Button className="bg-blue-gray-200 font-extrabold hover:bg-blue-gray-100" variant="text" color="green" onClick={() => handleOpen(selectedRecipe)}>
            <span>No</span>
          </Button>
          <span className="mx-2"></span>
          <Button
            variant="text"
            color="red"
            className="bg-blue-gray-200 font-extrabold hover:bg-blue-gray-100"
            onClick={handleDeleteFromfavourites}
          >
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ShowFavourites;
