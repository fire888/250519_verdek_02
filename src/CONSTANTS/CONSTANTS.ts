import { FacetNames } from './FASETS'
import type { IDataBox } from '../threeViewer/threeViewer'

export const BOX_DATA: IDataBox = {
    currentBox: 3, 
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
        rotationY: 0,
    },
    doorRotation: 10,
}

