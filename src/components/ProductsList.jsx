// src/api/EcommerceApi.js
import { createStorefrontClient } from '@shopify/storefront-api-client';

const client = createStorefrontClient({
  storeDomain: 'uxxvpy-70.myshopify.com', // <--- ersetzen
  apiVersion: '2025-07',                        // aktuelle Version
  publicAccessToken: '724489a2ab885f5f0a91e20645061d06',           // <--- ersetzen
});

// Produkte abrufen
export async function getProducts() {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            featuredImage {
              url
              altText
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  inventoryQuantity
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await client.request(query);
    // Mappe Shopify Response zu einfacherem Format
    return {
      products: response.products.edges.map(edge => ({
        id: edge.node.id,
        title: edge.node.title,
        subtitle: edge.node.description,
        image: edge.node.featuredImage?.url || null,
        variants: edge.node.variants.edges.map(v => ({
          id: v.node.id,
          title: v.node.title,
          price_in_cents: Math.round(v.node.priceV2.amount * 100),
          price_in_cents_formatted: `${v.node.priceV2.amount} ${v.node.priceV2.currencyCode}`,
          sale_price_in_cents: v.node.compareAtPriceV2 ? Math.round(v.node.compareAtPriceV2.amount * 100) : null,
          sale_price_in_cents_formatted: v.node.compareAtPriceV2 ? `${v.node.compareAtPriceV2.amount} ${v.node.compareAtPriceV2.currencyCode}` : null,
          inventory_quantity: v.node.inventoryQuantity,
        }))
      }))
    };
  } catch (err) {
    console.error('Error fetching products:', err);
    return { products: [] };
  }
}

// Inventar-Mengen abrufen (optional)
export async function getProductQuantities({ product_ids }) {
  const query = `
    query getInventory($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          variants(first: 10) {
            edges {
              node {
                id
                inventoryQuantity
              }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await client.request(query, { ids: product_ids });
    const variants = [];
    response.nodes.forEach(node => {
      if (!node || !node.variants) return;
      node.variants.edges.forEach(v => {
        variants.push({
          id: v.node.id,
          inventory_quantity: v.node.inventoryQuantity
        });
      });
    });
    return { variants };
  } catch (err) {
    console.error('Error fetching quantities:', err);
    return { variants: [] };
  }
}