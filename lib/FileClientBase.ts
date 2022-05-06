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
        const fileMap = files.reduce((m, f) => {
            m.set(`${f.name}${f.size}`, f);
            return m;
        }, new Map<string, File>());

        this.client.seed(files, (torrent: Torrent) => {

            const fileInfo = torrent.files.map(f => {
                let type = fileMap.get(`${f.name}${f.length}`)?.type;
                // it is unreachable
                if (type == null) {
                    type = ""
                }
                return {
                    name: f.name,
                    length: f.length,
                    type
                }
            });

            // send files
            this.socket.send<SocketFileInfo>("FILE_INFO", {
                sender: "",
                seed: torrent.infoHash,
                length: torrent.length,
                fileInfo,
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