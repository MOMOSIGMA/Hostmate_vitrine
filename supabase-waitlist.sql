-- Création de la table waitlist
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pseudo TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  property_count TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'en_attente'
);

-- Activation de la sécurité (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique depuis la page de capture
CREATE POLICY "Permettre l'insertion publique"
ON waitlist FOR INSERT
WITH CHECK (true);

-- Politique pour que l'admin seul puisse lire la liste
CREATE POLICY "Lecture réservée à l'admin"
ON waitlist FOR SELECT
USING (auth.role() = 'service_role');
