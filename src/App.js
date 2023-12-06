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
    boneGroups: [],
  };

  toggleStaticStl = () => {
    this.setState((prevState) => ({
      staticstl: !prevState.staticstl,
    }));
  };
  
  checkCollision = (boneGroups) => {
    // Add your collision detection logic here
    // For example, checking if any two bones are within a distance of 1
    console.log(boneGroups)
    for (let i = 0; i < boneGroups.length - 1; i++) {
      const bone1 = boneGroups[i].position;
  
      for (let j = i + 1; j < boneGroups.length; j++) {
        const bone2 = boneGroups[j].position;
  
        const distance = bone1.distanceTo(bone2);
        console.log("hi")
        if (distance < 3) {
          console.log("hi")
          
          // Collision detected
          return true;
        }
      }
    }
  
    // No collision
    return false;
  };
  

  render() {
    const { rotation1,rotation2,rotation3,rotation4,rotation5,rotation6,staticstl,boneGroups } = this.state;

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
          <p>Collision: {this.checkCollision(boneGroups) ? "Yes" : "No"}</p>
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
            boneGroups={boneGroups}
            onBoneGroupsUpdate={(updatedBoneGroups) => this.setState({ boneGroups: updatedBoneGroups })}
          />
        </div>
      </div>
    );
  }
}

export default App;