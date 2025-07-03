#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { main: generatePages } = require('./generate-pages.js');

const CONTENT_DIR = path.join(__dirname, '../public/content');

console.log('👀 Watching for new markdown files in content directory...');
console.log(`📁 Monitoring: ${CONTENT_DIR}`);
console.log('Press Ctrl+C to stop watching\n');

// Initial scan
console.log('🔄 Running initial scan...');
generatePages();
console.log('\n✨ Now watching for changes...\n');

// Watch for file changes
let debounceTimer = null;

fs.watch(CONTENT_DIR, (eventType, filename) => {
  if (filename && filename.endsWith('.md')) {
    console.log(`📝 Detected ${eventType} for: ${filename}`);
    
    // Debounce the file changes to avoid multiple rapid executions
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log('🔄 Regenerating pages...\n');
      generatePages();
      console.log('\n✨ Watching for more changes...\n');
    }, 500);
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping file watcher...');
  process.exit(0);
});
