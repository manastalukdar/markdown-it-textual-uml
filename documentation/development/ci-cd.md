# CI, CD

Implement CI-CD pipelines with the following functionality. Consider using GitHub actions.

## Committing code

- Code should be pushed into `master` only by using PRs. Disable direct push functionality into `master`.
- Disable PRs into `master` lacking reference to any issue.
- Disable commits and PRs into `develop` lacking reference to any issue.

## Versioning of packages

Versioning of packages published by different branches:

- `master` deploys stable production code. `latest` tag should be used for the corresponding npm package.
- `develop` deploys under-development code. `next` tag should be used for the corresponding npm package.

## Builds

Automated builds should be triggered on:

- Pushing code to `develop`.
- Creating new PR into `develop`.
- Creating new PR into `master`.

## Deployments

Automated deployments should be triggered on:

- Successful build triggered by direct push of code into `develop`.
- Successful merge of a PR into `develop`.
- Successful merge of a PR into `master`.

Deployment pipeline should:

1. Tag the branch with the correct semantic version number. Investigate using some open-source automated semver tooling.
2. Create GitHub release. The Release text can be initially (and automatically) populated by issues (title and link) referenced by the direct push commit or the PR that just got merged in.
3. Publish package to npm.
    - On `develop` package should be tagged as `next`.
    - On `master` package should be tagged as `latest`.
    - **Question**: What about release candidates? `rc` tags? Which branch does this go from? Typically this goes from an intermediate release branch. How would this tie into the automation?

It is worth considering if steps 1, 2 and 3 above:

- should be automated by a deployment pipeline, or
- should be left as manual, or
- should be automated but manual deployments should also be allowed.

## Status badges

CI/CD status badges should be provided in the README.md file for builds and deployments from both `develop` and `master` branches.
