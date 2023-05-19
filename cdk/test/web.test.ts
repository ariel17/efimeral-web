import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as WebStack from '../lib/web-stack';


test('CNAME registry created', () => {
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
    ResourceRecords: ['ariel17.github.io'],
    TTL: "1800",
  });
});
