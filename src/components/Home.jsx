import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
  //const { currentUser } = useAuth();
  const currentUser = false;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-#141925 to-#f1f5f9 text-white bg-zinc-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to SCOPE
            </h1>
            <p className="text-xl mb-8">
              Streamlined Communication and Organised Placement Engagement
            </p>
            <p className="text-lg mb-8">
              A comprehensive platform connecting students, teachers, and
              placement officers for seamless college communication.
            </p>
            {!currentUser ? (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="bg-white text-scope-primary hover:bg-scope-light px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-scope-accent text-white hover:bg-scope-accent/90 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="bg-scope-accent text-white hover:bg-scope-accent/90 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-scope-primary ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 rounded-full bg-scope-light flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-scope-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Management</h3>
              <p className="text-gray-600">
                Create, manage, and join college events with ease. Get
                notifications for upcoming events relevant to you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 rounded-full bg-scope-light flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-scope-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Query Management</h3>
              <p className="text-gray-600">
                Submit queries to training and placement coordinators with
                streamlined response and forwarding system.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 rounded-full bg-scope-light flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-scope-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Academic Information
              </h3>
              <p className="text-gray-600">
                Access your academic records, marks, and performance details all
                in one centralized location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="flex flex-col md:flex-row gap-6 justify-between max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-scope-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-gray-600">
                Create your account with your appropriate role in the college
                ecosystem.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-scope-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Access your personalized dashboard based on your role in the
                system.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-scope-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Engage</h3>
              <p className="text-gray-600">
                Participate in events, submit queries, and manage your academic
                information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-scope-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join SCOPE today and experience a streamlined way to connect with
            your college community.
          </p>
          {!currentUser ? (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-white text-scope-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-scope-primary text-white hover:bg-scope-dark px-6 py-3 rounded-md font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="bg-scope-primary text-white hover:bg-scope-dark px-6 py-3 rounded-md font-medium transition-colors"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home