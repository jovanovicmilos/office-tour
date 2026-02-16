import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import EventEmitter from './event-emitter.js'

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        this.sources = sources;

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.loadingManager = new THREE.LoadingManager(
            () => {
                this.trigger('ready');
                const loadingBar = document.getElementById('loading-bar');
                const progressFill = document.getElementById('loading-progress-fill');
                if (progressFill) progressFill.style.width = '100%';
                setTimeout(() => {
                    if (loadingBar) loadingBar.classList.add('loading-bar__hidden');
                    this.trigger('switch.view');
                }, 1200);
            },
            (url, loaded, total) => {
                const progress = total > 0 ? (loaded / total) * 100 : 0;
                const progressFill = document.getElementById('loading-progress-fill');
                if (progressFill) progressFill.style.width = `${progress}%`;
            },
            (url) => console.warn('Failed to load:', url)
        );

        this.loaders.gltfLoader = new GLTFLoader(this.loaders.loadingManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loaders.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loaders.loadingManager)
        this.loaders.objLoader = new OBJLoader(this.loaders.loadingManager);
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === 'glbModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            } else if (source.type === 'objModel') {
                this.loaders.objLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;

        this.loaded++;

        if (this.loaded === this.toLoad) {
            console.info('resources successfully loaded!');
        }
    }
}