import { Component, Output, EventEmitter } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'pokemonSearch',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent {
  @Output() serchPokemon: EventEmitter<string> = new EventEmitter;
  
  search:string = "";

  onSubmitSearch(form: NgForm){
    // console.log(form.value.search);
    if (form.value["search"] != ""){
      this.serchPokemon.emit(form.value["search"])
    }
  }

}
