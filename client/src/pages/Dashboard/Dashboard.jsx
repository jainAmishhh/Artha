import React from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import { MdPlayForWork } from "react-icons/md";

const Dashboard = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 px-6 md:px-24 bg-[#FAFAF8]">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-snug mb-4">
          Bring Balance to Your
          <br className="md:hidden" /> Time & Wealth
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-8">
          Track expenses, manage bank activity, budget smarter and plan your day
          — all in one place, built for modern India.
        </p>
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button className="bg-[#22543D] text-white px-6 py-3 rounded-lg hover:bg-[#1b3e2e] hover:scale-105 transition flex items-center gap-2 ">
            Watch Demo
            <FaCirclePlay />
          </button>
          <a
           href='#how-it-works'
           className="flex items-center gap-2 border border-[#22543D] text-[#22543D] px-6 py-3 rounded-lg hover:bg-[#1b3e2e] hover:scale-105 hover:text-white transition-all duration-300">
            How It Works
            <MdPlayForWork />
          </a>
        </div>
        <div className="w-fit max-w-md mx-auto">
          <img
            src="/artha-ui.png"
            alt="Artha App UI"
            className="rounded-[46px] shadow-xl shadow-gray-500"
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 md:px-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Connect Your Bank", icon: "🏦" },
            { title: "Budget with Purpose", icon: "📊" },
            { title: "Plan Your Day", icon: "✅" },
            { title: "Designed for You", icon: "🌱" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#F8FAF9] p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.title === "Connect Your Bank"
                  ? "Securely link your account with trusted Indian platforms."
                  : item.title === "Budget with Purpose"
                  ? "Analyze your earnings and spendings with deep insights."
                  : item.title === "Plan Your Day"
                  ? "Boost productivity with integrated to-do & goals."
                  : "Mindful tools designed for Indian needs and lifestyle."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Artha & Testimonials */}
      <section className="py-20 px-6 md:px-24 bg-[#FAFAF8]">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Artha?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All-in-one for money + productivity</li>
              <li>Designed for Indian users</li>
              <li>Simple, clean interface</li>
              <li>Focused on mindful daily balance</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">What Users Say</h2>
            <blockquote className="mb-6 text-gray-700 border-l-4 border-[#22543D] pl-4 italic">
              “Finally, one app that shows me where my time AND my money goes!”
              <br />
              <span className="text-sm text-gray-500">
                — Priya, Software Engineer
              </span>
            </blockquote>
            <blockquote className="text-gray-700 border-l-4 border-[#22543D] pl-4 italic">
              “I feel calmer and more in control every day I use Artha.”
              <br />
              <span className="text-sm text-gray-500">
                — Rohan, CA Aspirant
              </span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Dashboard Section Highlights (Optional) */}
      <section className="py-20 px-6 md:px-24 bg-white" id="dashboard">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Your Dashboard
        </h2>
        <div className="grid md:grid-cols-5 gap-6 text-center">
          {[
            { label: "Dashboard", emoji: "📊" },
            { label: "Transactions", emoji: "💸" },
            { label: "Budgets", emoji: "🧮" },
            { label: "To-Do", emoji: "📝" },
            { label: "Insights", emoji: "💹" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#F9F9F7] p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-lg font-semibold">{item.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6 bg-[#FAFAF8]">
        <h2 className="text-3xl font-bold mb-6">
          Ready to take control of your time & finances?
        </h2>
        <button className="bg-[#22543D] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#1c4332] transition">
          Get Early Access
        </button>
      </section>
    </div>
  )
}

export default Dashboard