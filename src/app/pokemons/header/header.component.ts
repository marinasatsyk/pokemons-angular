import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgForm, NgModel} from '@angular/forms';



@Component({
  selector: 'headerPokemon',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() serchPokemon: EventEmitter<string> = new EventEmitter; 
 
   search:string = "";
    constructor(private route: ActivatedRoute) { }


    onSubmitSearch(form: NgForm){
      console.log("form.value.search",form.value.search);
    }

    onSearchPokemon($event:string){
        console.log("*header* onSearchPokemon",$event);
       this.serchPokemon.emit($event);
    }
}
