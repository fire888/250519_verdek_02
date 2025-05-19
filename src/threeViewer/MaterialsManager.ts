import * as THREE from 'three'
import { ASSETS_KEYS, LoadManager } from "./LoadManager";

export class MaterialsManager {
    public redMirrorr: THREE.MeshPhongMaterial 
    public wood: THREE.MeshPhongMaterial
    public simple: THREE.MeshPhongMaterial

    constructor (assets: LoadManager['assets']) {
        if (assets[ASSETS_KEYS.W_MAP] !== null) {
            assets[ASSETS_KEYS.W_MAP].wrapS = assets[ASSETS_KEYS.W_MAP].wrapT = THREE.RepeatWrapping;
            assets[ASSETS_KEYS.W_MAP].repeat.set(2, 2)
            assets[ASSETS_KEYS.W_MAP].offset.set(0.5, 0.5)
        }

        if (assets[ASSETS_KEYS.W_AO_MAP] !== null) {
            assets[ASSETS_KEYS.W_AO_MAP].wrapS = assets[ASSETS_KEYS.W_AO_MAP].wrapT = THREE.RepeatWrapping;
            assets[ASSETS_KEYS.W_AO_MAP].repeat.set(2, 2)
            assets[ASSETS_KEYS.W_AO_MAP].offset.set(0.5, 0.5)
        }

        
        if (assets[ASSETS_KEYS.W_NORMAL_MAP] !== null) {
            assets[ASSETS_KEYS.W_NORMAL_MAP].wrapS = assets[ASSETS_KEYS.W_NORMAL_MAP].wrapT = THREE.RepeatWrapping;
            assets[ASSETS_KEYS.W_NORMAL_MAP].repeat.set(2, 2)
            assets[ASSETS_KEYS.W_NORMAL_MAP].offset.set(0.5, 0.5)
        }




        this.wood = new THREE.MeshPhongMaterial({
            color: 0x333333,
            lightMap: assets[ASSETS_KEYS.W_AO_MAP],
            lightMapIntensity: .35,
            normalMap: assets[ASSETS_KEYS.W_NORMAL_MAP],
            normalScale: new THREE.Vector2(.2, .2),
            envMap: assets[ASSETS_KEYS.SKY],
            map: assets[ASSETS_KEYS.W_MAP],
            reflectivity: .002,
            shininess: 100,
            specular: 0x333333,
            flatShading: true,
        })
        this.redMirrorr = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            envMap: assets[ASSETS_KEYS.SKY],
            reflectivity: 1,
            shininess: 50,
            specular: 0xffffff,
            flatShading: true,
        })
        this.simple = new THREE.MeshPhongMaterial({
            color: 0x111111,
        })
    }
}