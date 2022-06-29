import { Component, OnInit } from '@angular/core';
import { RxRequestersFactory } from 'rsocket-adapter-rxjs';
import { WellKnownMimeType } from 'rsocket-composite-metadata';
import { RSocket, RSocketConnector } from 'rsocket-core';
import { Codec, RSocketRequester } from 'rsocket-messaging';
import { WebsocketClientTransport } from 'rsocket-websocket-client';
import { from, interval, map, mergeMap, Observable, of, take } from 'rxjs';
import { RsocketService } from 'src/app/core/services/rsocket.service';
import { UnsubscribeAdapter } from 'src/app/shared/utils/unsubscribe-adapter.util';

@Component({
    selector: 'app-fire-and-forget-manager',
    templateUrl: './fire-and-forget-manager.component.html',
    styleUrls: ['./fire-and-forget-manager.component.scss'],
})
export class FireAndForgetManagerComponent
    extends UnsubscribeAdapter
    implements OnInit
{
    constructor(private _rsocketService: RsocketService) {
        super();
    }

    ngOnInit(): void {
        // ! TO WORK, RSOCKET-JS NEED BUFFER DEPENDENCE (cf PACKAGE.JSON) AND NEED THIS IN polyfills.ts:
        // ! global.Buffer = global.Buffer || require('buffer').Buffer;
        // ! And this in index.html:
        // ! <script>
        // !   var global = global || window;
        // ! </script>
        // TODO: tout refacto comme la méthode _requestResponseWithPayload et _requestResponseBuilder
        // TODO: deporter les make... dans un service ?

        this.addSub(
            this._rsocketService
                .fireAndForget('fireAndForget', 'fire.and.forget')
                .subscribe(console.log)
        );
    }
}
