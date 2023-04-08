import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Diagnose, Patient } from './types';
import { PatientComponent } from './components/PatientListPage/PatientComponent';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import { getAllDiagnoses } from './services/diagnosis';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnose[]>([]);
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    const fetchDiagnosis = async () => {
      const data = await getAllDiagnoses();
      setDiagnosis(data);
    };
    void fetchDiagnosis();
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
          <Route
            path="/:id"
            element={<PatientComponent diagnosis={diagnosis} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
