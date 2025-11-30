use serde::{Deserialize, Serialize};
use std::{fs::{read_dir, rename, copy, create_dir_all}, path::Path};

#[derive(Serialize, Deserialize)]
struct Content {
    old: String,
    new: String,
}

#[tauri::command]
fn get_directory_contents(dir_path: &str) -> Result<Vec<String>, String> {
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
                }
                _ => None,
            })
        })
        .collect::<Vec<String>>();

    Ok(entries)
}

#[tauri::command]
fn save_directory_contents(dir_path: &str, changes: Vec<Content>) -> Result<Vec<String>, String> {
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

#[tauri::command]
fn copy_directory_contents(old_dir_path: &str, new_dir_path: &str) {
    let old_path = Path::new(old_dir_path);
    let new_path = Path::new(new_dir_path);

    if !old_path.exists() || !old_path.is_dir() {
        eprintln!("Source path '{}' does not exist or is not a directory.", old_dir_path);
        return;
    }

    if !new_path.exists() {
        if let Err(e) = create_dir_all(&new_path) {
            eprintln!("Failed to create destination directory '{}': {}", new_dir_path, e);
            return;
        }
    }

    let entries = match read_dir(&old_path) {
        Ok(entries) => entries,
        Err(e) => {
            eprintln!("Failed to read source directory '{}': {}", old_dir_path, e);
            return;
        }
    };

    for entry_res in entries {
        let entry = match entry_res {
            Ok(entry) => entry,
            Err(e) => {
                eprintln!("Failed to read directory entry: {}", e);
                continue;
            }
        };

        let metadata = match entry.metadata() {
            Ok(meta) => meta,
            Err(e) => {
                eprintln!("Failed to get metadata for entry '{:?}': {}", entry.path(), e);
                continue;
            }
        };

        if metadata.is_file() {
            let file_name = entry.file_name();
            let old_file_path = old_path.join(&file_name);
            let new_file_path = new_path.join(&file_name);

            if let Err(e) = copy(&old_file_path, &new_file_path) {
                eprintln!(
                    "Failed to copy '{}' to '{}': {}",
                    old_file_path.display(),
                    new_file_path.display(),
                    e
                );
            }
        }
    }
}

#[tauri::command]
fn move_directory_contents(old_dir_path: &str, new_dir_path: &str) {
    let old_path = Path::new(old_dir_path);
    let new_path = Path::new(new_dir_path);

    if !old_path.exists() || !old_path.is_dir() {
        eprintln!("Source path '{}' does not exist or is not a directory.", old_dir_path);
        return;
    }

    if !new_path.exists() {
        if let Err(e) = create_dir_all(&new_path) {
            eprintln!("Failed to create destination directory '{}': {}", new_dir_path, e);
            return;
        }
    }

    let entries = match read_dir(&old_path) {
        Ok(entries) => entries,
        Err(e) => {
            eprintln!("Failed to read source directory '{}': {}", old_dir_path, e);
            return;
        }
    };

    for entry_res in entries {
        let entry = match entry_res {
            Ok(entry) => entry,
            Err(e) => {
                eprintln!("Failed to read directory entry: {}", e);
                continue;
            }
        };

        let metadata = match entry.metadata() {
            Ok(meta) => meta,
            Err(e) => {
                eprintln!("Failed to get metadata for entry '{:?}': {}", entry.path(), e);
                continue;
            }
        };

        if metadata.is_file() {
            let file_name = entry.file_name();
            let old_file_path = old_path.join(&file_name);
            let new_file_path = new_path.join(&file_name);

            if let Err(e) = rename(&old_file_path, &new_file_path) {
                eprintln!(
                    "Failed to move '{}' to '{}': {}",
                    old_file_path.display(),
                    new_file_path.display(),
                    e
                );
            }
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![get_directory_contents, save_directory_contents, copy_directory_contents, move_directory_contents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
