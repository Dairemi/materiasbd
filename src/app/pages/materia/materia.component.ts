import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../services/materia.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  // Propiedades.
  materias: any[] = [];
  materia: any = {}; // Objeto para almacenar los datos del formulario

  // Constructor.
  constructor(private materiaService: MateriaService) {}

  // Método del ciclo de vida OnInit.
  ngOnInit(): void {
    this.obtenerMaterias(); // Llama a obtenerMaterias() al inicializar el componente
  }

  // Método que hace la petición al service para obtener las materias.
  obtenerMaterias() {
    this.materiaService.getMaterias().subscribe((data) => {
      this.materias = data;
    });
  }

  // Método para agregar una materia.
  agregarMateria() {
    if (this.materia.id && this.materia.nombre && this.materia.horario) {
      this.materiaService.agregarMateria(this.materia).then(() => {
        this.materia = {}; // Limpiar el formulario
        this.obtenerMaterias(); // Actualizar la lista
      }).catch((error) => {
        console.error('Error al agregar la materia:', error);
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  // Método para seleccionar una materia para editar.
  seleccionarMateria(materiaSeleccionada: any) {
    this.materia = { ...materiaSeleccionada }; // Copiar la materia seleccionada
  }

  // Método para modificar una materia.
  modificarMateria() {
    if (this.materia.id) {
      this.materiaService.modificarMateria(this.materia).then(() => {
        this.materia = {}; // Limpiar el formulario
        this.obtenerMaterias(); // Actualizar la lista
      }).catch((error) => {
        console.error('Error al modificar la materia:', error);
      });
    } else {
      console.error('El ID de la materia es undefined');
    }
  }

  // Método para eliminar una materia.
  eliminarMateria(id: string | undefined) {
    if (id) {
      this.materiaService.eliminarMateria(id).then(() => {
        this.obtenerMaterias(); // Actualizar la lista
      }).catch((error) => {
        console.error('Error al eliminar la materia:', error);
      });
    } else {
      console.error('El ID de la materia es undefined');
    }
  }
}
