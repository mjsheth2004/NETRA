import { Shield, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Good Afternoon, Analyst</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Here's what's happening across your network.
        </p>
      </header>
      
      {/* KPI Cards Area */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px' 
      }}>
        {[
          { title: 'Total Devices', value: '247', sub: '+2 new', subColor: 'var(--color-emerald-teal)', type: 'teal', icon: <Shield size={18} /> },
          { title: 'Normal', value: '215', sub: '87.0%', subColor: 'var(--color-emerald-teal)', type: 'teal', icon: <CheckCircle2 size={18} /> },
          { title: 'Suspicious', value: '24', sub: '9.7%', subColor: 'var(--color-saffron-gold)', type: 'gold', icon: <AlertTriangle size={18} /> },
          { title: 'Critical', value: '8', sub: '3.2%', subColor: 'var(--color-threat-red)', type: 'red', icon: <AlertOctagon size={18} /> },
        ].map((kpi, i) => {
          const colorMap: Record<string, string> = {
            teal: 'var(--color-emerald-teal)',
            gold: 'var(--color-saffron-gold)',
            red: 'var(--color-threat-red)'
          };
          const mainColor = colorMap[kpi.type];
          
          return (
            <div key={i} className="panel" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {/* Icon Badge */}
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                backgroundColor: `${mainColor}20`, // 20% opacity background
                color: mainColor,
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                flexShrink: 0
              }}>
                {kpi.icon}
              </div>
              
              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{kpi.title}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{kpi.value}</span>
                  <span style={{ fontSize: '0.8rem', color: kpi.subColor }}>{kpi.sub}</span>
                </div>
                {/* Visual bar below (specifically seen on the Normal, Suspicious, Critical cards) */}
                {kpi.title !== 'Total Devices' && (
                  <div style={{ height: '4px', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '8px' }}>
                    <div style={{ height: '100%', width: kpi.sub, backgroundColor: mainColor, borderRadius: '2px' }} />
                  </div>
                )}
                {kpi.title === 'Total Devices' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-emerald-teal)' }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Active across network</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Area Placeholder */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div className="panel" style={{ height: '300px', padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Threat Activity Over Time</h3>
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
            {/* Simple CSS bar chart mock */}
            {[40, 70, 45, 90, 65, 80, 55, 30, 50, 75].map((h, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: i === 3 ? 'var(--color-threat-red)' : 'var(--color-emerald-teal)', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 }} />
            ))}
          </div>
        </div>
        
        <div className="panel" style={{ height: '300px', padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Global Threat Map</h3>
          <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', position: 'relative' }}>
             <span style={{ color: 'var(--color-text-secondary)' }}>[Interactive Map Placeholder]</span>
             <div style={{ position: 'absolute', top: '30%', left: '40%', width: '12px', height: '12px', backgroundColor: 'var(--color-threat-red)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-threat-red)' }} />
             <div style={{ position: 'absolute', top: '60%', left: '70%', width: '8px', height: '8px', backgroundColor: 'var(--color-saffron-gold)', borderRadius: '50%', boxShadow: '0 0 8px var(--color-saffron-gold)' }} />
          </div>
        </div>
      </div>

      {/* Mock Data Tables Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div className="panel" style={{ padding: '20px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem' }}>Recent Alerts</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald-teal)', cursor: 'pointer' }}>View All →</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Time</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Severity</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Source</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Description</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: '14:28', severity: 'High', color: 'var(--color-threat-red)', source: '192.168.1.45', desc: 'Possible malware activity detected', status: 'Open' },
                { time: '14:21', severity: 'Medium', color: 'var(--color-saffron-gold)', source: '10.0.0.23', desc: 'Suspicious login attempt', status: 'Investigating' },
                { time: '14:05', severity: 'High', color: 'var(--color-threat-red)', source: '172.16.10.12', desc: 'DDoS attack pattern detected', status: 'Open' },
                { time: '13:47', severity: 'Low', color: 'var(--color-emerald-teal)', source: '192.168.1.78', desc: 'Unusual outbound connection', status: 'Resolved' },
              ].map((alert, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px', color: 'var(--color-text-secondary)' }}>{alert.time}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ backgroundColor: `${alert.color}20`, color: alert.color, padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{alert.severity}</span>
                  </td>
                  <td className="font-mono" style={{ padding: '12px 8px' }}>{alert.source}</td>
                  <td style={{ padding: '12px 8px' }}>{alert.desc}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ color: alert.status === 'Open' ? 'var(--color-threat-red)' : alert.status === 'Resolved' ? 'var(--color-emerald-teal)' : 'var(--color-saffron-gold)' }}>{alert.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel" style={{ padding: '20px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem' }}>Top Talkers</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald-teal)', cursor: 'pointer' }}>View All →</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>IP Address</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Traffic</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Requests</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ip: '192.168.1.45', traffic: '4.8 GB', requests: '12,432', risk: 'high' },
                { ip: '10.0.0.23', traffic: '3.2 GB', requests: '8,921', risk: 'medium' },
                { ip: '172.16.10.12', traffic: '2.7 GB', requests: '6,583', risk: 'low' },
                { ip: '10.0.1.5', traffic: '1.9 GB', requests: '4,321', risk: 'low' },
              ].map((talker, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="font-mono" style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: talker.risk === 'high' ? 'var(--color-threat-red)' : talker.risk === 'medium' ? 'var(--color-saffron-gold)' : 'var(--color-emerald-teal)' }} />
                    {talker.ip}
                  </td>
                  <td style={{ padding: '12px 8px' }}>{talker.traffic}</td>
                  <td style={{ padding: '12px 8px' }}>{talker.requests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
