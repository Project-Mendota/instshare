
type SocketMessageType = "FILE_INIT" | "FILE_INFO" | "FILE_END" | "";

interface SocketMessage {
    type: SocketMessageType,
    data: SocketMessageData
}

interface SocketMessageData {
    sender: string
}

interface FileInfo {
    name: string
    length: number
    type: string
}

interface SocketFileInfo extends SocketMessageData {
    seed: string,
    length: number
    fileInfo: FileInfo[]
}

type SocketMessageHandler<T extends SocketMessageData> = (data: T) => void;

type SocketHandlerMap = Map<string, SocketMessageHandler<any>>;

export type {
    SocketMessageHandler,
    SocketMessageType,
    SocketFileInfo,
    SocketHandlerMap,
    SocketMessageData,
    SocketMessage,
    FileInfo,
};
