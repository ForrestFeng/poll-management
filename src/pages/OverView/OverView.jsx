// OverView.jsx
import { useState, useEffect } from 'react';
import NavBar from '../../shared/NavBar/NavBar';
import axios from 'axios';

const OverView = () => {
    const [votes, setVotes] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/votes'); // Adjust the URL as needed
                setVotes(response.data);
            } catch (error) {
                console.error('Error fetching votes:', error);
                setError('Error fetching votes');
            }
        };

        fetchVotes();
    }, []); 

    useEffect(() => {
        const calculateLeaderboard = () => {
            const voteCounts = {};

            votes.forEach((vote) => {
                const { imageId } = vote;
                voteCounts[imageId] = (voteCounts[imageId] || 0) + 1;
            });

            const leaderboardData = Object.entries(voteCounts).map(([imageId, count]) => ({
                imageId,
                count,
                // Assuming the votes array has an object with imageTitle
                imageTitle: votes.find((vote) => vote.imageId === imageId)?.imageTitle || '',
            }));

            leaderboardData.sort((a, b) => b.count - a.count);

            setLeaderboard(leaderboardData);
        };

        calculateLeaderboard();
    }, [votes]);

    if (error) {
        return (
            <div>
                <NavBar />
                <h2>Error: {error}</h2>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            
            <table className="mx-auto mt-8 border-collapse border border-blue-500">
                <thead>
                    <tr className='text-center'>
                        <th className="py-2 px-4 border-b border-blue-500">Image ID</th>
                        <th className="py-2 px-4 border-b border-blue-500">Title</th>
                        <th className="py-2 px-4 border-b border-blue-500">Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map(({ imageId, imageTitle, count }) => (
                        <tr key={imageId} className="bg-blue-50">
                            <td className="py-2 px-4 border-b border-blue-500 text-center">{imageId}</td>
                            <td className="py-2 px-4 border-b border-blue-500 text-center">{imageTitle}</td>
                            <td className="py-2 px-4 border-b border-blue-500 text-center">{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OverView;
