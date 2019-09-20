import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';
import { Test1Component } from './components/test1/test1.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { SearchService } from './components/dashboard/search.service';
import { FilterContentPipe } from './components/dashboard/filter-content.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatDialogModule } from '@angular/material';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/shared/alert/alert.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { ReservationDashboardComponent } from './components/Reservation/reservation-dashboard/reservation-dashboard.component';
import { ReservebookComponent } from './components/Reservation/reservebook/reservebook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { HistoryComponent } from './components/history/history.component';
 
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FilterContentPipe,
    AuthenticationComponent,
    LoginComponent,
    AlertComponent,
    NavbarComponent,
    ReservationDashboardComponent,
    ReservebookComponent,
    AddbookComponent,
    NotificationComponent,
    Test1Component,
    FooterComponent,
    ConfirmationDialogComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
