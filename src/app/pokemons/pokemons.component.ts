import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from './pokemon';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})


export class PokemonsComponent implements OnInit {
  search:string = "";
  title:string = "Liste des Pokémons";
  
  pokemons: Pokemon[] = [];
  pokemonsTotal: Pokemon[] = [];
  
  
  selectedPokemon: Pokemon | null = null;

  teams: Pokemon[] = [];
   @Output() onSearchPokemon:EventEmitter<string> = new EventEmitter; 

  constructor(private pokemonService: PokemonService){}


  ngOnInit(): void {
    //rajouter filter
    this.pokemonService.getPokemons().subscribe((pokemonlist: any) => {
      this.pokemonsTotal = pokemonlist.pokemons;  
      this.pokemons = this.pokemonService.paginate( 0, 5,  this.pokemonsTotal);
      console.log("😊from ngOnInit pokemons", this.pokemonsTotal);
      console.log("❤️this.pokemons", this.pokemons);

    } )
  }

  paginate( $event: any )
    {
        this.pokemons = this.pokemonService.paginate( $event.start, $event.end, this.pokemonsTotal);
    }

  onSelected(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  AddToTeamParent($event: string) {
    const addedPokemon : Pokemon | undefined = this.pokemons.find(pokemon => pokemon._id === $event);
    if(addedPokemon && this.teams.length <=5) {
      this.teams.push(addedPokemon);
    }    
  }

  onSearchPokemonName($event:string){
    console.log("ALL******onSearchPokemonType",$event);
    let find = this.pokemonsTotal.find(pokemon => pokemon.name === $event);
    if(find){
      console.log(find);
      this.pokemons = [find];
    }
    this.pokemons = this.pokemonsTotal.filter(pokemon => pokemon.name === $event);
  }

  testAPI(newPokemon:Pokemon) : void{
    this.pokemonService.addPokemon(newPokemon).subscribe(response => {
      this.pokemons.push(<Pokemon>response)
    });
    
  }
}
