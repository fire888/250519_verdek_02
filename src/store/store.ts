// простой реактивный стор без сторонних библиотек
import { reactive } from 'vue';
import { FacetNames } from '../threeViewer/elements/FASETS'
import type { IDataBox } from '../threeViewer/threeViewer'

const boxes = []
for (let i = 0; i < 5; ++i) {
    const b: IDataBox = {
        currentBox: i + '', 
        w: 300,
        d: 700,
        h: 30,
        facetS: {
            type: FacetNames.FACET11,
        },
        facetT: {
            type: FacetNames.FACET22,
            offsetX: 57, 
            offsetZ: 57, 
        },
        facetInner: {
            type: FacetNames.FACET44,
            count: 3,
            rotationY: '0',
        },
        doorRotation: 10,
    } 
    boxes.push(b)
} 

export type IStore = {
    currentBox: number
    boxes: IDataBox[]   
}

export const storeBoxesData = {
    currentBox: '3',
    boxes,
}

export const storeBoxes = reactive(storeBoxesData)

