CREATE TABLE `rewardBalances` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`dsnBalance` int NOT NULL DEFAULT 0,
	`welcomeGranted` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rewardBalances_id` PRIMARY KEY(`id`),
	CONSTRAINT `rewardBalances_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `roomMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roomId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('viewer','host','moderator') NOT NULL DEFAULT 'viewer',
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `roomMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roomMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roomId` int NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(120) NOT NULL,
	`body` varchar(500) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `roomMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`title` varchar(180) NOT NULL,
	`hostName` varchar(120) NOT NULL,
	`category` enum('conversation','game','music') NOT NULL,
	`status` enum('live','starting','replay') NOT NULL DEFAULT 'starting',
	`description` text NOT NULL,
	`audience` int NOT NULL DEFAULT 0,
	`capacity` int NOT NULL DEFAULT 120,
	`accent` varchar(32) NOT NULL DEFAULT 'rose',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rooms_id` PRIMARY KEY(`id`),
	CONSTRAINT `rooms_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `safetyReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roomId` int,
	`userId` int NOT NULL,
	`reason` varchar(120) NOT NULL,
	`details` text,
	`status` enum('open','reviewing','closed') NOT NULL DEFAULT 'open',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `safetyReports_id` PRIMARY KEY(`id`)
);
