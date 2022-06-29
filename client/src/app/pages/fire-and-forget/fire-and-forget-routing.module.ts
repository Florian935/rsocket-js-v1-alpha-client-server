import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireAndForgetManagerComponent } from './components/fire-and-forget-manager.component';

const routes: Routes = [{ path: '', component: FireAndForgetManagerComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FireAndForgetRoutingModule {}
