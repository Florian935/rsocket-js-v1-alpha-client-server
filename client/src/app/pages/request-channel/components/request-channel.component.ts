import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { RsocketService } from 'src/app/core/services/rsocket.service';
import { UnsubscribeAdapter } from 'src/app/shared/utils/unsubscribe-adapter.util';

@Component({
    selector: 'app-request-channel',
    templateUrl: './request-channel.component.html',
    styleUrls: ['./request-channel.component.scss'],
})
export class RequestChannelComponent
    extends UnsubscribeAdapter
    implements OnInit
{
    constructor(private _rsocketService: RsocketService) {
        super();
    }

    ngOnInit(): void {
        this.addSub(
            this._rsocketService
                .requestChannel(of('1', '2', '3', '4', '5'), 'request.channel')
                .subscribe(console.log)
        );
    }
}
