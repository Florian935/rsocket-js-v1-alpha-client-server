import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestChannelComponent } from './components/request-channel.component';

const routes: Routes = [{ path: '', component: RequestChannelComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RequestChannelRoutingModule {}
