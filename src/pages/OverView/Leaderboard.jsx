// Leaderboard.jsx
const Leaderboard = ({ votes }) => {
    const sortedImages = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  
    return (
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image ID</th>
              <th>Title</th>
              <th>Vote Count</th>
            </tr>
          </thead>
          <tbody>
            {sortedImages.map(([imageId, voteCount, imageTitle], index) => (
              <tr key={index}>
                <td>{imageId}</td>
                <td>{imageTitle}</td>
                <td>{voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Leaderboard;
  