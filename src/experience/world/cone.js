import * as THREE from 'three';
import Experience from "../experience.js";

export default class Cone {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setModel();
    }

    setModel() {
        const geometry = new THREE.ConeGeometry(1, 4, 6);
        const material = new THREE.MeshBasicMaterial({ color: 0xf9f9f9, wireframe: true });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(5, 14, -1);
        this.mesh.scale.set(.1, .1, .1);
        this.mesh.rotateZ(Math.PI);
        this.scene.add(this.mesh);
    }
}