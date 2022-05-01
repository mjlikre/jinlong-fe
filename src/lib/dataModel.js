// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema


  
  const modelUser = {
    id        String    @id @default(uuid())
    userName  String
    password  String
    createdAt DateTime  @default(now())
    updatedAt DateTime? @updatedAt
  }
  
  const modelProvider = {
    id                String              @id @default(uuid())
    providerName      String
    createdAt         DateTime            @default(now())
    contactFirstName  String?
    contactLastName   String?
    contactPhone      String?
    contactEmail      String?
    products          Inventory[]
    updatedAt         DateTime?           @updatedAt
    InventoryPurchase InventoryPurchase[]
  }
  
  const modelInventory = {
    id          String    @id @default(uuid())
    provider    Provider? @relation(fields: [providerId], references: [id])
    providerId  String?
    quantity    Int
    productName String
    priceBought Float
    priceToSell Float
    createdAt   DateTime  @default(now())
    updatedAt   DateTime? @updatedAt
  }
  
  const modelSales = {
    id            String    @id @default(uuid())
    itemList      String
    totalSales    Float
    salesPersonId String
    description   String?
    client        Client?   @relation(fields: [clientId], references: [id])
    clientId      String?
    createdAt     DateTime  @default(now())
    updatedAt     DateTime? @updatedAt
  }
  
  const modelInventoryPurchase = {
    id             String    @id @default(uuid())
    amount         Float
    provider       Provider? @relation(fields: [providerId], references: [id])
    itemsPurchased String
    createdAt      DateTime  @default(now())
    upadtedAt      DateTime? @updatedAt
    providerId     String?
  }
  
  const modelCashFlow = {
    id              String    @id @default(uuid())
    amount          Float
    movementId      String
    description     String?
    movementPurpose String
    createdAt       DateTime  @default(now())
    updatedAt       DateTime? @updatedAt
  }
  
  const modelClient = {
    id        String    @id @default(uuid())
    firstName String
    lastName  String
    phone     String?
    email     String?
    purchase  Sales[]
    createdAt DateTime  @default(now())
    updatedAt DateTime? @updatedAt
  }