import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

/**
 * Único punto de acceso al estado de las tareas. En unidades siguientes
 * solo se reemplaza el almacenamiento (local / API) sin tocar las páginas.
 */
@Injectable({ providedIn: 'root' })
export class TaskService {
  private nextId = 1;
  private readonly _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  add(title: string, description: string): void {
    const task: Task = { id: this.nextId++, title, description };
    this._tasks.update(list => [...list, task]);
  }

  update(id: number, title: string, description: string): void {
    this._tasks.update(list =>
      list.map(t => (t.id === id ? { ...t, title, description } : t))
    );
  }

  remove(id: number): void {
    this._tasks.update(list => list.filter(t => t.id !== id));
  }
}
