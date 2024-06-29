import React, { useEffect, useState } from "react";
import fetchData from "../utils/utils";
import {saveToFavourites} from "../favourites/favourites";
import useAuth from "../Authenticate/authenticate";
import useHelper from "./showOrHide";
import { FaArrowAltCircleLeft, FaCheck } from 'react-icons/fa';
import Header from "../Header/header";
import {
  Card,
} from "@material-tailwind/react";


function ShowRecipeDetail(props) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const {authentication} = useAuth();
  const { hideDetail} = useHelper();
  const [saveMessage, setSaveMessage] = useState([null, null]);
  useEffect(() => {
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
      }
      else{
        setSaveMessage([response.success, response.message]);
      }
      // Reset the saveMessage state after a time delay (e.g., 3 seconds)
        setTimeout(() => {
          setSaveMessage([null, null]);
        }, 3000);
    } catch(error) {
      setSaveMessage([false, 'Didn\'t save'])
    }
  }

  const handleShowDetail = () => {
    hideDetail();
  }

  const toggleIngredient = (ingredientId) => {
    if (checkedIngredients.includes(ingredientId)) {
      // If the ingredient is already checked, uncheck it
      setCheckedIngredients((prev) => prev.filter((id) => id !== ingredientId));
    } else {
      // If the ingredient is not checked, check it
      setCheckedIngredients((prev) => [...prev, ingredientId]);
    }
  };

  const ingredients = recipeDetails && recipeDetails.extendedIngredients
  ? <div className="flex flex-col gap-1">
  {recipeDetails.extendedIngredients.map((ingredient) => (
    <Card
      key={ingredient.id}
      className={`flex py-3 px-2 border-2 hover:bg-stone-200 cursor-pointer ${
        checkedIngredients.includes(ingredient.id)
          && "bg-green-200"
          
      }`}
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
    <div className="flex flex-col">
    <Header />
    <div className="flex gap-1 translate-y-14">
      <div className="w-8 h-6 mt-4">
        <FaArrowAltCircleLeft
        onClick={handleShowDetail}
        className="cursor-pointer text-[#2de336] hover:text-green-600"
        size='full'/>
      </div>
        <div className="flex flex-col items-center w-full gap-6 justify-center">
          <div className="z-20 flex">
            <img src={recipeDetails.image} className="w-36 h-24 translate-x-10 rounded-b-2xl" alt={recipeDetails.title} />
            <button
            onClick={handleSaveFavourite}
            className="px-4 mr-3 self-end translate-x-20 text-white rounded-lg hover:bg-green-600 bg-[#2de336] font-medium">{saveMessage[0] === true ? <span className="flex items-center gap-2">Saved <FaCheck /></span>:<span>Save</span>}</button>
          </div>
          <span className="font-medium text-stone-500">{recipeDetails.title}</span>
        <div
        className="w-full z-0 -translate-y-[167px] md:w-96 h-36 rounded-b-2xl bg-cover bg-center"
        style={{
          backgroundImage: `url(${recipeDetails.image})`,
          opacity: 0.3,
          backgroundColor: "rgb(0, 0, 255)"
        }}
        />
      <div className="bg-blue-400 w-full z-10 -translate-y-[334px] opacity-20 md:w-96 h-36 rounded-b-2xl bg-cover bg-center" />
        </div>
    </div>
    <div className="-translate-y-64 self-center flex flex-col space-y-4">
        {!saveMessage[0] && <sapn className='self-center text-[#326ebd]'>{saveMessage[1]}</sapn>}
      <div className="flex justify-center gap-4">
        <span
        onClick={handleToggleTrue}
        className={`border-b-2 cursor-pointer px-2 font-medium ${toggle ? 'border-[#2de336]':"border-white"}`}>Recipe</span>
        <span
        onClick={handleToggleFalse}
        className={`border-b-2 cursor-pointer px-2 font-medium ${!toggle ? 'border-[#2de336]':"border-white"}`}>Description</span>
      </div>
      {toggle ?
        <div className="w-full px-4 md:w-[600px]">
          {ingredients}
        </div>:
        <div>
          <p className="w-full px-4 md:w-[600px]"
                dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
              ></p>

        </div>}
    </div>
    </div>
  );
}

export default ShowRecipeDetail;