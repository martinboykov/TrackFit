const fs = require('fs');
const writeFile = fs.writeFile;
require('dotenv').config();
// const environment = process.env.NODE_ENV;
// const isProd = environment === 'production';
// const targetPath = `./src/environments/environment${isProd ? '.prod' : ''}.ts`;
const targetPath = `./src/environments/environment.prod.ts`;
const envConfigFile = `export const environment = {
  production: true,
  firebase: {
    apiKey: '${process.env.API_KEY}',
    authDomain: '${process.env.AUTH_DOMAIN}',
    databaseURL: '${process.env.DATABASE_URL}',
    projectId: '${process.env.PROJECT_ID}',
    storageBucket: '${process.env.STORAGE_BUCKET}',
    messagingSenderId: '${process.env.MESSAGING_SENDER_ID}',
    appId: '${process.env.APP_ID}',
    measurementId: '${process.env.MEASUREMENT_ID}',
  }
};
`;
writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Output generated at ${targetPath}`);
});
