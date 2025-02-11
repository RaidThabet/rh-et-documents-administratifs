import LoginForm from "../components/LoginForm.tsx";

function LoginPage() {
    return (
        <div className={"bg-gradient-to-r from-indigo-500 to-blue-500 flex justify-center items-center h-screen w-full"}>
            <LoginForm />
        </div>
    );
}

export default LoginPage;