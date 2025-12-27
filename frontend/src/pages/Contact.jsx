import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#6b1a7e] overflow-x-hidden relative">
      <Navbar />

      <div className="flex flex-col items-center pt-20 pb-12 px-4 max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-10">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-lg">
            Let's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
              Connect
            </span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Technical issues or organization integration? Our team is active and ready to optimize your flows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="space-y-6 order-2 lg:order-1 flex flex-col justify-center">
            <div className="p-8 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl group">
              <h3 className="text-white text-xl font-bold mb-4">Support Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-white/40 text-xs uppercase font-bold mb-1">Avg. Response</p>
                  <p className="text-white text-xl font-bold">~15 Mins</p>
                </div>
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-white/40 text-xs uppercase font-bold mb-1">Status</p>
                  <p className="text-green-400 text-xl font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-white text-xl font-bold mb-6">Direct Channels</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                  <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl">📧</span>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">General Inquiries</p>
                    <p className="text-base md:text-lg">bscs2380200@szabist.pk / bscs2380203@szabist.pk</p>
                  </div>
                </li>
                <li className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                  <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl">📱</span>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">WhatsApp Chat</p>
                    <p className="text-base md:text-lg">+92 332 2497267</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="p-8 rounded-[40px] border border-white/20 bg-white/5 backdrop-blur-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 blur-[80px] opacity-20 -z-10"></div>
              
              <form 
                action="https://formsubmit.co/bscs2380200@szabist.pk" 
                method="POST" 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-white/60 text-[12px] font-medium ml-2">Name</label>
                    <input type="text" className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 transition-all placeholder:text-white/10 text-sm" placeholder="Ali Khan" name="name" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-white/60 text-[12px] font-medium ml-2">Email</label>
                    <input type="email" className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 transition-all placeholder:text-white/10 text-sm" placeholder="ali@qms.com" name="email" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-white/60 text-[12px] font-medium ml-2">Service</label>
                  <select className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm appearance-none" name="service">
                    <option className="bg-[#1a051f]">System Support</option>
                    <option className="bg-[#1a051f]">FBR Support</option>
                    <option className="bg-[#1a051f]">NADRA Integration</option>
                    <option className="bg-[#1a051f]">DLS Issue</option>
                    <option className="bg-[#1a051f]">SSGS</option>
                    <option className="bg-[#1a051f]">Healthcare dept.</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-white/60 text-[12px] font-medium ml-2">Message</label>
                  <textarea rows="3" name="message" className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="How can we help?"></textarea>
                </div>

                <button className="w-full py-4 rounded-3xl bg-white text-black font-bold hover:bg-purple-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] text-sm uppercase tracking-wide">
                  Send 
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
