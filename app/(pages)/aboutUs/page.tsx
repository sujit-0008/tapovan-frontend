import { Card, CardContent } from "../../components/ui/card";
import { Users, Heart, TrendingUp, Building, Wifi, Shield, Car, Utensils } from "lucide-react";
import Image from "next/image";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <Image
          src="/aboutPage.png"
          alt="Exterior view of Tapovan Boys Hostel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-hostel-burgundy text-white p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold text-center">Our Mission</h2>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-hostel-textDark/80 leading-relaxed">
              At Tapovan Boys Hostel, our mission is to provide a safe, comfortable, and supportive living environment for students. We are committed to fostering a community that promotes academic success, personal growth, and a sense of belonging. Our goal is to ensure that every student feels at home while pursuing their educational aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-hostel-warmBg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-hostel-textDark">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-hostel-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-10 w-10 text-hostel-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Community</h3>
                    <p className="text-hostel-textDark/80">
                      We believe in fostering a strong sense of community among our residents. Through various events and activities, we encourage interaction and collaboration, creating a supportive network for students.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-hostel-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-10 w-10 text-hostel-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Support</h3>
                    <p className="text-hostel-textDark/80">
                      We provide comprehensive support services to ensure students well-being and academic success. Our staff is available 24/7 to assist with any needs, and we offer resources to help students thrive.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-hostel-burgundy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-10 w-10 text-hostel-burgundy" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Growth</h3>
                    <p className="text-hostel-textDark/80">
                      We are dedicated to promoting personal and academic growth. Our environment is designed to encourage students to explore their interests, develop new skills, and achieve their full potential.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-hostel-burgundy text-white p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold text-center">Our Facilities</h2>
          </div>
          
          <p className="text-center mb-12 text-hostel-textDark/80 max-w-2xl mx-auto">
            We offer a range of luxury facilities to ensure a comfortable and enriching stay for our students, including:
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Utensils, title: "Cafeteria (Canteen)" },
              { icon: Car, title: "Pickup and Drop Facilities" },
              { icon: Wifi, title: "High-Speed WiFi Internet" },
              { icon: Building, title: "Comfortable Beds" },
              { icon: Shield, title: "Wardrobe" },
              { icon: Users, title: "Study Table and Chairs" },
              { icon: Heart, title: "First Aid and Hospital Attached" },
              { icon: TrendingUp, title: "Ex-Army Personal Management" },
              { icon: Building, title: "Geyser/Solar Plant for Hot Water" },
              { icon: Wifi, title: "Fridge and Microwave in Common Area" },
              { icon: Shield, title: "CCTV" },
              { icon: Users, title: "24/7 Security" },
              { icon: Heart, title: "Biometric Attendance" },
              { icon: TrendingUp, title: "24/7 Assistance and Warden" },
              { icon: Building, title: "RO Drinking Water" },
              { icon: Wifi, title: "TV in Common Area" },
              { icon: Shield, title: "Washing Machine in Common Area" },
              { icon: Users, title: "Generator Backup" },
              { icon: Heart, title: "Digital Library" },
              { icon: TrendingUp, title: "Housekeeping" },
              { icon: Building, title: "Indoor Games (Pool Table, Chess, Carrom Board)" },
              { icon: Wifi, title: "Gymnasium" }
            ].map((facility, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4">
                  <facility.icon className="h-8 w-8 text-hostel-gold mx-auto mb-2" />
                  <p className="text-sm font-medium">{facility.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;