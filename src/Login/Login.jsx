import { useContext, useEffect,  useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import SocialLogin from './SocialLogin';
import NavBar from '../shared/NavBar/NavBar';

const Login = () => {

    
    const [disabled, setDisabled] = useState(true);

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

    

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Logged in successfully",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
                  navigate(from, {replace: true});
            })
    }

    


    return (

        <div>
            
            <NavBar></NavBar>
                <div className="hero-content mt-10 flex-col md:flex-row-reverse">
                    
                    <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
                        {/* <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            
                            <div className="form-control mt-6">

                                <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form> */}
                        <p className='mx-auto  mt-5 text-2xl'>Login with your Google account</p>

                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            
        </div>
    );
};

export default Login;