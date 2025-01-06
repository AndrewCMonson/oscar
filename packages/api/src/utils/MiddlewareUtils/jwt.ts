import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: `${process.env.AUTH0_JWKS_URI}`,
});

const getKey = (
  header: jwt.JwtHeader,
  callback: (err: Error | null, signingKey?: string) => void,
) => {
  client.getSigningKey(header.kid as string, (err, key) => {
    if (err || !key) {
      callback(err || new Error("Signing key not found"));
      return;
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

export const verifyToken = async (
  token: string,
): Promise<JwtPayload | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: `${process.env.AUTH0_AUDIENCE}`,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded as JwtPayload);
      },
    );
  });
};
