import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import NavBar from '../../shared/NavBar/NavBar';
import { AuthContext } from '../../providers/AuthProvider';
import UseAdmin from '../../UseAdmin/UseAdmin';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const {user} = useContext(AuthContext);
  const {isAdmin} = UseAdmin();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    name: '',
    image_url: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/images', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error adding image:', error);
      });
  };

  useEffect(() => {
    // Fetch data using Axios
    axios.get('http://localhost:5000/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <NavBar />
      <div className="card shrink-0 mx-auto mt-5  w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ID</span>
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Add Image
            </button>
          </div>
        </form>
      </div>
      <h2 className="text-4xl text-center text-gray-200 mt-10 mb-10">Images</h2>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <div key={image.id} className="card bg-gray-700 mx-auto mt-10 h-96 w-96  shadow-xl">
            <figure >
              <img src={image.image_url} alt={image.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-gray-200">{image.title}</h2>
              {isAdmin && <p>ID: {image.id}</p>}

              
            </div>
            <Link to={`/images/${image._id}`}>
              <button className='btn border-0 bg-blue-800 text-white mx-5 mb-5'>Full Image <FaArrowRight></FaArrowRight></button>
            </Link>


          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
