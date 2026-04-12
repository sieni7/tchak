-- TCHAK Cloud Distribution - Supabase Schema

-- Activer l'extension pour les UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Nettoyage pour le bootstrap (ATTENTION : supprime les données existantes)
DROP TABLE IF EXISTS installations;
DROP TABLE IF EXISTS artists;

-- Table des artistes enregistrés
CREATE TABLE artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    art_style TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des installations / téléchargements
CREATE TABLE installations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
    installation_code TEXT UNIQUE NOT NULL, -- Format TCHAK-ART-YYYY-XXXX
    seed TEXT NOT NULL, -- La seed unique générée pour la chaîne SHA256 locale
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pour la recherche rapide
CREATE INDEX idx_artists_email ON artists(email);
CREATE INDEX idx_installations_code ON installations(installation_code);
