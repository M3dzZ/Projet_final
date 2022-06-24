/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `PasswordResetRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PasswordResetRequest_token_key` ON `PasswordResetRequest`(`token`);
