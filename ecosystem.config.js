module.exports = {
    apps: [
      {
        name: "app-staging",
        script: "./server.js",
        env: {
          NODE_ENV: "staging",
          MONGO_URI: "mongodb://localhost:27017/myapp_staging"
        },
      },
      {
        name: "app-production",
        script: "./server.js",
        env: {
          NODE_ENV: "production",
          MONGO_URI: "mongodb://localhost:27017/myapp_production"
        },
      },
    ],
  };
  