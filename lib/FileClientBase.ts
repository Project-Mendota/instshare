import WebTorrent, { Instance } from "webtorrent";
import { Socket } from "./Socket";

abstract class FileClientBase {
    protected client: Instance;
    protected socket: Socket;

    constructor(socket: Socket) {
        this.client = new WebTorrent();
        this.socket = socket;
    }

    abstract sendFiles(files: File[]): void;

    abstract downloadFiles(): void;
}


export default FileClientBase;