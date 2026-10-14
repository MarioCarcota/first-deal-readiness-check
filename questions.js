/* Practical first-pass questions, distilled from public assessment themes. */
window.READINESS_GROUPS = [
  {
    id: "auth",
    title: "Auth & SSO",
    intro: "How people sign in, and what a customer can control.",
    questions: [
      {
        id: "auth-mfa-workforce", priority: 5,
        text: "Is multi-factor authentication required for every employee account that can reach production?",
        fix: "Turn on MFA for your identity provider, cloud console, source control, and password manager. Remove any exception that does not have an owner and an expiry date.",
        effort: "About 2 hours",
        tools: "Google Workspace or Microsoft 365 MFA, GitHub security settings, and your cloud provider’s identity controls"
      },
      {
        id: "auth-sso", priority: 5,
        text: "Can a business customer sign in with SAML or OIDC single sign-on today?",
        fix: "Ask two target buyers whether SSO is a deal requirement. If it is, add an enterprise SSO option through your auth provider and write down which plans include it.",
        effort: "1–3 days for a first integration",
        tools: "WorkOS, Auth0, Clerk, or your existing identity provider; confirm current plan limits before choosing"
      },
      {
        id: "auth-individual", priority: 4,
        text: "Does every product user have an individual account, with a safe password reset and session sign-out?",
        fix: "Remove shared logins. Use a maintained identity provider for sign-in, reset, and session revocation, then test the whole flow with a non-admin account.",
        effort: "Half a day to 2 days",
        tools: "Your hosted auth service, Clerk, Auth0, or AWS Cognito"
      },
      {
        id: "auth-customer-admin", priority: 4,
        text: "Can a customer admin invite a teammate and remove their access without asking your team?",
        fix: "Add an organization members page with invite, role, and deactivate actions. Make deactivation revoke active sessions, not just hide the user.",
        effort: "1–3 days",
        tools: "Your existing app framework and auth provider; track the work in GitHub Issues"
      }
    ]
  },
  {
    id: "data",
    title: "Data handling",
    intro: "Know what you hold, where it goes, and how it leaves.",
    questions: [
      {
        id: "data-map", priority: 4,
        text: "Can you name the customer data you store and the systems or regions where it lives?",
        fix: "Make a one-page data map: data type, purpose, system, region, people with access, and deletion path. Ask each engineer to check it against production.",
        effort: "Half a day",
        tools: "A spreadsheet or draw.io; your cloud console and subprocessor list"
      },
      {
        id: "data-encryption", priority: 5,
        text: "Is customer data encrypted in transit and at rest in the systems that store it?",
        fix: "Check TLS at the edge and encryption settings for databases, object storage, and backups. Fix any unencrypted store and keep screenshots or configuration exports as evidence.",
        effort: "2–4 hours to check; longer if a store needs migration",
        tools: "Your cloud provider’s encryption defaults, TLS test tools, and managed database settings"
      },
      {
        id: "data-support-access", priority: 4,
        text: "Is access to customer content limited to a real support or operational need, and recorded when it happens?",
        fix: "Turn off standing staff access where possible. Add an approval step for support access and record who accessed which customer, when, and why.",
        effort: "1–2 days",
        tools: "Your ticketing system, cloud audit logs, and short-lived access through your cloud provider"
      },
      {
        id: "data-export", priority: 3,
        text: "Can you export a customer’s data in a usable format when they ask or leave?",
        fix: "Write and test a small export for the core records a customer creates. Document the format and who can run it; do not promise an export you have not tested.",
        effort: "Half a day to 2 days",
        tools: "A CSV or JSON export in your product; a documented, access-controlled script for a manual first version"
      },
      {
        id: "data-deletion", priority: 4,
        text: "Can you delete customer data within a stated timeframe, including copies held by subprocessors?",
        fix: "Set a deletion window, test deletion in the app and database, then ask each subprocessor how its backups expire. Write down any backup retention exception in plain language.",
        effort: "1 day to map; 1–3 days to automate gaps",
        tools: "A deletion checklist, provider retention settings, and a tracked ticket for each exception"
      }
    ]
  },
  {
    id: "continuity",
    title: "Backups & uptime",
    intro: "A backup only counts after you have restored it.",
    questions: [
      {
        id: "backup-automated", priority: 5,
        text: "Are production backups automatic, scheduled, and separate from the live system?",
        fix: "Enable managed backups for each production database and file store. Record the schedule, retention, owner, and where the recovery instructions live.",
        effort: "2–4 hours",
        tools: "Your database or cloud provider’s built-in backup service"
      },
      {
        id: "backup-restore-test", priority: 5,
        text: "Has someone restored a backup in a test environment and recorded how long it took?",
        fix: "Restore the latest backup into an isolated test environment this week. Check the data, time the work, and save the steps so someone else can repeat them.",
        effort: "Half a day",
        tools: "A separate test database, a short runbook, and a calendar reminder for the next restore test"
      },
      {
        id: "uptime-comms", priority: 3,
        text: "Do customers have a clear way to see service incidents and hear when service is back?",
        fix: "Create a simple status page and name the person who updates it. Write a short incident update template before you need one.",
        effort: "2–3 hours",
        tools: "A basic hosted status-page plan or a public status page from your monitoring provider"
      },
      {
        id: "recovery-target", priority: 5,
        text: "Have you written down a realistic recovery time and data-loss target for the product?",
        fix: "Agree internally how long a full outage and lost recent data could last, then compare those targets with your tested restore. Tell sales not to promise tighter numbers than you can meet.",
        effort: "2–4 hours",
        tools: "A one-page continuity note, backup timestamps, and the last restore-test result"
      }
    ]
  },
  {
    id: "access",
    title: "Access control",
    intro: "Production access should be small, named, and easy to remove.",
    questions: [
      {
        id: "access-least-privilege", priority: 5,
        text: "Is production access limited to named people who need it for their job?",
        fix: "List everyone with production access. Remove stale accounts, replace shared admin logins, and give each person the smallest role they need.",
        effort: "Half a day",
        tools: "Your cloud IAM console, GitHub teams, and a simple access register"
      },
      {
        id: "access-offboarding", priority: 4,
        text: "When a contractor or employee leaves, are their accounts and keys removed promptly?",
        fix: "Make offboarding a checklist with an owner and same-day deadline. Include cloud, code, email, support tools, VPN, and personal access tokens.",
        effort: "2 hours to write; 15 minutes per departure",
        tools: "A shared checklist, identity-provider admin console, and GitHub token settings"
      },
      {
        id: "access-review", priority: 3,
        text: "Does someone review production access at least every three months?",
        fix: "Export current access, ask each system owner to confirm or remove it, and save the dated approval. Put the next review on the calendar.",
        effort: "1–2 hours per quarter",
        tools: "Cloud IAM exports, GitHub team membership, and a recurring calendar event"
      },
      {
        id: "access-environments", priority: 4,
        text: "Are development and production separated, with real customer data kept out of test systems where possible?",
        fix: "Separate production credentials and environments. Replace real customer records in test with generated or masked data, and remove production keys from developer laptops.",
        effort: "1–3 days",
        tools: "Separate cloud projects or accounts, environment-specific secrets, and generated test data"
      },
      {
        id: "access-admin-mfa", priority: 5,
        text: "Do privileged accounts for cloud, code, and support tools all use MFA?",
        fix: "Check every owner and administrator account in your cloud, source control, domain registrar, and support tools. Enforce MFA and store recovery codes in a team vault.",
        effort: "2–3 hours",
        tools: "Built-in MFA in each service and a shared password manager with recovery access"
      }
    ]
  },
  {
    id: "logging",
    title: "Logging",
    intro: "Keep enough history to explain what happened without collecting everything forever.",
    questions: [
      {
        id: "logging-admin-actions", priority: 4,
        text: "Can you see who changed important settings or accessed sensitive customer data?",
        fix: "Enable audit events for admin changes and sensitive support access. Include person, action, customer or system, timestamp, and outcome.",
        effort: "Half a day to 2 days",
        tools: "CloudTrail or equivalent, your app’s audit table, and your existing error-monitoring service"
      },
      {
        id: "logging-retention", priority: 3,
        text: "Are security-relevant logs kept for a defined period and protected from casual edits?",
        fix: "Pick a retention period your team can support, set it in your log store, and restrict deletion to a separate admin role. Keep the reason for the period in your notes.",
        effort: "2–4 hours",
        tools: "Cloud log-retention settings or an open-source logging stack such as OpenTelemetry with Grafana"
      },
      {
        id: "logging-alerts", priority: 4,
        text: "Would someone notice an unusual privileged login or repeated failed access attempt?",
        fix: "Choose three events that matter, alert a monitored team channel, and name who responds. Test each alert so it does not silently point to an abandoned inbox.",
        effort: "Half a day",
        tools: "Cloud-native alerts, GitHub security alerts, and a team chat channel with an on-call owner"
      }
    ]
  },
  {
    id: "incident",
    title: "Incident response",
    intro: "A small team can still have a calm, written first-hour plan.",
    questions: [
      {
        id: "incident-plan", priority: 4,
        text: "Is there a written incident plan with an owner, backup contact, and first steps?",
        fix: "Write one page with who leads, who investigates, how to contain access, where evidence goes, and who speaks to customers. Add an alternate if the owner is unavailable.",
        effort: "Half a day",
        tools: "A shared document, an incident channel, and a current contact list"
      },
      {
        id: "incident-evidence", priority: 4,
        text: "Can your team preserve useful evidence and contain a suspected account or system compromise?",
        fix: "Document how to revoke sessions and keys, isolate a service, and preserve logs before changing systems. Test the steps in a non-production environment.",
        effort: "Half a day",
        tools: "Your identity and cloud consoles, audit logs, and a short containment runbook"
      },
      {
        id: "incident-notice", priority: 5,
        text: "Do you know who must be notified and how quickly if customer data is affected?",
        fix: "Check your contracts and applicable obligations with counsel. Put the strictest agreed notice window, customer contacts, and approval owner in the incident plan.",
        effort: "2–4 hours with the right contract in hand",
        tools: "Your signed agreements, a customer contact list, and legal counsel for the final wording"
      },
      {
        id: "incident-exercise", priority: 3,
        text: "Have the people named in the plan walked through a realistic incident together in the last year?",
        fix: "Run a 45-minute tabletop: a compromised admin account, a customer-data question, and a service outage. Write down the first confusing or missing step and assign an owner.",
        effort: "About 1 hour",
        tools: "A calendar invite, a shared note, and one scenario based on your actual architecture"
      }
    ]
  },
  {
    id: "legal",
    title: "Legal docs & evidence",
    intro: "Answer honestly. A clear gap is safer than a promise you cannot prove.",
    questions: [
      {
        id: "legal-dpa", priority: 5,
        text: "Can you provide a Data Processing Agreement that matches how your product handles customer data?",
        fix: "Start from a counsel-reviewed DPA that names the parties, processing purpose, data types, security duties, subprocessors, and deletion terms. Do not copy a template without checking the actual product.",
        effort: "1–3 days, depending on review",
        tools: "A current DPA from your counsel or contract workflow, checked against your data map"
      },
      {
        id: "legal-privacy", priority: 4,
        text: "Does your privacy notice accurately explain the data you collect, why you use it, and how long you keep it?",
        fix: "Compare the notice with your data map and product analytics. Correct outdated claims and ask counsel to review the final public wording.",
        effort: "Half a day plus legal review",
        tools: "Your data map, the current privacy notice, and counsel"
      },
      {
        id: "legal-subprocessors", priority: 4,
        text: "Can you give a customer a current list of subprocessors, what each one does, and how changes are announced?",
        fix: "Make a dated list from production configuration and vendor contracts. Add each provider’s purpose, data involved, location, and the notice process for changes.",
        effort: "Half a day",
        tools: "A spreadsheet, your cloud billing/vendor list, and signed processor terms"
      },
      {
        id: "legal-soc2", priority: 5,
        text: "Can you accurately say whether you have a SOC 2 report, are working toward one, or have not started?",
        fix: "Write the current truth in one sentence and share only evidence you actually have. If buyers keep asking, map the gaps against the AICPA criteria and get a scoped CPA readiness conversation.",
        effort: "2–4 hours to map the current state",
        tools: "A control-and-evidence spreadsheet; AICPA Trust Services Criteria; a CPA for audit-scope questions"
      },
      {
        id: "legal-contracts", priority: 5,
        text: "Do your customer terms cover security responsibilities, incident notice, retention, and deletion?",
        fix: "Compare your standard terms with your real response and deletion processes. Mark each mismatch for counsel; do not accept a buyer promise your systems cannot meet.",
        effort: "Half a day to identify gaps, plus legal review",
        tools: "Your standard MSA, DPA, retention policy, and counsel"
      }
    ]
  }
];
