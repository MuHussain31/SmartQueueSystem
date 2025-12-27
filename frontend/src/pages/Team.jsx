import Navbar from "../components/Navbar";
//import img1 from "../assets/images/pic3.jpg";
import img2 from "../assets/images/pic2.png";
import img3 from "../assets/images/pic10.jpg";



export default function TeamPage() {
  const teamMembers = [
    {
      name: "Bilal Yousuf",
      role: "Founder",
      image: img3,
      bio: "Visionary leader with expertise in digital architecture and innovation.",
      linkedin: "https://www.linkedin.com/in/muhammadbilalyousuf746",
      github: "https://github.com/MuhammadBilalYousuf746"
    },
    {
      name: "Hussain Nasir",
      role: "Co-Founder",
      image: img2,
      bio: "Strategic mastermind focused on scalable growth and technology.",
      linkedin: "https://www.linkedin.com/in/mhussain31",
      github: "https://github.com/MuhammadBilalYousuf746"
    }
  ];
// WhatsApp number
  const whatsappNumber = "03322497267";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#6b1a7e] overflow-hidden">
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-4">
        {/* Page Heading */}
        <h1 className="text-white text-5xl md:text-6xl font-bold mb-16 text-center drop-shadow-lg">
          Meet Our Innovators
        </h1>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-12 max-w-6xl w-full">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative w-80 h-[450px] rounded-[40px] border border-white/20 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/50 hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:-translate-y-2"
            >
              <div className="p-8 h-full flex flex-col items-center">

                {/* Image Container with Neon Glow */}
                <div className="relative mb-8 pt-4">
                  <div className="absolute -inset-1 bg-white opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-all duration-500"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-40 h-40 rounded-full border-2 border-white/30 object-cover group-hover:border-white transition-all duration-500"
                  />
                </div>

                {/* Name & Role (Main View) */}
                <div className="text-center transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-[-20px]">
                  <h2 className="text-white text-2xl font-bold tracking-tight mb-2">
                    {member.name}
                  </h2>
                  <p className="text-white/60 text-lg font-medium">
                    {member.role}
                  </p>
                </div>

                {/* Hover Details */}
                <div className="absolute inset-x-0 bottom-0 p-8 text-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col items-center">
                  <h2 className="text-white text-2xl font-bold mb-1">{member.name}</h2>
                  <p className="text-white/40 text-sm font-bold uppercase mb-4 tracking-widest">{member.role}</p>
                  <p className="text-white/80 text-base leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Inline SVG Social Icons (No Library Needed) */}
                  <div className="flex gap-4 mb-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>

                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                  </div>


                  <div className="w-16 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{/* --- WHATSAPP FLOATING ICON (Updated to Purple) --- */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        // Changes: bg-[#25d366] -> bg-purple-600, hover:bg-[#128c7e] -> hover:bg-purple-700, border-white/50 -> border-purple-500/80
        className="fixed bottom-6 right-6 z-[60] bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-purple-500/80"
        title="Chat on WhatsApp"
      >
        {/* WhatsApp Icon (SVG for quality) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M12.039 2c-5.467 0-9.916 4.449-9.916 9.916 0 1.545.397 3.015 1.106 4.331l-1.125 4.103 4.205-1.095c1.282.695 2.704 1.056 4.077 1.056 5.468 0 9.917-4.449 9.917-9.916s-4.449-9.916-9.917-9.916zm3.321 13.254c-.134.336-.51.453-.787.351-.157-.058-.867-.34-.96-.376-.095-.037-.197-.038-.346.103-.122.115-.466.598-.567.702-.10.103-.199.117-.37.072-.612-.17-.184-1.293 1.1-2.193 1.077-.73 1.432-.977 1.763-1.04.17-.035.353-.01.484.07.135.084.856.885.856 2.05s-.686 2.112-1.205 2.247z"/>
        </svg>
      </a>
      {/* ------------------------------------------- */}
    </div>
  );
}