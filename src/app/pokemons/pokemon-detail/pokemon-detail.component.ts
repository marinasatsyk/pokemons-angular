import { Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {Pokemon} from "../pokemon";
// import POKEMONS from "../mock-pokemon";
import { PokemonService } from '../pokemon.service';



@Component({
  selector: 'pokemonDetail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})


export class PokemonDetailComponent implements OnInit {
  selectedPokemon:Pokemon |undefined = undefined;
  pokemons:Pokemon[] = [];
  constructor(
    private route: ActivatedRoute, // service route (pour la route active)
    private router: Router, 
    private location: Location,
    private pokemonService: PokemonService) { } // service qui permet de recuperer la liste pokemons

  ngOnInit() : void {
    const id = this.route.snapshot.paramMap.get('id') || ""; // recuperer  id depuis le path dans le url
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.selectedPokemon =  pokemon);//POKEMONS.filter(pokemon => pokemon.id === +id )[0];
  }

  ngOnChanges() {

  }

  back() : void  {
  this.location.back();
 }

}
