import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
@Component({
  selector: 'pokemonCard',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Output() AddToTeam: EventEmitter<string> = new EventEmitter();
  @Input() pokemon: Pokemon |null = null;

  
  selectPokemonForTeam(id: string) {
    this.AddToTeam.emit(id);
  }

  constructor(
    private route: ActivatedRoute,
    private pS: PokemonService
  ) {}

  
  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id')?.toString();
    if(pokemonId)
    {
      this.pS.getPokemon(pokemonId).subscribe( (res: any) => {
        this.pokemon = res.pokemon[0]
        console.log("***", this.pokemon);
        
      })
    }
  }
}
