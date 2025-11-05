// Simple test to verify API functionality
import fetch from 'node-fetch';

const BASE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000';

async function testAPI() {
  try {
    console.log(`Testing API at: ${BASE_URL}`);
    
    // Test health endpoint
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();
    
    console.log('✅ API Health Check:', data);
    
    // Test categories endpoint
    const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
    console.log('📂 Categories endpoint status:', categoriesResponse.status);
    
  } catch (error) {
    console.error('❌ API Test failed:', error.message);
  }
}

// Run test if this file is executed directly
if (process.env.NODE_ENV !== 'production') {
  testAPI();
}