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

    private handleMessage() {
        this.socket.addEventListener("message", (message) => {
            if (typeof message.data == "string") {
                const type = message.type as SocketMessageType;
                switch (type) {
                    case "FILE_INIT": {
                        break;
                    }
                    case "FILE_DATA": {
                        break;
                    }
                    case "FILE_END": {
                        break;
                    }
                }
            }
        });
    }

    private handleOpen() {
        this.socket.addEventListener("open", () => {
            console.log("Socket Open!")
        });
    }

    private handleClose() {
        this.socket.addEventListener("close", () => {
            console.log("Socket Closed!");
        });
    }

    private handleError() {
        this.socket.addEventListener("error", () => {
            console.log("error!");
        });
    }

    private handleData(type: string, data: any) {
        const handler = this.handlers.get(type);
        if (handler != undefined) {
            handler(data);
        }
    }

    public handle(type: string, handler: SocketMessageHandler): void {
        this.handlers.set(type, handler)
    }

    public removeHandler(type: string): void {
        if (this.handlers.has(type)) {
            this.handlers.delete(type);
        }
    }
}

type SocketMessageData = Record<string, any>;
type SocketMessageHandler = (data: SocketMessageData) => void;
type SocketHandlerMap = Map<string, SocketMessageHandler>;
type SocketMessageType = "FILE_INIT" | "FILE_DATA" | "FILE_END" | "";

export { Socket };
export type { SocketMessageHandler, SocketMessageType };
