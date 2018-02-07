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
    var deploymentBucketOutput = template.Outputs.ServerlessDeploymentBucketName;
    var resources = {
      "ServerlessDeploymentBucket": deploymentBucket
    };

    var outputs = {
      "ServerlessDeploymentBucketName": deploymentBucketOutput
    };

    template.Resources = resources;
    template.Outputs = outputs;
  }
}

module.exports = NoCodePlugin;
