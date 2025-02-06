/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import { faker } from '@faker-js/faker'
import { HttpResponse, delay, http } from 'msw'

import type { FindAllFavorites200, FindAllFavoritesByUserId200 } from '../../schemas'

export const getFindAllFavoritesByUserIdResponseMock = (): FindAllFavoritesByUserId200 => ({
  meta: {
    page: faker.number.int({ min: undefined, max: undefined }),
    perPage: faker.number.int({ min: undefined, max: undefined }),
    totalCount: faker.number.int({ min: undefined, max: undefined }),
    totalPages: faker.number.int({ min: undefined, max: undefined }),
  },
  results: faker.helpers.arrayElement([
    Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
      id: faker.string.alpha(20),
      advertisement: {
        id: faker.string.alpha(20),
        title: faker.string.alpha(20),
        thumbnailUrl: faker.string.alpha(20),
        blurHash: faker.string.alpha(20),
        price: faker.number.int({ min: undefined, max: undefined }),
        km: faker.number.int({ min: undefined, max: undefined }),
        doors: faker.string.alpha(20),
        gearBox: faker.string.alpha(20),
        fuel: faker.string.alpha(20),
        capacity: faker.string.alpha(20),
        soldStatus: faker.string.alpha(20),
      },
    })),
    undefined,
  ]),
})

export const getFindAllFavoritesResponseMock = (): FindAllFavorites200 => ({
  meta: {
    page: faker.number.int({ min: undefined, max: undefined }),
    perPage: faker.number.int({ min: undefined, max: undefined }),
    totalCount: faker.number.int({ min: undefined, max: undefined }),
    totalPages: faker.number.int({ min: undefined, max: undefined }),
  },
  results: faker.helpers.arrayElement([
    Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
      id: faker.string.alpha(20),
      advertisement: {
        createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
        id: faker.string.alpha(20),
        title: faker.string.alpha(20),
        price: faker.number.int({ min: undefined, max: undefined }),
        salePrice: faker.number.int({ min: undefined, max: undefined }),
        soldStatus: faker.helpers.arrayElement(['Sold', 'Active', 'Reserved'] as const),
        thumbnail: faker.string.alpha(20),
      },
      user: {
        name: faker.string.alpha(20),
        id: faker.string.alpha(20),
        address: {
          street: faker.string.alpha(20),
          city: faker.string.alpha(20),
          zipCode: faker.number.int({ min: undefined, max: undefined }),
        },
      },
      favoritesCount: faker.number.int({ min: undefined, max: undefined }),
      createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
    })),
    undefined,
  ]),
})

export const getFindDistinctFavoritesCountResponseMock = (): number => faker.number.int()

export const getFindFavoritesCountByAdvertisementResponseMock = (): number => faker.number.int()

export const getFindFavoritesCountResponseMock = (): number => faker.number.int()

export const getHandleFavoriteResponseMock = (): string => faker.word.sample()

export const getFindAllFavoritesByUserIdMockHandler = (
  overrideResponse?:
    | FindAllFavoritesByUserId200
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAllFavoritesByUserId200> | FindAllFavoritesByUserId200),
) => {
  return http.get('*/favorite', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAllFavoritesByUserIdResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAllFavoritesMockHandler = (
  overrideResponse?:
    | FindAllFavorites200
    | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<FindAllFavorites200> | FindAllFavorites200),
) => {
  return http.get('*/favorite/admin', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAllFavoritesResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindDistinctFavoritesCountMockHandler = (
  overrideResponse?: number | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<number> | number),
) => {
  return http.get('*/favorite/distinct-count', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindDistinctFavoritesCountResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindFavoritesCountByAdvertisementMockHandler = (
  overrideResponse?: number | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<number> | number),
) => {
  return http.get('*/favorite/count/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindFavoritesCountByAdvertisementResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindFavoritesCountMockHandler = (
  overrideResponse?: number | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<number> | number),
) => {
  return http.get('*/favorite/count', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindFavoritesCountResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getHandleFavoriteMockHandler = (
  overrideResponse?: string | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<string> | string),
) => {
  return http.patch('*/favorite/handle-favorite/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getHandleFavoriteResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}
export const getFavoriteControllerMock = () => [
  getFindAllFavoritesByUserIdMockHandler(),
  getFindAllFavoritesMockHandler(),
  getFindDistinctFavoritesCountMockHandler(),
  getFindFavoritesCountByAdvertisementMockHandler(),
  getFindFavoritesCountMockHandler(),
  getHandleFavoriteMockHandler(),
]
