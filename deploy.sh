#!/bin/bash
#
# CodeBridge Landing Page Deployment Script
#
# This script builds the Next.js landing page and deploys it to GitHub Pages
# while preserving all Education Playground Jupyter Book content.
#

set -e  # Exit on error

echo "🚀 CodeBridge Landing Page Deployment"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Must run from codebridge-landing directory${NC}"
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
npm install

echo ""
echo "🔨 Step 2: Building Next.js static export..."
npm run build

echo ""
echo "✅ Build complete! Output in ./out/"
echo ""
echo "📊 Build statistics:"
du -sh out/
echo ""

echo "📁 Step 3: Copying to Education_Playground..."
cd ..
cp -r codebridge-landing/out/* _build/html/

echo ""
echo "✅ Landing page copied to _build/html/"
echo ""

echo "🌐 Step 4: Deploying to GitHub Pages..."
ghp-import -n -p -f _build/html

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "🎉 Your landing page is live at:"
echo "   https://mykolas-perevicius.github.io/Education_Playground/"
echo ""
echo "📊 Next steps:"
echo "   1. Visit the site and test all functionality"
echo "   2. Set up PostHog analytics (see ANALYTICS_SETUP.md)"
echo "   3. Monitor A/B test results"
echo "   4. Optimize based on conversion data"
echo ""
echo -e "${YELLOW}⏱️  Note: GitHub Pages can take 1-2 minutes to update${NC}"
