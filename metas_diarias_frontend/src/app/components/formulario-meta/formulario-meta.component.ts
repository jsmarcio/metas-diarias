import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppService } from '../../app.service';
import { MetaUpdate } from '../../types/metaUpdate';
import { MyErrorStateMatcher } from '../../utils/default.error-matcher';

@Component({
  selector: 'app-form-meta',
  templateUrl: './formulario-meta.component.html',
  styleUrls: ['./formulario-meta.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
  ],
})
export class CadastraMetaComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public title = 'Cadastro de Metas Diárias';
  private _id!: number;
  public form!: FormGroup;
  public isEdicao = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private service: AppService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this._id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', []],
      metaDiaria: [null, [Validators.required]],
      dataCreated: [Date.now().toLocaleString(), Validators.required],
      descricao: ['', [Validators.required]],
      isConcluida: [Boolean, []],
      dataUpdate: ['', []]
    });
    if (this._id) {
      var meta!: MetaUpdate;
      this.title = 'Edição de Meta';
      this.isEdicao = true;
      meta = {
        id: this._id,
        metaDiaria: this.activatedRoute.snapshot.queryParams['metaDiaria'],
        dataCreated: this.activatedRoute.snapshot.queryParams['dataCreated'],
        descricao: this.activatedRoute.snapshot.queryParams['descricao'],
        isConcluida: JSON.parse(this.activatedRoute.snapshot.queryParams['isConcluida']),
        dataUpdate: this.activatedRoute.snapshot.queryParams['dataUpdate']
      };
      this.updateFormGroup(meta);
    }
  }

  get f() {
    return this.form.controls;
  }

  public updateFormGroup(meta: MetaUpdate) {
    this.form.patchValue({
      id: this._id,
      metaDiaria: meta.metaDiaria,
      dataCreated: meta.dataCreated,
      descricao: meta.descricao,
      isConcluida: meta.isConcluida,
      dataUpdate: new Date()
    });
  }

  public saveMeta(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.service.cadastraMeta(form.value).subscribe((response) => {
      if (response) {
        this.openSnackBar('Meta cadastrada com sucesso', '');
        this.voltar();
        return;
      }
      this.openSnackBar('Erro ao cadastrar meta', '');
    });
  }

  public updateMeta(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.service.atualizaMeta(form.value).subscribe((response) => {
      if (response) {
        this.openSnackBar('Meta atualizada com sucesso', '');
        this.voltar();
        return;
      }
      this.openSnackBar('Erro ao atualizar meta ' + form.controls['metaDiaria'].value, '');
    });  }

  public voltar() {
    this.router.navigate(['/lista-metas']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
