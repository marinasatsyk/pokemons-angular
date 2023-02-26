import { Component, Output, EventEmitter, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { Event } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'pokemonForm',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent {
  isModalOpen : boolean;
  _modalSubscription:any;

  @Output() editPokemon: EventEmitter<string> = new EventEmitter;
  @Input() testAPI: (newPokemon:Pokemon) => void ;


  typesPokemons: Array<any> = [
   {name:"Plante", value: "plante"},
   {name: "Feu", value: "feu"},
   {name: "Eau", value: "eau"},
   {name:"Insecte", value: "insecte" },
   {name:"Poison", value: "poison"},
   {name:"Normal", value: "normal"},
   {name:"Vol", value: "vol"},
   {name:"Electrik", value: "electrik"},
   {name:"Fee", value:  "fee"}
  ]

  itemsPokemon: string[] =
  ["id", "name",  "hp", "cp", "picture"];

  //====
  form:any = FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder, private pokemonService: PokemonService) {
    this.form = this.fb.group(
      {
      checkArrayTypes: this.fb.array([], [Validators.required]),
      // checkId: this.fb.group({}, Validators.required)
      id: ['', [Validators.required]],
      name: ['', [Validators.required],  Validators.minLength(8)],
      hp: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      picture: ['', [Validators.required]],

      });

    this.isModalOpen = pokemonService.isModalOpenService;
    this._modalSubscription = pokemonService.isModalOpenServiceChange.subscribe((value) => {
      this.isModalOpen = value;
    })
  }

  get id() {
    return this.form.get('id');
  }
  get name() {
    return this.form.get('name');
  }
  get hp() {
    return this.form.get('hp');
  }
  get cp() {
    return this.form.get('cp');
  }
  get picture() {
    return this.form.get('picture');
  }

  onCheckboxChange(e: any) {
    const checkArrayTypes: FormArray = this.form.get('checkArrayTypes') as FormArray;
    if (e.target.checked) {
      checkArrayTypes.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArrayTypes.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArrayTypes.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.form);

  }

  submitForm() {
    console.log(this.form.value);
     //virer id ne new pokemon
    let  newPokemon: Pokemon = {
        _id: this.form.value.id,
        name: this.form.value.name,
        hp: +this.form.value.hp,
        cp: +this.form.value.cp,
        picture:  this.form.value.picture,
        types: this.form.value.checkArrayTypes,
        created: new Date()
        }
    console.log(newPokemon);

    // this.pokemonService.addPokemon(newPokemon).subscribe(response => {
    //   this.pokemons.push(<Pokemon>response)
    // });
    this.testAPI(newPokemon);

  }


  ngOnInit(){
    this.isModalOpen = this.pokemonService.isModalOpenService;
  }

  onToggleCreateForm()
  {
    this.pokemonService.onToggleCreateForm();
    console.log("click modal from FORM close", this.isModalOpen);
  }
}
