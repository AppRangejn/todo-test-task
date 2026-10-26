import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto p-4">
        <Routes />
      </main>
    </div>
  );
}

export default App;
