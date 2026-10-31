import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular/lazy';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  title = '';
  description = '';
  editingId: number | null = null;

  constructor(
    public taskService: TaskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  get isEditing(): boolean {
    return this.editingId !== null;
  }

  get canSave(): boolean {
    return this.title.trim().length > 0;
  }

  async save(): Promise<void> {
    if (!this.canSave) {
      return;
    }
    const title = this.title.trim();
    const description = this.description.trim();
    const wasEditing = this.editingId !== null;
    if (this.editingId !== null) {
      this.taskService.update(this.editingId, title, description);
    } else {
      this.taskService.add(title, description);
    }
    this.resetForm();
    await this.toast(wasEditing ? 'Tarea actualizada' : 'Tarea agregada');
  }

  edit(task: Task): void {
    this.editingId = task.id;
    this.title = task.title;
    this.description = task.description;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  async confirmDelete(task: Task): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: `¿Deseas eliminar "${task.title}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.remove(task.id);
            if (this.editingId === task.id) {
              this.resetForm();
            }
            this.toast('Tarea eliminada');
          },
        },
      ],
    });
    await alert.present();
  }

  trackById(_: number, task: Task): number {
    return task.id;
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.editingId = null;
  }

  private async toast(message: string): Promise<void> {
    const t = await this.toastCtrl.create({ message, duration: 1600, position: 'bottom' });
    await t.present();
  }
}
