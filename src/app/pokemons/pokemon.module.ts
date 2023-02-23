import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonTagColorPipe } from './pokemon-tag-color.pipe';
import { BorderCardDirective } from './border-card.directive';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonTeamComponent } from './pokemon-team/pokemon-team.component';
import {Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PaginateComponent } from '../paginate/paginate.component';
import { GuardService } from '../guard.service';
// import {MatPaginatorModule} from '@angular/material/paginato


const pokemonsRoutes: Routes = [
    {
    path: 'pokemons',
    canActivate: [GuardService], //route protegée
    component: PokemonsComponent
    },
    {
      path:'pokemon/:id',
      canActivate: [GuardService], //route protegée
      component: PokemonDetailComponent
    },
  ];


@NgModule({
  declarations: [
    PokemonsComponent,
    PokemonDetailComponent,
    PokemonTagColorPipe,
    BorderCardDirective,
    PokemonCardComponent,
    PokemonTeamComponent,
    HeaderComponent,
    PokemonSearchComponent,
    PokemonFormComponent,
    PaginateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(pokemonsRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PokemonModule { }
