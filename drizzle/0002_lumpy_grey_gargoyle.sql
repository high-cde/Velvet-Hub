CREATE TABLE `gameRewards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gameKey` varchar(64) NOT NULL,
	`score` int NOT NULL DEFAULT 0,
	`badge` varchar(120) NOT NULL,
	`dsnAwarded` int NOT NULL DEFAULT 0,
	`discountEligible` int NOT NULL DEFAULT 0,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gameRewards_id` PRIMARY KEY(`id`),
	CONSTRAINT `gameRewards_userId_unique` UNIQUE(`userId`)
);
