/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export default function Profile() {
  const navigate = useNavigate();
  const token: any = localStorage.getItem('token');

  if (!token) {
    navigate('/login');
    return null; 
  }

  const decoded: any = jwtDecode(token);
  const userId = decoded.id; 

  const fetchUserProducts = async () => {
    return axios.get(`http://localhost:3000/retailer-details/${userId}`);
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['details', userId],
    queryFn: fetchUserProducts,
    enabled: !!userId 
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Successfully Logged Out');
    navigate('/login');
  };

  const handleDeleteProduct = async (productId: number) => {
    const retailerId = decoded.id; 
    try {
      await axios.delete(`http://localhost:3000/delete-product/${retailerId}/${productId}`);
      toast.success('Product deleted successfully!');
      refetch();
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Page is Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="d-flex" id="wrapper">
        <div className="bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">{data?.data.retailer.companyName} </div>
          <div className="list-group list-group-flush my-3">
            <a href="/profile" className="list-group-item list-group-item-action bg-transparent second-text active">
              <i className="fas fa-tachometer-alt me-2"></i>All Products
            </a>
            <a href="#" onClick={handleLogout} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
              <i className="fas fa-power-off me-2"></i>Logout
            </a>
          </div>
        </div>

        {/* Page Content */}
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
            <div className="d-flex align-items-center">
              <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
              <h2 className="fs-2 m-0">Dashboard</h2>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <i className="fas fa-user me-2"></i>{data?.data.retailer.firstname} {data?.data.retailer.lastname} 
                </li>
              </ul>
            </div>
          </nav>

          <button className='btn btn-primary'> <a className='text-white' href="/addProduct">Add Product</a></button>
          <div className="row my-5">
            <h3 className="fs-4 mb-3">Your Products</h3>
            <div className="col">
              <table className="table bg-white rounded shadow-sm table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">View Details</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.retailer.products.length > 0 ? (
                    data?.data.retailer.products.map((product: any) => (
                      <tr key={product.id}>
                        <th scope="row">{product.id}</th>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.quantity}</td>
                        <td><a className='btn btn-primary text-white' href={`/productDetails/${product.id}`}>View</a> </td>
                        <td><a className='btn btn-warning text-white' href={`/updateProduct/${product.id}`}>Update</a> </td>
                        <td>
                          <button 
                            className='btn btn-danger text-white' 
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No products found for this retailer</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
