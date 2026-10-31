# todo-app

Aplicación móvil ToDo List con Ionic sobre Angular (agregar, editar, eliminar y listar tareas). Evaluación Sumativa Unidad 1, Desarrollo de aplicaciones móviles, IPSS.

## Ejecutar
```bash
npm install
npx ionic serve   # http://localhost:8100
npx ng test --watch=false
```

El estado vive en `TaskService` (signals); las páginas solo lo consumen, de modo que en unidades siguientes se puede cambiar el almacenamiento sin tocar la interfaz.

## Autor
Kurt Neumann Lewis, Ingeniería en Informática, IPSS.
