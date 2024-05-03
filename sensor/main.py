import datetime
import os
import time
from dotenv import load_dotenv

import minimalmodbus
import psycopg2

load_dotenv()

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
instrument = minimalmodbus.Instrument(PORT, 1, mode=minimalmodbus.MODE_RTU)

instrument.serial.baudrate = 4800
instrument.serial.bytesize = 8
instrument.serial.parity = minimalmodbus.serial.PARITY_NONE
instrument.serial.stopbits = 1
instrument.serial.timeout = 5

instrument.close_port_after_each_call = True

instrument.clear_buffers_before_each_transaction = True

raw_values = instrument.read_registers(0, number_of_registers=9)
timestamp = datetime.datetime.now().isoformat()
processed_values = convert_values(raw_values)

for key, value in processed_values.items():
	cursor.execute(f"INSERT INTO sensor_data (sensor_name, timestamp, sensor_value) VALUES ('{key}', '{timestamp}', {value})")

conn.commit()
