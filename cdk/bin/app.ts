#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DangerouslySkipStack } from "../lib/dangerously-skip-stack";
import { GitHubOidcStack } from "../lib/github-oidc-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: "us-east-1",
};

new DangerouslySkipStack(app, "DangerouslySkipStack", { env });
new GitHubOidcStack(app, "GitHubOidcStack", { env });

cdk.Tags.of(app).add("project", "dangerously-skip");
cdk.Tags.of(app).add("env", "prod");
cdk.Tags.of(app).add("managed-by", "cdk");
cdk.Tags.of(app).add("owner", "chad");
