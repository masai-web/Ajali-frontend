import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white shadow-md rounded-xl p-8 border border-gray-100 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-4">We’d love to hear from you!</p>
          <p className="text-gray-700 mb-2">
            Phone: <a href="tel:+254712345678" className="text-blue-600 hover:underline">+254 712 345 678</a>
          </p>
          <p className="text-gray-700">
            Email: <a href="mailto:support@ajaliapp.com" className="text-blue-600 hover:underline">support@ajaliapp.com</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
