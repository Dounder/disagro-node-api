/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_deleted_by_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_by_id",
DROP COLUMN "deleted_by_id";
