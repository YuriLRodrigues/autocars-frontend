/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import type { FindAllOwnAdvertisementsSoldStatus } from './findAllOwnAdvertisementsSoldStatus'
import type { FindAllOwnAdvertisementsCreatedAt } from './findAllOwnAdvertisementsCreatedAt'

export type FindAllOwnAdvertisementsParams = {
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
  soldStatus?: FindAllOwnAdvertisementsSoldStatus
  /**
   * Filter advertisements by price
   */
  price?: number
  /**
   * Sort advertisements by creation date in ascending or descending order
   */
  createdAt?: FindAllOwnAdvertisementsCreatedAt
  /**
   * Filter advertisements created from this start date (ISO 8601 format)
   */
  startDate?: string
  /**
   * Filter advertisements created up to this end date (ISO 8601 format)
   */
  endDate?: string
  /**
   * Filter advertisements by brand ID
   */
  brandId?: string
}
