<template>
    <div class="dashboard">
      <h2 class="text-3xl font-bold mb-6">Blog Overview</h2>
      
      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Total Articles</h3>
          <p class="text-2xl">900</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Total Comments</h3>
          <p class="text-2xl">450</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Total Views</h3>
          <p class="text-2xl">15,000</p>
        </div>
      </div>
  
      <!-- Recent Comments -->
      <div class="bg-white p-4 rounded shadow mb-8">
        <h3 class="font-bold mb-4">Recent Comments</h3>
        <ul>
          <li class="mb-2 pb-2 border-b">
            <strong>John Smith:</strong> Great article! Very informative...
          </li>
          <li class="mb-2 pb-2 border-b">
            <strong>Jane Doe:</strong> Thanks for sharing this info...
          </li>
          <li class="mb-2">
            <strong>Alice Johnson:</strong> Looking forward to more articles like this!
          </li>
        </ul>
      </div>
  
      <!-- Manage Articles -->
      <div>
        <h3 class="font-bold mb-4">Manage Articles</h3>
        <div class="flex space-x-4">
          <button class="bg-blue-500 text-white px-4 py-2 rounded">New Article</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded">Edit Article</button>
          <button class="bg-red-500 text-white px-4 py-2 rounded">Delete Article</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'panel',
    auth: true
  }
  </script>
  