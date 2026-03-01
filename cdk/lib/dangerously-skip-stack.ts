import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { NextjsSite } from "cdk-opennext";
import * as path from "path";

export class DangerouslySkipStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ── DNS ──────────────────────────────────────────────────
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "apresai.dev",
    });

    // ── OpenNext Web Deployment ─────────────────────────────
    const site = new NextjsSite(this, "WebSite", {
      openNextPath: path.join(__dirname, "../../.open-next"),
      customDomain: {
        domainName: "dangerously-skip-permissions.apresai.dev",
        hostedZone,
      },
      defaultFunctionProps: {
        memorySize: 512,
        timeout: cdk.Duration.seconds(30),
      },
      warm: 1,
    });

    // Disable SSR caching on CloudFront default behavior
    const cfnDistribution = site.distribution!.node
      .defaultChild as cloudfront.CfnDistribution;
    cfnDistribution.addPropertyOverride(
      "DistributionConfig.DefaultCacheBehavior.CachePolicyId",
      "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" // Managed-CachingDisabled
    );

    // ── Outputs ─────────────────────────────────────────────
    new cdk.CfnOutput(this, "SiteUrl", {
      value: "https://dangerously-skip-permissions.apresai.dev",
      description: "Web app URL",
    });
    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: site.distribution!.distributionDomainName,
      description: "CloudFront distribution domain name",
    });
  }
}
