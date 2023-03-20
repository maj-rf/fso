import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient } from './types';
import { PatientComponent } from './components/PatientListPage/PatientComponent';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route path="/:id" element={<PatientComponent />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
