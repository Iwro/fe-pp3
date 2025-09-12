import { User } from '@/app/utils/types'
import { atom } from 'jotai'

export const dateAtom = atom<Date>()
export const userAtom = atom<User>()