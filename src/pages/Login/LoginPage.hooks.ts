import { useNavigate } from "react-router";
import { baseURL } from "../../BaseUrl";
import { AuthUsecase } from "../../features/usecase/AuthUsecase";

export const useLoginPage = () => {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse: any) => {
    const credential = credentialResponse?.credential;

    if (!credential) {
      console.error("Missing credential from Google login");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/google/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Login failed');
      }

      const data = await response.json();
      const { user } = data;

      // Save token for later API requests
      await AuthUsecase.login({name: user.name, email: user.email, userId: user._id})
      console.log('Login successful:', user);

      // Optionally navigate to dashboard or home page
      navigate('/');
  
    } catch (error) {
      console.error('Backend login failed:', error);
      window.alert("Unable to login")
    }
  };

  return { handleSuccess}
}