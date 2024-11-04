import datetime
import os

import minimalmodbus
import psycopg2
import requests
from dotenv import load_dotenv

load_dotenv()

data_endpoint_url = os.environ["DATA_ENDPOINT_URL"]

conn = None
cursor = None

if data_endpoint_url is None:
    conn = psycopg2.connect(database=os.environ["POSTGRES_DB"],
                            host=os.environ["POSTGRES_HOST"],
                            user=os.environ["POSTGRES_USER"],
                            password=os.environ["POSTGRES_PASSWORD"],
                            port=os.environ["POSTGRES_PORT"])

    cursor = conn.cursor()


def convert_values(values):
    return {
        "humidity": values[0] / 10,  # percentage
        "temperature": values[1] / 10,  # celsius
        "conductivity": values[2],  # us/cm
        "ph": values[3] / 10,  # ph ??????
        "nitrogen": values[4],  # mg/kg
        "phosphorus": values[5],  # mg/kg
        "potassium": values[6],  # mg/kg
        "salinity": values[7],  # mg/L
        "tds": values[8],  # mg/L
    }


PORT = os.environ["SERIAL_PORT"]

sensor_1 = minimalmodbus.Instrument(PORT, 1, mode=minimalmodbus.MODE_RTU)
sensor_2 = minimalmodbus.Instrument(PORT, 2, mode=minimalmodbus.MODE_RTU)
sensor_3 = minimalmodbus.Instrument(PORT, 3, mode=minimalmodbus.MODE_RTU)
sensor_4 = minimalmodbus.Instrument(PORT, 4, mode=minimalmodbus.MODE_RTU)
sensor_5 = minimalmodbus.Instrument(PORT, 5, mode=minimalmodbus.MODE_RTU)

sensors = [sensor_1, sensor_2, sensor_3, sensor_4, sensor_5]

for sensor in sensors:
    sensor.serial.baudrate = 4800
    sensor.serial.bytesize = 8
    sensor.serial.parity = minimalmodbus.serial.PARITY_NONE
    sensor.serial.stopbits = 1
    sensor.serial.timeout = 5
    sensor.close_port_after_each_call = True
    sensor.clear_buffers_before_each_transaction = True

timestamp = datetime.datetime.now().isoformat()
sensor_data_list = []

for i, sensor in enumerate(sensors):
    raw_values = sensor.read_registers(0, number_of_registers=9)
    processed_values = convert_values(raw_values)
    for key, value in processed_values.items():
        sensor_data = {
            "sensor_id": i + 1,
            "sensor_name": key,
            "timestamp": timestamp,
            "sensor_value": value
        }
        sensor_data_list.append(sensor_data)

        if data_endpoint_url is None:
            cursor.execute(
                f"INSERT INTO sensor_data (sensor_id, sensor_name, timestamp, sensor_value) VALUES ({i + 1}, '{key}', '{timestamp}', {value})")

if data_endpoint_url is not None:
    print(sensor_data_list)
    res = requests.post(data_endpoint_url, json=sensor_data_list)
    print(res.text)

if data_endpoint_url is None:
    conn.commit()
