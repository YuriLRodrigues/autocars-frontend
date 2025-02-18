/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import type { AdvertisementDto } from './advertisementDto'
import type { UserDto } from './userDto'

export interface FindAllFavoritesResponseDto {
  /** Unique identifier of the favorite details */
  id: string
  /** Details of the advertisement related to the favorite */
  advertisement: AdvertisementDto
  /** Details of the user who favorited the advertisement */
  user: UserDto
  /** Count of users who have favorited this advertisement */
  favoritesCount: number
  /** Date when the favorite was created */
  createdAt: string
}
