import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RecentRecurringMockData, MoneyEarnedMockData } from './mock_data/mockData';

function CashFlow() {
  const data = MoneyEarnedMockData.map((item, index) => {

    const expense = RecentRecurringMockData[index] ? RecentRecurringMockData[index].value : 0;
    return {
      name: item.name,
      MoneyEarned: item.amt,
      RecurringCosts: -expense, // Neg to represent outflow
    };
  });

  return (
    <div style={{
      backgroundColor: '#1E1E1E', 
      padding: '20px', 
      borderRadius: '20px', 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      position: 'relative' 
    }}>
      <div style={{
        borderBottom: '2px solid #2ecc71',
        paddingBottom: '10px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0}}>Cash Flow</h2>
        <div style={{ position: 'relative' }}> 
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ResponsiveContainer width="100%" height={270}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis dataKey="name" stroke="#2ecc71" />
            <YAxis stroke="#2ecc71" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ backgroundColor: '#2C2C2E' }} />
            <Legend />
            <Line type="monotone" dataKey="MoneyEarned" stroke="#2ecc71" />
            <Line type="monotone" dataKey="RecurringCosts" stroke="#c0392b" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CashFlow;
