import { Torrent } from "webtorrent";
import FileClientBase from "./FileClientBase";
import { Socket } from "./Socket";
import { SocketFileInfo } from "./types";

class TorrentClient extends FileClientBase {

    constructor(socket: Socket) {
        super(socket);
    }

    public sendFiles(files: File[]): void {

        const fileMap = files.reduce((m, f) => {
            m.set(`${f.name}${f.size}`, f);
            return m;
        }, new Map<string, File>());

        this.client.seed(files, (torrent: Torrent) => {

            const fileInfo = torrent.files.map(f => {
                let type = fileMap.get(`${f.name}${f.length}`)?.type;
                // it is unreachable
                if (type == null) {
                    type = "";
                }
                return {
                    name: f.name,
                    length: f.length,
                    type
                }
            });

            // send files info
            this.socket.send<SocketFileInfo>("FILE_INFO", {
                sender: "",
                seed: torrent.infoHash,
                length: torrent.length,
                fileInfo,
            });

        });
    }

    public downloadFiles(): void {
        this.socket.handle<SocketFileInfo>("FILE_INFO", data => {
            this.client.add(data.seed, torrent => {
                torrent.on("done", () => {
                    console.log("Download finish...");
                })
            });
        });
        return;
    }
}


export default TorrentClient;