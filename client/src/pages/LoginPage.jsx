import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    // 1. Залізний стоп дефолтної поведінки форми
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setLoading(true);
    setGeneralError('');
    setFieldErrors({});

    try {
      const response = await loginUser(formData);

      if (response?.token) {
        login(response.token, response.user);
        navigate('/', { replace: true });
      }
    } catch (err) {
      // 2. Безпечне зчитування помилок без крешів JS
      const responseData = err?.response?.data;

      if (Array.isArray(responseData?.errors)) {
        const errorsMap = {};
        responseData.errors.forEach((errItem) => {
          if (errItem?.field) {
            errorsMap[errItem.field] = errItem.message;
          }
        });
        setFieldErrors(errorsMap);
      } else {
        setGeneralError(
          responseData?.message ||
          err?.message ||
          'Невірний email або пароль'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-8">
      <div className="bg-white border border-gray-200 p-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold">Вхід</h1>
          <p className="text-sm text-gray-500">Увійдіть для перегляду завдань</p>
        </div>

        {generalError && (
          <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={`w-full border p-2 text-sm focus:outline-none ${
                fieldErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'
              }`}
            />
            {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full border p-2 text-sm focus:outline-none ${
                fieldErrors.password ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'
              }`}
            />
            {fieldErrors.password && <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Немає акаунту?{' '}
          <Link to="/register" className="text-gray-900 font-medium underline">
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
