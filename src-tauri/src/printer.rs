// src-tauri/src/printer.rs

use libusb::{Context, DeviceHandle};
use tauri::Manager;

#[tauri::command]
pub fn print_to_usb_printer() -> Result<(), String> {
    let context = Context::new().map_err(|e| e.to_string())?;

    for device in context.devices().map_err(|e| e.to_string())?.iter() {
        let device_desc = device.device_descriptor().map_err(|e| e.to_string())?;

        // Replace with your printer's actual Vendor ID and Product ID
        if device_desc.vendor_id() == 0x1234 && device_desc.product_id() == 0x5678 {
            let mut handle: DeviceHandle = device.open().map_err(|e| e.to_string())?;
            handle.claim_interface(0).map_err(|e| e.to_string())?;

            // Send data to the printer
            let print_data = b"Hello from Tauri!";
            handle.write_bulk(0x01, print_data, std::time::Duration::from_secs(1))
                .map_err(|e| e.to_string())?;

            handle.release_interface(0).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}