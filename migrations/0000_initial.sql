-- Migration number: 0000 	 2023-07-20T22:35:18.053Z

-- CreateTable

CREATE TABLE
    "Post" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL,
        "title" TEXT NOT NULL,
        "content" TEXT
    );