"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  rating: number
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'HYDRATE'; payload: WishlistItem[] }

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.find(i => i.id === action.payload.id)) return state
      return { items: [...state.items, action.payload] }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.id !== action.payload) }
    case 'HYDRATE':
      return { items: action.payload }
    default:
      return state
  }
}

interface WishlistContextType {
  state: WishlistState
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isWishlisted: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      try {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) })
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: WishlistItem) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const isWishlisted = (id: string) => state.items.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{ state, addItem, removeItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}
