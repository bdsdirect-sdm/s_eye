/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import '../../public/styles/dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(null);
    const token: any = localStorage.getItem('token');

    // If there's no token, redirect to login page
    if (!token) {
        navigate('/login');
        return null;
    }

    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getUserById/${userId}`);
                setUserData(response.data.data);
            } catch (error: any) {
                toast.error('Failed to fetch user data');
            }
        };
        fetchUserData();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Successfully Logged Out');
        navigate('/login');
    };

    const handleAddAddress = () => {
        navigate('/addAddress');
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
                <div className="bg-light" id="sidebar-wrapper">
                    <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
                        {userData.companyName}
                    </div>
                    <div className="list-group list-group-flush my-3">
                        <a href="#" className="list-group-item list-group-item-action bg-transparent second-text active">
                            Patients
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-transparent second-text">
                            Appointments
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-transparent second-text">
                            Doctors
                        </a>
                        <a href="#" onClick={handleLogout} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
                            Logout
                        </a>
                    </div>
                </div>

                {/* Page Content */}
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                            <h2 className="fs-2 m-0"></h2>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <span className="fs-5">
                                        {userData.firstName} {userData.lastName}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>User Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong>Name:</strong> {userData.firstName} {userData.lastName}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Email:</strong> {userData.email}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Gender:</strong> {userData.gender}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Phone:</strong> {userData.phone}
                                    </li>

                                </ul>

                                <h4 className="mt-4">Addresses</h4>
                                {userData.addresses && userData.addresses.length > 0 ? (
                                    <ul className="list-group">
                                        {userData.addresses.map((address: any) => (
                                            <li className="list-group-item" key={address.id}>
                                                <strong>Address:</strong> {address.street}, {address.city}, {address.state}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No addresses found.</p>
                                )}

                                <button className="btn btn-primary mt-3" onClick={handleAddAddress}>
                                    Add Address
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
