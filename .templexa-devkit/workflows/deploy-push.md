# Deploy Push Workflow

Canonical deploy flow is still inherited from the migrated `push` capability, but new agents should apply this checklist.

1. Run `git status` and `git diff --stat`.
2. Do not commit secrets or local-only files.
3. Commit source changes on the intended branch.
4. Run `node scripts/protect-wedding.js` before pushing deploy output when wedding invitations are involved.
5. Commit protected output if it changed.
6. Push only after conflicts and protect output are resolved.

If branch policy is unclear, stop and ask the user before checkout/merge/push.

