import * as cdk from '@aws-cdk/core';
// import * as sqs from '@aws-cdk/aws-sqs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns'; 

export class CdKprimerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'myVpc', {maxAzs: 2});
    const cluster = new ecs.Cluster(this, 'myCluster', {vpc: vpc});
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'myFargateService', {
      cluster: cluster,
      taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")},
      publicLoadBalancer: true
    })
  }
}
