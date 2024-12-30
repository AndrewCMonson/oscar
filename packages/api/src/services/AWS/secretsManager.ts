import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { AWSSecrets } from "@oscar/types/apiTypes/types.js";

/**
 * Retrieves AWS secrets from AWS Secrets Manager.
 *
 * @returns {Promise<AWSSecrets>} A promise that resolves to the AWS secrets.
 *
 * @throws Will throw an error if the secret retrieval fails.
 *
 * @example
 * ```typescript
 * const secrets = await AWSSecretsRetrieval();
 * console.log(secrets);
 * ```
 */
export const AWSSecretsRetrieval = async (): Promise<AWSSecrets> => {
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
