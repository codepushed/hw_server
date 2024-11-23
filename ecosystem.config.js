module.exports = {
  apps: [
    {
      name: "app-staging",
      script: "./server.js",
      env: {
        NODE_ENV: "staging",
        MONGO_URI: "mongodb://localhost:27017/myapp_staging",
        COOKIE_TIME: "3",
        JWT_SECRET: "thisismyjwttoken",
        JWT_EXPIRY: "3d",
        SMTP_PORT: "465",
        SMTP_USER: "homeworkindservices@gmail.com",
        SMTP_PASS: "vziv edjx hqbz qwzd",
      },
    },
    {
      name: "app-production",
      script: "./server.js",
      env: {
        NODE_ENV: "production",
        MONGO_URI: "mongodb://localhost:27017/myapp_production",
        COOKIE_TIME: "3",
        JWT_SECRET: "thisismyjwttoken",
        JWT_EXPIRY: "3d",
        SMTP_PORT: "465",
        SMTP_USER: "homeworkindservices@gmail.com",
        SMTP_PASS: "vziv edjx hqbz qwzd",
      },
    },
  ],
};
