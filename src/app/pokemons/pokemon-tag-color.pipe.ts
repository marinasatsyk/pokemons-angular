import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTagColor'
})
export class PokemonTagColorPipe implements PipeTransform {

  transform(type: string ): string   {
   let color = "";
   switch(type.toLowerCase()){
    case 'fée':
      color = "fee"
      break;
    default:
      color = `${type.toLowerCase()}`;
   }
    // switch(type.toLowerCase()){
    //   case 'plante':
    //     color =  `${type.toLowerCase()}`  
    //   // color = "green";
    //     break;  
    //     case 'poison':
    //       color = "black";
    //       break;    
    //     case 'feu':
    //       color = "red";
    //       break;      
    //     case 'eau':
    //       color = "blue";
    //       break;       
    //     case 'insecte':
    //       color = "gris";
    //       break;       
    //     case 'normal':
    //       color = "gris-light";
    //       break;      
    //     case 'vol':
    //       color = "violet";
    //       break;      
    //     case 'electrik':
    //       color = "yellow";
    //       break;       
    //     case 'fée':
    //       color = "orange"
    //       break;      
    //     default:
    //       color = "";
    //       break;       
    // }
    return color;
  }

}
