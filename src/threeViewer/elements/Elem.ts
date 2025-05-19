import * as THREE from 'three'
import type { IDataBox } from '../threeViewer';
import { ElementDoor } from './ElementDoor';
import { ElementSideWalls } from './ElementSideWalls';

export class Elem {
    mesh: THREE.Object3D
    w: number = 0
    elementDoor: ElementDoor
    elementSideWalls: ElementSideWalls 
    constructor(data: IDataBox, material: THREE.MeshPhongMaterial, material2: THREE.MeshPhongMaterial) {
        this.mesh = new THREE.Object3D()

        this.w = data.w

        this.elementDoor = new ElementDoor(data, material, material2)
        this.mesh.add(this.elementDoor.mesh)

        this.elementSideWalls = new ElementSideWalls(data, material)
        this.mesh.add(this.elementSideWalls.mesh)
    }

    redraw (newData: IDataBox) {
        this.w = newData.w
        this.elementDoor.redraw(newData)
        this.elementDoor.setRotation(newData.doorRotation / 180 * Math.PI)
        this.elementSideWalls.redraw(newData)
    }
}