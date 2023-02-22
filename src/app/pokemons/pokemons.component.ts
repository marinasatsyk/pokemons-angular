import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import {POKEMONS} from './mock-pokemon';
import { Pokemon } from './pokemon';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})


export class PokemonsComponent implements OnInit {
  search:string = "";
  title:string = "Liste des Pokémons";
  
  //pokemons = all itemps on the page;
  pokemons: Pokemon[] = [];
  
  
  selectedPokemon: Pokemon | null = null;

  teams: Pokemon[] = [];
  // @Output() onSearchPokemon:EventEmitter<string> = new EventEmitter; 

  constructor(private pokemonService: PokemonService){}


  ngOnInit(): void {
    //rajouter filter
    this.pokemonService.getPokemons().subscribe(pokemonlist => this.pokemons = this.pokemonService.paginate( 0, 5,  pokemonlist) )
    // this.pokemons = this.pokemonService.paginate( 0, 5,  this.pokemons);
    // this.pokemons = this.pokemonService.getPokemons();
  }

  paginate( $event: any )
    {
        this.pokemons = this.pokemonService.paginate( $event.start, $event.end, this.pokemons );
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
    // let find = this.pokemons.find(pokemon => pokemon.name === $event);
    // if(find){
    //   console.log(find);
    //   this.pokemons = [find];
    // }
    this.pokemons = this.pokemons.filter(pokemon => pokemon.name === $event);
  }

  testAPI(newPokemon:Pokemon) : void{
    /** moked données d'un new pokemon =>  remplacées par form 
    const pokemon: Pokemon = {
      id: 125,
      name: "Tralala",
      hp: 28,
      cp: 6,
      picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
      types: ["Feu"],
      created: new Date()
    }*/
    
    this.pokemonService.addPokemon(newPokemon).subscribe(response => {
      this.pokemons.push(<Pokemon>response)
      
    });
    
  }
}
