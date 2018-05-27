import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { QuizUserResultComponent } from './quiz-user-result/quiz-user-result.component';
import { QuizUserResultsComponent } from './quiz-user-results/quiz-user-results.component';


const routes: Routes = [
                        { path: 'questions', component: QuizQuestionsComponent },
                        { path: 'user-result', component: QuizUserResultComponent },
                        { path: 'user-results', component: QuizUserResultsComponent },
                        { path : '', component : UserRegistrationComponent}  
                       ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
