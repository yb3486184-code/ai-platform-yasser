#!/bin/bash
cd /home/ubuntu/ai_platform_yasser
echo "🚀 بدء خادم OpenAI..."
node server-advanced.js &
sleep 3
echo "🎨 بدء تطبيق Vite..."
npm run dev
