import { MapPin, Navigation, Phone, ExternalLink, Compass } from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl } from '@/lib/config/clinic';

export function LocationSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
            Visit Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#202A29] mt-1 tracking-tight">
            Clinic Location & Directions
          </h2>
          <p className="text-sm sm:text-base text-[#546462] mt-2">
            Easily locate <strong className="text-[#202A29] font-medium">{CLINIC_CONFIG.name}</strong> using
            our confirmed satellite coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Coordinates & Directions Detail */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#F8FAF8] rounded-2xl p-6 sm:p-7 border border-[#E3E8E5] space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#DDEBE4] text-[#155E59] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#202A29]">
                    {CLINIC_CONFIG.name}
                  </h3>
                  <p className="text-xs text-[#546462]">
                    Director: {CLINIC_CONFIG.doctorName}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#546462]">
                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-[#155E59] mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-[#202A29] font-semibold">Verified Coordinates:</strong>
                    <div className="font-mono text-xs text-[#155E59] mt-0.5">
                      Latitude: {CLINIC_CONFIG.coordinates.latitude}° N <br />
                      Longitude: {CLINIC_CONFIG.coordinates.longitude}° E
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#155E59] mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-[#202A29] font-semibold">Telephone Assistance:</strong>
                    <div>
                      <a href={getTelUrl()} className="text-[#155E59] font-medium hover:underline">
                        {CLINIC_CONFIG.formattedPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3E8E5]">
                <a
                  href={CLINIC_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#DDEBE4]" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EEF5F1] border border-[#B9D5C8]/60 text-xs text-[#155E59]">
              <strong className="font-semibold block mb-1">Clinic Arrival Tip:</strong>
              If you require wheelchair access, stretcher assistance, or have acute mobility limitations,
              please notify our reception at {CLINIC_CONFIG.phone} prior to arrival so our staff can assist you.
            </div>
          </div>

          {/* Right Column: Interactive Map Card with Embed / Link */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8FAF8] rounded-2xl border border-[#E3E8E5] p-6 h-full flex flex-col justify-between overflow-hidden relative">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5] mb-4">
                  <span className="text-xs font-semibold text-[#546462] uppercase tracking-wider">
                    Interactive Map Location
                  </span>
                  <span className="text-xs font-mono text-[#155E59] bg-[#DDEBE4] px-2.5 py-0.5 rounded-full">
                    27.2924909, 75.1829705
                  </span>
                </div>

                {/* Map Presentation Card */}
                <div className="rounded-xl bg-white border border-[#E3E8E5] p-8 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
                  {/* Map Grid Pattern */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#155e59_1px,transparent_1px)] [background-size:20px_20px]" />
                  
                  <div className="relative z-10 flex flex-col items-center max-w-md">
                    <div className="w-16 h-16 rounded-2xl bg-[#DDEBE4] text-[#155E59] flex items-center justify-center mb-3 shadow-xs">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-[#202A29]">
                      {CLINIC_CONFIG.name}
                    </h4>
                    <p className="text-xs text-[#546462] mt-1 mb-5">
                      Direct GPS Navigation Point: {CLINIC_CONFIG.coordinates.latitude}, {CLINIC_CONFIG.coordinates.longitude}
                    </p>

                    <a
                      href={CLINIC_CONFIG.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#155E59] bg-[#EEF5F1] hover:bg-[#DDEBE4] border border-[#B9D5C8] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Launch in Google Maps App</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#546462] mt-4 text-center">
                Clicking above opens the verified clinic coordinates in Google Maps with live turn-by-turn navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
