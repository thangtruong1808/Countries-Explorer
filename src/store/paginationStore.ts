import { create } from 'zustand';

interface PaginationState {
  // Number of items to display per load
  itemsPerLoad: number;
  // Total items currently displayed
  totalDisplayed: number;
  // Whether more items are available
  hasMore: boolean;
  // Loading state
  isLoading: boolean;
  // Actions
  loadMore: (totalAvailable: number) => void;
  resetPagination: () => void;
  setHasMore: (hasMore: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setTotalDisplayed: (total: number) => void;
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  // Initial state
  itemsPerLoad: 20, // 4 rows * 5 columns = 20 items
  totalDisplayed: 20, // Start with first 20 items
  hasMore: true,
  isLoading: false,

  // Actions
  loadMore: (totalAvailable: number) => {
    const { totalDisplayed, itemsPerLoad } = get();
    const newTotal = totalDisplayed + itemsPerLoad;
    set({
      totalDisplayed: newTotal,
      hasMore: newTotal < totalAvailable,
    });
  },

  resetPagination: () => {
    set({
      totalDisplayed: 20,
      hasMore: true,
      isLoading: false,
    });
  },

  setHasMore: (hasMore: boolean) => {
    set({ hasMore });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setTotalDisplayed: (total: number) => {
    set({ totalDisplayed: total });
  },
})); 