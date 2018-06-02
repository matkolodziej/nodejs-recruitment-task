var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost/nodejs-recruitment";
} else if (env === "test") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost/nodejs-recruitment-test";
} else if (env === "production") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI =
    "mongodb://heroku_gsx6pcdh:5mcipmu29nev70q73b5n7n4s25@ds253879.mlab.com:53879/heroku_gsx6pcdh";
}
