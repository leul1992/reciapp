const saveToFavourites = async (userId, recipeId) => {
    try {
      const response = await fetch('/api/saveFavourites', {
        method: 'POST',
        body: JSON.stringify({userId, recipeId}),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('can\'t fetch');
    }
  };

  export default saveToFavourites;