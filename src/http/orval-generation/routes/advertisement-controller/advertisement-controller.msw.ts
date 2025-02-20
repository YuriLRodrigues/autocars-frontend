/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import { faker } from '@faker-js/faker'
import { HttpResponse, delay, http } from 'msw'

import type {
  CreateAdResponseDto,
  DeletedAdResponseDto,
  FindAdByIdResponseDto,
  FindAdvertisementsMetricsByUserIdResponseDto,
  FindAdvertisementsMetricsResponseDto,
  FindAllAdvertisements200,
  FindAllAdvertisementsByUserId200,
  FindAllManagerAdvertisements200,
  FindAllOwnAdvertisements200,
  FindAllSoldAdsResponseDto,
  MinimalAdvertisementDetailsDto,
} from '../../schemas'

export const getCreateAdvertisementResponseMock = (
  overrideResponse: Partial<CreateAdResponseDto> = {},
): CreateAdResponseDto => ({ message: faker.string.alpha(20), ...overrideResponse })

export const getDeleteAdvertisementResponseMock = (
  overrideResponse: Partial<DeletedAdResponseDto> = {},
): DeletedAdResponseDto => ({ message: faker.string.alpha(20), ...overrideResponse })

export const getFindAdByIdResponseMock = (
  overrideResponse: Partial<FindAdByIdResponseDto> = {},
): FindAdByIdResponseDto => ({
  km: faker.number.int({ min: undefined, max: undefined }),
  localization: faker.string.alpha(20),
  phone: faker.string.alpha(20),
  title: faker.string.alpha(20),
  description: faker.string.alpha(20),
  year: faker.number.int({ min: undefined, max: undefined }),
  details: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() =>
    faker.string.alpha(20),
  ),
  doors: faker.helpers.arrayElement(['Two', 'Three', 'Four'] as const),
  model: faker.helpers.arrayElement([
    'SUV',
    'Sedan',
    'Hatch',
    'Pickups',
    'Crossover',
    'Stilt',
    'Minivan',
    'Sport',
    'Van',
    'Coupe',
  ] as const),
  color: faker.helpers.arrayElement([
    'Red',
    'Black',
    'Green',
    'Silver',
    'White',
    'Blue',
    'Gray',
    'Yellow',
    'Orange',
    'Metalic',
    'Pink',
    'Purple',
    'Brown',
  ] as const),
  price: faker.number.int({ min: undefined, max: undefined }),
  soldStatus: faker.helpers.arrayElement(['Sold', 'Active', 'Reserved'] as const),
  salePrice: faker.number.int({ min: undefined, max: undefined }),
  gearBox: faker.helpers.arrayElement(['Automatic', 'Manual'] as const),
  fuel: faker.helpers.arrayElement(['Gasoline', 'Flex', 'Ethanol', 'Diesel', 'GNV', 'Eletric'] as const),
  capacity: faker.helpers.arrayElement(['Two', 'Four', 'Five', 'Six'] as const),
  images: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    url: faker.string.alpha(20),
    blurHash: faker.string.alpha(20),
    id: faker.string.alpha(20),
    isThumbnail: faker.string.alpha(20),
  })),
  brand: { id: faker.string.alpha(20), name: faker.string.alpha(20), logoUrl: faker.string.alpha(20) },
  user: {
    name: faker.string.alpha(20),
    avatar: faker.string.alpha(20),
    id: faker.string.alpha(20),
    address: {
      street: faker.string.alpha(20),
      city: faker.string.alpha(20),
      zipCode: faker.number.int({ min: undefined, max: undefined }),
    },
  },
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  ...overrideResponse,
})

