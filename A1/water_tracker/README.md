# Water Tracker App

A cross-platform mobile application built with Flutter that helps users track their daily water intake. The app features a modern, dark-themed UI and local data persistence.

## Features

- **Daily Tracking**: Log water intake easily.
- **Hydration Goals**: Set and monitor daily hydration goals.
- **Reminders**: Get notified to drink water regularly.
- **History**: View hydration history (implied by storage service).
- **Dark Mode**: Sleek dark UI with `GoggleFonts.outfit` typography.
- **Cross-Platform**: Runs on iOS, Android, and Web.

## Tech Stack

- **Framework**: Flutter (Dart)
- **State Management**: Provider
- **Local Storage**: `shared_preferences` (assumed based on standard patterns) or file storage via `storage_service`.
- **Notifications**: Local notifications via `notification_service`.

## Getting Started

1. **Install Dependencies**:
   ```bash
   flutter pub get
   ```

2. **Run the App**:
   ```bash
   flutter run
   ```

## Project Structure

- `lib/main.dart`: Entry point and app configuration.
- `lib/ui/`: UI components and screens.
- `lib/services/`: Background services (Storage, Notifications).
