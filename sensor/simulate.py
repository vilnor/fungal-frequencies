import datetime
import random
import math
import json

import matplotlib.pyplot as plt
import matplotlib.dates as mdates

SENSOR_NAME_TO_UNITS = {
    "conductivity": "us/cm",
    "humidity": "%",
    "nitrogen": "mg/kg",
    "ph": "level",
    "phosphorus": "mg/kg",
    "potassium": "mg/kg",
    "salinity": "mg/L",
    "tds": "mg/L",
    "temperature": "°C",
}


def generate_sensor_data(sensor_values, start_date, end_date, time_step_seconds=3600):
    def interpolate(val_start, val_end, progress):
        """Linear interpolation between val_start and val_end."""
        return val_start + (val_end - val_start) * progress

    def generate_sinusoidal_temperature(step, total_steps, sensor_id, base_temp, nutrient_influence):
        """Generate sinusoidal temperature data."""
        time_of_day = (step % int(24 * 3600 / time_step_seconds)) / (24 * 3600 / time_step_seconds) * 2 * math.pi
        temp_variation = math.sin(time_of_day - math.pi)  # Peak at 18:00, valley at 06:00
        temp_value = base_temp + temp_variation
        temp_value += nutrient_influence

        if sensor_id == 3:
            temp_value += 1  # Slightly higher at sensor #3
        if sensor_id == 4:
            temp_value -= 0.75  # Slightly lower at sensor #4

        # if the temperature variation is positive, increase the temperature by a random factor between 1 and 1.05
        # if the temperature variation is negative, decrease the temperature by a random factor between 0.95 and 1
        if temp_variation > 0:
            return temp_value * random.uniform(1, 1.02)
        else:
            return temp_value * random.uniform(0.98, 1)

    def generate_humidity(step, total_steps, sensor_id, start_humidity, nutrient_influence, start_absorption_step, stop_transfer_step):
        """Generate humidity with random jumps."""
        humidity_value = start_humidity + random.uniform(-2, 2)  # Random jump ±2%
        if step < stop_transfer_step:
            if sensor_id == 4:  # Sensor #4 starts higher and decreases over time
                humidity_value -= step / total_steps  # Decrease over time
            else:
                humidity_value += step / total_steps * 0.02  # Increase over time for others
                if sensor_id != 3 and humidity_value > 30:
                    humidity_value -= 2
        if sensor_id == 3:
            if step < start_absorption_step:
                humidity_value += 0.5
                if humidity_value > 40:
                    humidity_value -= 0.75
            else:
                humidity_value -= 0.5 # Plant uses more humidity
        return min(max(humidity_value, 5), 65)

    def generate_ph(step, total_steps, sensor_id, start_ph):
        """Generate pH with random jumps."""
        ph_value = start_ph * random.uniform(0.9, 1.1)  # Random jump ±1 pH level
        return max(min(ph_value, 8), 5)

    start_dt = datetime.datetime.fromisoformat(start_date)
    end_dt = datetime.datetime.fromisoformat(end_date)
    time_step = datetime.timedelta(seconds=time_step_seconds)
    timestamps = []

    current_time = start_dt
    while current_time <= end_dt:
        timestamps.append(current_time)
        current_time += time_step

    total_steps = len(timestamps)
    start_transfer_step = int(total_steps * 0.05)
    stop_transfer_step = int(total_steps * 0.5)
    start_absorption_step = int(total_steps * 0.3)

    sensor_data = {}
    for sensor in sensor_values:
        sensor_id = sensor['sensor_id']
        sensor_name = sensor['sensor_name']
        if sensor_id not in sensor_data:
            sensor_data[sensor_id] = {}
        sensor_data[sensor_id][sensor_name] = sensor['sensor_value']

    sensor_4_starting_values = sensor_data[4].copy()

    nutrient_flow_rate = 0.02
    plant_absorption_rate = 0.01

    generated_data = []

    for step, timestamp in enumerate(timestamps):
        new_values = {sensor_id: sensor_data[sensor_id].copy() for sensor_id in sensor_data}
        nutrient_influence = min(1.0, step / total_steps)

        for sensor_name in sensor_data[1].keys():
            if sensor_name == "temperature":
                base_temp = 20.0
                for sensor_id in new_values:
                    new_values[sensor_id][sensor_name] = generate_sinusoidal_temperature(
                        step, total_steps, sensor_id, base_temp, nutrient_influence
                    )
            elif sensor_name == "humidity":
                for sensor_id in new_values:
                    start_humidity = sensor_data[sensor_id][sensor_name]
                    new_values[sensor_id][sensor_name] = generate_humidity(
                        step, total_steps, sensor_id, start_humidity, nutrient_influence, start_absorption_step, stop_transfer_step
                    )
            elif sensor_name == "ph":
                for sensor_id in new_values:
                    start_ph = sensor_data[sensor_id][sensor_name]
                    new_values[sensor_id][sensor_name] = generate_ph(step, total_steps, sensor_id, start_ph)
            else:
                if start_transfer_step <= step <= stop_transfer_step:
                    flow_from_4 = sensor_data[4][sensor_name] * nutrient_flow_rate
                    new_values[4][sensor_name] -= flow_from_4 * random.uniform(0.1, 0.5)
                    new_values[5][sensor_name] += flow_from_4 * 0.4
                    new_values[1][sensor_name] += flow_from_4 * 0.25
                    new_values[3][sensor_name] += flow_from_4 * 0.8
                    new_values[2][sensor_name] += flow_from_4 * 0.25

                if step >= start_absorption_step:
                    new_values[3][sensor_name] -= plant_absorption_rate * sensor_data[3][sensor_name]

                for sensor_id in new_values:
                    new_values[sensor_id][sensor_name] *= random.uniform(0.97, 1.03)
                    if sensor_id != 4:
                        if sensor_id != 3 and new_values[sensor_id][sensor_name] > sensor_4_starting_values[sensor_name] * random.uniform(0.8, 0.9):
                            new_values[sensor_id][sensor_name] *= random.uniform(0.85, 0.95)
                        elif sensor_id == 3 and new_values[sensor_id][sensor_name] > sensor_4_starting_values[sensor_name] * random.uniform(0.9, 1):
                            new_values[sensor_id][sensor_name] *= random.uniform(0.9, 1)

        for sensor_id in new_values:
            for sensor_name, value in new_values[sensor_id].items():
                generated_data.append({
                    "sensor_id": sensor_id,
                    "sensor_name": sensor_name,
                    "timestamp": timestamp.isoformat(),
                    "sensor_value": round(value, 2),
                    "units": SENSOR_NAME_TO_UNITS[sensor_name]
                })

        sensor_data = new_values

    return generated_data


