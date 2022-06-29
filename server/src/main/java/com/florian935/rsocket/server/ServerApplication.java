package com.florian935.rsocket.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import reactor.core.publisher.Hooks;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		Hooks.onErrorDropped(System.out::println);
		SpringApplication.run(ServerApplication.class, args);
	}

}
