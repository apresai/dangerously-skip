import * as cdk from "aws-cdk-lib";
import { DangerouslySkipStack } from "./dangerously-skip-stack";
import { GitHubOidcStack } from "./github-oidc-stack";
import { forceArm64Lambdas } from "./arm64-lambdas";

// Single construction path shared by bin/app.ts and the tests, so the tests
// synthesize exactly what `cdk deploy` deploys.
export function createApp(): cdk.App {
  const app = new cdk.App();

  const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1",
  };

  new DangerouslySkipStack(app, "DangerouslySkipStack", { env });
  new GitHubOidcStack(app, "GitHubOidcStack", { env });

  forceArm64Lambdas(app);

  cdk.Tags.of(app).add("project", "dangerously-skip");
  cdk.Tags.of(app).add("env", "prod");
  cdk.Tags.of(app).add("managed-by", "cdk");
  cdk.Tags.of(app).add("owner", "chad");

  return app;
}
