import * as THREE from 'three'

import nx from '../assets/nx.png'
import px from '../assets/px.png'
import nz from '../assets/nz.png'
import pz from '../assets/pz.png'
import ny from '../assets/ny.png'
import py from '../assets/py.png'

import wMap from '../assets/wood/streaky-plywood_albedo.png'
import wAOMap from '../assets/wood/streaky-plywood_ao.png'
import wHeightMap from '../assets/wood/streaky-plywood_height.png'
import wNormalMap from '../assets/wood/streaky-plywood_normal-ogl.png'

export enum ASSETS_KEYS {
    SKY = 'SKY',
    W_MAP = 'W_MAP',
    W_AO_MAP = 'W_AO_MAP',
    W_NORMAL_MAP = 'W_NOMAL_MAP',
    W_HEIGHT_MAP = 'W_HEIGHT_MAP',
}

enum TYPES_ASSETS {
  IMG = 'IMGS',
  IMGS_FOR_CUBE = 'IMGS_FOR_CUB',
}

interface IDataAssetTexture {
    type: TYPES_ASSETS.IMG,
    filename: string,
    key: ASSETS_KEYS,
}

interface IDataAssetCubeTexture {
    type: TYPES_ASSETS.IMGS_FOR_CUBE,
    filename: [string, string, string, string, string, string]
    key: ASSETS_KEYS,
}

type DataAsset = IDataAssetTexture | IDataAssetCubeTexture 
type DataAssets = DataAsset[]

type ASSETS = {
    [k: string]: THREE.Texture | THREE.CubeTexture | null
}

const ASSETS_TO_LOAD: DataAssets = [
    {
        type: TYPES_ASSETS.IMGS_FOR_CUBE,
        filename: [px, nx, py, ny, nz, pz],
        key: ASSETS_KEYS.SKY
    },
    {
        type: TYPES_ASSETS.IMG,
        filename: wMap,
        key: ASSETS_KEYS.W_MAP
    },
    {
        type: TYPES_ASSETS.IMG,
        filename: wAOMap,
        key: ASSETS_KEYS.W_AO_MAP
    },
    {
        type: TYPES_ASSETS.IMG,
        filename: wNormalMap,
        key: ASSETS_KEYS.W_NORMAL_MAP
    },
    {
        type: TYPES_ASSETS.IMG,
        filename: wHeightMap,
        key: ASSETS_KEYS.W_HEIGHT_MAP
    },
]

export class LoadManager {
    texLoader: THREE.TextureLoader
    cubeLoader: THREE.CubeTextureLoader

    public assets: ASSETS = {}

    constructor () {
        this.texLoader  = new THREE.TextureLoader()
        this.cubeLoader = new THREE.CubeTextureLoader()
    }

    public async loadAllAssets() {
        await Promise.all(ASSETS_TO_LOAD.map(this.loadAsset.bind(this)))
    }

    private loadAsset(asset: DataAsset) {
        const { type, filename, key } = asset

        if (type === TYPES_ASSETS.IMGS_FOR_CUBE) {
            return new Promise((resolve, reject) =>
                this.cubeLoader.load(
                    filename,                          
                    (texture: THREE.Texture) => { 
                        this.assets[key] = texture
                        resolve(null)
                    },
                    undefined,                             
                    err => reject(err)                     
                )
            );
        }

        if (type === TYPES_ASSETS.IMG) {
            return new Promise((resolve, reject) =>
                this.texLoader.load(
                    filename,                  
                    (texture: THREE.Texture) => { 
                        this.assets[key] = texture
                        resolve(null)
                    },
                    undefined,
                    err => reject(err)
                )
            );
        }

        return Promise.reject(new Error(`Неизвестный тип: ${type}`));
    }
}