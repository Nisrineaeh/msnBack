import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';


@Injectable()
export class PusherService {
    pusher:Pusher;

    constructor() {
        this.pusher = new Pusher({
            appId: "1672780",
            key: "857c329d86f3e172ea9c",
            secret: "533b9813212f93065e4e",
            cluster: "eu",
            useTLS: true
        });
}

    async trigger(channel:string, event:string, data:any){
        await this.pusher.trigger(channel, event, data)
    }
}