export const getFindAllAdvertisementsByUserIdResponseMock = (): FindAllAdvertisementsByUserId200 => ({
  meta: {
    page: faker.number.int({ min: undefined, max: undefined }),
    perPage: faker.number.int({ min: undefined, max: undefined }),
    totalCount: faker.number.int({ min: undefined, max: undefined }),
    totalPages: faker.number.int({ min: undefined, max: undefined }),
  },
  results: faker.helpers.arrayElement([
    Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
      user: { profileImg: faker.string.alpha(20), username: faker.string.alpha(20), id: faker.string.alpha(20) },
      advertisement: {
        createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
        id: faker.string.alpha(20),
        title: faker.string.alpha(20),
        price: faker.number.int({ min: undefined, max: undefined }),
        salePrice: faker.number.int({ min: undefined, max: undefined }),
        soldStatus: faker.helpers.arrayElement(['Sold', 'Active', 'Reserved'] as const),
        km: faker.number.int({ min: undefined, max: undefined }),
        thumbnailUrl: faker.string.alpha(20),
        blurHash: faker.string.alpha(20),
        capacity: faker.helpers.arrayElement(['Two', 'Four', 'Five', 'Six'] as const),
        doors: faker.helpers.arrayElement(['Two', 'Three', 'Four'] as const),
        fuel: faker.helpers.arrayElement(['Gasoline', 'Flex', 'Ethanol', 'Diesel', 'GNV', 'Eletric'] as const),
        gearBox: faker.helpers.arrayElement(['Automatic', 'Manual'] as const),
        model: faker.helpers.arrayElement([
          'SUV',
          'Sedan',
          'Hatch',
          'Pickups',
          'Crossover',
          'Stilt',
          'Minivan',
          'Sport',
          'Van',
          'Coupe',
        ] as const),
      },
    })),
    undefined,
  ]),
})

export const getFindAllOwnAdvertisementsResponseMock = (): FindAllOwnAdvertisements200 => ({
  meta: {
    page: faker.number.int({ min: undefined, max: undefined }),
    perPage: faker.number.int({ min: undefined, max: undefined }),
    totalCount: faker.number.int({ min: undefined, max: undefined }),
    totalPages: faker.number.int({ min: undefined, max: undefined }),
  },
  results: faker.helpers.arrayElement([
    Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
      createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      id: faker.string.alpha(20),
      title: faker.string.alpha(20),
      price: faker.number.int({ min: undefined, max: undefined }),
      salePrice: faker.number.int({ min: undefined, max: undefined }),
      soldStatus: faker.helpers.arrayElement(['Sold', 'Active', 'Reserved'] as const),
      thumbnailUrl: faker.string.alpha(20),
      blurHash: faker.string.alpha(20),
      brand: { name: faker.string.alpha(20), logoUrl: faker.string.alpha(20), id: faker.string.alpha(20) },
    })),
    undefined,
  ]),
})

export const getFindAllManagerAdvertisementsResponseMock = (): FindAllManagerAdvertisements200 => ({
  meta: {
    page: faker.number.int({ min: undefined, max: undefined }),
    perPage: faker.number.int({ min: undefined, max: undefined }),
    totalCount: faker.number.int({ min: undefined, max: undefined }),
    totalPages: faker.number.int({ min: undefined, max: undefined }),
  },
  results: faker.helpers.arrayElement([
    Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
      createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
      id: faker.string.alpha(20),
      title: faker.string.alpha(20),
      price: faker.number.int({ min: undefined, max: undefined }),
      salePrice: faker.number.int({ min: undefined, max: undefined }),
      soldStatus: faker.helpers.arrayElement(['Sold', 'Active', 'Reserved'] as const),
      thumbnailUrl: faker.string.alpha(20),
      blurHash: faker.string.alpha(20),
      brand: { name: faker.string.alpha(20), logoUrl: faker.string.alpha(20), id: faker.string.alpha(20) },
      user: {
        id: faker.string.alpha(20),
        name: faker.string.alpha(20),
        avatar: faker.string.alpha(20),
        blurHash: faker.string.alpha(20),
      },
    })),
    undefined,
  ]),
})

export const getFindAdvertisementsMetricsByUserIdResponseMock = (
  overrideResponse: Partial<FindAdvertisementsMetricsByUserIdResponseDto> = {},
): FindAdvertisementsMetricsByUserIdResponseDto => ({
  activesAdvertisements: faker.number.int({ min: undefined, max: undefined }),
  reservedAdvertisements: faker.number.int({ min: undefined, max: undefined }),
  soldAdvertisements: faker.number.int({ min: undefined, max: undefined }),
  totalAdvertisements: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
})

export const getFindAdvertisementsMetricsResponseMock = (
  overrideResponse: Partial<FindAdvertisementsMetricsResponseDto> = {},
): FindAdvertisementsMetricsResponseDto => ({
  activesAdvertisements: faker.number.int({ min: undefined, max: undefined }),
  reservedAdvertisements: faker.number.int({ min: undefined, max: undefined }),
  soldAdvertisements: faker.number.int({ min: undefined, max: undefined }),
  totalSellers: faker.number.int({ min: undefined, max: undefined }),
  totalManagers: faker.number.int({ min: undefined, max: undefined }),
  totalAdvertisements: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
})

