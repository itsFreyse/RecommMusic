// Importamos contexts
import { AuthProvider } from "./AuthContext";
import { AudioProvider } from "./AudioContext";

// Context principal de la aplicación
const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <AudioProvider>{children}</AudioProvider>
    </AuthProvider>
  );
};

export default AppProviders;
