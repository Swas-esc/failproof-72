import { customPolicies, allow, deny } from "failproofai";

customPolicies.add({
  name: "block-destructive-sql",
  description: "Block AI agents from executing destructive SQL commands like DROP TABLE, TRUNCATE, or DROP DATABASE",
  category: "Database Safety",
  defaultEnabled: true,
  match: { events: ["PreToolUse"] },
  fn: async (ctx) => {
    if (ctx.toolName !== "Bash" && ctx.toolName !== "Terminal") return allow();
    const cmd = String(ctx.toolInput?.command ?? "");

    // Detect destructive database commands (case-insensitive)
    const destructiveSql = /\b(drop\s+(table|database|schema)|truncate(\s+table)?)\b/i;
    if (destructiveSql.test(cmd)) {
      return deny(
        "Destructive database command detected (DROP TABLE / DROP DATABASE / TRUNCATE). Direct table or database destruction is blocked. Use reversible migrations or request explicit manual confirmation from the user."
      );
    }

    return allow();
  },
});
