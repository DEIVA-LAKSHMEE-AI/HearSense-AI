import React from 'react';
import './RecentPatients.css';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status: 'active' | 'inactive' | 'pending';
}

interface RecentPatientsProps {
  patients?: Patient[];
}

const RecentPatients: React.FC<RecentPatientsProps> = ({
  patients = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      lastVisit: '2024-07-20',
      status: 'active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 234-5678',
      lastVisit: '2024-07-18',
      status: 'active',
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 (555) 345-6789',
      lastVisit: '2024-07-15',
      status: 'pending',
    },
  ],
}) => {
  return (
    <div className="recent-patients">
      <div className="recent-patients-header">
        <h2>Recent Patients</h2>
        <a href="/patients" className="view-all">View All →</a>
      </div>

      <div className="patients-table-wrapper">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Last Visit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="patient-name">{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.lastVisit}</td>
                <td>
                  <span className={`status-badge status-${patient.status}`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatients;
