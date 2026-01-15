import { useNavigate } from 'react-router';

export default function LogOutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute right-8 top-8 px-6 py-3 text-3xl font-semibold"
    >
      Log out
    </button>
  );
}
