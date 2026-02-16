import * as THREE from 'three'
import Experience from '../experience.js';

export default class Office {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene;
        this.officeModel = this.experience.resources.items.officeModel;
        this.materials = {};
        this.textures = this.experience.resources.items;

        this.setModel();
        this.setMaterials();
        this.updateAllMaterials();
    }

    setModel() {
        this.scene.add(this.officeModel.scene);
    }

    setMaterials() {
        for (let i in this.experience.resources.items) {
            this.experience.resources.items[i].flipY = false;
            this.experience.resources.items[i].encoding = THREE.sRGBEncoding;

            this.materials[i] = new THREE.MeshBasicMaterial({ map: this.experience.resources.items[i] });
        }
    }

    updateAllMaterials() {
        this.officeModel.scene.traverse((child) => {
            if (child.name.startsWith('rest-roomsofa')) {
                child.material = this.materials.sofa;
            }
            else if (child.name.startsWith('floor')) {
                child.material = this.materials.floor;
            }
            else if (child.name.startsWith('cubes')) {
                child.material = this.materials.cubes;
            }
            else if (child.name.startsWith('desk')) {
                child.material = this.materials.desk;
            }
            else if (child.name.startsWith('screen')) {
                child.material = this.materials.screen;
            }
            else if (child.name.startsWith('Vase')) {
                child.material = this.materials.flowers
            }
            else if (child.name.startsWith('walls')) {
                child.material = this.materials.walls;
            }
            else if (child.name.startsWith('middle-office')) {
                child.material = this.materials.middleOffice;
            }
            else if (child.name.startsWith('chair')) {
                child.material = this.materials.chair;
            }
            else if (child.name.startsWith('bane-office')) {
                child.material = this.materials.baneOffice;
            }
            else if (child.name.startsWith('sparrow')) {
                child.material = this.materials.sparrowOffice;
            }
            else if (child.name.startsWith('colab-office')) {
                child.material = this.materials.kookaburraOffice;
            }
            else if (child.name.startsWith('director-')) {
                child.material = this.materials.directorOffice;
            }
            else if (child.name.startsWith('sana-')) {
                child.material = this.materials.sanaOffice;
            }
            else if (child.name.startsWith('kitchen')) {
                child.material = this.materials.kitchenAndToilet;
            }
            else {
                child.material = this.materials.restRoom;
            }
        })
    }
}