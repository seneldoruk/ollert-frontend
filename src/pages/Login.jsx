import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Login() {
  return (
    <div className="text-center d-flex flex-column align-items-center">
      <h1 className="m-5">Ollert</h1>
      <div className="d-flex justify-content-center border rounded w-50">
        <div className="m-4 p-4">
          <LoginForm />
        </div>
        <div className="m-4 p-4">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
