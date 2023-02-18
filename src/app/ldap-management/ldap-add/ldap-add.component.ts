import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { LdapDetailComponent } from '../ldap-detail/ldap-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']
})
export class LdapAddComponent extends LdapDetailComponent implements OnInit {
  constructor (private usersService: UsersService, private route: ActivatedRoute, fb: FormBuilder, router: Router, private snackBar: MatSnackBar)
  {
    super(true, fb, router);
  }
  
  ngOnInit(): void {
    super.OnInit();
  }

  validateForm(): void{
    console.log('LdapAddComponent - validateForm');
    this.processValidateRunning = true;
    this.usersService.addUser(this.getUserFromFormControl()).subscribe(
      data => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur ajouté', 'OK');
      },
      error => {
        this.processValidateRunning = false;
        this.errorMessage = 'Une erreur est survenue lors de l\'ajout de l\'utilisateur';
        this.snackBar.open(this.errorMessage, 'OK');
      }
    );
  }
}
