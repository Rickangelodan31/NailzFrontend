// import { useEffect, useState, useContext } from "react";
// import { SessionContext } from "../contexts/SessionContext";

// const FriendsList = () => {
//   const { token } = useContext(SessionContext);
//   const [friends, setFriends] = useState([]);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/friends`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setFriends(data);
//         } else {
//           console.error("Failed to fetch friends");
//         }
//       } catch (error) {
//         console.error("Error fetching friends:", error);
//       }
//     };

//     fetchFriends();
//   }, [token]);

//   return (
//     <div>
//       <h1>Friends List</h1>
//       {friends.map((friend) => (
//         <div key={friend._id}>
//           <p>{friend.username}</p>
//           <p>{friend.email}</p>
//           <img src={friend.profilePicture} alt={`${friend.username}'s profile`} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FriendsList;
