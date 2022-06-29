import { Component, OnInit } from '@angular/core';
import { RsocketService } from 'src/app/core/services/rsocket.service';
import { UnsubscribeAdapter } from 'src/app/shared/utils/unsubscribe-adapter.util';

@Component({
    selector: 'app-request-response',
    templateUrl: './request-response.component.html',
    styleUrls: ['./request-response.component.scss'],
})
export class RequestResponseComponent
    extends UnsubscribeAdapter
    implements OnInit
{
    constructor(private _rsocketService: RsocketService) {
        super();
    }

    ngOnInit(): void {
        this.addSub(
            this._rsocketService
                .requestResponse('requestResponse', 'request.response')
                .subscribe(console.log)
        );

        this.addSub(
            this._rsocketService
                .requestResponseWithPayload(
                    { label: 'PC', price: 1000 },
                    'request.response.1'
                )
                .subscribe(console.log)
        );
    }
}
