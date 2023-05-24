import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as WebStack from '../lib/web-stack';


test('A registry created', () => {
  const app = new cdk.App();
    // WHEN
  const stack = new WebStack.WebStack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Route53::HostedZone', {
    Name: WebStack.domainName+'.',
  });

  template.hasResourceProperties('AWS::CertificateManager::Certificate', {
    DomainName: WebStack.domainName,
    ValidationMethod: 'DNS',
  });

  template.hasResourceProperties('AWS::Route53::RecordSet', {
    Name: WebStack.domainName+'.',
    Type: 'A',
    ResourceRecords: [
        '185.199.108.153',
        '185.199.109.153',
        '185.199.110.153',
        '185.199.111.153',
    ],
    TTL: "1800",
  });
});
