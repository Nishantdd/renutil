use serde::{Deserialize, Serialize};
use std::{fs::{read_dir, rename}, path::Path};

#[derive(Serialize, Deserialize)]
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

#[tauri::command]
fn save_directory_contents(dir_path: &str, changes: Vec<Content>) -> Result<Vec<Content>, String> {
    let path = Path::new(dir_path);
    
    if !path.exists() {
        return Err(format!("The path '{}' does not exist.", dir_path));
    } else if !path.is_dir() {
        return Err(format!("The path '{}' is not a directory.", dir_path));
    }
    
    for change in changes {
        if change.old == change.new {
            continue;
        }
        
        let old_path = path.join(&change.old);
        let new_path = path.join(&change.new);
        
        if !old_path.exists() {
            return Err(format!("File '{}' does not exist in directory '{}'.", change.old, dir_path));
        } else if !old_path.is_file() {
            return Err(format!("'{}' is not a file.", change.old));
        } else if new_path.exists() {
            return Err(format!("Cannot rename '{}' to '{}': destination file already exists.", change.old, change.new));
        }
        
        rename(&old_path, &new_path)
            .map_err(|e| format!("Failed to rename '{}' to '{}': {}", change.old, change.new, e))?;
    }
    
    match get_directory_contents(dir_path) {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("Failed to retrieve files after changes: {}", e))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![get_directory_contents, save_directory_contents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
