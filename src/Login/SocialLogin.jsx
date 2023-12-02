import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../UseAxiosPublic/UseAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result=>{
            console.log(result.user);
            const userInfo={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data);
                navigate('/')
            })
        })
    }

    return (
        <div>
            <div className='m-5'>
                <button onClick={handleGoogleSignIn} className="btn text-white w-full bg-blue-600">
                    <FaGoogle></FaGoogle>
                    Google Login
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;