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

export class LdapEditComponent extends LdapDetailComponent implements OnInit {
  constructor(private usersService: UsersService, private route: ActivatedRoute, fb: FormBuilder, router: Router, private snackBar: MatSnackBar) {
    super(false, fb, router);
  }

  ngOnInit(): void {
    super.OnInit();
    this.getUser();
  }

  private getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.processLoadRunning = true;
    this.usersService.getUser(+id).subscribe(
      user => {
        this.user = user;
        this.copyUserToFormControl();
        this.processLoadRunning = false;
      },
      error => {
        this.processLoadRunning = false;
        this.errorMessage = 'Une erreur est survenue lors de la récupération de l\'utilisateur';
        this.snackBar.open('Utilisateur non trouvé !', 'X');
      }
    );
  }

  validateForm(): void {
    console.log('LdapEditComponent - validateForm');
    this.processValidateRunning = true;
    this.usersService.updateUser(this.getUserFromFormControl()).subscribe(
      data => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur mis à jour', 'OK');
      },
      error => {
        this.processValidateRunning = false;
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour de l\'utilisateur';
        this.snackBar.open(this.errorMessage, 'OK');
      });
  }
}