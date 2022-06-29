import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestChannelRoutingModule } from './request-channel-routing.module';
import { RequestChannelComponent } from './components/request-channel.component';

@NgModule({
    declarations: [RequestChannelComponent],
    imports: [CommonModule, RequestChannelRoutingModule],
})
export class RequestChannelModule {}
