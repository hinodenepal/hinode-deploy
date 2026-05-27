import { ArrowRight } from "lucide-react";

export function Inquiry() {
  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Plan Your Journey</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">お問い合わせ・ご相談</h1>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            Please fill out the form below to begin designing your bespoke Himalayan experience. Our Japanese-speaking concierge will contact you within 24 hours.
          </p>
        </div>

        <form className="bg-white p-8 md:p-12 rounded-sm border border-[#E8E5DF] shadow-sm">
          <div className="space-y-12">
            {/* Personal Info */}
            <section>
              <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-6 border-b border-[#D1CCC5] pb-2">1. Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Full Name</label>
                  <input type="text" className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors" placeholder="Taro Yamada" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Email Address</label>
                  <input type="email" className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors" placeholder="taro@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Phone Number</label>
                  <input type="tel" className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors" placeholder="+81 90 0000 0000" />
                </div>
              </div>
            </section>

            {/* Travel Preferences */}
            <section>
              <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-6 border-b border-[#D1CCC5] pb-2">2. Travel Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Estimated Travel Date</label>
                  <input type="month" className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Duration (Days)</label>
                  <select className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors">
                    <option>1-5 Days</option>
                    <option>6-10 Days</option>
                    <option>11-15 Days</option>
                    <option>15+ Days</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Group Size</label>
                  <select className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors">
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3-4 People</option>
                    <option>5+ People</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Interests</label>
                  <select className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors">
                    <option>Luxury Trekking</option>
                    <option>Cultural Tour</option>
                    <option>Wildlife Safari</option>
                    <option>Wellness & Yoga</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Additional Info */}
            <section>
              <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-6 border-b border-[#D1CCC5] pb-2">3. Additional Information</h3>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Message / Special Requests</label>
                <textarea rows={5} className="border border-[#D1CCC5] p-4 rounded-sm bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors" placeholder="Please let us know if you have any dietary requirements, specific hotels you wish to stay in, or any other special requests."></textarea>
              </div>
            </section>

            <button type="button" className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#2C2C2C] text-[#FAF9F6] text-sm tracking-widest uppercase hover:bg-[#8B2C24] transition-colors rounded-sm">
              Submit Inquiry <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
