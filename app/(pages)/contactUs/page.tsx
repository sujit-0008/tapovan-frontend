import { Card, CardContent } from "../../components/ui/card";
import { MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-hostel-warmBg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-hostel-textDark">
            Contact Us
          </h1>
          <p className="text-center text-hostel-textDark/80 max-w-2xl mx-auto leading-relaxed">
            We&apos;re here to help! Reach out to us with any questions or concerns.
            Our team is dedicated to providing prompt and helpful assistance to
            ensure your experience with Tapovan Boys Hostel is exceptional.
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-hostel-burgundy text-white p-6 rounded-lg mb-8 shadow-md">
            <h2 className="text-3xl font-bold text-center">Our Location</h2>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 h-64 md:h-96 rounded-lg mb-8 flex items-center justify-center shadow-md">
            <div className="text-center text-gray-600">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">Tripathi Heights, Pune, Maharashtra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-hostel-warmBg">
        <div className="container mx-auto px-4">
          <div className="bg-hostel-burgundy text-white p-6 rounded-lg mb-8 shadow-md">
            <h2 className="text-3xl font-bold text-center">
              Contact Information
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-hostel-textDark">
                Get in Touch
              </h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-hostel-gold mt-1" />
                  <div>
                    <p className="font-medium text-hostel-textDark">Address</p>
                    <p className="text-hostel-textDark/80 leading-relaxed">
                      Tripathi Heights Plot No 68, Sai Samruddhi, Lane 5, DY
                      Patil University Rd, Lohegaon, Pune, Maharashtra 411047
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-hostel-gold mt-1" />
                  <div>
                    <p className="font-medium text-hostel-textDark">Phone</p>
                    <p className="text-hostel-textDark/80 leading-relaxed">
                      9067807473, 8530869677, 9967546997, 8983403533
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-hostel-textDark">
                Send Us a Message
              </h3>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <form className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-hostel-textDark"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-hostel-secondary focus:outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-hostel-textDark"
                      >
                        Your Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-hostel-secondary focus:outline-none"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-hostel-textDark"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        placeholder="Enter subject"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-hostel-secondary focus:outline-none"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-hostel-textDark"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Enter your message"
                        rows={5}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-hostel-secondary focus:outline-none resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-hostel-secondary text-white py-3 rounded-lg font-medium hover:bg-hostel-secondary/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
