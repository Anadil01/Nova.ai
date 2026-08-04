'use client'
import useSWR from 'swr'
import { api } from '@/lib/api/client'
import type { NavUser } from '@/types'

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<{ user: NavUser }>(
    '/users/me',
    () => api.get('/users/me'),
    { revalidateOnFocus: false }
  )

  return {
    user:      data?.user ?? null,
    isLoading,
    isError:   !!error,
    mutate,
  }
}