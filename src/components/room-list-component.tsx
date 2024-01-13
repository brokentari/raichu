"use client";

import { Empty, Room, RoomBrightnessRequest, ToggleStateRequest } from "@/app/hue_pb";
import { RoomComponent } from "@/components/room-component";
import { useEffect, useState } from "react";
import { grpc_client } from "@/app/page";
import RefreshButtonComponent from "@/components/refresh-button";
import { produce } from "immer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"

export function RoomListComponent() {

  const [rooms, setRooms] = useState<Room[]>([]);
  const [isFetching, setFetching] = useState(false);

  const handleSwitchLightState = async (room_id: number, on: boolean) => {
    try {
      let request = new ToggleStateRequest();
      request.setId(room_id)
      await grpc_client.toggleState(request);
    
      await handleRefresh();
    } catch {
      console.error("failed to switch light state for room: ", room_id)
    }
  }

  const handleBrightnessChange = async (room_id: number, new_bri: number[]) => {
    try {
      let selected_room = rooms.find((r) => r.getId() === room_id);
      let brightness = selected_room?.getBri()!;
      let inc_dec_val = new_bri[0] - brightness
      if (inc_dec_val === 255) inc_dec_val--;
      if (inc_dec_val === -255) inc_dec_val++;

      let request = new RoomBrightnessRequest()
      request.setId(room_id)
      request.setBriInc(inc_dec_val)

      await grpc_client.updateRoomBrightness(request);  

      await handleRefresh();
    } catch {
      console.error('failed to change room brightness')
    }
  }


  const handleRefresh = async () => {
    setFetching(true);
    let new_rooms = await getRoomsViaGrpc();

    setRooms(produce(rooms, draft => {
        for (let i = 0; i < rooms.length; i++) {
          draft[i] = rooms[i].setOn(new_rooms[i].getOn())
          draft[i] = rooms[i].setBri(new_rooms[i].getBri())
        }
      }))

    setFetching(false);
  }

  const getRoomsViaGrpc = async () => {
    let request = new Empty();
    try {
      let reply = await grpc_client.getRooms(request);
      let rooms = reply.getRoomsList();

      return rooms;
    } catch {
      console.error("Failed to retrieve rooms")
      return [];
    }
  }

  // load rooms on initial render
  useEffect(() => {
    async function getRoomData() {
      const roomsFromGrpc = await getRoomsViaGrpc();
      setRooms(roomsFromGrpc)
    }

    getRoomData();
  }, [])

  const room_cards = rooms.map(r => 
    <RoomComponent key={r.getId()} room={r} handleSwitchLightState={handleSwitchLightState} handleBrightnessChange={handleBrightnessChange}/>
  )

  return (
    <main className="p-4 md:p-6 lg:p-8">
       <RefreshButtonComponent onClick={handleRefresh} isFetching={isFetching}/>

      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {room_cards}
      </div>
      
    </main>
  )
}
