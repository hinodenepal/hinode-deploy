import { MapPin, Phone, Mail } from "lucide-react";

export function Contact() {
  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">コンタクト</h1>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            Whether you have a quick question or are ready to start planning your journey, we are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-light text-[#2C2C2C] mb-8">Contact Information</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#8B2C24] mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-2">Office Address</h3>
                  <p className="text-[#5A5A5A] font-light leading-relaxed">
                    Hinode Nepal Pvt. Ltd.<br/>
                    Kathmandu 44600, Nepal
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#8B2C24] mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-2">Phone Support</h3>
                  <p className="text-[#5A5A5A] font-light leading-relaxed">
                    Nepal: +977 985-1146179<br/>
                    Japan: +81-7036177182<br/>
                    <span className="text-xs text-[#8B2C24]">(Japanese support available 9:00 - 18:00 NPT)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#8B2C24] mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-2">Email</h3>
                  <p className="text-[#5A5A5A] font-light leading-relaxed">
                    info@hinodenepal.jp
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F4F1EC] p-8 rounded-sm">
               <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-4">Quick Connect</h3>
               <p className="text-[#5A5A5A] font-light text-sm mb-6">
                 Reach out to us instantly via LINE or WhatsApp for immediate assistance.
               </p>
               <div className="flex gap-4">
                 <button className="px-6 py-3 bg-[#00B900] text-white text-xs tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity">LINE Support</button>
                 <button className="px-6 py-3 bg-[#25D366] text-white text-xs tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity">WhatsApp</button>
               </div>
            </div>
          </div>

          {/* Simple Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-sm border border-[#E8E5DF]">
            <h2 className="text-2xl font-light text-[#2C2C2C] mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Name</label>
                <input type="text" className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Email</label>
                <input type="email" className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Subject</label>
                <input type="text" className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Message</label>
                <textarea rows={4} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors"></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-[#2C2C2C] text-[#FAF9F6] text-sm tracking-widest uppercase hover:bg-[#8B2C24] transition-colors rounded-sm mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
