import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';


export const domainName = 'efimeral.ar';

export class WebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const zone = new route53.HostedZone(this, 'web-hosted-zone', {
      zoneName: domainName,
    });

    new route53.CnameRecord(this, 'cname-web', {
      zone: zone,
      recordName: domainName,
      domainName: 'ariel17.github.io',
    });
  }
}
