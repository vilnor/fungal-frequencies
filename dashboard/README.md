# Dashboard

The dashboard is an application that provides REST endpoints for saving sensor data, as well
as a web dashboard for viewing the data.

## API
`/api/data`
- `GET`: Get all data
- `POST`: Save data
  ```json
    body: {
        'timestamp': string,
        'sensor_id': int,
        'sensor_name': string,
        'sensor_value': float,
    }[]
  ```
  
## Deployment
### Frontend 
- Install dependencies using
  ```
  npm install
  ```
- Start the development server using
  ```
  npm start
  ```
- Build the production version using
  ```
  npm run build
  ```
  
### Backend
- Install dependencies using
  ```
  npm install
  ```
- Start the server using
  ```
  npm start
  ```
  
The application will be available at `http://localhost:3000` for the development server and `http://localhost:8080` for the production server.