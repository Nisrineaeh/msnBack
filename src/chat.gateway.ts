import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  cors: { origin: '*' }
}) //dans les parenthese tu peux specifier quel port + nom de namespace

export class ChatGateway implements OnGatewayInit, OnGatewayConnection {


  private logger: Logger = new Logger('ChatGateway');

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    this.logger.log('Le websocket gateway est initialisé')
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Client connecté');
    
  }



  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): WsResponse<string> {
    return { event: 'msgToClient', data: payload }
  }

  // @SubscribeMessage('sendMessageToUser')
  // async handleMessage(client: Socket, payload: { foruserId: string, message: string }) {
  //   // Diffusez le message à l'utilisateur cible
  //   this.server.to(payload.foruserId).emit('receiveMessage', payload.message);
  // }

  // handleConnection(client: Socket) {
  //   const userId = client.handshake.query.userId; //handshake ?!
  //   if (userId) {
  //     client.join(userId);
  //   }
  // }


}
