import axios from "axios";

// API key (this should be stored in an environment variable in a real-world scenario)
const apiKey = process.env.REACT_APP_API_KEY;

const getEndpoint = (id) => {
  if (id) {
    return `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  } else {
    return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
  }
};

function getOptions(id) {
  const url = getEndpoint(id);
  const options = {
    method: 'GET',
    url: url,
    params: {
      limitLicense: 'true'
    }
  };

  return options;
}

// Fetch data from API
const fetchData = (id, foodType, foodDiet, foodIntolerance, maxTime) => {
  const options = getOptions(id);

  if (foodType) {
    const ft = foodType.join(',');
    options.params.type = ft;
  }

  if (foodDiet) {
    const fd = foodDiet.join(',');
    options.params.diet = fd;
  }

  if (foodIntolerance) {
    const fi = foodIntolerance.join(',');
    options.params.intolerances = fi;
  }

  if (maxTime) {
    options.params.maxReadyTime = parseInt(maxTime, 10);
  }

  return axios.request(options)
    .then(response => response.data)
    .catch(error => {
      const errorMessage = error.response ? error.response.data.message : 'Network error';
      throw new Error(errorMessage);
    });
};

export default fetchData;