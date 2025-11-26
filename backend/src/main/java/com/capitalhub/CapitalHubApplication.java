package com.capitalhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication es un atajo que incluye @Configuration, @EnableAutoConfiguration y @ComponentScan.
// Le dice a Spring que comience a buscar Beans desde este paquete hacia abajo.
@SpringBootApplication
public class CapitalHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(CapitalHubApplication.class, args);
    }

}