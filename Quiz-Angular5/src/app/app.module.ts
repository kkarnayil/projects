import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

// components
import {AppComponent} from './app.component';
import {QuizQuestionsComponent} from './quiz-questions/quiz-questions.component';
import {QuizResultsComponent} from './quiz-results/quiz-results.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {QuizHeaderComponent} from './quiz-header/quiz-header.component';
import {QuizFooterComponent} from './quiz-footer/quiz-footer.component';
import {QuizUserResultComponent} from './quiz-user-result/quiz-user-result.component';
import {QuizUserResultsComponent} from './quiz-user-results/quiz-user-results.component';

// services
import {QuizService} from './services/quiz.service';

@NgModule({
  declarations: [
    AppComponent,
    QuizQuestionsComponent,
    QuizResultsComponent,
    UserRegistrationComponent,
    QuizHeaderComponent,
    QuizFooterComponent,
    QuizUserResultComponent,
    QuizUserResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule {}
