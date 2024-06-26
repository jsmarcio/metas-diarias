import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastraMetaComponent } from './components/formulario-meta/formulario-meta.component';
import { ListaMetasComponent } from './components/lista-metas/lista-metas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lista-metas', pathMatch: 'full' },
  { path: 'cadastra-meta', component: CadastraMetaComponent },
  { path: 'lista-metas', component: ListaMetasComponent },
  { path: 'atualiza-meta/:id', component: CadastraMetaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
