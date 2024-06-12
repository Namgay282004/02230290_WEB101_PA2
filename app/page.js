"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/components/ui/pagination";
import Modal from "@/components/ui/modal";
import usePokemonStore from '@/stores/pokemonStore';
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { caughtPokemons, catchPokemon, releasePokemon } = usePokemonStore();
  const [showCaughtPokemon, setShowCaughtPokemon] = useState(false);

  const ITEMS_PER_PAGE = 20;

  const fetchPokemons = async (page) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(page - 1) * ITEMS_PER_PAGE}`);
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return await pokemonResponse.json();
        })
      );
      setPokemonData(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const fetchPokemonDetails = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found!');
      }
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const handleSearch = () => {
    fetchPokemonDetails(searchTerm);
  };

  const handleCardClick = (name) => {
    fetchPokemonDetails(name);
  };

  const handleCatchPokemon = (pokemon) => {
    catchPokemon(pokemon);
  };

  const toggleCaughtPokemon = () => {
    setShowCaughtPokemon(!showCaughtPokemon);
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {!showCaughtPokemon && (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter a Pokemon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="button" onClick={handleSearch}>Search</Button>
          <Button type="button" onClick={toggleCaughtPokemon}>Caught Pokemon</Button>
        </div>
      )}

      {showCaughtPokemon && (
        <div className="w-full max-w-sm mt-4 relative">
          <h2 className="text-2xl font-semibold">Caught Pokemons</h2>
          <Button type="button" onClick={toggleCaughtPokemon} className="mt-2 absolute top-0 left-0">Back</Button>
          {caughtPokemons.length === 0 ? (
            <p>No Pokemon caught yet.</p>
          ) : (
            caughtPokemons.map((pokemon) => (
              <Card key={pokemon.id} className="w-full max-w-sm mt-2">
                <CardHeader>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </CardHeader>
                <CardContent>
                  <CardTitle>{pokemon.name}</CardTitle>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => releasePokemon(pokemon.name)}>Release</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}


      {!showCaughtPokemon && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemonData.map((pokemon) => (
            <Card key={pokemon.id} className="w-full max-w-sm">
              <CardHeader onClick={() => handleCardClick(pokemon.name)}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </CardHeader>
              <CardContent onClick={() => handleCardClick(pokemon.name)}>
                <CardTitle>{pokemon.name}</CardTitle>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleCatchPokemon(pokemon)}>Catch</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Pagination className="flex justify-center mt-4">
        <PaginationContent>
          <PaginationPrevious onClick={() => setPage(page - 1)} disabled={page === 1} />
          {page > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => setPage(page - 1)}>{page - 1}</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          {page < totalPages && (
            <PaginationItem>
              <PaginationLink onClick={() => setPage(page + 1)}>{page + 1}</PaginationLink>
            </PaginationItem>
          )}
          {page < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
          <PaginationNext onClick={() => setPage(page + 1)} disabled={page === totalPages} />
        </PaginationContent>
      </Pagination>

      {selectedPokemon && (
        <Modal onClose={() => setSelectedPokemon(null)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            </CardHeader>
            <CardContent>
              <CardTitle>{selectedPokemon.name}</CardTitle>
              <CardDescription>Type: {selectedPokemon.types.map(type => type.type.name).join(', ')}</CardDescription>
              <CardDescription>Abilities: {selectedPokemon.abilities.map(ability => ability.ability.name).join(', ')}</CardDescription>
              <div>
                <h3>Stats</h3>
                {selectedPokemon.stats.map(stat => (
                  <div key={stat.stat.name} className="mb-2">
                    <p>{stat.stat.name}: {stat.base_stat}</p>
                    <Progress value={stat.base_stat} max={100} size={20} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleCatchPokemon(selectedPokemon)}>Catch</Button>
            </CardFooter>
          </Card>
        </Modal>
      )}
    </div>
  );
}
