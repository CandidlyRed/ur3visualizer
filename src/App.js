import React, { Component } from 'react';
import './App.css';
import StlViewer from "./loader.js";

class App extends Component {
  state = {
    rotation1: 0,
    rotation2: 0,
    rotation3: 0,
    rotation4: 0,
    rotation5: 0,
    rotation6: 0,
    staticstl: true,
  };

  toggleStaticStl = () => {
    this.setState((prevState) => ({
      staticstl: !prevState.staticstl,
    }));
  };

  render() {
    const { rotation1,rotation2,rotation3,rotation4,rotation5,rotation6,staticstl } = this.state;

    return (
      <div className="App">
        <div className="buttons">
          <label>UR3 Visualizer | &nbsp;</label>
          <label>Base:&nbsp;</label>
          <input
            type="number"
            step="1"
            value={rotation1}
            onChange={(e) => this.setState({ rotation1: Math.max(-360, Math.min(360, parseFloat(e.target.value)))})}
          />
          <label>Shoulder:&nbsp;</label>
          <input
            type="number"
            step="1"
            value={rotation2}
            onChange={(e) => this.setState({ rotation2: Math.max(-360, Math.min(360, parseFloat(e.target.value)))})}
          />
          <label>Elbow:&nbsp;</label>
          <input
            type="number"
            step="1"
            value={rotation3}
            onChange={(e) => this.setState({ rotation3: Math.max(-360, Math.min(360, parseFloat(e.target.value)))})}
          />
          <label>Wrist1:&nbsp;</label>
          <input
            type="number"
            step="1"
            value={rotation4}
            onChange={(e) => this.setState({ rotation4: Math.max(-360, Math.min(360, parseFloat(e.target.value)))})}
          />
          <label>Wrist2:&nbsp;</label>
          <input
            type="number"
            step="1"
            value={rotation5}
            onChange={(e) => this.setState({ rotation5: Math.max(-360, Math.min(360, parseFloat(e.target.value)))})}
          />
          <label>Wrist3:&nbsp;</label>
          <input
            type="number"
            step="1"
            value={rotation6}
            onChange={(e) => this.setState({ rotation6: parseFloat(e.target.value)})}
          />
          <label>Static STL:</label>
          <input
            type="checkbox"
            checked={staticstl}
            onChange={this.toggleStaticStl}
          />
        </div>
        <div className="container" id="div2">
          <StlViewer
            rotation1={rotation1}
            rotation2={rotation2}
            rotation3={rotation3}
            rotation4={rotation4}
            rotation5={rotation5}
            rotation6={rotation6}
            staticstl={staticstl}
          />
        </div>
      </div>
    );
  }
}

export default App;