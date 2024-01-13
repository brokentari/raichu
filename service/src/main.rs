use raichu::phillips::PhillipsHueClient;
use std::time::Duration;

pub mod hue_rpc {
    tonic::include_proto!("hue");
}

use hue_rpc::hue_server::{Hue, HueServer};
use hue_rpc::{
    Empty, Room, RoomBrightnessRequest, RoomBrightnessResponse, RoomList, ToggleStateRequest,
    ToggleStateResponse,
};
use tonic::{transport::Server, Request, Response, Status};

pub struct MyHue {
    hue_client: PhillipsHueClient,
}

impl MyHue {
    pub fn new() -> Self {
        let client = PhillipsHueClient::new(
            "http://192.168.1.152/api/".to_string(),
            "Px9j4YHTmCzFDbcbKq8onZtK8-8jvhw1sJqjBElL".to_string(),
            Duration::from_millis(10000),
        )
        .expect("failed to initialized phillips hue client");

        MyHue { hue_client: client }
    }
}

#[tonic::async_trait]
impl Hue for MyHue {
    async fn update_room_brightness(
        &self,
        request: Request<RoomBrightnessRequest>,
    ) -> Result<Response<RoomBrightnessResponse>, Status> {
        let room_id = request.get_ref().id;
        let brightness_increase = request.get_ref().bri_inc;

        let response: RoomBrightnessResponse;

        match self
            .hue_client
            .update_room_brightness(room_id, brightness_increase)
            .await
        {
            Ok(_) => {
                response = hue_rpc::RoomBrightnessResponse {
                    error: 0,
                    msg: "Updated room brightness".to_string(),
                }
            }
            Err(_) => {
                response = hue_rpc::RoomBrightnessResponse {
                    error: -1,
                    msg: "Failed to updated room brightnesss".to_string(),
                }
            }
        }

        Ok(Response::new(response))
    }

    async fn get_rooms(&self, _: Request<Empty>) -> Result<Response<RoomList>, Status> {
        let response: RoomList;
        let rooms = self.hue_client.get_rooms().await;

        match rooms {
            Ok(mut r) => {
                r.sort_by(|a, b| a.name.cmp(&b.name));
                response = hue_rpc::RoomList {
                    rooms: r
                        .iter()
                        .map(|r| Room {
                            id: r.id,
                            name: r.name.clone(),
                            on: r.action.on,
                            bri: r.action.brightness,
                        })
                        .collect(),
                }
            }
            Err(_) => response = hue_rpc::RoomList { rooms: vec![] },
        }

        Ok(Response::new(response))
    }

    async fn toggle_state(
        &self,
        request: Request<ToggleStateRequest>,
    ) -> Result<Response<ToggleStateResponse>, Status> {
        println!("Got a request: {:?}", request);

        let response: ToggleStateResponse;
        let room_id = request.into_inner().id;
        match self.hue_client.toggle_room_state(room_id).await {
            Ok(_) => {
                response = hue_rpc::ToggleStateResponse {
                    msg: format!("Toggled the state of room with ID {}", room_id).into(),
                    error: 0,
                }
            }
            Err(_) => {
                response = hue_rpc::ToggleStateResponse {
                    msg: format!("Failed to toggle room state with ID {}", room_id).into(),
                    error: 1,
                };
            }
        }

        Ok(Response::new(response))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:50051".parse()?;
    let hue = MyHue::new();

    let hue_server: HueServer<MyHue> = HueServer::new(hue);

    Server::builder()
        .accept_http1(true)
        .add_service(tonic_web::enable(hue_server))
        .serve(addr)
        .await?;

    Ok(())
}
