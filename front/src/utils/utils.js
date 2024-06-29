import axios from "axios";
// eslint-disable-next-line no-unused-vars

const apiKey = process.env.API_KEY;

const getEndpoint = (id) => {
  console.log(apiKey);
  if (id) {
    return `https://api.spoonacular.com/recipes/${id}/information?apiKey=a2d97f11eb174547adb78c7185b3f9c5`;
  } else {
    return `https://api.spoonacular.com/recipes/complexSearch?apiKey=a2d97f11eb174547adb78c7185b3f9c5`;
  }
};
function getOptions(id) {
  let parsedId = id ? parseInt(id) : '';
  const url = getEndpoint(parsedId);
  const options = {};
  const temp = {};
  const KeyOrder = [];
  const params= {
    limitLicense: 'true'
  };
  temp['method'] = 'GET';
  KeyOrder.push('method');
  temp['url'] = url;
  KeyOrder.push('url');
  if(!id){
    temp['params'] = params;
    KeyOrder.push('params');
  }

  for (const key of KeyOrder) {
    options[key] = temp[key];
  }
  
  return options;
};
// fetchData from api
const fetchData = (id, foodType, foodDiet, foodintolerance, maxTime) => {
  
  const options = getOptions(id);
  let ft = '';
  let fd = '';
  let fi = '';
  if (foodType) {
    ft = foodType.map(foods => foods + ',').join('');
    options.params['type'] = ft;
  }
  
  if (foodDiet) {
    fd = foodDiet.map(foods => foods).join('');
    options.params['diet'] = fd;
  }
  
  if (foodintolerance) {
    fi = foodintolerance.map(foods => foods + ',').join('');
    options.params['intolerances'] = fi;
  }
  
  if (maxTime){
    options.params['maxReadyTime'] = parseInt(maxTime);
  }
  return new Promise((resolve, reject) => {
    axios.request(options)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        const errorMessage = error.response ? error.response.data.message : 'Network error';
      reject(errorMessage);
      });
  });
};

export default fetchData;
