import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import PropTypes from 'prop-types';

import base from './Base^UR3 Assembly.stl';
import arm1 from './Arm1^UR3 Assembly.stl';
import arm2 from './Arm2^UR3 Assembly.stl';
import arm3 from './Arm3^UR3 Assembly.stl';

const loader = new STLLoader();

class StlViewer extends Component {
  static propTypes = {
    rotation1: PropTypes.number,
    rotation2: PropTypes.number,
    rotation3: PropTypes.number,
    rotation4: PropTypes.number,
    rotation5: PropTypes.number,
    rotation6: PropTypes.number,
    staticstl: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.maxDistance = 200;
    this.controls.minDistance = 20;

    this.boneGroups = [];
    this.mesh1 = null;
    this.mesh2 = null;
    this.mesh3 = null;
    this.mesh4 = null;

    this.createBoneChain();
    this.loadSTLModel();

    this.state = {
      animateCallbacks: [],
    };
  }

  componentDidMount() {
    this.setupScene();
    this.setupWindowResizeHandler();
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.staticstl) {
        this.scene.add(this.mesh1);
        this.scene.add(this.mesh2);
        this.scene.add(this.mesh3);
        this.scene.add(this.mesh4);
      } else {
        this.removeSTLModels();
      }
      this.boneGroups[1].rotation.y = (Math.PI * this.props.rotation1) / 180;

      this.boneGroups[2].position.set(
        7 * Math.sin((Math.PI * this.props.rotation1) / 180),
        7,
        7 * Math.cos((Math.PI * this.props.rotation1) / 180)
      );

      this.boneGroups[2].rotation.z = (Math.PI * this.props.rotation2) / 180;

      this.boneGroups[3].position.set(
        10 * Math.sin((Math.PI * -this.props.rotation2) / 180) + this.boneGroups[2].position.x,
        10 * Math.cos((Math.PI * this.props.rotation2) / 180) + this.boneGroups[2].position.y,
        this.boneGroups[2].position.z
      );

      this.boneGroups[4].position.set(
        this.boneGroups[3].position.x,
        this.boneGroups[3].position.y,
        this.boneGroups[3].position.z  + (3) 
      );

      this.boneGroups[4].rotation.z = (Math.PI * this.props.rotation3) / 180;

      this.boneGroups[5].position.set(
        this.boneGroups[4].position.x + (9 * Math.sin((Math.PI * -this.props.rotation3) / 180)),
        this.boneGroups[4].position.y + (9 * Math.cos((Math.PI * this.props.rotation3) / 180)),
        this.boneGroups[4].position.z
      );


      this.boneGroups[6].position.set(
        this.boneGroups[5].position.x,
        this.boneGroups[5].position.y,
        this.boneGroups[5].position.z + 5
      );      
      
      this.boneGroups[6].rotation.z = (Math.PI * this.props.rotation4) / 180;

      this.boneGroups[7].position.set(
        this.boneGroups[6].position.x + (4 * Math.sin((Math.PI * -this.props.rotation4) / 180)),
        this.boneGroups[6].position.y + (4 * Math.cos((Math.PI * this.props.rotation4) / 180)),
        this.boneGroups[6].position.z
      );      

      this.boneGroups[7].rotation.y = (Math.PI * this.props.rotation5) / 180;

      this.boneGroups[8].position.set(
        this.boneGroups[7].position.x + (4 * Math.sin((Math.PI * this.props.rotation5) / 180)),
        this.boneGroups[7].position.y,
        this.boneGroups[7].position.z + (4 * Math.cos((Math.PI * this.props.rotation5) / 180))
      );

      this.renderer.render(this.scene, this.camera);
    }
  }

  setupScene() {
    this.camera.position.set(0, 0, 100);
    this.renderer.setSize(0.985 * window.innerWidth, 0.85 * window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);

    const secondaryLight = new THREE.PointLight(0xff0000, 1, 100);
    secondaryLight.position.set(5, 5, 5);
    this.scene.add(secondaryLight);

  }

  createBoneChain() {
    const boneMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

    // Manually define positions of each joint in 3D space
    const jointPositions = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 7, 0),
      new THREE.Vector3(0, 7, 7),
      new THREE.Vector3(0, 17, 7),
      new THREE.Vector3(0, 17, 10),
      new THREE.Vector3(0, 26, 10),
      new THREE.Vector3(0, 26, 15),
      new THREE.Vector3(0, 30, 15),
      new THREE.Vector3(0, 30, 19),
    ];

    // Create joints and bone segments based on the specified positions
    for (let i = 0; i < jointPositions.length; i++) {
      const jointGroup = new THREE.Group();

      // Create a joint (sphere)
      const jointGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const jointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const jointMesh = new THREE.Mesh(jointGeometry, jointMaterial);
      jointGroup.add(jointMesh);

      // Position the joint based on the specified position
      jointGroup.position.copy(jointPositions[i]);

      // Add joint to the scene
      this.scene.add(jointGroup);

      // Add the joint group to the list of bone groups
      this.boneGroups.push(jointGroup);

      // Create a bone segment (line) between joints (except for the last joint)
      if (i < jointPositions.length - 1) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(),
          jointPositions[i + 1].clone().sub(jointPositions[i]),
        ]);
        const boneSegment = new THREE.Line(lineGeometry, boneMaterial);
        jointGroup.add(boneSegment);
      }
    }
  }

  loadSTLModel() {
    const material = new THREE.MeshMatcapMaterial({
      color: 0xffffff,
    });

    if (this.props.staticstl) {
      // Load and render STL models only when staticstl is true
      if (this.mesh1) {
        this.scene.add(this.mesh1);
      } else{
        loader.load(base, (geometry) => {
          this.mesh1 = new THREE.Mesh(geometry, material);
          this.mesh1.geometry.computeVertexNormals(true);
          this.scene.add(this.mesh1);
        });
      }
      
      if (this.mesh2) {
        this.scene.add(this.mesh2);
      } else{
        loader.load(arm1, (geometry) => {
          this.mesh2 = new THREE.Mesh(geometry, material);
          this.mesh2.geometry.computeVertexNormals(true);
          this.scene.add(this.mesh2);
        });
      }

      if (this.mesh3) {
        this.scene.add(this.mesh3);
      } else{
        loader.load(arm2, (geometry) => {
          this.mesh3 = new THREE.Mesh(geometry, material);
          this.mesh3.geometry.computeVertexNormals(true);
          this.scene.add(this.mesh3);
        });
      }

      if (this.mesh4) {
        this.scene.add(this.mesh4);
      } else{
        loader.load(arm3, (geometry) => {
          this.mesh4 = new THREE.Mesh(geometry, material);
          this.mesh4.geometry.computeVertexNormals(true);
          this.scene.add(this.mesh4);
        });
      }
    }

    this.setState((prevState) => ({
      animateCallbacks: [...prevState.animateCallbacks, this.rotateModel],
    }));
  }

  removeSTLModels() {
    if (this.mesh1) this.scene.remove(this.mesh1);
    if (this.mesh2) this.scene.remove(this.mesh2);
    if (this.mesh3) this.scene.remove(this.mesh3);
    if (this.mesh4) this.scene.remove(this.mesh4);
  }

  setupWindowResizeHandler() {
    window.addEventListener('resize', this.handleWindowResize, false);
  }

  handleWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(0.985 * window.innerWidth, 0.85 * window.innerHeight);
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.state.animateCallbacks.forEach((callback) => {
      callback();
    });

    this.renderer.render(this.scene, this.camera);
  };


  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

export default StlViewer;
