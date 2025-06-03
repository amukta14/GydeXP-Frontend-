import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Experience {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  distance?: string;
  rating?: number;
  image?: string;
}

interface ExperienceState {
  selectedExperience: Experience | null;
  setSelectedExperience: (experience: Experience | null) => void;
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  ratingFilter: number | null;
  setRatingFilter: (rating: number | null) => void;
}

const useExperienceStore = create<ExperienceState>()(
  persist(
    (set, get) => ({
      selectedExperience: null,
      setSelectedExperience: (experience) => set({ selectedExperience: experience }),
      favorites: [],
      addFavorite: (id) => set({ favorites: Array.from(new Set([...get().favorites, id])) }),
      removeFavorite: (id) => set({ favorites: get().favorites.filter(fav => fav !== id) }),
      ratingFilter: null,
      setRatingFilter: (rating) => set({ ratingFilter: rating }),
    }),
    {
      name: 'experience-storage',
    }
  )
);

export default useExperienceStore; 