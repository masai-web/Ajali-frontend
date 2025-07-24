function User({ user }) {
  if (!user) {
    return <p>Loading user info...</p>; 
  }

  return (
    <div className="text-sm text-right">
      <p className="font-semibold">{user.name}</p>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}

export default User;
