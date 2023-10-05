import * as process from 'process';

export type JwtEnvironment = {
  secret: string;
  expirationTime: number;
};

export const authConfiguration = () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'mysecret',
    expirationTime: process.env.JWT_EXPIRATION_TIME || 1,
  },
});
