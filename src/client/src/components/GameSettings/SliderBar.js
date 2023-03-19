import ReactSlider from "react-slider";
import "./slider.css";

const SliderBar = (props) => {
  let value = props.value;
  // const changeVolume = (value) => {
  //   props.setValue();
  // };

  return (
    <ReactSlider
      className="customSlider"
      trackClassName="customSlider-track"
      thumbClassName="customSlider-thumb"
      value={value}
      onChange={(value) => {
        props.setValue(value);
      }}
    />
  );
};

export default SliderBar;
