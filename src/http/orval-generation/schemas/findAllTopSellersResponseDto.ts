/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */

export interface FindAllTopSellersResponseDto {
  /** The unique user ID */
  id: string
  /** The URL for the user avatar */
  profileImg: string
  /** The user's full name */
  name: string
  /** The user roles */
  roles: string[]
  /** The total amount of sales made by the user */
  amountSold: number
  /** The total quantity of items sold by the user */
  quantitySold: number
}