def plot_sensor_data(generated_data):
    # Get unique sensor names and IDs
    sensor_names = set(entry['sensor_name'] for entry in generated_data)
    sensor_ids = set(entry['sensor_id'] for entry in generated_data)

    fig, ax = plt.subplots(len(sensor_names), 1, figsize=(10, len(sensor_names) * 4), sharex=True)

    if len(sensor_names) == 1:
        ax = [ax]  # If only one sensor_name, ensure ax is a list

    sensor_data_by_name = {sensor_name: {} for sensor_name in sensor_names}

    # Group data by sensor_name and sensor_id
    for entry in generated_data:
        sensor_id = entry['sensor_id']
        sensor_name = entry['sensor_name']
        if sensor_id not in sensor_data_by_name[sensor_name]:
            sensor_data_by_name[sensor_name][sensor_id] = {'timestamps': [], 'values': []}
        sensor_data_by_name[sensor_name][sensor_id]['timestamps'].append(datetime.datetime.fromisoformat(entry['timestamp']))
        sensor_data_by_name[sensor_name][sensor_id]['values'].append(entry['sensor_value'])

    # Plot each sensor_name's data (one plot per sensor_name)
    for i, sensor_name in enumerate(sensor_names):
        for sensor_id in sensor_ids:
            if sensor_id in sensor_data_by_name[sensor_name]:
                ax[i].plot(sensor_data_by_name[sensor_name][sensor_id]['timestamps'],
                           sensor_data_by_name[sensor_name][sensor_id]['values'],
                           label=f'Sensor {sensor_id}')
        ax[i].set_title(f'{sensor_name.capitalize()} Data')
        ax[i].set_ylabel(sensor_name.capitalize())
        ax[i].legend()

    # Format x-axis to show only when the day changes
    ax[-1].xaxis.set_major_locator(mdates.DayLocator())  # Show ticks only when the day changes
    ax[-1].xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))  # Format as 'YYYY-MM-DD'
    plt.setp(ax[-1].xaxis.get_majorticklabels(), rotation=45, ha='right')

    plt.tight_layout()
    plt.show()