export const getFindAllAdvertisementsResponseMock = (): FindAllAdvertisements200 => ({
  meta: {
    page: faker.number.int({ min: undefined, max: undefined }),
    perPage: faker.number.int({ min: undefined, max: undefined }),
    totalCount: faker.number.int({ min: undefined, max: undefined }),
    totalPages: faker.number.int({ min: undefined, max: undefined }),
  },
  results: faker.helpers.arrayElement([
    Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
      logoUrl: faker.string.alpha(20),
      name: faker.string.alpha(20),
      brandId: faker.string.alpha(20),
      km: faker.number.int({ min: undefined, max: undefined }),
      price: faker.number.int({ min: undefined, max: undefined }),
      salePrice: faker.number.int({ min: undefined, max: undefined }),
      title: faker.string.alpha(20),
      advertisementId: faker.string.alpha(20),
      thumbnailUrl: faker.string.alpha(20),
      blurHash: faker.string.alpha(20),
      capacity: faker.helpers.arrayElement(['Two', 'Four', 'Five', 'Six'] as const),
      doors: faker.helpers.arrayElement(['Two', 'Three', 'Four'] as const),
      soldStatus: faker.helpers.arrayElement(['Sold', 'Active', 'Reserved'] as const),
      fuel: faker.helpers.arrayElement(['Gasoline', 'Flex', 'Ethanol', 'Diesel', 'GNV', 'Eletric'] as const),
      gearBox: faker.helpers.arrayElement(['Automatic', 'Manual'] as const),
      model: faker.helpers.arrayElement([
        'SUV',
        'Sedan',
        'Hatch',
        'Pickups',
        'Crossover',
        'Stilt',
        'Minivan',
        'Sport',
        'Van',
        'Coupe',
      ] as const),
      likes: faker.helpers.arrayElement([
        Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({})),
        undefined,
      ]),
    })),
    undefined,
  ]),
})

export const getFindAllSoldAdsResponseMock = (
  overrideResponse: Partial<FindAllSoldAdsResponseDto> = {},
): FindAllSoldAdsResponseDto => ({
  results: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    salePrice: faker.helpers.arrayElement([faker.number.int({ min: undefined, max: undefined }), undefined]),
    price: faker.number.int({ min: undefined, max: undefined }),
    updatedAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  })),
  ...overrideResponse,
})

export const getUpdateAdvertisementResponseMock = (
  overrideResponse: Partial<MinimalAdvertisementDetailsDto> = {},
): MinimalAdvertisementDetailsDto => ({
  logoUrl: faker.string.alpha(20),
  name: faker.string.alpha(20),
  brandId: faker.string.alpha(20),
  km: faker.number.int({ min: undefined, max: undefined }),
  price: faker.number.int({ min: undefined, max: undefined }),
  salePrice: faker.number.int({ min: undefined, max: undefined }),
  title: faker.string.alpha(20),
  advertisementId: faker.string.alpha(20),
  thumbnailUrl: faker.string.alpha(20),
  blurHash: faker.string.alpha(20),
  capacity: faker.helpers.arrayElement(['Two', 'Four', 'Five', 'Six'] as const),
  doors: faker.helpers.arrayElement(['Two', 'Three', 'Four'] as const),
  soldStatus: faker.helpers.arrayElement(['Sold', 'Active', 'Reserved'] as const),
  fuel: faker.helpers.arrayElement(['Gasoline', 'Flex', 'Ethanol', 'Diesel', 'GNV', 'Eletric'] as const),
  gearBox: faker.helpers.arrayElement(['Automatic', 'Manual'] as const),
  model: faker.helpers.arrayElement([
    'SUV',
    'Sedan',
    'Hatch',
    'Pickups',
    'Crossover',
    'Stilt',
    'Minivan',
    'Sport',
    'Van',
    'Coupe',
  ] as const),
  likes: faker.helpers.arrayElement([
    Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({})),
    undefined,
  ]),
  ...overrideResponse,
})

export const getUpdateSalePriceByAdvertisementResponseMock = (): string => faker.word.sample()

