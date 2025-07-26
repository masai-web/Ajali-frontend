function User({ user }) {
  if (!user || !user.name) {
    return <p>Loading user info...</p>;
  }

  return (
    <div className="text-sm text-right">
      <p className="font-semibold">{user.username || user.name}</p>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}

export default User;
