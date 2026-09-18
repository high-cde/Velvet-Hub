ALTER TABLE `gameRewards` ADD `rewardLevel` varchar(32) DEFAULT 'bronze' NOT NULL;--> statement-breakpoint
ALTER TABLE `gameRewards` ADD `discountPercent` int DEFAULT 10 NOT NULL;