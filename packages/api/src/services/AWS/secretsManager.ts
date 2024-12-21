import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { AWSSecrets } from '@api/types/types.js';

export const AWSSecretsRetrieval = async () => {
  const SecretId = process.env.AWS_SECRET_ID;

  const client = new SecretsManagerClient({
    region: "us-east-1",
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId,
        VersionStage: "AWSCURRENT",
      }),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }

  const secret = response.SecretString ?? "undefined";

  const awsSecrets: AWSSecrets = JSON.parse(secret);

  return awsSecrets;
};

AWSSecretsRetrieval();