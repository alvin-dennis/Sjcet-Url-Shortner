const UserStats = ({ user }) => {
     return (
          <div className="stats">
               <p>Total URLs: {user.url_count || 0}</p>
               <p>Department: {user.dept}</p>
               <p>Year: {user.year}</p>
          </div>
     );
};

export default UserStats;