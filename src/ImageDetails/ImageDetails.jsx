// ImageDetails.js
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import NavBar from '../shared/NavBar/NavBar';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import UseAdmin from '../UseAdmin/UseAdmin';

const ImageDetails = () => {
  const { imageId } = useParams();
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const { isAdmin } = UseAdmin();
  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/images/${imageId}`);
        setImage(response.data);
      } catch (error) {
        console.error('Error fetching image details:', error);
      }
    };

    fetchImageDetails();
  }, [imageId]);

  if (!image || !image.title) {
    return <p>Loading...</p>;
  }

  // ...

  const handleVote = async () => {
    try {
      if (user) {
        const userEmail = user.email;
        const imageId = image.id;
        const imageTitle = image.title;


        const result = await Swal.fire({
          icon: 'question',
          title: 'Are you sure?',
          text: 'Do you want to vote for this image?',
          showCancelButton: true,
          confirmButtonText: 'Yes, vote!',
          cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {

          const response = await axios.post('http://localhost:5000/votes', { imageId, userEmail, imageTitle });


          if (response.status === 201) {

            Swal.fire({
              icon: 'success',
              title: 'Vote Recorded',
              text: 'Your vote has been recorded successfully.',
            });

          }
        } else {

          Swal.fire({
            icon: 'info',
            title: 'Vote Canceled',
            text: 'You canceled the vote.',
          });
        }
      } else {
        console.error('User not authenticated.');
      }
    } catch (error) {

      if (error.response) {

        if (error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Vote Error',
            text: error.response.data.message,
          });
        } else if (error.response.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Internal Server Error',
            text: 'An internal server error occurred. Please try again later.',
          });
        }
      } else {

        console.error('Error voting:', error.message);
      }
    }
  };

  // ...


  return (
    <div>
      <NavBar></NavBar>
      <div className='text-center text-3xl my-10'>
        <p className='mb-5 text-gray-50'>ID: {image.id}</p>
        {
          isAdmin && <h2>{image.title}</h2>
        }
      </div>
      <img className='w-3/4 mx-auto' src={image.image_url} alt={image.title} />
      <div className='gap-5 my-5 flex justify-center'>
        <button onClick={handleVote} className='btn bg-blue-800 text-white'>Vote</button>
        <Link to='/'><button className='btn bg-blue-800 text-white'><FaArrowLeft></FaArrowLeft> Go back home</button></Link>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default ImageDetails;
