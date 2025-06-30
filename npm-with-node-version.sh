#!/bin/bash
# Auto-switch to the Node.js version specified in .nvmrc

if [ -f ".nvmrc" ]; then
    if command -v nvm &> /dev/null; then
        echo "Switching to Node.js version specified in .nvmrc..."
        nvm use
    else
        echo "Warning: nvm not found. Please install nvm or manually switch to Node.js $(cat .nvmrc)"
    fi
else
    echo "No .nvmrc file found"
fi

echo "Current Node.js version: $(node --version)"
npm "$@"
