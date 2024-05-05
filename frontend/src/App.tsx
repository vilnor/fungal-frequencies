import React, { useState } from 'react';
import './App.css';
import useData from './api/useData';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import TableView from './views/TableView';
import ChartView from './views/ChartView';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


function App() {
    const { data, isLoading, isError } = useData();
    const [tabValue, setTabValue] = useState(0);

    return (
        <div className="App">
            <Tabs value={tabValue} onChange={(e, nV) => setTabValue(nV)}>
                <Tab label="Table View" />
                <Tab label="Chart View" />
            </Tabs>
            <CustomTabPanel value={tabValue} index={0} >
                <TableView data={data} isError={isError} isLoading={isLoading} />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1} >
                <ChartView data={data} isError={isError} isLoading={isLoading} />
            </CustomTabPanel>
        </div>
    );
}

export default App;
