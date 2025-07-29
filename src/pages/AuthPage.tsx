import AuthCard from "@components/AuthCard";
import "@styles/pages/AuthPage.scss";

const AuthPage = () => {
   return (
      <div className="auth-page">
         <main className="auth-main">
            <AuthCard />
         </main>
      </div>
   );
};

export default AuthPage;
