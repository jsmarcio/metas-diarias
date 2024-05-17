import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../app.service';
import { Meta } from '../../types/meta';
import { MetaUpdate } from '../../types/metaUpdate';

@Component({
  selector: 'app-lista-metas',
  templateUrl: './lista-metas.component.html',
  styleUrls: ['./lista-metas.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ListaMetasComponent implements OnInit {
  displayedColumns: string[] = ['metaDiaria', 'data', 'descricao', 'opcoes'];
  dataSource: Meta[] = [];

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit() {
    this.buscaListaDeMetas();
  }

  cadastrarNovaMeta() {
    this.router.navigate(['/cadastra-meta']);
  }

  buscaListaDeMetas() {
    this.appService
      .getListaMetas()
      .subscribe((response) => (this.dataSource = response));
  }

  updateForm(meta: MetaUpdate) {
    this.router.navigate(['/atualiza-meta', meta.id], { queryParams: meta });
  }
}
