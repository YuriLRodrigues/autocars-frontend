/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import type { LikeEntity } from './likeEntity'
import type { MinimalAdvertisementDetailsDtoCapacity } from './minimalAdvertisementDetailsDtoCapacity'
import type { MinimalAdvertisementDetailsDtoDoors } from './minimalAdvertisementDetailsDtoDoors'
import type { MinimalAdvertisementDetailsDtoFuel } from './minimalAdvertisementDetailsDtoFuel'
import type { MinimalAdvertisementDetailsDtoGearBox } from './minimalAdvertisementDetailsDtoGearBox'
import type { MinimalAdvertisementDetailsDtoModel } from './minimalAdvertisementDetailsDtoModel'
import type { MinimalAdvertisementDetailsDtoSoldStatus } from './minimalAdvertisementDetailsDtoSoldStatus'

export interface MinimalAdvertisementDetailsDto {
  /** Brand logo URL */
  logoUrl: string
  /** Brand name */
  name: string
  /** Unique brand ID */
  brandId: string
  /** Vehicle mileage */
  km: number
  /** Vehicle price */
  price: number
  /** Vehicle sale price */
  salePrice: number
  /** Advertisement title */
  title: string
  /** Unique advertisement ID */
  advertisementId: string
  /** Advertisement thumbnail URL */
  thumbnailUrl: string
  /** BlurHash for the image, used for low-quality image preview */
  blurHash: string
  /** Vehicle capacity */
  capacity: MinimalAdvertisementDetailsDtoCapacity
  /** Number of doors */
  doors: MinimalAdvertisementDetailsDtoDoors
  /** Status of advertisement */
  soldStatus: MinimalAdvertisementDetailsDtoSoldStatus
  /** Fuel type */
  fuel: MinimalAdvertisementDetailsDtoFuel
  /** Gearbox type */
  gearBox: MinimalAdvertisementDetailsDtoGearBox
  /** Model type */
  model: MinimalAdvertisementDetailsDtoModel
  /** Advertisement likes */
  likes?: LikeEntity[]
}
