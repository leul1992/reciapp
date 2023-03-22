import React from "react";
import { useSelector } from "react-redux";
const Show = () => {
    const preferences = useSelector(state => state.preferences);
  
    return (
      <div>
        <p>Preferences:</p>
        <ul>
          {preferences.type.map(type => (
            <li>{type}</li>
          ))}
          {preferences.diet.map(diet => (
            <li>{diet}</li>
          ))}
          {preferences.intolerance.map(intolerance => (
            <li>{intolerance}</li>
          ))}
        </ul>
        <p>{preferences.maxTime}</p>
      </div>
    );
}

export default Show;
