'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmitOrder = async () => {
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          totalItems: getTotalItems(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsConfirmed(true);
        clearCart();
        setTimeout(() => {
          setIsConfirmed(false);
          onClose();
        }, 3000);
      } else {
        throw new Error('Failed to submit order');
      }
    } catch {
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4"
            >
              <ShoppingCart className="h-8 w-8 text-primary-foreground" />
            </motion.div>
            <h2 className="font-serif text-2xl text-primary mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground">
              We&apos;re getting on it! Your order has been received and we&apos;ll have it ready shortly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center flex items-center justify-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Your Order ({getTotalItems()})
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground"
              >
                Your cart is empty
              </motion.div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {item.isMembers && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full mr-2">
                          MEMBERS
                        </span>
                      )}
                      {item.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4">
            <Button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="w-full text-lg py-6"
            >
              {isSubmitting ? 'Submitting Order...' : 'Place Order'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}