"use client";

import { useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from"@/components/ui/slider"
import { Room, RoomBrightnessRequest, ToggleStateRequest, ToggleStateResponse } from "@/app/hue_pb";
import { grpc_client } from "@/app/page";


export function RoomComponent({room, handleSwitchLightState, handleBrightnessChange}: {room: Room, handleSwitchLightState: (room_id: number, on:boolean) => Promise<void>, handleBrightnessChange: (room_id: number, new_bri: number[]) => Promise<void>}) {
  // const [checked, setChecked] = useState(room.getOn())

  // function toggleLightState(on: boolean) {
  //   let request = new ToggleStateRequest();
  //   request.setId(room.getId())
  //   grpc_client.toggleState(request).then(reply => {
  //     let response_message = reply.getMsg();

  //     console.log(response_message);
  //   })
  //   setChecked(on);
  // }

  // function handleSliderCommit(value: number[]) {
  //   let inc_dec_val = value[0] - brightness
  //   if (inc_dec_val === 255) inc_dec_val--;
  //   if (inc_dec_val === -255) inc_dec_val++;

  //   let request = new RoomBrightnessRequest()
  //   request.setId(room.getId())
  //   request.setBriInc(inc_dec_val)

  //   grpc_client.updateRoomBrightness(request).then(reply => {
  //     if (reply.getError() != 0) {
  //       console.error(reply.getMsg())
  //     } else {
  //       console.log(reply.getMsg())
  //     }
  //   })

  //   console.log("inc value: ", inc_dec_val)
  //   setBrightness(value[0]) 
  // }

  return (
    <Card key={room.getId()}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{room.getName()}</CardTitle>
        <Switch id={room.getName()} checked={room.getOn()} onCheckedChange={(on: boolean) => handleSwitchLightState(room.getId(), on)}/>
        {/* <div className="flex items-center space-x-2">
          
          <Label htmlFor="living-room">Toggle</Label>
        </div> */}
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400 pr-4">Brightness</p>
        {room.getOn() && <Slider className="w-full mt-2" id="living-room-brightness" disabled={!room.getOn()} max={255} step={1} defaultValue={[room.getBri()]} onValueCommit={(val: number[]) => handleBrightnessChange(room.getId(), val)} />}
      </CardContent>
    </Card>
  )
}