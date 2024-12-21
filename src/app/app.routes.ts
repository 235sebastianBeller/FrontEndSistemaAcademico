import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './paginas/material/material.component';
import { AgregarNuevoContenidoComponent } from './paginas/agregar-nuevo-contenido/agregar-nuevo-contenido.component';
import { BuscarMateriaComponent } from './paginas/buscar-materia/buscar-materia.component';
import { MostrarMateriaComponent } from './paginas/mostrar-materia/mostrar-materia.component';
import { DetalleMateriaComponent } from './paginas/detalle-materia/detalle-materia.component';
import { VerMateriasDocenteComponent } from './paginas/ver-materias-docente/ver-materias-docente.component';
import { VerMaterialesEstudianteComponent } from './paginas/ver-materia-estudiante/home/feature/home.component';
import { LayoutComponent } from './layout/layout.component';
import { HistorialAsistenciaComponent } from './paginas/historial-asistencia/historial-asistencia.component';
import { ListaEstudiantesProfesorComponent } from './paginas/lista-estudiantes-profesor/lista-estudiantes-profesor.component';
import { RegistroAsistenciaDocentesComponent } from './paginas/registro-asistencia-docentes/registro-asistencia-docentes.component';
import { VerAsistenciaPorMateriaComponent } from './paginas/ver-asistencia-por-materia/ver-asistencia-por-materia.component';
import { NotasComponent } from './paginas/notas/notas.component';
import { DetalleNotasComponent } from './paginas/detalle-notas/detalle-notas.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el AuthGuard
import{LoginComponent} from './paginas/login/login.component'
import { MostrarNotasPorMateriaProfesorComponent } from './paginas/mostrar-notas-por-materia-profesor/mostrar-notas-por-materia-profesor.component';
import { DetalleNotasEstudiantesComponent } from './paginas/detalle-notas-estudiantes/detalle-notas-estudiantes.component';
import { NotasProfesorComponent } from './paginas/notas-profesor/notas-profesor.component';
import { PerfilEstudianteComponent } from './paginas/perfil-estudiante/perfil-estudiante.component';
import { AdminVerEstudiantesComponent } from './paginas/admin-ver-estudiantes/admin-ver-estudiantes.component';
import {MateriasAdministradorComponent} from './paginas/materias-administrador/materias-administrador.component';
import { InicioCarrucelComponent } from './paginas/inicio-carrucel/inicio-carrucel.component';
import { VerListaProfesoresComponent } from './paginas/ver-lista-profesores/ver-lista-profesores.component';
import {AsignarMateriaDocenteComponent} from './paginas/asignar-materia-docente/asignar-materia-docente.component'
import {AsignarMateriaEstudianteComponent} from "./paginas/asignar-materia-estudiante/asignar-materia-estudiante.component"
import {AsignarMateriaAsignadaAEstudianteComponent} from "./paginas/asignar-materia-asignada-a-estudiante/asignar-materia-asignada-a-estudiante.component"
import {NotFoundComponent} from './paginas/not-found/not-found.component'

export const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  }
  ,
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['estudiante','admin','profesor']},
    children: [
      {
        path:'',
        component:InicioCarrucelComponent
      },
      {
        path: 'ver-material/:id',
        component: MaterialComponent,
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] },
      },
      {
        path: 'mostrar-materia',
        component: MostrarMateriaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] },
      },
      {
        path: 'Buscar-Materia',
        component: BuscarMateriaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] },
      },
      {
        path: 'ver-materiales-estudiante/:id',
        component: VerMaterialesEstudianteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] },
      },
      {
        path: 'historial-asistencia',
        component: HistorialAsistenciaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] },
      },
      {
        path: 'ver-asistencia-materia/:materia/:professor/:materiaNombre',
        component: VerAsistenciaPorMateriaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] },
      },
      {
        path: 'detalle-materia/:id_dicta',
        component: DetalleMateriaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] },
      },
      { path: 'notas', component: NotasComponent, title: 'Notas del Estudiante',
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] },
      },
      {
        path: 'detalle-notas-estudiantes/:id_dicta/:id_estudiante/:anio',
        component: DetalleNotasEstudiantesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['estudiante'] }
      },
      {
        path: 'agregar-nuevo-contenido/:id_dicta',
        component: AgregarNuevoContenidoComponent,
        title: 'Agregar Nuevo Contenido',
        canActivate: [AuthGuard],
        data: { roles: ['profesor'] },
      },
      {
        path: 'ver-materias-docente',
        component: VerMateriasDocenteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['profesor'] },
      },
      {
        path: 'lista-estudiantes-profesor/:id_dicta',
        component: ListaEstudiantesProfesorComponent,
        canActivate: [AuthGuard],
        data: { roles: ['profesor'] },
      },
      {
        path: 'registro-asistencias-estudiantes/:idMateria',
        component: RegistroAsistenciaDocentesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['profesor'] }
      },
      {
        path: 'mostrar-notas-por-materia-profesor/:id_dicta/:anio',
        component: MostrarNotasPorMateriaProfesorComponent,
        canActivate: [AuthGuard],
        data: { roles: ['profesor'] }
      },
      {
        path: 'detalle-notas/:id_dicta/:id_estudiante/:anio',
        component: DetalleNotasComponent,
        canActivate: [AuthGuard],
        data: { roles: ['profesor'] }
      },
      {
        path: 'notas-profesor',
        component: NotasProfesorComponent,
        canActivate: [AuthGuard],
        data: { roles: ['profesor'] }
      },
      { path: 'agregar-material-docente/:id', loadChildren: () => import('./paginas/agregar-material-docente/home/feature/home-routing') ,
        canActivate: [AuthGuard],
        data: { roles: ['profesor'] }
        
      },
      {
        path:'perfil-estudiante/:id',
        component:PerfilEstudianteComponent,
        canActivate:[AuthGuard],
        data: {roles: ['estudiante']}
        
      },
      {
        path:'admin-ver-estudiantes',
        component:AdminVerEstudiantesComponent,
        canActivate:[AuthGuard],
        data: {roles: ['admin']}
        
      },
      {
        path:'asignar-materia-asignada-a-estudiante/:id_dicta/:anio',
        component:AsignarMateriaAsignadaAEstudianteComponent,
        canActivate:[AuthGuard],
        data: {roles: ['admin']}
        
      },
      {
        path: 'asignar-materia-docente/:id_materia',
        component: AsignarMateriaDocenteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'asignar-materia-estudiante/:id_materia',
        component: AsignarMateriaEstudianteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
      },
      {
        path:'materias-admin',
        component:MateriasAdministradorComponent, 
        canActivate:[AuthGuard],
        data: {roles: ['admin']}
      },
      {
        path:'ver-lista-profesores',
        component:VerListaProfesoresComponent,
        canActivate:[AuthGuard],
        data: {roles: ['admin']}
      }
    ],

  },
  { path: '**', component: NotFoundComponent }
];
