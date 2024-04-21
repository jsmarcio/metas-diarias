import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../app.service';
import { Meta } from '../../types/meta';

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
  ],
})
export class ListaMetasComponent implements OnInit {
  displayedColumns: string[] = ['metaDiaria', 'data', 'descricao'];
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
}
