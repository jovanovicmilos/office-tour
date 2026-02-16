import * as THREE from 'three'

import Sizes from './utils/sizes.js'
import Time from './utils/time.js'
import Camera from './camera.js'
import Renderer from './renderer.js'
import World from './world/world.js'
import Resources from './utils/resources.js'

import sources from './assets/sources.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }

        instance = this;
        
        // Global access
        window.experience = this;

        // Options
        this.canvas = _canvas;

        // Setup
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x171717);
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize();
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update();
        })
    }

    resize()
    {
        this.camera.resize();
        this.renderer.resize();
    }

    update()
    {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    destroy()
    {
        this.sizes.off('resize');
        this.time.off('tick');

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose();
                    }
                }
            }
        })

        this.camera.controls.dispose();
        this.renderer.instance.dispose();
    }
}