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
    OnNextSubscriber,
    OnTerminalSubscriber,
    Requestable,
    RSocket,
    RSocketConnector,
} from 'rsocket-core';
import { WebsocketClientTransport } from 'rsocket-websocket-client';
import { from, fromEvent, map, Observable, Observer, tap } from 'rxjs';
import { Product } from './shared/interfaces/product.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private _product?: Product;
    private _channel?: OnTerminalSubscriber &
        OnNextSubscriber &
        OnExtensionSubscriber &
        Requestable &
        Cancellable;

    ngOnInit(): void {
        fromEvent(document, 'click')
            .pipe(
                tap(() => {
                    this._channel!.onNext(
                        {
                            data: Buffer.from('clicked'),
                            metadata: encodeCompositeMetadata([
                                [
                                    WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
                                    encodeRoute(`request.channel`),
                                ],
                            ]),
                        },
                        false
                    );
                })
            )
            .subscribe();

        this._fireAndForget('Hello World !').subscribe();
        this._requestResponse(1).subscribe();
        this._requestChannel()
            .pipe(
                tap((value) =>
                    // by calling directly the parameter received
                    {
                        value.onNext(
                            {
                                data: Buffer.from('10'),
                                metadata: encodeCompositeMetadata([
                                    [
                                        WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
                                        encodeRoute(`request.channel`),
                                    ],
                                ]),
                            },
                            false
                        );
                    }
                )
            )
            // By calling a reference to _stream
            .subscribe();
        this._requestStream().subscribe();
    }

    private _rsocketConnect(): Observable<RSocket> {
        const rsocketConnector = new RSocketConnector({
            transport: new WebsocketClientTransport({
                url: 'ws://localhost:7000',
            }),
            setup: {
                payload: {
                    data: null,
                },
                dataMimeType: WellKnownMimeType.APPLICATION_JSON.toString(),
                metadataMimeType:
                    WellKnownMimeType.MESSAGE_RSOCKET_COMPOSITE_METADATA.toString(),
            },
        });
        return from(rsocketConnector.connect());
    }
    private _fireAndForget(message: string): Observable<Cancellable> {
        return this._rsocketConnect().pipe(
            map((rsocket: RSocket) =>
                rsocket.fireAndForget(
                    {
                        data: Buffer.from(message),
                        metadata: encodeCompositeMetadata([
                            [
                                WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
                                encodeRoute('fire.and.forget'),
                            ],
                        ]),
                    },
                    {
                        onError: (error) => {
                            console.error(error);
                        },
                        onComplete: () => {
                            console.log('Fire and Forget completed');
                        },
                    }
                )
            )
        );
    }
    private _requestResponse(
        id: number
    ): Observable<Cancellable & OnExtensionSubscriber> {
        return this._rsocketConnect().pipe(
            map((rsocket: RSocket) =>
                rsocket.requestResponse(
                    {
                        data: Buffer.from(
                            JSON.stringify({
                                label: 'tshirt',
                                price: 100,
                            })
                        ),
                        metadata: encodeCompositeMetadata([
                            [
                                WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
                                encodeRoute(`request.response.${id}`),
                            ],
                        ]),
                    },
                    {
                        onNext: (payload, isComplete) => {
                            console.log(`## RequestResponse: ${payload.data}`);
                            this._product = this.parseObject<Product>(
                                payload.data!.toString()
                            );
                        },
                        onExtension: (
                            extendedType,
                            content,
                            canBeIgnored
                        ) => {},
                        onError: (error) => {
                            console.error(error);
                        },
                        onComplete: () => {
                            console.log('Request Response complete');
                        },
                    }
                )
            )
        );
    }

    private parseObject<T>(stringToObject: string): T {
        return JSON.parse(stringToObject);
    }

    private _requestChannel(): Observable<
        OnTerminalSubscriber &
            OnNextSubscriber &
            OnExtensionSubscriber &
            Requestable &
            Cancellable
    > {
        return this._rsocketConnect().pipe(
            map((rsocket: RSocket) => {
                this._channel = rsocket.requestChannel(
                    {
                        data: Buffer.from('1'),
                        metadata: encodeCompositeMetadata([
                            [
                                WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
                                encodeRoute(`request.channel`),
                            ],
                        ]),
                    },
                    MAX_REQUEST_N,
                    false,
                    {
                        onError: (error) => {
                            console.error(error);
                        },
                        onComplete: () => {
                            console.error('peer stream complete');
                        },
                        onNext: (payload, isComplete) => {
                            console.log(`## RequestChannel: ${payload.data}`);
                        },
                        onExtension: (
                            extendedType,
                            content,
                            canBeIgnored
                        ) => {},
                        request: (requestN) => {
                            console.log(`peer requested ${requestN}`);
                        },
                        cancel: () => {
                            console.log(`peer canceled`);
                        },
                    }
                );

                return this._channel;
            })
        );
    }

    private _requestStream(): Observable<
        OnExtensionSubscriber & Requestable & Cancellable
    > {
        return this._rsocketConnect().pipe(
            map((rsocket: RSocket) =>
                rsocket.requestStream(
                    {
                        data: Buffer.from('Hello'),
                        metadata: encodeCompositeMetadata([
                            [
                                WellKnownMimeType.MESSAGE_RSOCKET_ROUTING,
                                encodeRoute(`request.stream`),
                            ],
                        ]),
                    },
                    MAX_REQUEST_N,
                    {
                        onError: (error) => {
                            console.error(error);
                        },
                        onComplete: () => {
                            console.log('peer stream complete');
                        },
                        onNext: (payload, isComplete) => {
                            console.log(`## RequestStream: ${payload.data}`);
                        },
                        onExtension: (
                            extendedType,
                            content,
                            canBeIgnored
                        ) => {},
                    }
                )
            )
        );
    }
}
