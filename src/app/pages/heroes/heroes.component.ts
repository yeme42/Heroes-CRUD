import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{

  heroes: HeroeModel[]= [];
  cargando = false;
  boton: string = '';

  first: number = 0;
  rows: number = 5;

  activityValues: number[] = [0, 100];
  

  constructor( private heroesService:HeroesService,
              private router: Router){
  }

  ngOnInit(){
    this.cargando = true
    this.heroesService.getHeroes().subscribe(
      (resp)=>{
        console.log(resp)
        this.heroes = resp
        this.cargando = false

        this.heroes.forEach((hero) => ( hero.id = new Date()));

      })
  }

  onPageChange(event:any) {
    this.first = event.first;
    this.rows = event.rows;
}

cargarTabla(){
  this.heroesService.getHeroes().subscribe(
    (resp)=>{
      console.log(resp)
      this.heroes = resp
      this.cargando = false
    })
  }

  eliminarheroe(heroe: HeroeModel, i : number){
    console.log('llegando', heroe, i)
    Swal.fire({
      title: "¿Está seguro?",
      text: `Esta seguro que sea eliminar a ${heroe.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro"
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(i, 1)
        this.heroesService.deleteHeroe(heroe.id).subscribe((resp)=>{
    })
        Swal.fire({
          title: "Eliminado!",
          text: `${heroe.nombre} ha sido eliminado correctamente`,
          icon: "success"
        });
      }
      this.cargarTabla()
    });
    }

    cambiar(id:any){
      this.heroesService.button$.emit('Actualizar')
      console.log('llego a cambiar', id)
    }
    




}
