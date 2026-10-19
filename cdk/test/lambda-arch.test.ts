import { test } from "node:test";
import * as assert from "node:assert/strict";
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { createApp } from "../lib/app";

// HostedZone.fromLookup needs a concrete account; the lookup returns a dummy
// value under Template synthesis, so no AWS access is needed.
process.env.CDK_DEFAULT_ACCOUNT = "123456789012";

const app = createApp();
const stacks = app.node.children.filter(cdk.Stack.isStack);

test("app contains both stacks", () => {
  assert.deepEqual(stacks.map((s) => s.stackName).sort(), [
    "DangerouslySkipStack",
    "GitHubOidcStack",
  ]);
});

for (const stack of stacks) {
  const functions = Object.entries(
    Template.fromStack(stack).findResources("AWS::Lambda::Function"),
  );

  test(`${stack.stackName}: has Lambda functions`, () => {
    assert.ok(functions.length > 0);
  });

  for (const [logicalId, resource] of functions) {
    const props = resource.Properties as {
      Architectures?: string[];
      Runtime?: string;
    };

    test(`${stack.stackName}/${logicalId}: arm64`, () => {
      assert.deepEqual(props.Architectures, ["arm64"]);
    });

    test(`${stack.stackName}/${logicalId}: runtime is nodejs22.x or newer`, () => {
      const m = /^nodejs(\d+)\.x$/.exec(props.Runtime ?? "");
      if (m) {
        assert.ok(Number(m[1]) >= 22, `runtime ${props.Runtime} is too old`);
      }
    });
  }
}

// open-next.config.ts sets dangerous.disableTagCache, so cdk-opennext must not
// create the DynamoDB tag-cache table or the custom resources that seed it.
test("DangerouslySkipStack: no revalidation table, insert function or provider", () => {
  const stack = stacks.find((s) => s.stackName === "DangerouslySkipStack");
  assert.ok(stack, "DangerouslySkipStack not found");
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::DynamoDB::Table", 0);
  const ids = Object.keys(template.toJSON().Resources as object);
  const found = ids.filter((id) =>
    /RevalidationTable|RevalidationInsertFunction|RevalidationProvider|RevalidationResource/.test(
      id,
    ),
  );
  assert.deepEqual(found, []);
});
