# Migration `20201205221552-migration`

This migration has been generated by domnantas at 12/6/2020, 12:15:52 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,

    PRIMARY KEY ("id")
)

ALTER TABLE "User" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201205221552-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+datasource DS {
+  // optionally set multiple providers
+  // example: provider = ["sqlite", "postgresql"]
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = "native"
+}
+
+model User {
+  id       String  @id @default(uuid())
+  name     String
+  students User[]
+}
```


