import React from 'react';
import './RecentReports.css';

interface Report {
  id: string;
  patientName: string;
  testDate: string;
  result: string;
  type: 'audiogram' | 'tympanometry' | 'speech' | 'immittance';
}

interface RecentReportsProps {
  reports?: Report[];
}

const RecentReports: React.FC<RecentReportsProps> = ({
  reports = [
    {
      id: '1',
      patientName: 'John Doe',
      testDate: '2024-07-20',
      result: 'Normal',
      type: 'audiogram',
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      testDate: '2024-07-18',
      result: 'Mild Loss',
      type: 'speech',
    },
    {
      id: '3',
      patientName: 'Robert Johnson',
      testDate: '2024-07-15',
      result: 'Moderate Loss',
      type: 'audiogram',
    },
    {
      id: '4',
      patientName: 'Emily Davis',
      testDate: '2024-07-14',
      result: 'Normal',
      type: 'tympanometry',
    },
  ],
}) => {
  const getTypeColor = (type: Report['type']) => {
    const colors: Record<Report['type'], string> = {
      audiogram: '#3498db',
      tympanometry: '#2ecc71',
      speech: '#f39c12',
      immittance: '#e74c3c',
    };
    return colors[type];
  };

  return (
    <div className="recent-reports">
      <div className="recent-reports-header">
        <h2>Recent Reports</h2>
        <a href="/reports" className="view-all">View All →</a>
      </div>

      <div className="reports-list">
        {reports.map((report) => (
          <div key={report.id} className="report-item">
            <div className="report-info">
              <div className="report-type" style={{ borderLeftColor: getTypeColor(report.type) }}>
                <span className="type-label">{report.type}</span>
              </div>
              <div className="report-details">
                <h4>{report.patientName}</h4>
                <p>{report.testDate}</p>
              </div>
            </div>
            <div className="report-result">
              <span className={`result-badge result-${report.result.toLowerCase().replace(/\s+/g, '-')}`}>
                {report.result}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReports;
