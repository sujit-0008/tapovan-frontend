import { MapPin, Phone, } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-hostel-burgundy text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Tapovan Nest Boy Hostel</h3>
          <div className="text-white/90 space-y-2">
            <div className="flex flex-col items-center justify-center space-x-2">
              <div><MapPin className="h-4 w-4" /></div>
            <div>
              <span className="text-sm">
                Tripathi Heights Plot No 68, Sai samruddhi, Lane 5, DY Patil
                University Rd, lohegaon, Pune, Maharashtra 411047
              </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-x-2">
              <div><Phone className="h-4 w-4" /></div>
              <div>
              <span className="text-sm">
                9067807473, 8530869677, 9967546997, 8983403533
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-hostel-gold py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-hostel-textDark">
            <div className="flex space-x-6 mb-2 md:mb-0">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Us</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow Us</span>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-hostel-textDark rounded flex items-center justify-center">
                  <span className="text-hostel-gold text-xs">f</span>
                </div>
                <div className="w-6 h-6 bg-hostel-textDark rounded flex items-center justify-center">
                  <span className="text-hostel-gold text-xs">i</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2 text-xs">
            © 2025 Tapovan Boys Hostel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};