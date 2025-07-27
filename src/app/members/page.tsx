'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Cart } from '@/components/Cart';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

const exclusiveMenuItems: MenuItem[] = [
  {
    id: 'e1',
    name: 'Wagyu Beef Tasting',
    description: 'A curated selection of A5 Wagyu cuts, each prepared differently to showcase the exceptional marbling and flavor. Accompanied by artisanal salts and house-made sauces.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'exclusive'
  },
  {
    id: 'e2',
    name: 'Truffle & Caviar Experience',
    description: 'Fresh black truffle shavings over warm potato blinis, topped with Ossetra caviar and crème fraîche. An indulgent celebration of luxury ingredients.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'exclusive'
  },
  {
    id: 'e3',
    name: 'Chef\'s Secret Garden',
    description: 'A seasonal tasting of rare heirloom vegetables from our private garden, each prepared with techniques known only to our kitchen. Changes monthly with the harvest.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'exclusive'
  },
  {
    id: 'e4',
    name: 'Vintage Wine Pairing Flight',
    description: 'Five exceptional wines from our private cellar, each paired with complementary small plates. Includes vintages not available elsewhere.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'exclusive'
  },
  {
    id: 'e5',
    name: 'Molecular Gastronomy Surprise',
    description: 'Our chef&apos;s experimental creations using molecular gastronomy techniques. A seven-course journey through unexpected textures and flavor combinations.',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'exclusive'
  },
  {
    id: 'e6',
    name: 'Golden Honey Soufflé',
    description: 'A delicate soufflé infused with rare Manuka honey, served with gold leaf and vanilla bean ice cream. Available only to our most valued guests.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'dessert'
  },
  {
    id: 'e7',
    name: 'Platinum Champagne Service',
    description: 'Exclusive Dom Pérignon vintage selection served with personalized crystal flutes and caviar accompaniment. A celebration of life\'s finest moments.',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'exclusive-drinks'
  },
  {
    id: 'e8',
    name: 'Royal Manhattan',
    description: 'Premium aged bourbon, sweet vermouth, and rare bitters aged in oak barrels for 30 days. Garnished with a Luxardo cherry and served in crystal.',
    image: 'https://images.unsplash.com/photo-1581546910019-8b9d51e2c3aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'exclusive-drinks'
  },
  {
    id: 'e9',
    name: 'Truffle Old Fashioned',
    description: 'House-infused truffle bourbon with demerara sugar and aromatic bitters. An indulgent twist on the classic cocktail, finished with truffle shavings.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'exclusive-drinks'
  }
];

export default function Members() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem, getTotalItems } = useCart();

  const handleAddToCart = () => {
    if (!selectedItem) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: selectedItem.id,
        name: selectedItem.name,
        isMembers: true
      });
    }

    setSelectedItem(null);
    setQuantity(1);
  };

  const adjustQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header Navigation - Darker theme */}
      <header className="sticky top-0 z-50 bg-primary/10 backdrop-blur supports-[backdrop-filter]:bg-primary/5 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-2xl text-primary hover:text-primary/80 transition-colors">
            IH • The Treehouse
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-primary/70 font-sans tracking-wide">Members Only</span>
            <nav className="flex gap-6 items-center">
              <Link href="/menu" className="text-foreground hover:text-primary transition-colors">
                Public Menu
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Darker, more intimate */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
          alt="Exclusive dining experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/20 to-primary/10" />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl font-light text-white mb-2">
              Exclusive Menu
            </h1>
            <p className="text-white/80 text-lg font-sans tracking-wide">
              Reserved for our most valued guests
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Exclusive Experiences */}
          <div>
            <h2 className="font-serif text-3xl text-primary mb-2 text-center">Exclusive Experiences</h2>
            <p className="text-center text-muted-foreground text-sm mb-8 italic">
              Limited availability • Reservation required
            </p>
            <div className="space-y-6">
              {exclusiveMenuItems.filter(item => item.category === 'exclusive').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-primary/20 bg-primary/5 rounded-lg p-6 cursor-pointer hover:bg-primary/10 transition-all duration-300 shadow-sm"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-foreground hover:text-primary transition-colors mb-2">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description.split('.')[0]}.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Exclusive Desserts */}
          <div>
            <h2 className="font-serif text-3xl text-primary mb-8 text-center">Signature Desserts</h2>
            <div className="space-y-6">
              {exclusiveMenuItems.filter(item => item.category === 'dessert').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-primary/20 bg-primary/5 rounded-lg p-6 cursor-pointer hover:bg-primary/10 transition-all duration-300 shadow-sm"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-foreground hover:text-primary transition-colors mb-2">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description.split('.')[0]}.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Exclusive Drinks */}
          <div>
            <h2 className="font-serif text-3xl text-primary mb-8 text-center">Premium Libations</h2>
            <div className="space-y-6">
              {exclusiveMenuItems.filter(item => item.category === 'exclusive-drinks').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-primary/20 bg-primary/5 rounded-lg p-6 cursor-pointer hover:bg-primary/10 transition-all duration-300 shadow-sm"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-foreground hover:text-primary transition-colors mb-2">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description.split('.')[0]}.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Member Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-primary/5 border border-primary/20 rounded-lg p-8 mt-16"
          >
            <h3 className="font-serif text-2xl text-primary mb-4">Member Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-2">Priority Reservations</p>
                <p>Book exclusive time slots</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Chef&apos;s Table Access</p>
                <p>Private dining experiences</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Seasonal Previews</p>
                <p>First access to new menu items</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-background border-primary/20">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedItem?.name}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Left Side - Image */}
              <div className="relative">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-sans tracking-wide">
                    MEMBERS ONLY
                  </span>
                </div>
              </div>
              
              {/* Right Side - Details */}
              <div className="p-8 flex flex-col justify-center space-y-6 bg-primary/5">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                    {selectedItem.name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-lg text-foreground">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustQuantity(-1)}
                      disabled={quantity <= 1}
                      className="border-primary/30"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustQuantity(1)}
                      className="border-primary/30"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Add to Order Button */}
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}