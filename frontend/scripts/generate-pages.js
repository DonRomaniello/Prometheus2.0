#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const CONTENT_DIR = path.join(__dirname, '../public/content');
const PAGES_DIR = path.join(__dirname, '../src/pages');
const APP_JS_PATH = path.join(__dirname, '../src/App.js');
const NAVIGATION_JS_PATH = path.join(__dirname, '../src/components/Navigation.js');

// Helper function to convert filename to component name
function toComponentName(filename) {
  const baseName = path.basename(filename, '.md');
  return baseName.charAt(0).toUpperCase() + baseName.slice(1);
}

// Helper function to convert filename to route path
function toRoutePath(filename) {
  const baseName = path.basename(filename, '.md');
  return baseName === 'home' ? '/' : `/${baseName}`;
}

// Helper function to capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get all markdown files in content directory
function getMarkdownFiles() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }
  
  return fs.readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.basename(file, '.md'));
}

// Create page component if it doesn't exist
function createPageComponent(contentFile) {
  const componentName = toComponentName(contentFile);
  const componentPath = path.join(PAGES_DIR, `${componentName}.js`);
  
  if (fs.existsSync(componentPath)) {
    console.log(`✓ Page component ${componentName}.js already exists`);
    return false;
  }
  
  const componentContent = `import React from 'react';
import ContentRenderer from '../components/ContentRenderer';

const ${componentName} = () => {
  return <ContentRenderer contentFile="${contentFile}" />;
};

export default ${componentName};
`;

  // Ensure pages directory exists
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }
  
  fs.writeFileSync(componentPath, componentContent);
  console.log(`✓ Created page component: ${componentName}.js`);
  return true;
}

// Update App.js with new routes
function updateAppRoutes(contentFiles) {
  if (!fs.existsSync(APP_JS_PATH)) {
    console.error(`App.js not found: ${APP_JS_PATH}`);
    return false;
  }
  
  let appContent = fs.readFileSync(APP_JS_PATH, 'utf8');
  
  // Generate imports
  const imports = contentFiles.map(file => {
    const componentName = toComponentName(file);
    return `import ${componentName} from './pages/${componentName}';`;
  }).join('\n');
  
  // Generate routes
  const routes = contentFiles.map(file => {
    const componentName = toComponentName(file);
    const routePath = toRoutePath(file);
    return `            <Route path="${routePath}" element={<${componentName} />} />`;
  }).join('\n');
  
  // Update imports section
  const importRegex = /(import.*from.*['"]\.\/pages\/.*['"];?\n)+/g;
  const routerImportIndex = appContent.indexOf("import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';");
  
  if (routerImportIndex === -1) {
    console.error('Could not find React Router imports in App.js');
    return false;
  }
  
  // Remove existing page imports
  appContent = appContent.replace(importRegex, '');
  
  // Add new imports after the router import
  const routerImportEnd = appContent.indexOf('\n', routerImportIndex) + 1;
  appContent = appContent.slice(0, routerImportEnd) + imports + '\n' + appContent.slice(routerImportEnd);
  
  // Update routes section
  const routesRegex = /(<Routes>\s*\n)(.*?)(\s*<\/Routes>)/s;
  const newRoutesSection = `$1${routes}\n$3`;
  appContent = appContent.replace(routesRegex, newRoutesSection);
  
  fs.writeFileSync(APP_JS_PATH, appContent);
  console.log('✓ Updated App.js with new routes');
  return true;
}

// Update Navigation.js with new links
function updateNavigation(contentFiles) {
  if (!fs.existsSync(NAVIGATION_JS_PATH)) {
    console.error(`Navigation.js not found: ${NAVIGATION_JS_PATH}`);
    return false;
  }
  
  let navContent = fs.readFileSync(NAVIGATION_JS_PATH, 'utf8');
  
  // Generate navigation items
  const navItems = contentFiles.map(file => {
    const routePath = toRoutePath(file);
    const label = file === 'home' ? 'Home' : capitalize(file);
    return `        <li><Link to="${routePath}">${label}</Link></li>`;
  }).join('\n');
  
  // Update navigation links
  const ulRegex = /(<ul>\s*\n)(.*?)(\s*<\/ul>)/s;
  const newNavSection = `$1${navItems}\n$3`;
  navContent = navContent.replace(ulRegex, newNavSection);
  
  fs.writeFileSync(NAVIGATION_JS_PATH, navContent);
  console.log('✓ Updated Navigation.js with new links');
  return true;
}

// Main function
function main() {
  console.log('🔍 Scanning for markdown files...');
  
  const contentFiles = getMarkdownFiles();
  
  if (contentFiles.length === 0) {
    console.log('No markdown files found in content directory');
    return;
  }
  
  console.log(`Found ${contentFiles.length} markdown files: ${contentFiles.join(', ')}`);
  console.log('');
  
  // Create page components
  console.log('📄 Creating page components...');
  let componentsCreated = 0;
  contentFiles.forEach(file => {
    if (createPageComponent(file)) {
      componentsCreated++;
    }
  });
  
  console.log('');
  
  // Update App.js routes
  console.log('🔗 Updating routes...');
  updateAppRoutes(contentFiles);
  console.log('');
  
  // Update Navigation
  console.log('🧭 Updating navigation...');
  updateNavigation(contentFiles);
  console.log('');
  
  if (componentsCreated > 0) {
    console.log(`✅ Successfully integrated ${componentsCreated} new page(s)!`);
    console.log('');
    console.log('📋 Summary of created/updated files:');
    contentFiles.forEach(file => {
      const componentName = toComponentName(file);
      const routePath = toRoutePath(file);
      console.log(`   • ${file}.md → ${componentName}.js (route: ${routePath})`);
    });
  } else {
    console.log('✅ All pages are already up to date!');
  }
  
  console.log('');
  console.log('🚀 Ready to start your development server!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, getMarkdownFiles, createPageComponent, updateAppRoutes, updateNavigation };
