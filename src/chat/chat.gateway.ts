import { SubscribeMessage, WebSocketGateway ,MessageBody,ConnectedSocket,WebSocketServer} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server:Server;

  @SubscribeMessage('join_call')
 async joinCall(
  @MessageBody()roomName:string,
  @ConnectedSocket()Socket:Socket,
 ){
  const room=this.server.in(roomName);
  const roomSockets=await room.fetchSockets();
  const numberOfPeopleInRoom=roomSockets.length;
  if(numberOfPeopleInRoom>1){
    room.emit('too_many_people');
    return;
  }
  if(numberOfPeopleInRoom===1){
    room.emit('another person ready')
  }
  Socket.join(roomName);
 }
 @SubscribeMessage('send connectio offer')
 async sendConnectionOffer(
  @MessageBody()
  {
    offer,
    roomName,
  }:{
    offer:RTCLocalSessionDescriptionInit;
    roomName:string;
  },
  @ConnectedSocket() socket:Socket,
 ){
  this.server.in(roomName).except(socket.id).emit('send connection offer',{
    offer,
    roomName,
  });
 }
}