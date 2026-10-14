# First Deal Readiness Check

A no-dependency static app for early-stage B2B software founders preparing for a first enterprise security review. It runs in a browser, keeps answers in that browser only, and has no email gate.

## Run locally

From the Readiness Lab workspace, run this one command:

```sh
python3 -m http.server 4174 --directory readiness-tool
```

Then open <http://localhost:4174>. Stop the server with `Ctrl+C`.

## What the score means

There are 30 questions across seven areas. Yes is 2 points, Partly is 1, and No is 0. The percentage is a simple self-check, not a SOC 2 opinion, audit result, legal opinion, or guarantee a buyer will approve the company. The result surfaces up to three unanswered or partly answered items, ranked by likely buyer impact. Each result includes a first step, rough effort, and free or existing-stack tools to consider.

Answers are stored in browser local storage to let a founder resume. They are not transmitted by this app.

## Source notes

Reviewed public source material:

- [Cloud Security Alliance Cloud Controls Matrix](https://cloudsecurityalliance.org/research/cloud-controls-matrix) and its [CCM/CAIQ v4.1 download](https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4-1). I reviewed the current CAIQ v4.1.0 workbook from the official bundle. Examples reflected in this check include IAM-08.1 (access reviews), IAM-13.1 (authentication and MFA), BCR-08.1/.3 (backups and restore), DSP-11.1 (data deletion requests), DSP-13.1 (subprocessing), and SEF-03.1 (incident communications).
- [CSA CAIQ questionnaire resource](https://cloudsecurityalliance.org/artifacts/star-level-1-security-questionnaire-caiq-v4/), the public vendor self-assessment resource.
- [AICPA Trust Services Criteria](https://www.aicpa-cima.com/resources/landing/trust-services-criteria), used as a reference for common SOC 2 control themes. This tool does not assess the criteria or SOC 2 readiness.
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework), including the public CSF 2.0 materials.
- [Atlassian Trust Center](https://www.atlassian.com/trust), as an example of public SaaS security and trust material.

The [Shared Assessments SIG page](https://sharedassessments.org/sig/) was blocked by its site’s access protection during this research run. SIG Lite is linked for reference, but this tool does not claim to reproduce or have reviewed the SIG Lite questionnaire. The list is a practical synthesis, not an official questionnaire or a substitute for a buyer’s own form.

## Files

- `index.html`: app shell
- `questions.js`: the 30 questions and action guidance
- `app.js`: navigation, local saving, score, and results
- `styles.css`: responsive layout and print styles
