import { Codec } from 'rsocket-messaging';

export class NumberCodec implements Codec<number> {
    readonly mimeType: string = 'text/plain';

    decode(buffer: Buffer): number {
        return parseInt(buffer.toString());
    }
    encode(entity: number): Buffer {
        return Buffer.from(entity.toString());
    }
}
