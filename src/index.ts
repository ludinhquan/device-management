import 'module-alias/register';

import fs from 'fs'
import {ApplicationConfig, DeviceManagementApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new DeviceManagementApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? 'localhost',
      gracePeriodForClose: 5000,
      openApiSpec: {
        setServersFromRequest: true,
      },
      protocol: 'https',
      key: fs.readFileSync('/home/quan/key.pem').toString(),
      cert: fs.readFileSync('/home/quan/cert.pem').toString(),
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
