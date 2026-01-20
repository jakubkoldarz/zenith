#!/bin/bash
set -e

echo "Waiting for database to be ready..."

# Simple wait for PostgreSQL to be ready
sleep 5

# Run migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Migrations completed successfully!"

# Start the application
echo "Starting NestJS application..."
exec "$@"
