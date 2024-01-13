/**
 * @fileoverview gRPC-Web generated client stub for hue
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v3.12.4
// source: src/app/hue.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as src_app_hue_pb from '../../src/app/hue_pb'; // proto import: "src/app/hue.proto"


export class HueClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptortoggleState = new grpcWeb.MethodDescriptor(
    '/hue.Hue/toggleState',
    grpcWeb.MethodType.UNARY,
    src_app_hue_pb.ToggleStateRequest,
    src_app_hue_pb.ToggleStateResponse,
    (request: src_app_hue_pb.ToggleStateRequest) => {
      return request.serializeBinary();
    },
    src_app_hue_pb.ToggleStateResponse.deserializeBinary
  );

  toggleState(
    request: src_app_hue_pb.ToggleStateRequest,
    metadata?: grpcWeb.Metadata | null): Promise<src_app_hue_pb.ToggleStateResponse>;

  toggleState(
    request: src_app_hue_pb.ToggleStateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_app_hue_pb.ToggleStateResponse) => void): grpcWeb.ClientReadableStream<src_app_hue_pb.ToggleStateResponse>;

  toggleState(
    request: src_app_hue_pb.ToggleStateRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_app_hue_pb.ToggleStateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/hue.Hue/toggleState',
        request,
        metadata || {},
        this.methodDescriptortoggleState,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/hue.Hue/toggleState',
    request,
    metadata || {},
    this.methodDescriptortoggleState);
  }

  methodDescriptorgetRooms = new grpcWeb.MethodDescriptor(
    '/hue.Hue/getRooms',
    grpcWeb.MethodType.UNARY,
    src_app_hue_pb.Empty,
    src_app_hue_pb.RoomList,
    (request: src_app_hue_pb.Empty) => {
      return request.serializeBinary();
    },
    src_app_hue_pb.RoomList.deserializeBinary
  );

  getRooms(
    request: src_app_hue_pb.Empty,
    metadata?: grpcWeb.Metadata | null): Promise<src_app_hue_pb.RoomList>;

  getRooms(
    request: src_app_hue_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_app_hue_pb.RoomList) => void): grpcWeb.ClientReadableStream<src_app_hue_pb.RoomList>;

  getRooms(
    request: src_app_hue_pb.Empty,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_app_hue_pb.RoomList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/hue.Hue/getRooms',
        request,
        metadata || {},
        this.methodDescriptorgetRooms,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/hue.Hue/getRooms',
    request,
    metadata || {},
    this.methodDescriptorgetRooms);
  }

  methodDescriptorupdateRoomBrightness = new grpcWeb.MethodDescriptor(
    '/hue.Hue/updateRoomBrightness',
    grpcWeb.MethodType.UNARY,
    src_app_hue_pb.RoomBrightnessRequest,
    src_app_hue_pb.RoomBrightnessResponse,
    (request: src_app_hue_pb.RoomBrightnessRequest) => {
      return request.serializeBinary();
    },
    src_app_hue_pb.RoomBrightnessResponse.deserializeBinary
  );

  updateRoomBrightness(
    request: src_app_hue_pb.RoomBrightnessRequest,
    metadata?: grpcWeb.Metadata | null): Promise<src_app_hue_pb.RoomBrightnessResponse>;

  updateRoomBrightness(
    request: src_app_hue_pb.RoomBrightnessRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_app_hue_pb.RoomBrightnessResponse) => void): grpcWeb.ClientReadableStream<src_app_hue_pb.RoomBrightnessResponse>;

  updateRoomBrightness(
    request: src_app_hue_pb.RoomBrightnessRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_app_hue_pb.RoomBrightnessResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/hue.Hue/updateRoomBrightness',
        request,
        metadata || {},
        this.methodDescriptorupdateRoomBrightness,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/hue.Hue/updateRoomBrightness',
    request,
    metadata || {},
    this.methodDescriptorupdateRoomBrightness);
  }

}
