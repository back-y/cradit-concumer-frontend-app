import { UserProvider } from 'src/lib/authContext';


const ProtectedGuard = ({ children, user, loading = false }) => {
    return (
        <UserProvider value={{ user, loading }}>
            {children}
        </UserProvider>
    )
};

export default ProtectedGuard;