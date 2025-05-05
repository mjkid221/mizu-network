#!/bin/bash

# Check if an environment file was provided
if [ -z "$1" ]; then
    echo "Usage: ./upload-env.sh <env-file> [environment]"
    echo "Example: ./upload-env.sh .env.local preview"
    echo "Environments: preview (default), development, production"
    exit 1
fi

# Check if the env file exists
if [ ! -f "$1" ]; then
    echo "Error: File $1 does not exist"
    exit 1
fi

# Set the environment (default to preview if not specified)
ENV="${2:-preview}"

# Validate environment
if [[ "$ENV" != "preview" && "$ENV" != "development" && "$ENV" != "production" ]]; then
    echo "Error: Invalid environment. Must be one of: preview, development, production"
    exit 1
fi

echo "Adding environment variables from $1 to Vercel $ENV environment..."

# Create an array to store background processes
pids=()

# Maximum number of concurrent processes
MAX_CONCURRENT=5
current_running=0

# Read the file and ensure we catch the last line even without newline
while IFS= read -r line || [ -n "$line" ]; do
    # Skip empty lines and comments
    if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
        # Split the line into key and value
        key=$(echo "$line" | cut -d '=' -f1 | xargs)
        value=$(echo "$line" | cut -d '=' -f2- | xargs)
        
        # Skip if key is empty
        if [ -z "$key" ]; then
            continue
        fi
        
        # Wait if we've reached max concurrent processes
        if [ $current_running -ge $MAX_CONCURRENT ]; then
            wait -n  # Wait for any process to finish
            ((current_running--))
        fi
        
        # Add the environment variable to Vercel
        (
            echo "Adding $key..."
            if echo "$value" | vercel env add "$key" "$ENV" &> /dev/null; then
                echo "✓ Added $key"
            else
                echo "✗ Failed to add $key"
            fi
        ) &
        
        # Store the background process PID
        pids+=($!)
        ((current_running++))
    fi
done < "$1"

# Wait for all remaining processes to complete
for pid in "${pids[@]}"; do
    wait $pid
done

echo "Finished adding environment variables!"