export const getCreateAdvertisementMockHandler = (
  overrideResponse?:
    | CreateAdResponseDto
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<CreateAdResponseDto> | CreateAdResponseDto),
) => {
  return http.post('*/advertisement', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getCreateAdvertisementResponseMock(),
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getDeleteAdvertisementMockHandler = (
  overrideResponse?:
    | DeletedAdResponseDto
    | ((
        info: Parameters<Parameters<typeof http.delete>[1]>[0],
      ) => Promise<DeletedAdResponseDto> | DeletedAdResponseDto),
) => {
  return http.delete('*/advertisement/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getDeleteAdvertisementResponseMock(),
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAdByIdMockHandler = (
  overrideResponse?:
    | FindAdByIdResponseDto
    | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<FindAdByIdResponseDto> | FindAdByIdResponseDto),
) => {
  return http.get('*/advertisement/details/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAdByIdResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAllAdvertisementsByUserIdMockHandler = (
  overrideResponse?:
    | FindAllAdvertisementsByUserId200
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAllAdvertisementsByUserId200> | FindAllAdvertisementsByUserId200),
) => {
  return http.get('*/advertisement/all/by-user/:userId', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAllAdvertisementsByUserIdResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAllOwnAdvertisementsMockHandler = (
  overrideResponse?:
    | FindAllOwnAdvertisements200
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAllOwnAdvertisements200> | FindAllOwnAdvertisements200),
) => {
  return http.get('*/advertisement/all/own', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAllOwnAdvertisementsResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAllManagerAdvertisementsMockHandler = (
  overrideResponse?:
    | FindAllManagerAdvertisements200
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAllManagerAdvertisements200> | FindAllManagerAdvertisements200),
) => {
  return http.get('*/advertisement/all/manager', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAllManagerAdvertisementsResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAdvertisementsMetricsByUserIdMockHandler = (
  overrideResponse?:
    | FindAdvertisementsMetricsByUserIdResponseDto
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAdvertisementsMetricsByUserIdResponseDto> | FindAdvertisementsMetricsByUserIdResponseDto),
) => {
  return http.get('*/advertisement/owner-metrics', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAdvertisementsMetricsByUserIdResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAdvertisementsMetricsMockHandler = (
  overrideResponse?:
    | FindAdvertisementsMetricsResponseDto
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAdvertisementsMetricsResponseDto> | FindAdvertisementsMetricsResponseDto),
) => {
  return http.get('*/advertisement/admin-metrics', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAdvertisementsMetricsResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAllAdvertisementsMockHandler = (
  overrideResponse?:
    | FindAllAdvertisements200
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAllAdvertisements200> | FindAllAdvertisements200),
) => {
  return http.get('*/advertisement/all', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAllAdvertisementsResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getFindAllSoldAdsMockHandler = (
  overrideResponse?:
    | FindAllSoldAdsResponseDto
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<FindAllSoldAdsResponseDto> | FindAllSoldAdsResponseDto),
) => {
  return http.get('*/advertisement/sold-ads', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getFindAllSoldAdsResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getUpdateAdvertisementMockHandler = (
  overrideResponse?:
    | MinimalAdvertisementDetailsDto
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0],
      ) => Promise<MinimalAdvertisementDetailsDto> | MinimalAdvertisementDetailsDto),
) => {
  return http.patch('*/advertisement/update/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getUpdateAdvertisementResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}

export const getUpdateSalePriceByAdvertisementMockHandler = (
  overrideResponse?: string | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<string> | string),
) => {
  return http.patch('*/advertisement/update/sale-price/:id', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getUpdateSalePriceByAdvertisementResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })
}
export const getAdvertisementControllerMock = () => [
  getCreateAdvertisementMockHandler(),
  getDeleteAdvertisementMockHandler(),
  getFindAdByIdMockHandler(),
  getFindAllAdvertisementsByUserIdMockHandler(),
  getFindAllOwnAdvertisementsMockHandler(),
  getFindAllManagerAdvertisementsMockHandler(),
  getFindAdvertisementsMetricsByUserIdMockHandler(),
  getFindAdvertisementsMetricsMockHandler(),
  getFindAllAdvertisementsMockHandler(),
  getFindAllSoldAdsMockHandler(),
  getUpdateAdvertisementMockHandler(),
  getUpdateSalePriceByAdvertisementMockHandler(),
]
