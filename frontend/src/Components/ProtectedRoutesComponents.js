import { Navigate, Outlet } from 'react-router-dom';
import UserChatComponent from './User/UserChatComponent';

export const ProtectedRoutesComponents = ({ Admin }) => {
    if (Admin) {
        let adminAuth = true;
        return adminAuth ? <Outlet /> : <Navigate to="login" />;
    } else {
        let userAuth = true;
        return userAuth ? (
            <>
                <UserChatComponent />
                <Outlet />
            </>
        ) : (
            <Navigate to="login" />
        );
    }
};

export default ProtectedRoutesComponents;
