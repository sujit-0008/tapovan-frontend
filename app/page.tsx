
import { Card, CardContent } from "./components/ui/card";
import { Building, Users, Shield, Wifi } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 md:py-32">
        <Image
          src="/homePage.png"
          alt="Background image of Tapovan Boys Hostel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Tapovan Boys Hostel
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Your home away from home, providing a safe and supportive environment for academic success and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/studentRegistration" className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors bg-white text-black :bg-white/90">
                Register Now
              </Link>
              <Link href="/aboutUs" className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors border border-white text-white hover:bg-white/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-hostel-warmBg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-hostel-textDark">Core Values</h2>
              <p className="text-lg text-hostel-textDark/80">
                Safety, quality commitments and growth.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-hostel-textDark">Mission</h2>
              <p className="text-lg text-hostel-textDark/80">
                Doing whatever it takes to achieve quality service and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Tapovan Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-hostel-burgundy text-white p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">About Tapovan</h2>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <Building className="h-16 w-16 text-hostel-gold" />
            </div>
            <p className="text-lg text-hostel-textDark/80 leading-relaxed">
              Tapovan Nest Boys Hostel offers a safe, structured, and student-friendly environment designed to support academic success and personal growth. Our facility is equipped with modern amenities and a fully digital management system to ensure transparency and efficiency. Students benefit from real-time entry/exit tracking, healthy meal plans, and easy access to medical care. Parents stay informed through a dedicated dashboard offering insights into their child&apos;s daily activities and well-being, with separate roles for admin, vendors and medical staff we maintain high standards of service safety. At Tapovan, we believe in creating not just a hostel but a second home for every student.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-hostel-warmBg">
        <div className="container mx-auto px-4">
          <div className="bg-hostel-burgundy text-white p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold text-center">Key Features</h2>
          </div>
          
          <h3 className="text-2xl font-bold text-center mb-12 text-hostel-textDark">
            Explore Our Hostel&apos;s Features
          </h3>
          <p className="text-center mb-12 text-hostel-textDark/80">
            Discover the amenities and services that make Tapovan Boys Hostel the ideal choice for students.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Building,
                title: "Comfortable Accommodation",
                description: "Well-maintained rooms with modern amenities for a comfortable stay."
              },
              {
                icon: Users,
                title: "Vibrant Community",
                description: "Connect with fellow students and build lasting friendships."
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "24/7 security and a safe environment for all residents."
              },
              {
                icon: Wifi,
                title: "Easy Access",
                description: "Conveniently located near educational institutions and city amenities."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-hostel-gold mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-hostel-burgundy text-white p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold text-center">Hostel Statistics</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-hostel-gold mb-2">250+</div>
              <div className="text-hostel-textDark">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-hostel-gold mb-2">50+</div>
              <div className="text-hostel-textDark">Events Organized</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-hostel-gold mb-2">10+</div>
              <div className="text-hostel-textDark">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hostel-warmBg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-hostel-textDark">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-hostel-textDark/80">
            Join Tapovan Boys Hostel today and experience a supportive and enriching environment for your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/studentRegistration" className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors bg-hostel-secondary text-white hover:bg-hostel-secondary/90">
              Register Now
            </Link>
            <Link href="/contactUs" className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors border border-hostel-textDark text-hostel-textDark hover:bg-hostel-textDark/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;