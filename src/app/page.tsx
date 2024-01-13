"use client";

import { ModeToggle } from '@/components/mode-toggle';
import { RoomListComponent } from '@/components/room-list-component'
import { HueClient } from './HueServiceClientPb';

export const grpc_client = new HueClient("http://localhost:50051", null, null);


export default function Home() {
  // const handleRefresh = () => {
  //   setNumbers(produce(numbers, draft => {
  //     for(let i = 0; i < numbers.length; i++) {
  //       draft[i] = numbers[i] + 123
  //     }
  //   }))
  // }


  // const toggleLightState = async (room: Room, on: boolean) => {
  //   // let request = new ToggleStateRequest();
  //   // request.setId(room.getId())
  //   // grpc_client.toggleState(request).then(reply => {
  //   //   let response_message = reply.getMsg();

  //   //   console.log(response_message);
  //   // })

  //   let updatedRooms = await getRooms()
  //   setRooms(produce(updatedRooms, draft => {
  //     for(let i = 0; i < updatedRooms.length; i++) {
  //       draft[i] = updatedRooms[i]
  //     }
  //   }))
  // }
  
  // const handleRefresh = async () => {
  //   let updatedRooms = await getRooms()
  //   setRooms(produce(updatedRooms, draft => {
  //     for(let i = 0; i < updatedRooms.length; i++) {
  //       draft[i] = updatedRooms[i]
  //     }
  //   }))
  // }



  return (
    <>
      <div className='absolute top-4 right-4'>
        <ModeToggle />
      </div>
      <RoomListComponent />
    </>
  )
}
