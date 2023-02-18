import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../service/users.service';
import { UserLdap } from '../../model/user-ldap';
import { FormBuilder } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordValidator } from './passwords-validator.directive';

export abstract class LdapDetailComponent {
  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceholder: string;
  errorMessage = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordValidator }),
    mail: { value: '', disabled: true },
  });

  protected constructor(public addForm: boolean, private fb: FormBuilder, private router: Router) {
    this.passwordPlaceholder = 'Mot de passe' + (this.addForm ? '' : ' (laisser vide pour ne pas changer)');
  }

  protected OnInit(): void {}

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  abstract validateForm(): void;

  goToLdap(): void {
    this.router.navigate(['/users/list']);
  }

  onSubmitForm() {
    this.validateForm();
  }

  updateLogin(): void {
    if (this.addForm) {
      this.userForm.get('login')!.setValue(this.formGetValue('prenom') + '.' + this.formGetValue('nom').toLowerCase());
      this.updateMail();
    }
  }

  updateMail(): void {
    if (this.addForm){
      this.userForm.get('mail')!.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
    }
  }

  isFormValid(): boolean { return this.userForm.valid && (!this.addForm || this.formGetValue('passwordGroup.password') !== '') }

  protected copyUserToFormControl(): void {
    this.userForm.get('login')!.setValue(this.user.login);
    this.userForm.get('nom')!.setValue(this.user.nom);
    this.userForm.get('prenom')!.setValue(this.user.prenom);
    this.userForm.get('mail')!.setValue(this.user.mail);
  }

  protected getUserFromFormControl(): UserLdap {
    return {
      login: this.userForm.get('login')!.value,
      nom: this.userForm.get('nom')!.value,
      prenom: this.userForm.get('prenom')!.value,
      nomComplet: this.userForm.get('nom')!.value + ' ' + this.userForm.get('prenom')!.value,
      mail: this.userForm.get('mail')!.value,
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER',
    };
    
  }
}