import * as THREE from 'three';
import EventEmitter from './event-emitter.js'

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.clock = new THREE.Clock()

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        this.delta = this.clock.getDelta();
        this.elapsed = this.clock.getElapsedTime()

        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick();
        })
    }
}