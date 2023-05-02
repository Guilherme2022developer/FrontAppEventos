import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { OrganizadorService } from 'src/app/services/organizador.sevice';
import { GenericValidator } from 'src/app/utils/generic.form.validator';
import { Organizador } from './models/organizador';


@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  inscricaoForm: FormGroup;
  organizador: Organizador;
  validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;
  displayMessage: { [key: string]: string } = {};
  errors: any[] = [];

  constructor(private fb: FormBuilder, private organizadorSevice: OrganizadorService, private router: Router ) {

    this.validationMessages = {
      // nome: {
      //   require: 'O Nome é requirido',
      //   minlength: 'O Nome precisa ter no mínimo 2 caracteres',
      //   maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      // },
      // cpf: {
      //   require: 'O CPF é requirido',
      //   minlength: 'O CPF precisa ter no mínimo 2 caracteres',
      //   maxlength: 'O CPF precisa ter no máximo 150 caracteres'
      //   //rangeLength: 'O CPF precisa ter no conter 11 caracteres',
      // },
      Email: {
        require: 'O Email é requirido',
        email: 'Informe o e-mail',

      },
      Password: {
        require: 'O Senha é requirido',
        minlength: 'O Senha precisa ter no mínimo 6 caracteres',

      },
      ConfirmPassWord: {
        require: 'Informe a senha novamente',
        minlength: 'O Senha precisa ter no mínimo 6 caracteres',
        //equalTo: 'As senhas não conferem'
      },
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.inscricaoForm = this.fb.group({
      //nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
     // cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
     Email: ['', [Validators.required, Validators.email]],
     Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
     ConfirmPassWord: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
     Token:[],
     role:[]

    });
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);
    });
  }

  adicionarOrganizador() {

    //this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);

    if (this, this.inscricaoForm.valid && this.inscricaoForm.dirty) {

      const org = Object.assign({}, this.organizador, this.inscricaoForm.value);
      
      this.organizadorSevice.registrarOrganizador(org)
      .subscribe(
        result => {this.onSalveComplete(result)},
        fail => {this.onError(fail)}
      )

    }

  }

  onSalveComplete(response: any){
    this.inscricaoForm.reset();
    this.errors = [];
    localStorage.setItem('eio.token',response.token);
    localStorage.setItem('eio.user',JSON.stringify(response.email));
    this.router.navigate(['/home']);

  }

  onError(fail: any){
   this.errors = fail.error.errors;
  }
}
