import { SocketHandlerMap, SocketMessageHandler, SocketMessageData, SocketMessage, SocketMessageType } from "./types"

/**
 * Socket is a wrapped WebSocket
 */
class Socket {
    private socket: WebSocket;
    private handlers: SocketHandlerMap;

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.socket.binaryType = "arraybuffer"
        this.handlers = new Map();
        this.handleOpen();
        this.handleError();
        this.handleMessage();
        this.handleClose();
    }

    private handleMessage(): void {
        this.socket.addEventListener("message", (message) => {
            if (typeof message.data == "string") {
                const data = JSON.parse(message.data) as SocketMessage;
                const type = data['type'];
                switch (type) {
                    case "FILE_INIT": {
                        break;
                    }
                    case "FILE_INFO": {
                        break;
                    }
                    case "FILE_END": {
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        });
    }

    private handleOpen(): void {
        this.socket.addEventListener("open", () => {
            console.log("Socket Open!")
        });
    }

    private handleClose(): void {
        this.socket.addEventListener("close", () => {
            console.log("Socket Closed!");
        });
    }

    private handleError(): void {
        this.socket.addEventListener("error", () => {
            console.log("error!");
        });
    }

    private handleData(type: string, data: any): void {
        const handler = this.handlers.get(type);
        if (handler != undefined) {
            handler(data);
        }
    }

    /**
     * Add data handler
     * @param type type of handler
     * @param handler handler
     */
    public handle(type: string, handler: SocketMessageHandler): void {
        this.handlers.set(type, handler)
    }

    /**
     * Remove a data handler
     * @param type type of handler
     */
    public removeHandler(type: string): void {
        if (this.handlers.has(type)) {
            this.handlers.delete(type);
        }
    }

    /**
     * Send data through websocket
     * @param type type of message
     * @param data data of message
     */
    public send<T extends SocketMessageData>(type: SocketMessageType, data: T): void {
        this.socket.send(JSON.stringify({ type, data }));
    }
}

export { Socket };
