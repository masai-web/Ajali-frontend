function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-lg text-gray-700 mb-8">This is the home page of our application.</p>
      <a href="/about" className="text-blue-500 hover:underline">
        Learn more about us
      </a>
    </div>
  );
}
export default Home;