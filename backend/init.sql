CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE manufacturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    manufacturer_id UUID,
    name VARCHAR(255) NOT NULL,
    is_standard_number VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id),
    batch_number VARCHAR(100) UNIQUE NOT NULL,
    manufacturing_date TIMESTAMPTZ DEFAULT NOW(),
    expiry_date TIMESTAMPTZ,
    unit_count INT NOT NULL,
    merkle_root TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES batches(id),
    serial_number VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL,
    scan_count INT DEFAULT 0,
    trust_score INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    previous_hash TEXT NOT NULL,
    payload_hash TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    signature TEXT,
    entry_hash TEXT NOT NULL
);

-- Insert dummy admin user: password is 'admin123'
INSERT INTO users (id, email, password_hash, role) 
VALUES (uuid_generate_v4(), 'admin@bisnidaan.gov.in', '$argon2id$v=19$m=19456,t=2,p=1$eIe44HMMk1V3zY2qGqK74g$7lX+p6oO/4u98t657vD9T586fT66n9n5Q6c2H9Z09p4', 'admin') ON CONFLICT DO NOTHING;
