import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isAuth, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          Control tasks
        </Link>

        <div>
          {isAuth ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600">
                {user?.name || user?.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs border border-gray-300 px-2.5 py-1 rounded hover:bg-gray-100"
              >
                Вийти
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800"
            >
              Увійти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
