import { Component, OnInit } from '@angular/core';
import {
    encodeCompositeMetadata,
    encodeRoute,
    encodeSimpleAuthMetadata,
    WellKnownMimeType,
} from 'rsocket-composite-metadata';
import {
    Cancellable,
    MAX_REQUEST_N,
    OnExtensionSubscriber,
    RSocket,
    RSocketConnector,
} from 'rsocket-core';
import { WebsocketClientTransport } from 'rsocket-websocket-client';
import { from, map, Observable, Observer, tap } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent /*implements OnInit*/ {
    // rsocketConnector!: RSocketConnector;
    // product?: { id: string; label: string; price: number };
    // ngOnInit(): void {
    //     this._fireAndForget('Hello World !').subscribe();
    //     this._requestResponse(1).subscribe();
    // }
    // private _rsocketConnect(): Observable<RSocket> {
    //     const rsocketConnector = new RSocketConnector({
    //         transport: new WebsocketClientTransport({
    //             url: 'ws://localhost:7000',
    //         }),
    //         setup: {
    //             payload: {
    //                 data: null,
    //             },
    //             dataMimeType: WellKnownMimeType.APPLICATION_JSON.toString(),
    //             metadataMimeType:
    //                 WellKnownMimeType.MESSAGE_RSOCKET_COMPOSITE_METADATA.toString(),
    //         },
    //     });
    //     return from(rsocketConnector.connect());
    // }
    // private _fireAndForget(message: string): Observable<Cancellable> {
    //     return this._rsocketConnect().pipe(
    //         map((rsocket: RSocket) =>
    //             rsocket.fireAndForget(
    //                 {
    //                     data: Buffer.from(message),
    //                     metadata: encodeCompositeMetadata([
    //                         [
    //                             WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
    //                             encodeRoute('fire.and.forget'),
    //                         ],
    //                     ]),
    //                 },
    //                 {
    //                     onError: (error) => {
    //                         console.error(error);
    //                     },
    //                     onComplete: () => {
    //                         console.log('Fire and Forget completed');
    //                     },
    //                 }
    //             )
    //         )
    //     );
    // }
    // private _requestResponse(
    //     id: number
    // ): Observable<Cancellable & OnExtensionSubscriber> {
    //     return this._rsocketConnect().pipe(
    //         map((rsocket: RSocket) =>
    //             rsocket.requestResponse(
    //                 {
    //                     data: Buffer.from(
    //                         JSON.stringify({
    //                             label: 'tshirt',
    //                             price: 100,
    //                         })
    //                     ),
    //                     metadata: encodeCompositeMetadata([
    //                         [
    //                             WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
    //                             encodeRoute(`request.response.${id}`),
    //                         ],
    //                     ]),
    //                 },
    //                 {
    //                     onNext: (payload, isComplete) => {
    //                         console.log(
    //                             `payload[data: ${payload.data}; metadata: ${payload.metadata}]|${isComplete}`
    //                         );
    //                         this.product = this.parseObject<{
    //                             id: string;
    //                             label: string;
    //                             price: number;
    //                         }>(payload.data!.toString());
    //                     },
    //                     onExtension: (
    //                         extendedType,
    //                         content,
    //                         canBeIgnored
    //                     ) => {},
    //                     onError: (error) => {
    //                         console.error(error);
    //                     },
    //                     onComplete: () => {
    //                         console.log('Request Response complete');
    //                     },
    //                 }
    //             )
    //         )
    //     );
    // }
    // private parseObject<T>(stringToObject: string): T {
    //     return JSON.parse(stringToObject);
    // }
}
