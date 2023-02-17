import { NgModule } from '@angular/core';
/* MATERIAL */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
exports: [
BrowserAnimationsModule,
LayoutModule,
MatToolbarModule,
MatButtonModule,
MatCheckboxModule,
MatSidenavModule,
MatIconModule,
MatListModule,
MatTableModule,
MatPaginatorModule,
MatFormFieldModule,
MatInputModule,
MatSlideToggleModule,
MatSelectModule
]
})
export class AppMaterialModule { }