import React from "react";
import { type, diet, intolerance } from "./preferenceData";
import { addPreference, removePreference, setMaxTime, removeMaxTime } from "../actions";
import { useSelector, useDispatch } from "react-redux";

function CheckBox(props) {
  const { name, value, checked, onChange } = props;
  return (
    <div
      className={`my-1 text-center py-2 ${checked ? "bg-green-500 hover:bg-green-400" : "bg-[#25254e] hover:bg-[#5d5d88]"} text-white cursor-pointer`}
      onClick={onChange} // Make the outer div clickable
    >
      {value}
    </div>
  );
}


class Preference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: null,
    }
  }

  handleClick = (index) => {
    if (index !== this.state.toggle){
    this.setState({
      toggle: index,
    })}
    else {
      this.setState({
        toggle: null,
      })
    }
  }
    renderType(i) {
      return(
        <CheckBox
        name="type"
        value={type[i]}
        checked={this.props.type.includes(type[i])}
        onChange={() => this.props.onClick("type", type[i])}
        />
    );
  }
  renderDiet(i) {
      return(
        <CheckBox
        name="diet"
        value={diet[i]}
        checked={this.props.diet.includes(diet[i])}
        onChange={() => this.props.onClick("diet", diet[i])}
        />
    );
  }
  renderIntolerance(i) {
      return(
        <CheckBox
        name="intolerance"
        value={intolerance[i]}
        checked={this.props.intolerance.includes(intolerance[i])}
        onChange={() => this.props.onClick("intolerance", intolerance[i])}
        />
    );
  }

  render() {
    return (
      <div className="">
        <div className="cursor-pointer">
          <h3
          onClick={() => this.handleClick(0)}
          className=" font-semibold">Type</h3>
          {this.state.toggle === 0 && type.map(foodtype => (
            this.renderType(type.indexOf(foodtype))
          ))}
        </div>
        
        <div className="">
          <h3
          onClick={() => this.handleClick(1)}
          className="cursor-pointer font-semibold">Diet</h3>
          {this.state.toggle === 1 && diet.map(foodDiet =>(
            this.renderDiet(diet.indexOf(foodDiet))
          ))}
        </div>
        <div className="cursor-pointer">
          <h3
          onClick={() => this.handleClick(2)}
          className="font-semibold">Intolerance</h3>
          {this.state.toggle === 2 && intolerance.map(foodintolerance => (
            this.renderIntolerance(intolerance.indexOf(foodintolerance))
          ))}
        </div>
        <div className="cursor-pointer font-semibold">
          <h3
          onClick={() => {this.handleClick(3)}}
          >Max-Time 10-200 Min</h3>
          {this.state.toggle === 3 && 
          <input
          name="maxTime"
          type="number"
          min={10}
          max={200}
          className="border-2 border-gray-600 w-full px-2 outline-none"
          onChange={(event) => this.props.onChange( event.target.value)}
          >
          </input>}
        </div>
      </div>
    )
  }
  }

  function SelectPreference() {
    const preferences = useSelector(state => state.preferences);
    const dispatch = useDispatch();
    
      function handlePreferenceChange(preferenceType, preferenceValue) {
        if (preferences[preferenceType].includes(preferenceValue)) {
          dispatch(removePreference(preferenceType, preferenceValue));
        } else {
          dispatch(addPreference(preferenceType, preferenceValue));
        }
      }
    
      function handleMaxTime(preferenceValue) {
        if (preferenceValue >= 10 && preferenceValue <= 200) {
          dispatch(setMaxTime(preferenceValue));
        }
        else{
          dispatch(removeMaxTime());
        }
      }
  
    return (
      <>
      <div>
        
        <Preference
          type={preferences.type}
          diet={preferences.diet}
          intolerance={preferences.intolerance}
          maxTime={preferences.maxTime}
          onClick={handlePreferenceChange}
          onChange={handleMaxTime}
        />
        
      </div>
      
      </>
    );
  }

  export default SelectPreference;
 
