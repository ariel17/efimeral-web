import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';


export const domainName = 'efimeral.ar';

export class WebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const zone = new route53.PublicHostedZone(this, 'web-hosted-zone', {
      zoneName: domainName,
    });

    new cdk.CfnOutput(this, 'hosted-zone-id', {
      description: 'HostedZoneId',
      value: zone.hostedZoneId,
    });
    
   new acm.Certificate(this, 'web-certificate', {
      domainName: domainName,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    new route53.ARecord(this, 'a-record', {
      zone: zone,
      recordName: domainName,
      target: route53.RecordTarget.fromIpAddresses(
        '185.199.108.153',
        '185.199.109.153',
        '185.199.110.153',
        '185.199.111.153',
      ),
    });

    new cdk.CfnOutput(this, 'ns-servers', {
      description: 'NSServers',
      value: cdk.Fn.join(',', zone.hostedZoneNameServers || []),
    });
  }
}
