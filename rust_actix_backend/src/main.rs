use actix_web::{get, App, HttpResponse, HttpServer, Responder, http};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use csv::ReaderBuilder;
use std::fs::File;

#[derive(Debug, Serialize, Deserialize)]
struct Config {
    charts: HashMap<String, Vec<String>>,
}

fn load_csv(file_path: &str) -> Vec<HashMap<String, String>> {
    let mut rdr = ReaderBuilder::new().from_reader(File::open(file_path).unwrap());
    rdr.deserialize().collect::<Result<Vec<HashMap<String, String>>, csv::Error>>().unwrap()
}

#[get("/data")]
async fn get_data() -> impl Responder {
    let config: Config = serde_json::from_str(&std::fs::read_to_string("config.json").unwrap()).unwrap();
    let mut response_data = HashMap::new();

    for (chart, files) in config.charts.iter() {
        let data: Vec<_> = files.iter().map(|file| load_csv(file)).collect();
        response_data.insert(chart, data);
    }

    HttpResponse::Ok().json(response_data)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .service(get_data)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
