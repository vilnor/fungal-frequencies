# Import needed modules from osc4py3
from osc4py3.as_eventloop import *
from osc4py3 import oscbuildparse
import csv
import time

TEMPO_OSC = 0
TEMPO_RESET = 1
POLY_1 = 2
POLY_2 = 3
POLY_3 = 4
POLY_4 = 5
POLY_5 = 6
POLY_6 = 7
POLY_7 = 8
POLY_8 = 9
PITCH_1 = 10
PITCH_2 = 11
PITCH_3 = 12
PITCH_4 = 13
PITCH_5 = 14
PITCH_6 = 15
PITCH_7 = 16
PITCH_8 = 17
TIMBRE_1 = 18
TIMBRE_2 = 19
TIMBRE_3 = 20
TIMBRE_4 = 21
TIMBRE_5 = 22
TIMBRE_6 = 23
TIMBRE_7 = 24
TIMBRE_8 = 25



ARG_MAP = {
    "tempo": TEMPO_OSC,
    "poly1": POLY_1,
    "poly2": POLY_2,
    "reset": TEMPO_RESET
}



# Start the system.
osc_startup()

# Make client channels to send packets.
osc_udp_client("127.0.0.1", 8881, "vcv")

start_date = "6/21/2024"
end_date = "6/31/2024"

# process data
data = []
with open('Biome Data.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Check if the Sensor ID is 1
        if row["Sensor ID"] == "1" and row["Time"][:9] >= start_date and row["Time"][:9] <= end_date:
            # Check if the current timestamp already exists in the data list
            existing_data = next((item for item in data if item["timestamp"] == row["Time"]), None)
            if existing_data:
                # If the timestamp already exists, add the new sensor data to the existing dictionary
                existing_data[row["Sensor"]] = float(row["Value"])
            else:
                # If the timestamp does not exist, create a new dictionary and add it to the data list
                data.append({
                    "timestamp": row["Time"],
                    row["Sensor"]: float(row["Value"])
                })

print("data processed, starting osc")
msg = oscbuildparse.OSCMessage("/fader", ',if', [TEMPO_RESET, 1])
osc_send(msg, "vcv")
osc_process()
date = data[0]["timestamp"][:4]
for val in data:
    if date != val["timestamp"][:4]:
        print(val["timestamp"][:9])
        msg = oscbuildparse.OSCMessage("/fader", ',if', [TEMPO_RESET, 1])
        osc_send(msg, "vcv")
        osc_process()
        date = val["timestamp"][:4]
    msg = oscbuildparse.OSCMessage("/fader", ',if', [TEMPO_OSC, ((val["temperature"] - 19.5) / 6) + 0.6])
    osc_send(msg, "vcv")
    osc_process()
    msg = oscbuildparse.OSCMessage("/fader", ',if', [POLY_1, ((val["nitrogen"] - 5) / 11)])
    osc_send(msg, "vcv")
    osc_process()
    msg = oscbuildparse.OSCMessage("/fader", ',if', [POLY_2, ((val["potassium"] - 45) / 30)])
    osc_send(msg, "vcv")
    osc_process()
    time.sleep(0.1)

# msg = oscbuildparse.OSCMessage("/fader", ',if', [RESET_TEMPO, 1])
# osc_send(msg, "vcv")
# osc_process()


osc_terminate()
