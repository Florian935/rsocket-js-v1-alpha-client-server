package com.florian935.rsocket.server.controller;

import com.florian935.rsocket.server.domain.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Controller
@Slf4j
public class ProductController {

    @MessageMapping("fire.and.forget")
    Mono<Void> fireAndForget(@Payload String greeting) {
        log.info(greeting);

        return Mono.empty();
    }

    @MessageMapping("request.response")
    Mono<String> requestResponse(@Payload String greeting) {

        return Mono.just("You said: " + greeting);
    }

    @MessageMapping("request.response.{id}")
    Mono<Product> requestResponseWithPayload(@DestinationVariable String id, @Payload Product product) {
        product.setId(id);

        return Mono.just(product);
    }

    @MessageMapping("request.stream")
    Flux<String> requestStream(@Payload String greeting) {
        return Flux.interval(Duration.ofSeconds(1))
                .map(interval -> greeting + " " + interval)
                .take(5);
    }

    @MessageMapping("request.channel")
    Flux<String> requestChannel(@Payload Flux<String> numbers) {
        return numbers.log();
    }
}
