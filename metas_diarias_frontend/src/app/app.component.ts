import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from './app.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Cadastro de Metas Diárias';
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: AppService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      metaDiaria: [null, [Validators.required]],
      data: [Date.now().toLocaleString(), Validators.required],
      descricao: ['', []],
    });
  }

  public saveMeta(form: FormGroup) {
    this.service.cadastraMeta(form.value).subscribe(response => {
      alert('Form Validated' + JSON.stringify(response, null, 4));
    });
  }
}
