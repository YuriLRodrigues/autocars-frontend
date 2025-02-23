/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import type { BrandDto } from './brandDto'
import type { FindAdByIdResponseDtoCapacity } from './findAdByIdResponseDtoCapacity'
import type { FindAdByIdResponseDtoColor } from './findAdByIdResponseDtoColor'
import type { FindAdByIdResponseDtoDoors } from './findAdByIdResponseDtoDoors'
import type { FindAdByIdResponseDtoFuel } from './findAdByIdResponseDtoFuel'
import type { FindAdByIdResponseDtoGearBox } from './findAdByIdResponseDtoGearBox'
import type { FindAdByIdResponseDtoModel } from './findAdByIdResponseDtoModel'
import type { FindAdByIdResponseDtoSoldStatus } from './findAdByIdResponseDtoSoldStatus'
import type { ImageDto } from './imageDto'
import type { UserDto } from './userDto'

export interface FindAdByIdResponseDto {
  /** The mileage of the vehicle */
  km: number
  /** The location of the advertisement */
  localization: string
  /** The contact phone number */
  phone: string
  /** The title of the advertisement */
  title: string
  /** The description of the advertisement */
  description: string
  /** The year of the vehicle */
  year: number
  /** Optional additional details about the vehicle */
  details: string[]
  /** The number of doors of the vehicle */
  doors: FindAdByIdResponseDtoDoors
  /** The model/type of the vehicle */
  model: FindAdByIdResponseDtoModel
  /** The color of the vehicle */
  color: FindAdByIdResponseDtoColor
  /** The price of the vehicle */
  price: number
  /** The sold status of the vehicle */
  soldStatus: FindAdByIdResponseDtoSoldStatus
  /** The sale price of the vehicle (if applicable) */
  salePrice: number
  /** The type of gearbox in the vehicle */
  gearBox: FindAdByIdResponseDtoGearBox
  /** The type of fuel of the vehicle */
  fuel: FindAdByIdResponseDtoFuel
  /** The seating capacity of the vehicle */
  capacity: FindAdByIdResponseDtoCapacity
  /** Array of image URLs */
  images: ImageDto[]
  /** Details about the vehicle brand */
  brand: BrandDto
  /** Details about the user who created the advertisement */
  user: UserDto
  /** The creation date of the advertisement */
  createdAt: string
  /** The last update date of the advertisement (if applicable) */
  updatedAt: string
}
