module.exports = {
    apps: [
      {
        name: "app-staging",
        script: "./index.js",
        env: {
          NODE_ENV: "staging",
          MONGO_URI: "mongodb://localhost:27017/myapp_staging",
          script: '/var/www/hw_server/index.js',
          PORT: 3001
        },
      },
      {
        name: "app-production",
        script: "./index.js",
        env: {
          NODE_ENV: "production",
          MONGO_URI: "mongodb://localhost:27017/myapp_production",
          script: '/var/www/hw_server/index.js',
          PORT: 3002
        },
      },
    ],
  };
  
