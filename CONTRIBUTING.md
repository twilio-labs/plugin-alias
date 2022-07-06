# Contributing to `plugin-alias`

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

We'd love to accept contributions to our source code and to make `plugin-alias`
even better than it is today! For this, We'd like these guidelines to be followed:

 - [Code of Conduct](#coc)
 - [Proposing a Change](#proposing-a-change)
    - [Report an Issue](#report-an-issue)
      - [Bug Report](#bug-found)
      - [Feature Request](#feature-request)
      - [Minor Fixes](#minor-fixes) 
    - [Pull Request Lifecycle](#pull-request-lifecycle)
      - [Things to be kept in mind before creating a pull request](#things-to-be-kept-in-mind-before-creating-a-pull-request)
 - [Tests](#tests)

## <a name="coc"></a> Code of Conduct

Help us keep `plugin-alias` open and inclusive. Please be kind to and considerate
of other developers, as we all have the same goal: make `plugin-alias` as good as
it can be. Please read the [Code of Conduct][coc-link] for further details.

## <a name="proposing-a-change"></a> Proposing a Change

In order to be respectful of the time of community contributors, we aim to discuss potential changes in GitHub issues prior to implementation. This will allow us to give design feedback up front and set expectations about the scope of the change, and, for larger changes, how best to approach the change such that we can review it and merge it along with other concurrent changes.

### <a name="report-an-issue"></a> Report an Issue

Before you start investing significant time in development, please check If the bug you wish to fix or enhancement you wish to implement is already covered by a GitHub issue. If not, please do start a discussion in [a new GitHub issue][issue-link]. If you mention your intent to implement the change described in your issue, our team can help you with implementation-related feedback in the subsequent discussion. You can create issue depending upon what kind of change you are proposing.

#### <a name="bug-found"></a> Bug Report

If you find a bug in the source code or a mistake in the documentation, you can help us by submitting [a bug report issue][bug-issue-link]. You will require the following details for submitting this issue:

* **Description of the Bug** - A clear and concise description of what the bug is.
* **Steps to Reproduce** - Sequence wise steps which reproduces the bug.
* **Expected behavior** - A clear and concise description of what you expected to happen.
* **Screenshots (if applicable)** - Add screenshots to help explain your problem.
* **Desktop Details** - Add information about the Desktop OS, Browser and Version used.
* **Smartphone Deatils (if applicable)** - Add information about the Smartphone Device, OS, Browser and Version used.
* **Additional Context** - Add any other context about the problem here.

#### <a name="feature-request"></a> Feature Request

You can request a new feature by submitting [a feature request issue][feature-issue-link]. If you would like to implement a new feature then
consider what kind of change it is:

* **Major Changes** that you wish to contribute to the project should be
  discussed first with `plugin-alias` contributors in an issue or pull request so
  that we can develop a proper solution and better coordinate our efforts,
  prevent duplication of work, and help you to craft the change so that it is
  successfully accepted into the project.
* **Small Changes** should be discussed as an issue under [minor fix](#minor-fixes)

For a Major Change, You will require the following details for submitting the issue:

* **Feature Related to a Problem ?** - Is your feature request related to a problem? Please describe what the problem is. 
* **Solution Proposed** - Describe the solution you'd like to propose
* **Alternatives Considered** - Describe any alternative solution or feature you've considered
* **Additional Context** - Add any other context about the problem here.

#### <a name="minor-fixes"></a> Minor Fixes

If you want to help improve the docs for the `plugin-alias` or any other minor change which can help in improving the user experience, it's a good idea to let others know what you're working on to minimize duplication of effort. Create a new [minor fix issue][fix-issue-link] (or comment on a related existing one) to let others know what you're working on.

For a Minor Fix, You will require the following details for submitting the issue:

* **Description of the Fix** - A clear and concise description of what fix is required.
* **Expected behavior** - A clear and concise description of what you expect to happen after fix.
* **Screenshots (if applicable)** - Add screenshots to help explain your problem.
* **Desktop Details** - Add information about the Desktop OS, Browser and Version used.
* **Smartphone Deatils (if applicable)** - Add information about the Smartphone Device, OS, Browser and Version used.
* **Additional Context** - Add any other context about the problem here.

### <a name="pull-request-lifecycle"></a> Pull Request Lifecycle

Before you submit your pull request consider the following guidelines:

1. Setup your development environment:
  * `$ npm install -g twilio-cli`
  * `git clone https://github.com/twilio-labs/plugin-alias.git`
  * `$ twilio plugins:link ./plugin-alias`
  * `cd plugin-alias`
  * Test that everything is wired up correctly with `./bin/run`
2. This plugin utilizes the Open CLI Framework ([oclif](https://oclif.io/)). It may be useful to familiarize yourself with it, in particular, the [plugin](https://oclif.io/docs/plugins).
3. Create a new branch and make your changes in that branch only:

    ```shell
    git checkout -b my-fix-branch main
    ```
4. Commit your changes using a descriptive commit message.

    ```shell
    git commit -m "commit-message"
    ```
5. Build your changes locally to ensure all the tests pass:

    ```shell
    npm test
    ```
6. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```
7. You can create a [draft pull request](https://github.blog/2019-02-14-introducing-draft-pull-requests/) for commentary or review before it is fully completed. It's also a good idea to include specific questions or items you'd like feedback on.
8. Once you believe your pull request is ready to be merged you can create your pull request.
9. Our team members will look over your contribution and either merge, or provide comments letting you know if there is anything left to do. We may also have questions that need to be answered about the code to understand your thought process.
10. If we suggest some changes, then:
* Make the required updates.
* Re-run the `npm test` to ensure tests are still passing.
* Commit your changes to your branch (e.g. `my-fix-branch`).
* Push the changes to your GitHub repository (this will update your Pull Request).  
12. Once all the checklist items have been addressed, your contribution will be merged! 
13. In some cases, we might decide that a PR should be closed without merging. We'll make sure to provide clear reasoning when this happens. Following the recommended process above is one of the ways to ensure you don't spend time on a PR we can't or won't merge.
14. After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository.

#### <a name="things-to-be-kept-in-mind-before-creating-a-pull-request"></a> Things to be kept in mind before creating a pull request

Before creating any pull request, make sure that you follow the following three things:

1. Build Tests are passing with acceptable code coverage: Whenever you are modifying the source code files, make sure that the changes do not make the npm build tests to fail. A failure in build test implies that the logic of the code is not appropriate. If you are adding some new source code files, make sure you add relevant tests for the same so that the code coverage remains above the threshold.
2. PR checks are successful: Before creating any PR, check what all checks it needs to pass. The PRs which do not pass all the checks are not merged in the main branch. There are majorly two types of PR checks:
* Tests: These are the build tests run for various LST versions of Node. These are generally Units tests.
* PR Lint: This check verifies whether the PR contains the convetional commit elements like docs, chores, bug, fix, feat etc. 
3. Convetional Commits should be used: The commits should follow the convetional commit specification which helps in semantic release of the plugin. Read more about the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0).

## <a name="tests"></a> Tests

This plugin uses the Unit tests built using oclif test library for testing the functionalities. Some of the utility functions are also tested using chai.js and mocha.js. You can contribute in tests as well by creating an issue for the same.

[docs-link]: http://twil.io/cli](https://github.com/twilio-labs/plugin-alias/blob/main/README.md
[issue-link]: https://github.com/twilio-labs/plugin-alias/issues/new/choose
[bug-issue-link]: https://github.com/twilio-labs/plugin-alias/issues/new?assignees=&labels=&template=bug_report.md&title=
[feature-issue-link]: https://github.com/twilio-labs/plugin-alias/issues/new?assignees=&labels=&template=feature_request.md&title=
[fix-issue-link]: https://github.com/twilio-labs/plugin-alias/issues/new?assignees=&labels=&template=minor-fix-request.md&title=%5BFIX%5D
[github]: https://github.com/twilio-labs/plugin-alias
[coc-link]: https://github.com/twilio-labs/.github/blob/main/CODE_OF_CONDUCT.md
