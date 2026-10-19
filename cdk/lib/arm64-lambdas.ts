import * as cdk from "aws-cdk-lib";
import { Construct, IConstruct } from "constructs";

// CDK-generated helper Lambdas (S3 auto-delete, certificate requestor, custom
// resource provider frameworks, OIDC provider handler, LogRetention) are raw
// AWS::Lambda::Function resources with no Architectures property, so
// CloudFormation defaults them to x86_64. House rule: every Lambda is ARM64.
// This aspect stamps arm64 on every function in scope, including helpers
// added by future construct upgrades.
export function forceArm64Lambdas(scope: Construct): void {
  cdk.Aspects.of(scope).add({
    visit(node: IConstruct): void {
      if (
        !cdk.CfnResource.isCfnResource(node) ||
        node.cfnResourceType !== "AWS::Lambda::Function"
      ) {
        return;
      }
      node.addPropertyOverride("Architectures", ["arm64"]);
    },
  });
}
