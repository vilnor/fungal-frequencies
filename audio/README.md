# Audio Processing

Audio is generated using VCV Rack, a modular synthesis software. The output from VCV Rack is fed into SSR (SoundScape
Renderer) for spatial rendering. A node application is used to pull data from the biome sensors, process it, and send it
to VCV Rack to control synthesis parameters. The application also allows control over where the audio is spatialized in
the room.

A running JACK audio server is required to route audio between VCV Rack and SSR.

## VCV Rack

The file `biome.vcv` contains the VCV Rack patch used to generate the soundscape. The patch contains the module OSCelot,
which allows for control of synthesis parameters via OSC messages. The OSC server is configured to listen on port 8881.

## SSR

The file `biome.asd` contains the SSR scene file used to spatialize the audio. The posistion of sound sources and the
reference node are controlled via PureData messages sent via FUDI. The SSR FUDI server is configured to listen on port
1174.

## Node Application

The node application is located in the `frontend` and `backend` directories. The backend server is responsible for
pulling data from the biome sensors and sending it to VCV Rack and SSR. The frontend server is responsible for serving
the web interface that allows users to control the audio spatialization and the generation of the soundscape.

# Running Everything

1. Make sure JACK is running
2. Run SSR with
    ```
    ssr-binaural ./biome.asd --fudi-server
    ```
3. Run VCV Rack with
    ```
    /path/to/Rack ./biome.vcv
    ```
4. Run the backend server with
    ```
    cd backend
    npm install
    npm start
    ```
5. Run the frontend server with
    ```
    cd frontend
    npm install
    npm start
    ```
6. Open a browser and navigate to http://localhost:8080 to control the audio spatialization

## Debugging Audio Issues

Open `qjackcontrol` and check the connection graph looks something like this. Note: there may be other connections to
the `system` device depending on what other applications you have running.
![image](https://github.com/user-attachments/assets/8b6e3d1e-f603-42ed-9c5b-c62f4dc51386)

