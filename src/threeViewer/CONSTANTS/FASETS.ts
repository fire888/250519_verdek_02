/*============================*
 *  Общие типы и хелперы      *
 *============================*/

import type { IV2 } from '../helpers/mathHelpers'

export enum FacetNames {
  FACET11 = 'FACET11',
  FACET12 = 'FACET12',
  FACET13 = 'FACET13',
  FACET14 = 'FACET14',
  FACET22 = 'FACET22',
  FACET33 = 'FACET33',
  FACET44 = 'FACET44',
}

export interface IFacet<Name extends FacetNames = FacetNames> {
  readonly name: Name
  readonly h: number
  readonly w: number
  readonly points: readonly IV2[]
}

export type FacetMap = { [K in FacetNames]: IFacet<K> }

const FACET11: IFacet<FacetNames.FACET11> = (() => {
    const startAngle = Math.PI
    const endAngle = Math.PI * 1.5
    const n = 7
    const R = 6
    const step = Math.abs(endAngle - startAngle) / (n - 1)

    const arr: IV2[] = [[0, 0]]
    for (let i = 1; i < n; ++i) {
        arr.push([
            Math.cos(startAngle + (i * step)) * R + R,
            Math.sin(startAngle - (i * step)) * R,
        ])
    }
    arr.push([
        arr[arr.length - 1][0],
        arr[arr.length - 1][1] + 1.5,
    ])

  return {
    type: 'dataFacetPoints',
    name: FacetNames.FACET11,
    h: 7.5,
    w: 6,
    points: arr,
  }
})()

const FACET12: IFacet<FacetNames.FACET12> = {
  name: FacetNames.FACET12,
  h: 10,
  w: 10,
  points: [
    [0, 0],
    [5, 5],
    [10, 10],
  ],
}

const FACET13: IFacet<FacetNames.FACET13> = {
  name: FacetNames.FACET13,
  h: 10,
  w: 10,
  points: [
    [0, 0],
    [10, 0],
    [10, 10],
  ],
}

const FACET14: IFacet<FacetNames.FACET14> = (() => {
  const startAngle = Math.PI * 1.5
  const endAngle = Math.PI
  const n = 12
  const R = 6
  const step = (endAngle - startAngle) / (n - 1)

  const points: IV2[] = [[0, 0]]
  for (let i = 1; i < n; i++) {
    points.push([
      Math.cos(startAngle + i * step) * R + R,
      Math.sin(startAngle + i * step) * R,
    ])
  }
  points.push([points.at(-1)![0], points.at(-1)![1] + 1.5])

  return {
    name: FacetNames.FACET14,
    h: 7.5,
    w: 6,
    points,
  }
})()

const FACET22: IFacet<FacetNames.FACET22> = {
  name: FacetNames.FACET22,
  h: 9,
  w: 26,
  points: [
    [0, 0],
    [0, -1],
    [13, -9],
    [26, -1],
    [26, 0],
  ],
}

const FACET33: IFacet<FacetNames.FACET33> = {
  name: FacetNames.FACET33,
  h: 9,
  w: 41,
  points: [
    [0, 0],
    [0, -1],
    [1, -1],
    [14, -9],
    [29, -9],
    [39, -1],
    [41, -1],
    [41, 0],
  ],
}

const FACET44: IFacet<FacetNames.FACET44> = {
  name: FacetNames.FACET44,
  h: 1.5,
  w: 4,
  points: [
    [0, 0],
    [2, -1.5],
    [4, 0],
  ],
}

export const FACETS: FacetMap = {
  FACET11,
  FACET12,
  FACET13,
  FACET14,
  FACET22,
  FACET33,
  FACET44,
}