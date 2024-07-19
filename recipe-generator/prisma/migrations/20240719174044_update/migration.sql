-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "ingredients" TEXT[],

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
