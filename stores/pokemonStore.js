// stores/pokemonStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePokemonStore = create(
  persist(
    (set) => ({
      caughtPokemons: [],
      catchPokemon: (pokemon) => set((state) => ({
        caughtPokemons: [...state.caughtPokemons, pokemon]
      })),
      releasePokemon: (pokemonName) => set((state) => ({
        caughtPokemons: state.caughtPokemons.filter(pokemon => pokemon.name !== pokemonName)
      })),
    }),
    {
      name: 'pokemon-storage', // name of the item in local storage
    }
  )
);

export default usePokemonStore;
