import { useTranslation } from 'react-i18next';

function TotalInvested() {

    const { t } = useTranslation();

    return (
      <div style={{
        backgroundColor: '#1E1E1E', 
        padding: '20px', 
        borderRadius: '20px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        color: 'white',
        position: 'relative',
        width: '100%', 
        height: '100px', 
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <div style={{
          fontSize: '18px', 
          marginBottom: '10px' 
        }}>
          {t('finances.total-invested')}:
        </div>
        <div style={{
          fontSize: '24px', 
          fontWeight: 'bold' 
        }}>
          $142,180
        </div>
      </div>
    );
  }
  
  export default TotalInvested;
  