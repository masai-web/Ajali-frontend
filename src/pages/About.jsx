import React from "react";
import about from "../assets/about.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Banner Section */}
      <div className="relative w-full h-[290px] mb-8">
        <img
          src={about}
          alt="Emergency Response Banner"
          className="w-full h-full object-cover"
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold mb-4">About Ajali!</h2>

        <p className="text-lg mb-4 leading-relaxed">
          In Kenya, accidents and emergencies are an unfortunate but frequent
          occurrence. Every moment counts. Often, the difference between life
          and death lies in how quickly first responders receive and act on
          crucial information.
        </p>

        <p className="text-lg mb-4 leading-relaxed">
          <strong>Ajali!</strong> is a citizen-driven platform created to bridge
          that gap. It empowers ordinary people to instantly report accidents,
          disasters, or emergency situations , from road accidents and fires to
          medical emergencies and unsafe environments. These alerts are sent
          directly to the appropriate authorities and shared with the public in
          real-time.
        </p>

        <p className="text-lg mb-4 leading-relaxed">
          By enabling rapid and accurate flow of emergency data, Ajali! aims to
          improve response time, mobilize the right support, and ultimately,
          save lives. Our mission is simple but powerful: to make every second
          count when it matters most.
        </p>

        <p className="text-lg mb-4 leading-relaxed">
          Whether you're a concerned citizen, a first responder, or a government
          agency, Ajali! is here to ensure that emergencies are no longer
          ignored or delayed.
        </p>

        <p className="text-lg font-medium mt-6">
          Together, we can build a faster, safer, and more responsive Kenya.
        </p>
      </div>
    </div>
  );
};

export default About;
