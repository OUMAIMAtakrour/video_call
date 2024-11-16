import { IoAdapter } from "@nestjs/platform-socket.io";
import { INestApplicationContext } from "@nestjs/common";
import { Server, ServerOptions } from "socket.io";
import { CorsOptions } from "cors";

export class WebsocketAdapter extends IoAdapter {
    constructor(
        appOrHttpServer: INestApplicationContext,
        private readonly corsOptions: CorsOptions,
    ) {
        super(appOrHttpServer);
    }

    createIOServer(port: number, options?: ServerOptions): Server {
        return super.createIOServer(port, {
            ...options,
            cors: this.corsOptions,
        });
    }
}