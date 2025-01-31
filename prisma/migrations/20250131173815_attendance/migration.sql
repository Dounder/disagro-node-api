-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "attendance_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "services_original_total" DECIMAL(20,4) NOT NULL,
    "services_discount_amount" DECIMAL(20,4) NOT NULL,
    "services_discount_rate" DECIMAL(5,2) NOT NULL,
    "services_final_total" DECIMAL(20,4) NOT NULL,
    "products_original_total" DECIMAL(20,4) NOT NULL,
    "products_discount_amount" DECIMAL(20,4) NOT NULL,
    "products_discount_rate" DECIMAL(5,2) NOT NULL,
    "products_final_total" DECIMAL(20,4) NOT NULL,
    "final_total" DECIMAL(20,4) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_service" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(20,4) NOT NULL,
    "attendance_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "attendance_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_product" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(20,4) NOT NULL,
    "attendance_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "attendance_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_service" ADD CONSTRAINT "attendance_service_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_service" ADD CONSTRAINT "attendance_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_product" ADD CONSTRAINT "attendance_product_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_product" ADD CONSTRAINT "attendance_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
