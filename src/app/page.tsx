'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [membersCode, setMembersCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMembersAccess = () => {
    if (membersCode === '2301') {
      window.location.href = '/members';
    } else {
      alert('Invalid access code');
      setMembersCode('');
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/hero.png")',
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Title */}
          <h1 className="font-serif text-6xl md:text-8xl font-light text-white tracking-wide">
            The Treehouse
          </h1>
          
          {/* Tagline */}
          <p className="font-sans text-xl md:text-2xl text-white/90 font-light tracking-wide">
            An elevated patio experience
          </p>
          
          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-12 justify-center items-center"
          >
            <Link href="/menu">
              <Button 
                variant="ghost" 
                size="lg"
                className="border border-white/30 text-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-6 text-lg font-sans tracking-wide"
              >
                View Menu
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                variant="ghost" 
                size="lg"
                className="border border-white/30 text-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-6 text-lg font-sans tracking-wide"
              >
                Our Story
              </Button>
            </Link>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="border border-white/30 text-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-6 text-lg font-sans tracking-wide"
                >
                  Members Only
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-center">Members Access</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter access code"
                    value={membersCode}
                    onChange={(e) => setMembersCode(e.target.value)}
                    className="text-center"
                    onKeyPress={(e) => e.key === 'Enter' && handleMembersAccess()}
                  />
                  <Button 
                    onClick={handleMembersAccess}
                    className="w-full"
                  >
                    Enter
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
      </div>
      
    </div>
  );
}
