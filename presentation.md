# What is CDK

AWS cdk is a IaC (Infra as code) platform for provisioning AWS infrastructure

instead of utilizing declarative syntax with YAML or HCL, it uses traditional programming languages like Golang and Typescript

CDK is compiled to cloudformation when being executed

# What is the benefit of CDK

AWS have predefined prebuilt Well Architected&copy; Solutions in CDK, instead of relying on manually design patterns in cloudformation/terraform.

With the ability to natively execute code, you can also do things like easy string manipulation or even things like making HTTP requests to dynamically fetch infrastructure configuration at deploy time.

# The lab

During this lab, we have a simple nodejs url shortener. It is built as a docker container and published on dockerhub as matthewzhaocc/cdk-demo.

Then we will use AWS CDK to deploy it to a ECS cluster as a fargate service with a ALB frontend. We will also map a custom domain with TLS to the Load Balancer.