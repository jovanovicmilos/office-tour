import * as THREE from 'three'
import Experience from './experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    instance = null;
    fov = 45;

    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
    }

    setInstance() {
        if (this.sizes.width <= 768) {
            this.fov = 75
        }

        this.instance = new THREE.PerspectiveCamera(this.fov, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(4.7, 3.6, 0.9)
        this.scene.add(this.instance)
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.target.set(4.87, 2.9, -3.21);
        this.controls.enableDamping = true;
        this.controls.maxPolarAngle = Math.PI / 2;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }

    add(item) {
        this.instance.add(item);
    }
}