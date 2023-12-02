import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import './navbar.css';
import { AuthContext } from '../../providers/AuthProvider';
import UseAdmin from '../../UseAdmin/UseAdmin';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const [isAdmin, isAdminLoading] = UseAdmin();
    const renderLoginButton = () => {
        if (user) {

            return (
                <button onClick={handleLogout} className='btn bg-red-900 text-white border-0'>
                    Logout
                </button>
            );
        } else {

            return <Link to='/login'><button className='btn bg-red-900 text-white border-0'>Login</button></Link>;
        }
    };

    const navItems = (
        <>
            <li>
                <NavLink className='mr-4' to='/'>Home</NavLink>
            </li>
            {isAdmin && (
                <>
                    <li>
                        <NavLink to='/overView'>OverView</NavLink>
                    </li>
                    <li>
                        <NavLink to='/allUsers'>Users</NavLink>
                    </li>
                </>
            )}

        </>
    );

    return (
        <div className="navbar p-5 bg-gradient-to-r from-blue-950 to-gray-950 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Photography Contest</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {renderLoginButton()}
            </div>
        </div>
    );
};

export default NavBar;
