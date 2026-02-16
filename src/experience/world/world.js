import * as CANNON from 'cannon-es'

import Experience from '../experience.js';
import UI from './ui.js';
import Cone from './cone.js';
import Office from './office.js';

export default class World
{
    constructor()
    {   
        this.experience = new Experience()
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;

        this.cannon = new CANNON.World();
        this.cannon.broadphase = new CANNON.SAPBroadphase(this.cannon);
        this.cannon.gravity.set(0, -9.82, 0);

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.office = new Office();
            this.cone = new Cone();
            this.ui = new UI();
            
        })
    }

    update()
    {
        if (this.cone) {
            this.cone.mesh.rotation.y += 0.05;
            this.cone.mesh.position.y = (Math.sin(this.time.elapsed - this.time.delta) * 0.5) + 5.5;
        }
    }
}