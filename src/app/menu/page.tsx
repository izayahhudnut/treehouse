'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Roasted Beet & Goat Cheese Salad',
    description: 'Locally sourced golden and ruby beets, whipped goat cheese, candied walnuts, microgreens, and aged balsamic reduction. A perfect harmony of earth and elegance.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'starters'
  },
  {
    id: '2',
    name: 'Pan-Seared Halibut',
    description: 'Fresh Pacific halibut with citrus quinoa, roasted fennel, and saffron butter sauce. Sustainably caught and prepared with Mediterranean influences.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'mains'
  },
  {
    id: '3',
    name: 'Heritage Pork Tenderloin',
    description: 'Herb-crusted pork tenderloin with rosemary-infused fingerling potatoes, seasonal vegetables, and apple-sage jus. Sourced from local heritage farms.',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'mains'
  },
  {
    id: '4',
    name: 'Wild Mushroom Risotto',
    description: 'Creamy Arborio rice with foraged wild mushrooms, truffle oil, aged Parmesan, and fresh herbs. A vegetarian celebration of forest flavors.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'mains'
  },
  {
    id: '5',
    name: 'Burrata & Heirloom Tomatoes',
    description: 'Fresh burrata cheese with colorful heirloom tomatoes, basil oil, sea salt flakes, and toasted sourdough. Simple ingredients, extraordinary execution.',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'starters'
  },
  {
    id: '6',
    name: 'Lavender Honey Cheesecake',
    description: 'House-made cheesecake infused with local lavender honey, graham cracker crust, and fresh berry compote. A delicate finish to your dining experience.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'desserts'
  },
  {
    id: '7',
    name: 'Amaretto Sour',
    description: 'Classic cocktail with amaretto liqueur, fresh lemon juice, simple syrup, and a whisper of egg white foam. Garnished with a cherry and orange twist.',
    image: '/amaretto sour.jpg',
    category: 'cocktails'
  },
  {
    id: '8',
    name: 'Appletini',
    description: 'Crisp and refreshing vodka-based cocktail with sour apple schnapps and fresh lime juice. Served in a chilled martini glass with a thin apple slice.',
    image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'cocktails'
  },
  {
    id: '9',
    name: 'Espresso Martini',
    description: 'Rich and sophisticated blend of premium vodka, fresh espresso, coffee liqueur, and simple syrup. Topped with three coffee beans for good fortune.',
    image: '/espressomartini.jpg',
    category: 'cocktails'
  },
  {
    id: '10',
    name: 'Pinot Noir Selection',
    description: 'Curated selection of premium Pinot Noir wines from renowned vineyards. Rich, earthy notes with hints of cherry and spice. Perfect pairing for our cuisine.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'wine'
  },
  {
    id: '11',
    name: 'Chardonnay Reserve',
    description: 'Elegant white wine with notes of vanilla, oak, and tropical fruits. Perfectly balanced acidity with a smooth, lingering finish.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    category: 'wine'
  }
];

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [membersCode, setMembersCode] = useState('');
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem, getTotalItems } = useCart();

  const handleMembersAccess = () => {
    if (membersCode === '2301') {
      window.location.href = '/members';
    } else {
      alert('Invalid access code');
      setMembersCode('');
    }
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: selectedItem.id,
        name: selectedItem.name,
        isMembers: false
      });
    }

    setSelectedItem(null);
    setQuantity(1);
  };

  const adjustQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-2xl text-primary hover:text-primary/80 transition-colors">
            IH • The Treehouse
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/menu" className="text-primary font-medium">
              Menu
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
      </header>

      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/menuimage.jpg"
          alt="Elegant table setting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl font-light text-white mb-4"
          >
            Our Menu
          </motion.h1>
        </div>
      </section>

      {/* Menu Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Category: Starters */}
          <div>
            <h2 className="font-serif text-3xl text-primary mb-8 text-center">Starters</h2>
            <div className="space-y-4">
              {menuItems.filter(item => item.category === 'starters').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-b border-border pb-4 cursor-pointer hover:bg-muted/20 transition-colors p-4 rounded-lg"
                  onClick={() => setSelectedItem(item)}
                >
                  <h3 className="font-serif text-xl text-foreground hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category: Mains */}
          <div>
            <h2 className="font-serif text-3xl text-primary mb-8 text-center">Main Courses</h2>
            <div className="space-y-4">
              {menuItems.filter(item => item.category === 'mains').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-b border-border pb-4 cursor-pointer hover:bg-muted/20 transition-colors p-4 rounded-lg"
                  onClick={() => setSelectedItem(item)}
                >
                  <h3 className="font-serif text-xl text-foreground hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category: Desserts */}
          <div>
            <h2 className="font-serif text-3xl text-primary mb-8 text-center">Desserts</h2>
            <div className="space-y-4">
              {menuItems.filter(item => item.category === 'desserts').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-b border-border pb-4 cursor-pointer hover:bg-muted/20 transition-colors p-4 rounded-lg"
                  onClick={() => setSelectedItem(item)}
                >
                  <h3 className="font-serif text-xl text-foreground hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category: Cocktails */}
          <div>
            <h2 className="font-serif text-3xl text-primary mb-8 text-center">Signature Cocktails</h2>
            <div className="space-y-4">
              {menuItems.filter(item => item.category === 'cocktails').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-b border-border pb-4 cursor-pointer hover:bg-muted/20 transition-colors p-4 rounded-lg"
                  onClick={() => setSelectedItem(item)}
                >
                  <h3 className="font-serif text-xl text-foreground hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category: Wine */}
          <div>
            <h2 className="font-serif text-3xl text-primary mb-8 text-center">Wine Selection</h2>
            <div className="space-y-4">
              {menuItems.filter(item => item.category === 'wine').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-b border-border pb-4 cursor-pointer hover:bg-muted/20 transition-colors p-4 rounded-lg"
                  onClick={() => setSelectedItem(item)}
                >
                  <h3 className="font-serif text-xl text-foreground hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-background">
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
              </div>
              
              {/* Right Side - Details */}
              <div className="p-8 flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                    {selectedItem.name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 flex-wrap">
                  <span className="text-lg text-foreground">Quantity:</span>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustQuantity(-1)}
                      disabled={quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-medium flex-shrink-0">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustQuantity(1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Add to Order Button */}
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  className="w-full text-lg py-6"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer with Members Only Link */}
      <div className="fixed bottom-4 right-4 z-20">
        <Dialog open={isMembersDialogOpen} onOpenChange={setIsMembersDialogOpen}>
          <DialogTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground text-sm font-sans tracking-wide transition-colors">
              Members Only
            </button>
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

        {/* Cart Component */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
}