import { merge } from 'lodash';

const env = process.env.NODE_ENV || 'develop';

/**
 * @type{import("configs/config/develop")}
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require('./' + env);
const defaultConfig = {
  env: env,
};

export default merge(defaultConfig, envConfig.default);
