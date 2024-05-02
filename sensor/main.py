import time

import minimalmodbus

def convert_values(values: list[int]):
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


PORT = 'COM8'
instrument = minimalmodbus.Instrument(PORT, 1, mode=minimalmodbus.MODE_RTU, debug=True)

instrument.serial.baudrate = 4800
instrument.serial.bytesize = 8
instrument.serial.parity = minimalmodbus.serial.PARITY_NONE
instrument.serial.stopbits = 1
instrument.serial.timeout = 5

instrument.close_port_after_each_call = True

instrument.clear_buffers_before_each_transaction = True

while True:
    raw_values = instrument.read_registers(0, number_of_registers=9)
    print(convert_values(raw_values))
    time.sleep(3)
