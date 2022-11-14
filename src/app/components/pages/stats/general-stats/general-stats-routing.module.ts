import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralStatsComponent } from './general-stats.component';


const routes: Routes = [
  {
    path: '',
    component: GeneralStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralStatsRoutingModule { }
