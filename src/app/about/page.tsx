'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-2xl text-primary hover:text-primary/80 transition-colors">
            IH • The Treehouse
          </Link>
          <nav className="flex gap-6">
            <Link href="/menu" className="text-foreground hover:text-primary transition-colors">
              Menu
            </Link>
            <Link href="/about" className="text-primary font-medium">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="/forestparkimage.jpg"
          alt="Forest park landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl font-light text-white mb-4"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        {/* First Section - Two Column */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20"
        >
          <div className="lg:col-span-7">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                <span className="font-serif text-7xl float-left leading-none mr-3 mt-1 text-primary">F</span>
                orest Park is America's best urban park. At 1,326 acres—500 acres larger than Central Park—it draws over 15 million visitors annually and has been recognized by USA Today as the country's premier city park for two consecutive years. What you're experiencing here is the beginning of something that matches that caliber.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                The vision is big—I want to create St. Louis's most celebrated dining destination, something that shows the world what this city is capable of. Right now it's just a patio and a lot of ambition, but that's how every great restaurant starts. I'm building something that celebrates the stories of this place, where incredible conversations happen naturally, and where the kind of serendipitous moments that define great cities come to life.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/1.jpg"
                alt="Architectural rendering of patio space"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Pull Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-20"
        >
          <blockquote className="font-serif text-3xl md:text-4xl italic text-primary leading-relaxed max-w-4xl mx-auto">
            "Every extraordinary destination begins with a dream. Our patio prototype is the first step toward creating St. Louis's most celebrated dining experience."
          </blockquote>
          <cite className="text-muted-foreground mt-4 block text-lg">— The Vision</cite>
        </motion.div>

        {/* Second Section - Asymmetrical Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20"
        >
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative h-[400px] md:h-[600px]">
              <Image
                src="/2.jpg"
                alt="Outdoor dining space design"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="prose prose-lg max-w-none lg:pl-8">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6">A Park Like No Other</h2>
              
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                <span className="font-serif text-7xl float-left leading-none mr-3 mt-1 text-primary">F</span>
                orest Park stands as America's premier urban oasis, home to the renowned Saint Louis Zoo, Art Museum, Science Center, and The Muny—all offering free admission. With over 30 miles of trails, pristine golf courses, and 190 acres of nature reserves, it's a testament to what makes St. Louis extraordinary.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                The Treehouse channels this grandeur through design that speaks to both strength and elegance. Our masculine exterior reflects the park's enduring presence, while our feminine interior creates an intimate sanctuary where St. Louis's finest gather to share stories, forge connections, and celebrate the serendipitous moments that define a life well-lived.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                Every element—from our locally-sourced ingredients to our thoughtfully crafted spaces—tells the story of St. Louis's renaissance. We believe that by creating extraordinary experiences in extraordinary places, we contribute to the city's bright future.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final Section - Full Width */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6">Building the Future</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              This prototype experience—from the patio where you scan our QR code to the digital menu you're exploring—is our foundation for something much larger. We're proving that exceptional hospitality and innovative dining can thrive in St. Louis. Every interaction, every meal ordered, every moment of connection brings us closer to building the full Treehouse vision: a world-class destination that celebrates this city's extraordinary potential.
            </p>
            <Link href="/menu">
              <Button size="lg" className="font-sans tracking-wide">
                Join Our Vision
              </Button>
            </Link>
          </div>
          
          <div className="relative h-[400px]">
            <Image
              src="/3.png"
              alt="Elegant dining experience"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}