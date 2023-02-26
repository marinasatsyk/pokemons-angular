import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgForm, NgModel} from '@angular/forms';
import { PokemonService } from '../pokemon.service';



@Component({
  selector: 'headerPokemon',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() serchPokemon: EventEmitter<string> = new EventEmitter;

   search:string = "";
   private isModalOpen = false;
    constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }


    onSubmitSearch(form: NgForm){
      console.log("form.value.search",form.value.search);
    }

    onSearchPokemon($event:string){
        console.log("*header* onSearchPokemon",$event);
       this.serchPokemon.emit($event);
    }

    onToggleCreateForm()
    {
      // this.isModalOpen = !this.isModalOpen;
      // console.log("click modal", this.isModalOpen);
      this.pokemonService.onToggleCreateForm();
    }
}
