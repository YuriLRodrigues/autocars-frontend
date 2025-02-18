/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import type { OwnAdvertisementBrandDto } from './ownAdvertisementBrandDto'
import type { OwnAdvertisementsDtoSoldStatus } from './ownAdvertisementsDtoSoldStatus'

export interface OwnAdvertisementsDto {
  /** Creation date of the advertisement */
  createdAt: string
  /** Unique identifier of the advertisement */
  id: string
  /** Title of the advertisement */
  title: string
  /** Price of the advertisement */
  price: number
  /** Sale price of the advertisement */
  salePrice: number
  /** Status of the advertisement (available, sold, reserved) */
  soldStatus: OwnAdvertisementsDtoSoldStatus
  /** URL of the ad thumbnail */
  thumbnailUrl: string
  /** BlurHash for the image, used for low-quality image preview */
  blurHash: string
  /** Brand details of the advertisement */
  brand: OwnAdvertisementBrandDto
}
