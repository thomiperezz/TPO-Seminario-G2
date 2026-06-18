import Sidebar from '../components/navigation/Sidebar';
import TopBar from '../components/navigation/TopBar';

const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;