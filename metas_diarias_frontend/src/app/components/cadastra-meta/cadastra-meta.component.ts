import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cadastra-meta',
  templateUrl: './cadastra-meta.component.html',
  styleUrls: ['./cadastra-meta.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
})
export class CadastraMetaComponent implements OnInit {
  title = 'Cadastro de Metas Diárias';
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      metaDiaria: [null, [Validators.required]],
      data: [Date.now().toLocaleString(), Validators.required],
      descricao: ['', []],
    });
  }

  public saveMeta(form: FormGroup) {
    this.service.cadastraMeta(form.value).subscribe((response) => {
      alert('Form Validated' + JSON.stringify(response, null, 4));
      this.voltar();
    });
  }

  public voltar() {
    this.router.navigate(['/lista-metas']);
  }
}
