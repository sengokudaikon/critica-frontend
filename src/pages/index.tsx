import { NextPage } from 'next';
import AuthPage from '@/pages/AuthPage';


const Home: NextPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <AuthPage />
        </div>
    );
};

export default Home;