sensor_values = [
    {"sensor_name": "conductivity",
     "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 295, "sensor_id": 1,
     "units": "us/cm"},
    {"sensor_name": "humidity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 16.2, "sensor_id": 1,
     "units": "%"},
    {"sensor_name": "nitrogen", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 23, "sensor_id": 1,
     "units": "mg/kg"},
    {"sensor_name": "ph", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 5.7, "sensor_id": 1,
     "units": "level"},
    {"sensor_name": "phosphorus", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 99, "sensor_id": 1,
     "units": "mg/kg"},
    {"sensor_name": "potassium", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 92, "sensor_id": 1,
     "units": "mg/kg"},
    {"sensor_name": "salinity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 162, "sensor_id": 1,
     "units": "mg/L"},
    {"sensor_name": "tds", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 147, "sensor_id": 1,
     "units": "mg/L"},
    {"sensor_name": "temperature", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 22.1, "sensor_id": 1,
     "units": "°C"},
    {"sensor_name": "conductivity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 283, "sensor_id": 2,
     "units": "us/cm"},
    {"sensor_name": "humidity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 21.1, "sensor_id": 2,
     "units": "%"},
    {"sensor_name": "nitrogen", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 20, "sensor_id": 2,
     "units": "mg/kg"},
    {"sensor_name": "ph", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 5.6, "sensor_id": 2,
     "units": "level"},
    {"sensor_name": "phosphorus", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 93, "sensor_id": 2,
     "units": "mg/kg"},
    {"sensor_name": "potassium", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 86, "sensor_id": 2,
     "units": "mg/kg"},
    {"sensor_name": "salinity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 155, "sensor_id": 2,
     "units": "mg/L"},
    {"sensor_name": "tds", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 141, "sensor_id": 2,
     "units": "mg/L"},
    {"sensor_name": "temperature", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 22.2, "sensor_id": 2,
     "units": "°C"},
    {"sensor_name": "conductivity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 251, "sensor_id": 3,
     "units": "us/cm"},
    {"sensor_name": "humidity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 11.5, "sensor_id": 3,
     "units": "%"},
    {"sensor_name": "nitrogen", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 13, "sensor_id": 3,
     "units": "mg/kg"},
    {"sensor_name": "ph", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 5, "sensor_id": 3, "units": "level"},
    {"sensor_name": "phosphorus", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 78, "sensor_id": 3,
     "units": "mg/kg"},
    {"sensor_name": "potassium", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 70, "sensor_id": 3,
     "units": "mg/kg"},
    {"sensor_name": "salinity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 138, "sensor_id": 3,
     "units": "mg/L"},
    {"sensor_name": "tds", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 125, "sensor_id": 3,
     "units": "mg/L"},
    {"sensor_name": "temperature", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 22.4, "sensor_id": 3,
     "units": "°C"},
    {"sensor_name": "conductivity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 1432, "sensor_id": 4,
     "units": "us/cm"},
    {"sensor_name": "humidity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 63.8, "sensor_id": 4,
     "units": "%"},
    {"sensor_name": "nitrogen", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 116, "sensor_id": 4,
     "units": "mg/kg"},
    {"sensor_name": "ph", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 7.3, "sensor_id": 4,
     "units": "level"},
    {"sensor_name": "phosphorus", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 157, "sensor_id": 4,
     "units": "mg/kg"},
    {"sensor_name": "potassium", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 198, "sensor_id": 4,
     "units": "mg/kg"},
    {"sensor_name": "salinity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 300, "sensor_id": 4,
     "units": "mg/L"},
    {"sensor_name": "tds", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 342, "sensor_id": 4,
     "units": "mg/L"},
    {"sensor_name": "temperature", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 22, "sensor_id": 4,
     "units": "°C"},
    {"sensor_name": "conductivity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 284, "sensor_id": 5,
     "units": "us/cm"},
    {"sensor_name": "humidity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 14.8, "sensor_id": 5,
     "units": "%"},
    {"sensor_name": "nitrogen", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 20, "sensor_id": 5,
     "units": "mg/kg"},
    {"sensor_name": "ph", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 5.3, "sensor_id": 5,
     "units": "level"},
    {"sensor_name": "phosphorus", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 94, "sensor_id": 5,
     "units": "mg/kg"},
    {"sensor_name": "potassium", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 86, "sensor_id": 5,
     "units": "mg/kg"},
    {"sensor_name": "salinity", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 156, "sensor_id": 5,
     "units": "mg/L"},
    {"sensor_name": "tds", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 142, "sensor_id": 5,
     "units": "mg/L"},
    {"sensor_name": "temperature", "timestamp": "2024-09-18T14:00:01.947Z", "sensor_value": 22.5, "sensor_id": 5,
     "units": "°C"}]

start_date = "2024-09-18T14:00:00.007Z"
end_date = "2024-10-01T14:00:00.007Z"

generated_data = generate_sensor_data(sensor_values, start_date, end_date)

plot_sensor_data(generated_data)

# save generated_data to json file

with open('generated_data.json', 'w') as f:
    json.dump(generated_data, f, indent=4)
