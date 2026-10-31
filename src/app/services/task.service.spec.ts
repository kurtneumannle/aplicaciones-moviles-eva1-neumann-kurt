import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('agrega tareas con ids incrementales', () => {
    service.add('Comprar pan', 'Panadería');
    service.add('Estudiar', '');
    expect(service.tasks().map(t => t.id)).toEqual([1, 2]);
  });

  it('edita solo la tarea indicada', () => {
    service.add('A', 'a');
    service.add('B', 'b');
    service.update(2, 'B2', 'b2');
    expect(service.tasks()[0].title).toBe('A');
    expect(service.tasks()[1]).toEqual({ id: 2, title: 'B2', description: 'b2' });
  });

  it('elimina una tarea por id', () => {
    service.add('A', '');
    service.add('B', '');
    service.remove(1);
    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].title).toBe('B');
  });
});
