# Sensor data collection script

Created to work with the NPKPHCTH-S sensor.

## Deployment

Requires the sensor to be connected through a RS485 to USB adapter to the machine running the script.

Set up a python virtual environment using

```
python -m venv venv
```

Install dependencies using

```
pip install < requirements.txt
```

Make sure the serial device has read/write permissions, e.g.

```
chmod 777 /dev/ttyUSB0
```

Rename `default.env` to `.env` and configure the variables.

Setup a cron job with the script

```
*/10 * * * * /path/to/venv/bin/python /path/to/main.py
```

Done!
