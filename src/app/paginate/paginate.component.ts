import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../pokemons/pokemon.service';

@Component({
  selector: 'paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {
   
  @Output() setPaginate: EventEmitter<{ start: number, end: number }> = new EventEmitter();
    
    pages: number[] = []; // les numeros de pages dispo
    perPage: number = 5; // nbr d'element à afficher par page
    total: number = 0; // le nomvbre total d'elements à afficher
    currentPage: number = 0;
    numberPages: number; // nbr d'element à afficher par page
    
    constructor(
      private pokemonService: PokemonService
    ) {}
    
    ngOnInit()
    {
        this.init();
        
        this.pokemonService.sendCurrentPage.subscribe(
            numberPage => {
                this.currentPage = numberPage;
                this.init( this.currentPage );
            }    
        );
    }
    
    init( page: number = 1 )
    {
        
        let pokemons : any = [];
        this.pokemonService.getPokemons().subscribe(pokemons => {
          this.total =  pokemons.length;
        
      
          console.log(this.total);
          this.numberPages = Math.ceil( this.total / this.perPage );
          this.currentPage = page;
          this.pages = [];
          console.log('*********',this.numberPages);
          for( let i = 1; i < this.numberPages + 1; i++ ){
              console.log(i);
              
            this.pages.push(i);
          }
          console.log(this.pages);
          console.log(this.currentPage);
        });
        
        
    }
    
    selectedPage( page: number )
    {
        this.currentPage = page;
        this.setPaginate.emit( this.paginate(page) );
        this.pokemonService.currentPage(this.currentPage);
    }
    
    next()
    {
        if( this.currentPage >= this.numberPages )
        {
            this.currentPage = 1;
        }
        else
        {
            this.currentPage++;
        }
        this.setPaginate.emit( this.paginate( this.currentPage ) ); // emettre la page courante
        this.pokemonService.currentPage( this.currentPage ); // Mettre à jour les autres composants paginate
    }
    
    previous()
    {
        if( this.currentPage === 1 )
        {
            this.currentPage = this.numberPages;
        }
        else
        {
            this.currentPage--;
        }
        this.setPaginate.emit( this.paginate( this.currentPage ) ); // emettre la page courante
        this.pokemonService.currentPage( this.currentPage ); // Mettre à jour les autres composants paginate
    }
    
    paginate( page: number ): { start: number, end: number }
    {
        let start = ( page - 1 ) * this.perPage;
        let end = start + this.perPage;
        
        return { start , end };
    }
}
