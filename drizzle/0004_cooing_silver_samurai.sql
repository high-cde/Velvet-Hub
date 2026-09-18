CREATE TABLE `roomBans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roomId` int NOT NULL,
	`userId` int NOT NULL,
	`reason` varchar(240) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `roomBans_id` PRIMARY KEY(`id`)
);
