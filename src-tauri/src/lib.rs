use serde::{Deserialize, Serialize};
use std::{
    fs::{copy, create_dir_all, read_dir, rename},
    path::Path,
};

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
                Ok(meta) if meta.is_file() => entry.file_name().into_string().ok(),
                _ => None,
            })
        })
        .collect::<Vec<String>>();

    Ok(entries)
}

#[tauri::command]
fn save_directory_contents(
    dir_path: &str,
    old_names: Vec<String>,
    new_names: Vec<String>,
) -> Result<Vec<String>, String> {
    use std::fs::rename;
    use std::path::Path;

    let path = Path::new(dir_path);
    match (path.exists(), path.is_dir()) {
        (false, _) => Err(format!("The path '{}' does not exist.", dir_path)),
        (_, false) => Err(format!("The path '{}' is not a directory.", dir_path)),
        _ => Ok(()),
    }?;
    
    old_names
        .into_iter()
        .zip(new_names)
        .try_for_each(|(old, new)| match old == new {
            true => Ok(()),
            false => {
                let old_path = path.join(&old);
                let new_path = path.join(&new);
                match (old_path.exists(), old_path.is_file(), new_path.exists()) {
                    (false, _, _) => Err(format!(
                        "File '{}' does not exist in directory '{}'.",
                        old, dir_path
                    )),
                    (_, false, _) => Err(format!("'{}' is not a file.", old)),
                    (_, _, true) => Err(format!(
                        "Cannot rename '{}' to '{}': destination file already exists.",
                        old, new
                    )),
                    _ => rename(&old_path, &new_path)
                        .map_err(|e| format!("Failed to rename '{}' to '{}': {}", old, new, e)),
                }
            }
        })?;
    
    get_directory_contents(dir_path)
        .map_err(|e| format!("Failed to retrieve files after changes: {}", e))
}

#[tauri::command]
fn copy_directory_contents(old_dir_path: &str, new_dir_path: &str) {
    let old_path = Path::new(old_dir_path);
    let new_path = Path::new(new_dir_path);

    if !old_path.exists() || !old_path.is_dir() {
        eprintln!(
            "Source path '{}' does not exist or is not a directory.",
            old_dir_path
        );
        return;
    }

    if !new_path.exists() {
        if let Err(e) = create_dir_all(&new_path) {
            eprintln!(
                "Failed to create destination directory '{}': {}",
                new_dir_path, e
            );
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
                eprintln!(
                    "Failed to get metadata for entry '{:?}': {}",
                    entry.path(),
                    e
                );
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
        eprintln!(
            "Source path '{}' does not exist or is not a directory.",
            old_dir_path
        );
        return;
    }

    if !new_path.exists() {
        if let Err(e) = create_dir_all(&new_path) {
            eprintln!(
                "Failed to create destination directory '{}': {}",
                new_dir_path, e
            );
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
                eprintln!(
                    "Failed to get metadata for entry '{:?}': {}",
                    entry.path(),
                    e
                );
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
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            get_directory_contents,
            save_directory_contents,
            copy_directory_contents,
            move_directory_contents
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
