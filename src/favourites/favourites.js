const saveToFavourites = async (userId, recipeId) => {
    try {
      const response = await fetch('/api/favourites', {
        method: 'POST',
        body: JSON.stringify(userId, recipeId),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      dispatch(loginError(error.message));
    }
  };

  export default saveToFavourites;