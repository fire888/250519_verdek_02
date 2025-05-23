import * as THREE from 'three'
import type { IDataBox } from '../threeViewer'

const createBoxGeometry = (params: IDataBox) => {
    let v: number[] = []
    let vG: number[] = []

    const zBox = -300
    const tBox = 30        
    const w = params.w
    const h = params.d

    v = []
    // vG = []

    v.push(
        // left
        0, 0, zBox,    // 0
        0, 0, 0,       // 1
        0, h, 0,       // 2
        0, h, zBox,    // 3

        // top
        0, h, 0,       // 4
        w, h, 0,       // 5
        w, h, zBox,    // 6
        0, h, zBox,    // 7

        //right
        w, 0, 0,       // 8
        w, 0, zBox,    // 9
        w, h, zBox,    // 10
        w, h, 0,       // 11

        //bottom
        w, 0, 0,       // 12
        0, 0, 0,       // 13
        0, 0, zBox,    // 14
        w, 0, zBox,    // 15

        // back
        w, 0, zBox,    // 16
        0, 0, zBox,    // 17
        0, h, zBox,    // 18
        w, h, zBox,    // 19
    )

    v.push(
        /** inner */
        
        // bottom
        tBox, tBox, 0,               // 20
        w - tBox, tBox, 0,           // 21
        w - tBox, tBox, zBox + tBox, // 22
        tBox, tBox, zBox + tBox,     // 23

        // left
        tBox, tBox, 0,               // 24
        tBox, tBox, zBox + tBox,     // 25
        tBox, h - tBox, zBox + tBox, // 26
        tBox, h - tBox, 0,           // 27

        // right
        w - tBox, tBox, zBox + tBox, // 28
        w - tBox, tBox, 0,           // 29
        w - tBox, h - tBox, 0,       // 30
        w - tBox, h - tBox, zBox + tBox, // 31

        // back
        tBox, tBox, zBox + tBox,     // 32
        w - tBox, tBox, zBox + tBox, // 33
        w - tBox, h - tBox, zBox + tBox, // 34
        tBox, h - tBox, zBox + tBox, // 35

        // top
        w - tBox, h - tBox, 0,       // 36
        tBox, h - tBox, 0,           // 37
        tBox, h - tBox, zBox + tBox, // 38
        w - tBox, h - tBox, zBox + tBox, // 39
    )

    // vG.push(
    //     0, 0, 0, // 38
    //     0, h, 0, // 
    //     w, h, 0,
    //     w, 0, 0,
    //     0, 0, 0,

    //     0, 0, zBox,
    //     0, h, zBox,
    //     0, h, 0,
    //     0, h, zBox,
    //     w, h, zBox,
    //     w, h, 0,
    //     w, h, zBox,
    //     w, 0, zBox,
    //     w, 0, 0,
    //     w, 0, zBox,
    //     0, 0, zBox,
    // )

    const i = []
    const uv = []

    i.push(
        // outer
        0, 1, 2, 0, 2, 3,         // left
        4, 5, 6, 4, 6, 7,         // top
        8, 9, 10, 8, 10, 11,      // right
        12, 13, 14, 12, 14, 15,   // bottom
        16, 17, 18, 16, 18, 19,   // back

        // inner
        20, 21, 22, 20, 22, 23,
        24, 25, 26, 24, 26, 27,
        28, 29, 30, 28, 30, 31,
        32, 33, 34, 32, 34, 35,
        36, 37, 38, 36, 38, 39,

        // front
        1, 8, 21, 1, 21, 20,    // bottom
        8, 11, 30,8, 30, 29,    // right
        37, 36, 5, 37, 5, 4,    // top
        1, 24, 27, 1, 27, 2     // left
    )

    const uvPolygon = [0, 0, 1, 0, 1, 1, 0, 1]

    uv.push(
        ...uvPolygon,
        ...uvPolygon,
        ...uvPolygon,
        ...uvPolygon,
        ...uvPolygon,
        ...uvPolygon,
        ...uvPolygon,
        ...uvPolygon,
        ...uvPolygon,
        ...uvPolygon,
    )

    return { v, uv, i }
}


export class ElementSideWalls { 
    mesh: THREE.Mesh
    constructor(params: IDataBox, material: THREE.MeshPhongMaterial) {
        const { v, uv, i } = createBoxGeometry(params)
        
        const geometry = new THREE.BufferGeometry()
        const vF32 = new Float32Array(v)
        geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
        const uvF32 = new Float32Array(uv)
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))
        geometry.setIndex(i)
        geometry.computeVertexNormals()
        
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
    }

    redraw (newData: IDataBox) {
        const { v, uv } = createBoxGeometry(newData)

        for (let i = 0; i < this.mesh.geometry.attributes.position.array.length; ++i) {
            this.mesh.geometry.attributes.position.array[i] = v[i]
        }
        this.mesh.geometry.attributes.position.needsUpdate = true

        for (let i = 0; i < this.mesh.geometry.attributes.uv.array.length; ++i) {
            this.mesh.geometry.attributes.uv.array[i] = uv[i]
        }
        this.mesh.geometry.attributes.uv.needsUpdate = true
    }
}
