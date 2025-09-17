import { supabase } from '@/lib/supabaseClient';

const GELATO_API_URL = 'https://api.gelato.com/v2';

let gelatoApiKey = null;

async function getGelatoApiKey() {
  if (gelatoApiKey) {
    return gelatoApiKey;
  }

  // We will create this Edge function later to securely fetch the API key
  const { data, error } = await supabase.functions.invoke('get-gelato-key');
  
  if (error) {
    console.error("Error fetching Gelato API key:", error);
    throw new Error("Could not load Gelato configuration.");
  }
  
  gelatoApiKey = data.GELATO_API_KEY;
  return gelatoApiKey;
}

// Example function to get product catalog from Gelato
export const getGelatoProducts = async () => {
    const key = await getGelatoApiKey();
    if (!key) {
        console.warn("Gelato API key is missing. Cannot fetch products.");
        return [];
    }

    try {
        const response = await fetch(`${GELATO_API_URL}/products`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': key,
            },
        });

        if (!response.ok) {
            throw new Error(`Gelato API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return data.products;
    } catch(error) {
        console.error("Failed to fetch Gelato products:", error);
        return [];
    }
};

// Placeholder for creating an order with Gelato
export const createGelatoOrder = async (orderData) => {
    const key = await getGelatoApiKey();
     if (!key) {
        console.error("Gelato API key is missing. Cannot create order.");
        return null;
    }

    console.log("Creating Gelato order with data:", orderData);
    // In a real implementation, we would post to the Gelato orders endpoint
    // e.g., POST `${GELATO_API_URL}/orders`
    
    // Returning a mock order response for now
    return {
        success: true,
        orderId: `mock-order-${Date.now()}`,
        message: "Order created successfully (mock).",
    };
};