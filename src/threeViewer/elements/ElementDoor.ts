import * as THREE from 'three'
import { createSide } from './side'
import { createFace } from "../helpers/mathHelpers"
import { createTopPr } from './topProfile'
import type { IV3 } from '../helpers/mathHelpers'
import { createInner } from "./inner"
import type { IDataBox } from '../threeViewer'

export interface IDataTopProfile {
    v: number[],
    wso: IV3,
    wno: IV3,
    eso: IV3,
    eno: IV3,
    wsi: IV3,
    wni: IV3,
    esi: IV3,
    eni: IV3,
}

export class ElementDoor {
    public mesh: THREE.Mesh
    constructor(boxData: IDataBox, material: THREE.MeshPhongMaterial, material2: THREE.MeshPhongMaterial) {

        const { v, indInner, fullLen }  = this.createVerticies(boxData)
        if (v.length < 2500) {
            for (let i = 0; i < 2500 - v.length; ++i) {
                v.push(0)
            }
        }
        const uv = this.createUV(boxData, v) 
        
        if (uv.length < 2500) {
            for (let i = 0; i < 2500 - uv.length; ++i) {
                uv.push(0)
            }
        }

        const geometry = new THREE.BufferGeometry()
        const vF32 = new Float32Array(v)
        geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
        geometry.computeVertexNormals()
        const uvF32 = new Float32Array(uv)
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))

        geometry.rotateX(-Math.PI / 2)
        geometry.rotateY(-Math.PI)
        geometry.rotateZ(-Math.PI)

        geometry.clearGroups()
        geometry.addGroup(0, indInner / 3, 0)
        geometry.addGroup(indInner / 3, fullLen / 3, 1)

        this.mesh = new THREE.Mesh(geometry, [material, material2])
        this.setRotation(boxData.doorRotation / 180 * Math.PI)
        this.mesh.castShadow = true
    }

    redraw (newData: IDataBox) {
        const { v, indInner, fullLen} = this.createVerticies(newData)
        for (let i = 0; i < this.mesh.geometry.attributes.position.array.length; ++i) {
            this.mesh.geometry.attributes.position.array[i] = v[i]
        }
        this.mesh.geometry.attributes.position.needsUpdate = true

        this.mesh.geometry.clearGroups()
        this.mesh.geometry.addGroup(0, indInner / 3, 0)
        this.mesh.geometry.addGroup(indInner / 3, fullLen / 3, 1)

        this.mesh.geometry.rotateX(-Math.PI / 2)
        this.mesh.geometry.rotateY(-Math.PI)
        this.mesh.geometry.rotateZ(-Math.PI)

        const uv = this.createUV(newData, v)
        for (let i = 0; i < this.mesh.geometry.attributes.uv.array.length; ++i) {
            this.mesh.geometry.attributes.uv.array[i] = uv[i]
        }
        this.mesh.geometry.attributes.uv.needsUpdate = true
    }

    private createVerticies (boxData: IDataBox) {
        const v: number[] = []
        
        // side profile
        const s = createSide(boxData)
        v.push(...s.v)
        
        // top profile
        const t = createTopPr(boxData)
        v.push(...t.v)

        // beetween inner outer
        v.push(...createFace(s.wst, s.est, t.eso, t.wso))
        v.push(...createFace(s.wnt, s.wst, t.wso, t.wno))
        v.push(...createFace(t.eso, s.est, s.ent, t.eno))
        v.push(...createFace(t.wno, t.eno, s.ent, s.wnt))

        const indInner = v.length
        // inner
        const i = createInner(boxData, t)
        v.push(...i.v)

        // back 
        v.push(...createFace(
            [s.eso[0], 0, s.eso[2]],
            [s.wso[0], 0, s.wso[2]],
            [s.wno[0], 0, s.wno[2]],
            [s.eno[0], 0, s.eno[2]],
        ))

        console.log(v)
        for (let i = 0; i < v.length; ++i) {
            if (typeof v[i] !== 'number') {
                console.log('!!!!!', v[i])
            }
        }

        const fullLen = v.length

        return { v, indInner, fullLen }
    }

    createUV (boxData: IDataBox, v: number[]) {
        const uv: number[] = []
        for (let i = 0; i < v.length; i += 3) {
            uv.push(Math.abs(v[i] / boxData.w + v[i + 1] / 1000), Math.abs(v[i + 2] / boxData.d))
        }
        return uv
    }

    setRotation (v: number) {
        this.mesh.rotation.y = -v
    } 
}