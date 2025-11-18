#!/bin/bash
cd /home/kavia/workspace/code-generation/purpletech-laptop-store-homepage-263161-263173/homepage_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

