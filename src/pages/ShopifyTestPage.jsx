import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabaseClient';
import { getShopifyClient, getProducts } from '@/lib/shopify';
import { Loader2, CheckCircle, XCircle, Server, KeyRound, ShoppingCart, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  DISABLED: 'disabled',
};

const StatusIndicator = ({ status }) => {
  switch (status) {
    case STATUS.LOADING:
      return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    case STATUS.SUCCESS:
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case STATUS.ERROR:
      return <XCircle className="h-5 w-5 text-red-500" />;
    case STATUS.DISABLED:
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    default:
      return null;
  }
};

const ShopifyTestPage = () => {
  const [secretsStatus, setSecretsStatus] = useState(STATUS.IDLE);
  const [secretsError, setSecretsError] = useState(null);
  const [secretsData, setSecretsData] = useState(null);

  const [clientStatus, setClientStatus] = useState(STATUS.IDLE);
  const [clientError, setClientError] = useState(null);

  const [productsStatus, setProductsStatus] = useState(STATUS.IDLE);
  const [productsError, setProductsError] = useState(null);
  const [productsData, setProductsData] = useState(null);

  const runTests = async () => {
    // Reset states
    setSecretsStatus(STATUS.IDLE);
    setSecretsError(null);
    setSecretsData(null);
    setClientStatus(STATUS.IDLE);
    setClientError(null);
    setProductsStatus(STATUS.IDLE);
    setProductsError(null);
    setProductsData(null);

    // Step 1: Fetch Secrets
    setSecretsStatus(STATUS.LOADING);
    try {
      const { data, error } = await supabase.functions.invoke('get-shopify-secrets');
      if (error) throw error;
      if (!data) throw new Error("No data returned from Supabase function.");
      setSecretsData(data);
      setSecretsStatus(STATUS.SUCCESS);

      // Step 2: Initialize Client
      setClientStatus(STATUS.LOADING);
      try {
        const client = await getShopifyClient();
        if (client === null) {
          setClientStatus(STATUS.DISABLED);
          setProductsStatus(STATUS.DISABLED);
          return;
        }
        setClientStatus(STATUS.SUCCESS);

        // Step 3: Fetch Products
        setProductsStatus(STATUS.LOADING);
        try {
          const products = await getProducts();
          if (products.length === 0) {
            setProductsStatus(STATUS.DISABLED);
            return;
          }
          setProductsData(products);
          setProductsStatus(STATUS.SUCCESS);
        } catch (productError) {
          setProductsError(productError);
          setProductsStatus(STATUS.ERROR);
        }
      } catch (clientError) {
        setClientError(clientError);
        setClientStatus(STATUS.ERROR);
        setProductsStatus(STATUS.IDLE); // Skip product fetching
      }
    } catch (secretsErr) {
      setSecretsError(secretsErr);
      setSecretsStatus(STATUS.ERROR);
      setClientStatus(STATUS.IDLE); // Skip client initialization
      setProductsStatus(STATUS.IDLE); // Skip product fetching
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  const renderError = (error) => {
    if (!error) return null;
    return (
      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
        <p className="font-bold text-red-700">{error.name}: {error.message}</p>
        <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap break-all bg-red-50">
          {error.stack || JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Shopify Integration Test - ColorInYou</title>
        <meta name="description" content="Diagnoseseite für die Shopify-Integration." />
      </Helmet>
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="font-playful text-3xl md:text-4xl font-bold mb-2 gradient-text">
            Shopify Integration Test
          </h1>
          <p className="text-gray-600">Diese Seite überprüft die Verbindung zu Shopify Schritt für Schritt.</p>
          <Button onClick={runTests} className="mt-4">Tests erneut ausführen</Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Server className="h-6 w-6 text-gray-500" />
                <CardTitle>Schritt 1: Shopify Secrets von Supabase abrufen</CardTitle>
              </div>
              <StatusIndicator status={secretsStatus} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Versucht, die Shopify-Zugangsdaten (Store Domain, API Token) sicher von den Supabase Secrets abzurufen.
              </p>
              {secretsStatus === STATUS.SUCCESS && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="font-bold text-green-700">Erfolg!</p>
                  <p className="text-sm text-green-600">Secrets erfolgreich geladen. Die Keys `SHOPIFY_STORE_DOMAIN` und `SHOPIFY_STOREFRONT_API_TOKEN` sind vorhanden (Werte werden aus Sicherheitsgründen nicht angezeigt).</p>
                </div>
              )}
              {renderError(secretsError)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <KeyRound className="h-6 w-6 text-gray-500" />
                <CardTitle>Schritt 2: Shopify Client initialisieren</CardTitle>
              </div>
              <StatusIndicator status={clientStatus} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Versucht, den Shopify Storefront API Client mit den abgerufenen Zugangsdaten zu erstellen.
              </p>
              {clientStatus === STATUS.SUCCESS && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="font-bold text-green-700">Erfolg!</p>
                  <p className="text-sm text-green-600">Der Shopify Client wurde erfolgreich initialisiert und ist bereit für Anfragen.</p>
                </div>
              )}
              {clientStatus === STATUS.DISABLED && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="font-bold text-yellow-700">Deaktiviert</p>
                  <p className="text-sm text-yellow-600">Die Initialisierung des Shopify-Clients ist derzeit absichtlich deaktiviert.</p>
                </div>
              )}
              {renderError(clientError)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-gray-500" />
                <CardTitle>Schritt 3: Produkte von Shopify abrufen</CardTitle>
              </div>
              <StatusIndicator status={productsStatus} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Versucht, eine Liste der verfügbaren Produkte über die Shopify Storefront API abzurufen.
              </p>
              {productsStatus === STATUS.SUCCESS && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="font-bold text-green-700">Erfolg!</p>
                  <p className="text-sm text-green-600">{productsData?.length || 0} Produkte erfolgreich geladen.</p>
                  {productsData && productsData.length > 0 && (
                    <pre className="mt-2 text-xs text-green-800 bg-green-100 p-2 rounded max-h-60 overflow-auto">
                      {JSON.stringify(productsData.map(p => ({ id: p.id, title: p.title })), null, 2)}
                    </pre>
                  )}
                </div>
              )}
              {productsStatus === STATUS.DISABLED && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="font-bold text-yellow-700">Deaktiviert</p>
                  <p className="text-sm text-yellow-600">Das Abrufen von Shopify-Produkten ist derzeit absichtlich deaktiviert.</p>
                </div>
              )}
              {renderError(productsError)}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ShopifyTestPage;