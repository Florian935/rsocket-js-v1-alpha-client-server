import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subscriptions } from '../types/subscriptions.type';

@Directive()
export class UnsubscribeAdapter implements OnDestroy {
    protected _subcriptions: Subscriptions = [];

    addSub(subscription: Subscription) {
        this._subcriptions.push(subscription);
    }

    ngOnDestroy(): void {
        if (this._subcriptions.length > 0) {
            this._subcriptions.forEach((subscription: Subscription) =>
                subscription.unsubscribe()
            );
        }
    }
}
