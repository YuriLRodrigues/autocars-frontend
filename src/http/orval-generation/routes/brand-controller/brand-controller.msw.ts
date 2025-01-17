/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import { faker } from '@faker-js/faker'
import { HttpResponse, delay, http } from 'msw'

import type {
  CreateBrandResponseDto,
  DeleteBrandResponseDto,
  FindAllBrandsResponseDto,
  UpdateBrandResponseDto,
} from '../../schemas'

export const getCreateBrandResponseMock = (
  overrideResponse: Partial<CreateBrandResponseDto> = {},
): CreateBrandResponseDto => ({ message: faker.string.alpha(20), ...overrideResponse })

export const getUpdateBrandResponseMock = (
  overrideResponse: Partial<UpdateBrandResponseDto> = {},
): UpdateBrandResponseDto => ({ message: faker.string.alpha(20), ...overrideResponse })

export const getFindAllBrandsResponseMock = (): FindAllBrandsResponseDto[] =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    name: faker.string.alpha(20),
    logoUrl: faker.string.alpha(20),
    createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    updatedAt: faker.helpers.arrayElement([`${faker.date.past().toISOString().split('.')[0]}Z`, undefined]),
  }))

export const getDeleteBrandResponseMock = (
  overrideResponse: Partial<DeleteBrandResponseDto> = {},
): DeleteBrandResponseDto => ({ message: faker.string.alpha(20), ...overrideResponse })

export const getCreateBrandMockHandler = (
  overrideResponse?:
    | CreateBrandResponseDto
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<CreateBrandResponseDto> | CreateBrandResponseDto),
) => {
  return http.post('*/brand', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getCreateBrandResponseMock(),
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getUpdateBrandMockHandler = (
  overrideResponse?:
    | UpdateBrandResponseDto
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0],
      ) => Promise<UpdateBrandResponseDto> | UpdateBrandResponseDto),
) => {
  return http.patch('*/brand', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getUpdateBrandResponseMock(),
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAllBrandsMockHandler = (
  overrideResponse?:
    | FindAllBrandsResponseDto[]
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAllBrandsResponseDto[]> | FindAllBrandsResponseDto[]),
) => {
  return http.get('*/brand', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAllBrandsResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getDeleteBrandMockHandler = (
  overrideResponse?:
    | DeleteBrandResponseDto
    | ((
        info: Parameters<Parameters<typeof http.delete>[1]>[0],
      ) => Promise<DeleteBrandResponseDto> | DeleteBrandResponseDto),
) => {
  return http.delete('*/brand/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getDeleteBrandResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}
export const getBrandControllerMock = () => [
  getCreateBrandMockHandler(),
  getUpdateBrandMockHandler(),
  getFindAllBrandsMockHandler(),
  getDeleteBrandMockHandler(),
]
