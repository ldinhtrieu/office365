export default interface enviromentConfig {
  /**
   * Domain of Express
   */
  domain: string;

  /**
   * JWT Secret key
   */
  secret: string;

  /**
   * Express host name
   */
  hostname: string;

  /**
   * Express port
   */
  port: number;
}
