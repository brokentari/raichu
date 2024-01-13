use std::collections::HashMap;

use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct HueLight {
    #[serde(skip)]
    pub id: u32,
    name: String,
}

#[derive(Debug, Deserialize)]
pub struct HueLightCollection {
    #[serde(flatten)]
    lights: HashMap<String, HueLight>,
}

pub struct PhillipsHueClient {
    http_client: Client,
    base_url: reqwest::Url,
    username: String,
}

#[derive(Debug, Deserialize, Copy, Clone)]
pub struct HueGroupAction {
    pub on: bool,
    #[serde(rename = "bri")]
    pub brightness: u32,
    pub hue: u32,
    #[serde(rename = "sat")]
    pub saturation: u32,
}

#[derive(Debug, Serialize)]
struct ToggleStateRequest {
    on: bool,
}

#[derive(Debug, Serialize)]
struct RoomBrightnessRequest {
    bri_inc: i32,
}

#[derive(Debug, Deserialize)]
pub struct HueGroup {
    #[serde(skip)]
    pub id: u32,
    pub name: String,
    pub lights: Vec<String>,
    #[serde(rename = "type")]
    pub group_type: String,
    pub action: HueGroupAction,
}

#[derive(Debug, Deserialize)]
pub struct HueGroupCollection {
    #[serde(flatten)]
    groups: HashMap<String, HueGroup>,
}

impl PhillipsHueClient {
    pub fn new(
        base_url: String,
        username: String,
        timeout: std::time::Duration,
    ) -> Result<Self, std::io::Error> {
        let base_url = reqwest::Url::parse(base_url.as_str()).expect("failed to parse url");
        let http_client = Client::builder().timeout(timeout).build().unwrap();

        Ok(Self {
            http_client,
            base_url,
            username,
        })
    }

    pub async fn get_rooms(&self) -> Result<Vec<HueGroup>, reqwest::Error> {
        let url = self
            .base_url
            .join(format!("{}/groups", self.username).as_str())
            .expect("failed to join url");

        println!("Making GET request to: {}", url);

        let result = self
            .http_client
            .get(url)
            .send()
            .await?
            .error_for_status()
            .unwrap()
            .json::<HueGroupCollection>()
            .await?;

        let group_vec: Vec<HueGroup> = result
            .groups
            .iter()
            .filter(|v| v.1.group_type.eq("Room"))
            .map(|v| HueGroup {
                id: v.0.parse().expect("malformed group ID"),
                group_type: v.1.group_type.to_string(),
                lights: v.1.lights.to_owned(),
                name: v.1.name.to_string(),
                action: v.1.action.to_owned(),
            })
            .collect();

        Ok(group_vec)
    }

    pub async fn get_room(&self, room_id: u32) -> Result<HueGroup, reqwest::Error> {
        let url = self
            .base_url
            .join(format!("{}/groups/{}", self.username, room_id).as_str())
            .expect("failed to join url");

        println!("Making GET request to: {}", url);

        let mut result = self
            .http_client
            .get(url)
            .send()
            .await?
            .error_for_status()
            .unwrap()
            .json::<HueGroup>()
            .await?;
        result.id = room_id;
        Ok(result)
    }

    pub async fn toggle_room_state(&self, room_id: u32) -> Result<(), reqwest::Error> {
        let selected_group = self.get_room(room_id).await?;
        let new_state = !selected_group.action.on;

        let request = ToggleStateRequest { on: new_state };

        let url = self
            .base_url
            .join(format!("{}/groups/{}/action", self.username, room_id).as_str())
            .expect("failed to join url");

        println!("Making PUT request to: {}", url);

        self.http_client
            .put(url)
            .json(&request)
            .send()
            .await?
            .error_for_status()?;

        Ok(())
    }

    pub async fn update_room_brightness(
        &self,
        room_id: u32,
        new_brightness: i32,
    ) -> Result<(), reqwest::Error> {
        let request = RoomBrightnessRequest {
            bri_inc: new_brightness,
        };

        let url = self
            .base_url
            .join(format!("{}/groups/{}/action", self.username, room_id).as_str())
            .expect("failed to join url");

        println!("Making PUT request to: {}", url);

        self.http_client
            .put(url)
            .json(&request)
            .send()
            .await?
            .error_for_status()?;

        Ok(())
    }

    pub async fn get_lights(&self) -> Result<Vec<HueLight>, reqwest::Error> {
        let url = self
            .base_url
            .join(format!("{}/lights", self.username).as_str())
            .expect("failed to join url");

        println!("Making GET request to: {}", url);

        let result = self
            .http_client
            .get(url)
            .send()
            .await?
            .error_for_status()
            .unwrap()
            .json::<HueLightCollection>()
            .await?
            .lights
            .iter()
            .map(|v| HueLight {
                id: v.0.parse().expect("malformed light ID"),
                name: v.1.name.to_string(),
            })
            .collect();

        Ok(result)
    }
}
