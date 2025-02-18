/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import type { FindAllAdvertisementsColor } from './findAllAdvertisementsColor'
import type { FindAllAdvertisementsCreatedAt } from './findAllAdvertisementsCreatedAt'
import type { FindAllAdvertisementsFuel } from './findAllAdvertisementsFuel'
import type { FindAllAdvertisementsModel } from './findAllAdvertisementsModel'
import type { FindAllAdvertisementsSoldStatus } from './findAllAdvertisementsSoldStatus'

export type FindAllAdvertisementsParams = {
  /**
   * Page for pagination
   */
  page?: number
  /**
   * Limit for pagination
   */
  limit?: number
  /**
   * Filter advertisements by title
   */
  title?: string
  /**
   * Filter advertisements by sold status
   */
  soldStatus?: FindAllAdvertisementsSoldStatus
  /**
   * Filter advertisements by fuel type
   */
  fuel?: FindAllAdvertisementsFuel
  /**
   * Filter advertisements by color
   */
  color?: FindAllAdvertisementsColor
  /**
   * Filter advertisements by model
   */
  model?: FindAllAdvertisementsModel
  /**
   * Filter advertisements by price
   */
  price?: number
  /**
   * Filter advertisements by max year
   */
  year?: number
  /**
   * Sort advertisements by creation date in ascending or descending order
   */
  createdAt?: FindAllAdvertisementsCreatedAt
  /**
   * Filter advertisements by brand ID
   */
  brandId?: string
  /**
   * Filter advertisements by max km
   */
  km?: number
}
