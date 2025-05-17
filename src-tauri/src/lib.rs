use serde::Serialize;
use std::{fs::read_dir, path::Path};

#[derive(Serialize)]
struct Content {
    old: String,
    new: String,
}

#[tauri::command]
fn get_directory_contents(dir_path: &str) -> Result<Vec<Content>, String> {
    let path = Path::new(dir_path);

    if !path.exists() {
        return Err(format!("The path '{}' does not exist.", dir_path));
    } else if !path.is_dir() {
        return Err(format!("The path '{}' is not a directory.", dir_path));
    }

    let entries = read_dir(path)
        .map_err(|e| format!("Failed to read directory: {}", e))?
        .filter_map(|res| {
            res.ok().and_then(|entry| match entry.metadata() {
                Ok(meta) if meta.is_file() => {
                    entry
                        .file_name()
                        .into_string()
                        .ok()
                        .map(|file_name| Content {
                            old: file_name.clone(),
                            new: file_name,
                        })
                }
                _ => None,
            })
        })
        .collect::<Vec<Content>>();

    Ok(entries)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![get_directory_contents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
