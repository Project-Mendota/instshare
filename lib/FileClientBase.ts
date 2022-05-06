import WebTorrent, { Instance, Torrent, TorrentFile } from "webtorrent";
import { Socket } from "./Socket";
import { SocketFileInfo } from "./types";

class FileClientBase {
    private client: Instance;
    private socket: Socket;

    constructor(socket: Socket) {
        this.client = new WebTorrent();
        this.socket = socket;
    }

    public sendFile(files: File[]): void {
        this.client.seed(files, (torrent: Torrent) => {
            // send files seed
            this.socket.send<SocketFileInfo>("FILE_INFO", {
                sender: "",
                seed: "",
                length: torrent.length
            });

        });
    }

    public downloadFile(url: string): void {
        this.client.add(url, (torrent: Torrent) => {
            torrent.files.forEach((file: TorrentFile) => {
                // append file to the dom
                file.appendTo('body');
            })
        });
    }
}


export default FileClientBase;