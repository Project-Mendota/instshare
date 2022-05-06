import WebTorrent, { Instance, Torrent, TorrentFile } from "webtorrent";
import { Socket } from "./Socket";

class FileClientBase {
    private client: Instance;
    private socket: Socket;

    constructor(socket: Socket) {
        this.client = new WebTorrent();
        this.socket = socket;
    }

    public sendFile(files: File[]): void {
        this.client.seed(files, (torrent: Torrent) => {
            console.log("Client is seeding:", torrent.infoHash);
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