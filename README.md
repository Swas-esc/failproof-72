# 🛡️ Failproof AI Policy: Block Destructive SQL

A security guardrail policy for AI coding agents (Claude Code, Cursor, etc.) that blocks accidental or unauthorized execution of destructive database commands like `DROP TABLE`, `DROP DATABASE`, and `TRUNCATE`.

## 📌 What It Blocks
- `DROP TABLE ...`
- `DROP DATABASE ...`
- `DROP SCHEMA ...`
- `TRUNCATE TABLE ...` / `TRUNCATE ...`

## 📦 Installation
Install this policy into your Failproof AI agent guardrails:

```bash
failproofai policies add itxtarun2727/failproof-block-destructive-sql
```

## 🛠️ Testing the Policy
Ask your AI agent to run a destructive command, for example:
> *"Run `psql -c "DROP TABLE users;"` to reset the database."*

The policy will intercept the tool call and deny it with:
> *"Destructive database command detected (DROP TABLE / DROP DATABASE / TRUNCATE). Direct table or database destruction is blocked. Use reversible migrations or request explicit manual confirmation from the user."*
