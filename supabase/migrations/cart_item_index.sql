-- Migration: Warenkorb-Unterstützung
-- Ermöglicht mehrere Orders pro Stripe-Session (ein Produkt = eine Order)

-- 1. Neues Feld cart_item_index hinzufügen (0-basiert, Default 0 für bestehende Einträge)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS cart_item_index integer DEFAULT 0;

-- 2. Alten UNIQUE Constraint auf stripe_session_id entfernen
-- (Name kann variieren – hier die gängigen Varianten)
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_stripe_session_id_key;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_stripe_session_id_unique;

-- 3. Neuen Composite UNIQUE Constraint erstellen
ALTER TABLE orders ADD CONSTRAINT orders_session_item_unique UNIQUE (stripe_session_id, cart_item_index);
