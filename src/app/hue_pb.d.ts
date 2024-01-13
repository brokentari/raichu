import * as jspb from 'google-protobuf'



export class RoomBrightnessRequest extends jspb.Message {
  getId(): number;
  setId(value: number): RoomBrightnessRequest;

  getBriInc(): number;
  setBriInc(value: number): RoomBrightnessRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomBrightnessRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RoomBrightnessRequest): RoomBrightnessRequest.AsObject;
  static serializeBinaryToWriter(message: RoomBrightnessRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomBrightnessRequest;
  static deserializeBinaryFromReader(message: RoomBrightnessRequest, reader: jspb.BinaryReader): RoomBrightnessRequest;
}

export namespace RoomBrightnessRequest {
  export type AsObject = {
    id: number,
    briInc: number,
  }
}

export class RoomBrightnessResponse extends jspb.Message {
  getError(): number;
  setError(value: number): RoomBrightnessResponse;

  getMsg(): string;
  setMsg(value: string): RoomBrightnessResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomBrightnessResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RoomBrightnessResponse): RoomBrightnessResponse.AsObject;
  static serializeBinaryToWriter(message: RoomBrightnessResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomBrightnessResponse;
  static deserializeBinaryFromReader(message: RoomBrightnessResponse, reader: jspb.BinaryReader): RoomBrightnessResponse;
}

export namespace RoomBrightnessResponse {
  export type AsObject = {
    error: number,
    msg: string,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Room extends jspb.Message {
  getName(): string;
  setName(value: string): Room;

  getId(): number;
  setId(value: number): Room;

  getOn(): boolean;
  setOn(value: boolean): Room;

  getBri(): number;
  setBri(value: number): Room;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Room.AsObject;
  static toObject(includeInstance: boolean, msg: Room): Room.AsObject;
  static serializeBinaryToWriter(message: Room, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Room;
  static deserializeBinaryFromReader(message: Room, reader: jspb.BinaryReader): Room;
}

export namespace Room {
  export type AsObject = {
    name: string,
    id: number,
    on: boolean,
    bri: number,
  }
}

export class RoomList extends jspb.Message {
  getRoomsList(): Array<Room>;
  setRoomsList(value: Array<Room>): RoomList;
  clearRoomsList(): RoomList;
  addRooms(value?: Room, index?: number): Room;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomList.AsObject;
  static toObject(includeInstance: boolean, msg: RoomList): RoomList.AsObject;
  static serializeBinaryToWriter(message: RoomList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomList;
  static deserializeBinaryFromReader(message: RoomList, reader: jspb.BinaryReader): RoomList;
}

export namespace RoomList {
  export type AsObject = {
    roomsList: Array<Room.AsObject>,
  }
}

export class ToggleStateRequest extends jspb.Message {
  getId(): number;
  setId(value: number): ToggleStateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ToggleStateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ToggleStateRequest): ToggleStateRequest.AsObject;
  static serializeBinaryToWriter(message: ToggleStateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ToggleStateRequest;
  static deserializeBinaryFromReader(message: ToggleStateRequest, reader: jspb.BinaryReader): ToggleStateRequest;
}

export namespace ToggleStateRequest {
  export type AsObject = {
    id: number,
  }
}

export class ToggleStateResponse extends jspb.Message {
  getError(): number;
  setError(value: number): ToggleStateResponse;

  getMsg(): string;
  setMsg(value: string): ToggleStateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ToggleStateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ToggleStateResponse): ToggleStateResponse.AsObject;
  static serializeBinaryToWriter(message: ToggleStateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ToggleStateResponse;
  static deserializeBinaryFromReader(message: ToggleStateResponse, reader: jspb.BinaryReader): ToggleStateResponse;
}

export namespace ToggleStateResponse {
  export type AsObject = {
    error: number,
    msg: string,
  }
}

