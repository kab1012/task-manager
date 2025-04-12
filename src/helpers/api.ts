type Environment = 'PROD' | 'STAGING';

const ENV: Environment = 'STAGING'; // FOR IMPLEMENTATION

function getBackendDomain(env: Environment): string {
  switch (env) {
    case 'PROD':
      return 'https://be-production-4f15.up.railway.app';
    case 'STAGING':
      return 'http://localhost:3000';
    default:
      throw new Error(`Unhandled environment: ${env}`);
  }
}

const backend_domain = getBackendDomain(ENV);

export default backend_domain;