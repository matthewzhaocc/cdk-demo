import * as cdk from "@aws-cdk/core";
import * as ecs from '@aws-cdk/aws-ecs'
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import * as certManager from '@aws-cdk/aws-certificatemanager'
import * as route53 from '@aws-cdk/aws-route53';
export class DeployStackCdkDemo extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const dnsZone = route53.HostedZone.fromHostedZoneAttributes(this, 'dnsZone', {
      zoneName: 'acgdemo.lhl.lol',
      hostedZoneId: 'Z03326323P2H9ZQLWW45L'
    })
    const cert = new certManager.Certificate(this, 'democert', {
      validation: certManager.CertificateValidation.fromDns(dnsZone),
      domainName: 'acgdemo.lhl.lol'
    })
    const appService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'appService', {
      memoryLimitMiB: 512,
      cpu: 256,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('matthewzhaocc/cdk-demo'),
        environment: {
          PORT: '80'
        }
      },
      desiredCount: 1,
      domainZone: dnsZone,
      domainName: "acgdemo.lhl.lol",
      certificate: cert
    })
  }
}
