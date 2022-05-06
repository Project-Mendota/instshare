
type SocketMessageType = "FILE_INIT" | "FILE_INFO" | "FILE_END" | "";

interface SocketMessage {
    type: SocketMessageType,
    data: SocketMessageData
}

interface SocketMessageData {
    sender: string
}


interface SocketFileInfo extends SocketMessageData {
    seed: string,
    length: number
}

type SocketMessageHandler = (data: SocketMessageData) => void;

type SocketHandlerMap = Map<string, SocketMessageHandler>;

export type {
    SocketMessageHandler,
    SocketMessageType,
    SocketFileInfo,
    SocketHandlerMap,
    SocketMessageData,
    SocketMessage
};
