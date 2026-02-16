import * as THREE from 'three'
import Experience from './experience.js'

export default class Renderer {    
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.instance.setClearColor(0xcccccc);
        this.instance.toneMapping = Number(THREE.LinearToneMapping);
        this.instance.toneMappingExposure = Math.pow(2, 0.0);
        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}