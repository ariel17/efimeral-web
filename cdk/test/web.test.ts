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

  template.hasResourceProperties('AWS::Route53::RecordSet', {
    Name: WebStack.domainName+'.',
    Type: 'A',
    ResourceRecords: WebStack.gitHubIPs,
    TTL: "1800",
  });

  template.hasResourceProperties('AWS::Route53::RecordSet', {
    Name: 'www.'+WebStack.domainName+'.',
    Type: 'A',
    ResourceRecords: WebStack.gitHubIPs,
    TTL: "1800",
  });
});
