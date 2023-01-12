import React from 'react';
import { PhotoshopPicker } from 'react-color';

type PickerProps = {
  background: string;
}
type PickerState = {
  background: string;
}
class PickerComponent extends React.Component<PickerProps, PickerState> {
  constructor(props: PickerProps) {
    super(props);
    this.state = {
      background: props.background,
    };
  }
  handleChangeComplete = (color, event) => {
    console.log(color);
    this.setState(function(state, rops) {
      return {
        background: color.hex
      }
    });
  }

  render() {
    return (
      <div className="flex justify-center backdrop-saturate-125 my-5">
        <PhotoshopPicker color={this.state.background} onChangeComplete={this.handleChangeComplete} />;
      </div>
    )
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  foo() {
    fetch("http://localhost:3001/ping", {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
  }
  render() {
    return (
      <div className="flex justify-center backdrop-saturate-125">
        <div className="rounded-lg shadow-lg bg-white max-w-sm">
          <a href="#!">
            <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
          </a>
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
            <p className="text-gray-700 text-base mb-4">
            </p>
            <button type="button" onClick={this.foo} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Button
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default function Home() {
  const pickerState = {
    background: "fff"
  };
  return (
    <div className='m-5 grid lg:grid-cols-3'>
      <PickerComponent {...pickerState} />
      <Card />
    </div>
  )
}
