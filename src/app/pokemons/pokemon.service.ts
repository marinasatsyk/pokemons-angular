import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, of, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
@Injectable({
    providedIn: 'root',
})
export class PokemonService {

    // private pokemons: Pokemon[] = POKEMONS;
    private pokemons: Pokemon[] = [];
    public sendCurrentPage = new Subject<number>();
    isModalOpenService: boolean;
    isModalOpenServiceChange: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpClient)
    {
      this.isModalOpenService = false;
    }

  private server = {
        mongo: 8000,
        local: 3000,
    };
    private collection = {
        pokemons: "pokemons",
        users: "users"
    }

    getPokemons(): Observable<Pokemon[]> {
        return this.http
            .get<Pokemon[]>(`http://localhost:${this.server.mongo}/pokemons`)
            .pipe(
                tap((pokemonList) => console.log('from service', pokemonList)),
                catchError((error) => {
                    console.log(error);
                    return of([]);
                })
            );
    }

    addPokemon(pokemon: Pokemon) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };

        return this.http
            .post(
                `http://localhost:${this.server.mongo}/pokemons`,
                JSON.stringify(pokemon),
                httpOptions
            )
            .pipe(
                tap((pokemon) => console.table(pokemon)),
                catchError((error) => {
                    console.error(error);
                    return of({});
                })
            );
    }

    //service de pagination

    paginate(start: number, end: number, pokemons: Pokemon[]): Pokemon[] {
        return pokemons.slice(start, end);
    }

    paginateNumberPage(): number {
        // if( typeof environment.numberPage == 'undefined' )
        // {
        //     throw "Attention, page indéfinie";
        // }

        // return environment.numberPage;
        return 2;
    }

    currentPage(numberPage: number) {
        // l'Observer notifie l'info de la page, ici un nombre, puis l'envoie
        return this.sendCurrentPage.next(numberPage);
    }

    //========end pagination

    getPokemon(id: string): Observable<Pokemon> {
        return this.http
            .get<Pokemon>(
                `http://localhost:${this.server.mongo}/pokemons/find/${id}`,
                httpOptions
            )
            .pipe(tap((pokemon) => console.log(pokemon)));
    }

    getPokemonType(type: string): Pokemon[] | undefined {
        return this.pokemons.filter((pokemon) =>
            pokemon.types.find((types) => types)
        );
    }

    setPokemonInfo(pokemon: Pokemon) {}

    getUserByEmail(credentials : {name: String, email: String}){
        return this.http.post(`http://localhost:${this.server.mongo}/user/login`, {...httpOptions, body: credentials })
    }

  onToggleCreateForm(): void
  {
    this.isModalOpenService = !this.isModalOpenService;
    this.isModalOpenServiceChange.next(this.isModalOpenService);
  };
}
