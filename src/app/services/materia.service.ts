import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  // Obtener todas las materias
  getMaterias(): Observable<any[]> {
    const materiasCollection = collection(this.firestore, 'materias');
    return collectionData(materiasCollection, { idField: 'id' });
  }

  // Agregar una materia
  agregarMateria(materia: any) {
    const materiasCollection = collection(this.firestore, 'materias');
    return addDoc(materiasCollection, materia);
  }

  // Modificar una materia
  modificarMateria(materia: any) {
    const materiaDoc = doc(this.firestore, `materias/${materia.id}`);
    return updateDoc(materiaDoc, {
      nombre: materia.nombre,
      horario: materia.horario
    });
  }

  // Eliminar una materia
  eliminarMateria(id: string) {
    const materiaDoc = doc(this.firestore, `materias/${id}`);
    return deleteDoc(materiaDoc); // Devuelve una promesa
  }
}
