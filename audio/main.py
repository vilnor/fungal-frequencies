import jack
import numpy as np
import socketio
import soundfile as sf

# Initialize the Socket.io client
sio = socketio.Client()


@sio.event
def connect():
    print("Connected to server")


@sio.event
def disconnect():
    print("Disconnected from server")


# Connect to the Socket.io server (adjust the URL as needed)
sio.connect('http://localhost:8080', namespaces=['/audio'])

# Initialize the JACK client
client = jack.Client('AudioClient')
print_once = True
audio_file_path = "./testfile.wav"

audio_out = []
# Callback function to handle audio processing
@client.set_process_callback
def process(frames):
    global audio_out
    # Read audio data from the input ports
    audio_data = np.stack([port.get_array() for port in client.inports], axis=0)
    # print(f"First few samples: {audio_data.flatten()[:10]}")
    # print(audio_data)
    audio_out.extend(audio_data.flatten())

    audio_data_np = np.array(audio_data.flatten(), dtype=np.float32)

    # Send audio data to the Socket.io server
    sio.emit('audio-stream', audio_data_np.tolist(), namespace='/audio')


# Register input ports
client.inports.register('input_1')
client.inports.register('input_2')

# Activate the JACK client
client.activate()

# Keep the program running to continue processing audio
try:
    sio.wait()
except KeyboardInterrupt:
    pass
finally:
    # audio_data_np = np.array(audio_out, dtype=np.float32)  # Ensure it's in float32
    # audio_data_np = np.int16(audio_data_np * 32767)  # Scale and convert to int16
    #
    # # Save audio data to file
    # sf.write(audio_file_path, audio_data_np, client.samplerate)
    # print(f"Audio recorded to {audio_file_path}")

    client.deactivate()
    client.close()
    sio.disconnect()
