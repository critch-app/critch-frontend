### Critch - Frontend

![logo_Full-removebg-preview](https://github.com/critch-app/critch-frontend/assets/78245792/174d23bb-48dc-4b31-bf1d-0f7e476e5ed1)

# Overview

"Critch" is a communication platform created to group teams, especially development teams, in a single place. It draws inspiration from Discord and Slack.

# Features

- Managing servers which represent companies or projects.
- Managing channels which represent individual teams or groups of people.
- Group text chat via channels [each channel represents a group text chat].
- Sharing images inside the chat.
- Voice/Video chat.
- Picture-in-picture voice/video chat for better multitasking.
- Managing users additions to servers and channels via custom invitations links.
- Friendly user interface that is easy to use and beautiful.

# Used Technologies

- Mainly JavaScript/TypeScript
- Electron.js & ElectronVite as a building tool
- React.js
- Redux Toolkit
- Tanstack React Query
- ION-SDK for WebRTC tasks
- WebSocket handled with 0 dependencies using the standard API
- TaillwindCSS for styling

# Project Structure

The structure of the "Critch" project follows the standard conventions of Electron applications and utilizes various technologies for different aspects of development. Here's an overview of the project structure:

- `resources`: Contains public assets like the application icon.
- `build`: Contains build assets.
- `src`: Contains the project codebase.
    - `main`: Contains the logic of the Electron main process.
        - `index.ts`: Contains the main process code.
        - `handles.ts`: Contains the main process event handlers.
    - `preload`: Contains the preload code, which acts as the intermediary between the main process and the renderer process(es).
    - `renderer`: Contains the frontend of the application, developed using React.js.
        - `src/api`: Contains modules related to communication with the server.
            - `axios`: Contains HTTP requests to the server. Each specific entity has its own requests file (e.g., user.ts, channel.ts, etc.).
            - `query`: Contains Tanstack React Query queries and mutations that utilize the aforementioned HTTP requests and manage the response and caching. Each specific entity has its own requests file.
            - `ws`: Contains the WebSocket class used to handle WebSocket events in a generic way and manage reconnection on failed connections or idle situations.
        - `src/app`: Contains the main app component and the Redux store.
        - `src/assets`: Contains images and stylesheets used in the app.
        - `src/components`: Contains global components used throughout the application (e.g., app icon, divider, modal).
        - `src/features`: Contains the core features of the application. Each feature directory contains feature-specific components organized as follows:

            ```
            features
            |_ _ 	featureName
            			|_ _ 	FeatureName.tsx
            			|_ _ 	SubComponents
            					  |_ _ 	SubComponent1.tsx
            					  |_ _ 	SubComponent2.tsx
            
            ```
            
        - `src/hooks`: Contains custom React hooks.
        - `src/reducers`: Contains Redux reducers.
        - `src/util`: Contains helper methods and validation schemas.
        - `src/views`: Contains views, where each view serves as a container for one or more features.
- Other files in the root directory represent configuration files for TypeScript, ESLint, Prettier, Electron-Vite, Tailwind CSS, and PostCSS.

# Preview
![Screenshot 2024-02-23 225046](https://github.com/critch-app/critch-frontend/assets/78245792/c87bea70-6b35-496e-ab8f-156fdf0ea57e)
![Screenshot 2024-02-23 225059](https://github.com/critch-app/critch-frontend/assets/78245792/af1060d2-295c-4ee9-b80f-e6d2f074f9cd)
![Screenshot 2024-02-23 225113](https://github.com/critch-app/critch-frontend/assets/78245792/736aa6df-7c91-4022-ba56-b0cc867822cb)
![Screenshot 2024-02-23 225124](https://github.com/critch-app/critch-frontend/assets/78245792/d99e923e-6933-47ac-97a1-4bac7256248c)
![Screenshot 2024-02-23 225135](https://github.com/critch-app/critch-frontend/assets/78245792/81579f07-c91a-449c-9f09-2a0056d6c044)

# Usage and Installation

To use the "Critch" frontend application, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/critch-app/critch-frontend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd critch-frontend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the application:

    ```bash
    npm run dev
    ```


<aside>
💡 
Note that the server-side code is deployed using the [Render](https://render.com) free tier, so the server may go idle due to inactivity. This can cause delays in requests, ranging from 1 to 3 minutes for the first request.

</aside>

# License

This project is open-source and available under the [MIT](https://opensource.org/license/mit) License. You can find the license details in the LICENSE file included in this repository.

# Team Members

## Abdullah Muhammed

- **Role:** Fullstack Developer
- **Responsibilities:**
    - Managed the frontend design and implementation
    - Shared in the whole system design and stack choices
- **Links:**
    - [GitHub](https://github.com/abdullah-muhammedd)
    - [LinkedIn](https://www.linkedin.com/in/abdullah-muhammed120/)
    - Email: [dev.abdullah.muhammed@gmail.com](mailto:dev.abdullah.muhammed@gmail.com)

## Muhammed Sawy

- **Role:** Backend Developer
- **Responsibilities:**
    - Managed the backend design and implementation
    - Shared in the whole system design and stack choices
- **Links:**
    - [GitHub](https://github.com/Mohamed-Sawy)
    - [LinkedIn](https://www.linkedin.com/in/mohamed-sawy77/)
    - Email: [Mohamedsawy1022@gmail.com](mailto:Mohamedsawy1022@gmail.com)

## Hussain Abd-Elkader

- **Role:** Backend Developer
- **Responsibilities:**
    - Shared in backend implementation
    - Shared in the whole system design and stack choices
- **Links:**
    - [GitHub](https://github.com/Hussein119)
    - [LinkedIn](https://www.linkedin.com/in/husseinabdelkader/)
    - Email: [hussein.abdalkader96@gmail.com](mailto:hussein.abdalkader96@gmail.com)
