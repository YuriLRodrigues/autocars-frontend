'use client'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { Theme } from './themes'

type Config = {
  theme: Theme['name']
}

const configAtom = atomWithStorage<Config>('config', {
  theme: 'orange',
})

export function useConfig() {
  return useAtom(configAtom)
}
