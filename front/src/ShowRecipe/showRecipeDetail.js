import React, { useEffect, useState } from "react";
import fetchData from "../utils/utils";
import { saveToFavourites } from "../controller/favourites";
import useAuth from "../Authenticate/authenticate";
import useHelper from "./showOrHide";
import { FaArrowAltCircleLeft, FaCheck } from 'react-icons/fa';
import Header from "../Header/header";
import { Card } from "@material-tailwind/react";

function ShowRecipeDetail(props) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { authentication } = useAuth();
  const { hideDetail } = useHelper();
  const [saveMessage, setSaveMessage] = useState([null, null]);

  useEffect(() => {
    console.log('fetching detail')
    console.log(props.id)
    fetchData(props.id).then(data => {
      setRecipeDetails(data);
    }).catch(error => {
      console.log('error showing recipe');
    });
  }, [props.id]);

  const handleSaveFavourite = async () => {
    try {
      const response = await saveToFavourites(authentication.user.id, props.id, recipeDetails.title, recipeDetails.image);
      if (response.success) {
        setSaveMessage([response.success, 'Saved']);
      } else {
        setSaveMessage([response.success, response.message]);
      }
      setTimeout(() => {
        setSaveMessage([null, null]);
      }, 3000);
    } catch (error) {
      setSaveMessage([false, 'Didn\'t save']);
    }
  }

  const handleShowDetail = () => {
    hideDetail();
  }

  const toggleIngredient = (ingredientId) => {
    if (checkedIngredients.includes(ingredientId)) {
      setCheckedIngredients((prev) => prev.filter((id) => id !== ingredientId));
    } else {
      setCheckedIngredients((prev) => [...prev, ingredientId]);
    }
  };

  const ingredients = recipeDetails && recipeDetails.extendedIngredients
    ? <div className="flex flex-col gap-1 overflow-y-scroll max-h-64">
      {recipeDetails.extendedIngredients.map((ingredient) => (
        <Card
          key={ingredient.id}
          className={`flex py-3 px-2 border-2 hover:bg-stone-200 cursor-pointer ${checkedIngredients.includes(ingredient.id) && "bg-green-200"}`}
          onClick={() => toggleIngredient(ingredient.id)}
        >
          {ingredient.name}: {ingredient.original}
        </Card>
      ))}
    </div>
    : null;

  const handleToggleFalse = () => {
    setToggle(false);
  }
  const handleToggleTrue = () => {
    setToggle(true);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex items-center justify-between w-full mt-16">
        <FaArrowAltCircleLeft
          onClick={handleShowDetail}
          className="cursor-pointer text-[#2de336] hover:text-green-600"
          size="1.5em"
        />
      </div>
      <Card className="flex flex-col md:flex-row items-center w-full flex-grow p-4">
        <div className="md:w-1/2 w-full md:pr-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">{recipeDetails.title}</h1>
          <div className="mt-4 w-full flex justify-center gap-4 pb-4">
            <span
              onClick={handleToggleTrue}
              className={`border-b-2 cursor-pointer px-2 font-medium ${toggle ? 'border-[#2de336]' : "border-transparent"}`}
            >Recipe</span>
            <span
              onClick={handleToggleFalse}
              className={`border-b-2 cursor-pointer px-2 font-medium ${!toggle ? 'border-[#2de336]' : "border-transparent"}`}
            >Description</span>
          </div>
          <div className="mb-4 flex-grow">
            {toggle ?
              <div className="w-full h-full overflow-y-scroll max-h-64">
                {ingredients}
              </div> :
              <div className="w-full h-full overflow-y-scroll max-h-64">
                <p className="w-full"
                  dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
                ></p>
              </div>}
          </div>
          
          
          <button
            onClick={handleSaveFavourite}
            className="px-4 py-2 w-36 text-white bg-[#2de336] rounded-lg hover:bg-green-600"
          >
            {saveMessage[0] === true ? <span className="flex items-center gap-2">Saved <FaCheck /></span> : <span>Save</span>}
          </button>
          {!saveMessage[0] && <span className='mt-4 text-center text-[#326ebd]'>{saveMessage[1]}</span>}
        </div>
        <div className="md:w-1/2 w-full mt-6 md:mt-0 flex flex-col items-center">
          <img src={recipeDetails.image} className="w-full h-full object-cover rounded-lg mb-4" alt={recipeDetails.title} />
          
        </div>
      </Card>
    </div>
  );
}

export default ShowRecipeDetail;
