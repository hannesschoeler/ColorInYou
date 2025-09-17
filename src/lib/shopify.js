import { supabase } from '@/lib/supabaseClient';

const initializeShopifyClient = async () => {
  console.warn("Shopify client initialization is currently disabled.");
  return null;
};

export const getShopifyClient = () => {
  return initializeShopifyClient();
};

const handleShopifyErrors = (response, queryName = 'GraphQL Query') => {
  // No-op
};

export const getProducts = async () => {
  console.warn("Shopify getProducts is currently disabled.");
  return [];
};

export const getProductByHandle = async (handle) => {
  console.warn("Shopify getProductByHandle is currently disabled.");
  return null;
};

export const createCart = async () => {
  console.warn("Shopify createCart is currently disabled.");
  // Return a mock cart structure to avoid breaking the cart context
  return { id: 'mock-cart-id', checkoutUrl: '#', lines: { edges: [] } };
};

export const addLinesToCart = async (cartId, lines) => {
  console.warn("Shopify addLinesToCart is currently disabled.");
  return { id: cartId, checkoutUrl: '#', lines: { edges: [] } };
};

export const getCart = async (cartId) => {
  console.warn("Shopify getCart is currently disabled.");
  if (cartId === 'mock-cart-id') {
    return { id: 'mock-cart-id', checkoutUrl: '#', lines: { edges: [] }, cost: { totalAmount: { amount: '0.0', currencyCode: 'EUR' } } };
  }
  return null;
};

export const removeLinesFromCart = async (cartId, lineIds) => {
  console.warn("Shopify removeLinesFromCart is currently disabled.");
  return { id: cartId, checkoutUrl: '#', lines: { edges: [] } };
};