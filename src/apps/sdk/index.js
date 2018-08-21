import Sdk from 'jm-sdk';
import config from '../config';

const sdk = new Sdk(config);
const { logger } = sdk;
logger.level = config.log_level || 'info';
logger.info('config', config);
sdk.login = async () => {
  const doc = await this.passport.login('root', '123');
  return doc;
};

sdk.use(test, {});

export default sdk;
