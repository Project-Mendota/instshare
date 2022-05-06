import {
    SocketHandlerMap,
    SocketMessageHandler,
    SocketMessageData,
    SocketMessage,
    SocketMessageType
} from "./types"

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
                const msg = JSON.parse(message.data) as SocketMessage;
                this.handleData(msg.type, msg.data);
            }
        });
    }

    /**
     * handle open
     */
    private handleOpen(): void {
        this.socket.addEventListener("open", () => {
            console.log("Socket Open!")
        });
    }

    /**
     * handle close
     */
    private handleClose(): void {
        this.socket.addEventListener("close", () => {
            console.log("Socket Closed!");
        });
    }

    /**
     * handle error
     */
    private handleError(): void {
        this.socket.addEventListener("error", () => {
            console.log("error!");
        });
    }

    private handleData<T extends SocketMessageData>(type: SocketMessageType, data: T): void {
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
    public handle<T extends SocketMessageData>(type: string, handler: SocketMessageHandler<T>): void {
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
