import Sdk from 'jm-sdk';
import MS from 'jm-ms/dist/browser';
import config from '../config';

const ms = new MS();
const sdk = new Sdk(config);
const router = ms.router();
ms.client({ uri: config.api }).then(doc => {
  router.use(doc);
  this.router = router;
});

const { logger } = sdk;
logger.level = config.logLevel || 'info';
logger.info('config', config);
sdk.login = async () => {
  const doc = await this.passport.login('root', '123');
  return doc;
};

export default sdk;
