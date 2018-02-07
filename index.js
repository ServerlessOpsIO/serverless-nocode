'use strict';

class NoCodePlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {
      'aws:package:finalize:mergeCustomProviderResources': this.addNoCode.bind(this)
    };
  }

  addNoCode() {
    this.serverless.cli.log(`Converting project to NoCode`);
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;

    var deploymentBucket = template.Resources.ServerlessDeploymentBucket;
    var resources = {
      "NoCode" : {
         "Type": "Custom::NoCode",
         "Version" : "1.0.0",
         "Properties": {
           "ServiceToken": "arn:aws:lambda:us-east-1:349603509961:function:aws-nocode-tracker-prime-NoCodeTracker"
        }
      },
      "ServerlessDeploymentBucket": deploymentBucket
    };

    var outputs = {
      "ServerlessDeploymentBucketName": {
        "Value": {
          "Ref": "ServerlessDeploymentBucket"
        }
      }
    };

    template.Resources = resources;
    template.Outputs = outputs;
  }
}

module.exports = NoCodePlugin;
