import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../state/authSlice.js';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, redirectTo }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{redirected: true}}/>;
    }

    return children;
}