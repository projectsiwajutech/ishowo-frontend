import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParamMecefComponent } from './param-mecef.component';


const routes: Routes = [
  {
    path: '',
    component: ParamMecefComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParamMecefRoutingModule { }
