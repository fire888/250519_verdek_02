import { Studio } from './Studio'
import { Ticker } from './Ticker'
import { LoadManager } from './LoadManager'
import { MaterialsManager } from './MaterialsManager'
import { Elem } from './elements/Elem'
import { FacetNames } from './CONSTANTS/FASETS'
import { BOX_DATA } from './CONSTANTS/CONSTANTS'

export type Root = {
    studio: Studio,
    ticker: Ticker,
    loadManager: LoadManager,
    materialsManager: MaterialsManager,
    elems: Elem[],
}

export interface IDataBox {
    currentBox: number
    w: number,
    d: number,
    h: number,
    facetS: { type: FacetNames },
    facetT: { type: FacetNames, offsetX: number, offsetZ: number },
    facetInner: { type: FacetNames, count: number, rotationY: number },
    doorRotation: number,
}

let root: Root | null = null

const createRoot = async (divWrapper: HTMLElement) => {
    const studio = new Studio()
    studio.setDomParent(divWrapper)
    const ticker = new Ticker()
    ticker.on(() => {
        studio.render()
    })
    const loadManager = new LoadManager()
    await loadManager.loadAllAssets()

    const materialsManager = new MaterialsManager(loadManager.assets)
    
    const elems: Elem[] = []
    for (let i = 0; i < 5; ++i) {
        const elem = new Elem(BOX_DATA, materialsManager.wood, materialsManager.redMirrorr)
        studio.add(elem.mesh)
        elem.mesh.position.x = -3000 + 1000 * i
        elems.push(elem) 
    }

    let fullW = 0
    for (let i = 0; i < elems.length; ++i) {
        fullW += elems[i].w
    }

    let currW = 0
    for (let i = 0; i < elems.length; ++i) {
        elems[i].mesh.position.x = currW - fullW / 2 + (i * 20)
        currW += elems[i].w
    }

    ticker.start()

    return  {
      studio,
      loadManager,
      ticker,
      materialsManager,
      elems,
    }
} 

export const changeParams = (newData: IDataBox) => {
    if (root === null || root.elems === undefined) {
        return
    }
    
    root.elems[+newData.currentBox - 1].redraw(newData)

    let fullW = 0
    for (let i = 0; i < root.elems.length; ++i) {
        fullW += root.elems[i].w
    }

    let currW = 0
    for (let i = 0; i < root.elems.length; ++i) {
        root.elems[i].mesh.position.x = currW - fullW / 2 + (i * 20)  //+ root.elems[i].w + currW
        currW += root.elems[i].w
    }
}

export const createThreeViewer = async (divWrapper: HTMLElement) => {
    if (root === null) { 
        root = await createRoot(divWrapper)
    } else {
        root.studio.setDomParent(divWrapper)
    }
    return () => {
        root?.studio.removeDomParent()
    }
}
