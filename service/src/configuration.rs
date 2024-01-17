#[derive(serde::Deserialize, Clone)]
pub struct Settings {
    pub service: ServiceSettings,
}


#[derive(serde::Deserialize, Clone)]
pub struct ServiceSettings {
    pub hue_host: String,
    pub hue_base_url: String,
    pub hue_username: String,
    pub timeout: u32,
}

pub fn get_configuration() -> Result<Settings, config::ConfigError> {
    let current_path = std::env::current_dir().expect("failed to get current directory");
    let parent_path = current_path.parent().expect("no parent directory ?");
    let config_dir = parent_path.join("config");

    let file_name = "local.yaml";
    let settings = config::Config::builder()
        .add_source(config::File::from(config_dir.join(file_name)))
        .add_source(
            config::Environment::with_prefix("RAICHU")
                .prefix_separator("_")
                .separator("__"),
        )
        .build()?;

    settings.try_deserialize::<Settings>()
}
