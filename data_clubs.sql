-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 13 nov. 2024 à 02:24
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de données : `data_clubs`

-- --------------------------------------------------------
-- Table `clubs`
-- --------------------------------------------------------

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code_club` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_club` (`code_club`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table `games`
-- --------------------------------------------------------

CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `home_team_id` int(11) NOT NULL,
  `away_team_id` int(11) NOT NULL,
  `game_date` datetime NOT NULL,
  `home_score` int(11) DEFAULT 0,
  `away_score` int(11) DEFAULT 0,
  `season` varchar(10) DEFAULT NULL,
  `is_official` tinyint(1) DEFAULT 1,
  `competition_type` enum('championship','cup','friendly') NOT NULL,
  `status` enum('scheduled','in_progress','finished','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `home_team_id` (`home_team_id`),
  KEY `away_team_id` (`away_team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table `game_statistics`
-- --------------------------------------------------------

CREATE TABLE `game_statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `minutes_played` int(11) DEFAULT 0,
  `points` int(11) DEFAULT 0,
  `two_points_made` int(11) DEFAULT 0,
  `two_points_attempted` int(11) DEFAULT 0,
  `three_points_made` int(11) DEFAULT 0,
  `three_points_attempted` int(11) DEFAULT 0,
  `free_throws_made` int(11) DEFAULT 0,
  `free_throws_attempted` int(11) DEFAULT 0,
  `offensive_rebounds` int(11) DEFAULT 0,
  `defensive_rebounds` int(11) DEFAULT 0,
  `assists` int(11) DEFAULT 0,
  `steals` int(11) DEFAULT 0,
  `blocks` int(11) DEFAULT 0,
  `turnovers` int(11) DEFAULT 0,
  `fouls` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `game_id` (`game_id`),
  KEY `player_id` (`player_id`),
  KEY `team_id` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table `players`
-- --------------------------------------------------------

CREATE TABLE `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `jersey_number` int(11) DEFAULT NULL,
  `position` enum('PG','SG','SF','PF','C') NOT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table `player_teams`
-- --------------------------------------------------------

CREATE TABLE `player_teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `joined_date` date NOT NULL,
  `left_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `player_team_date` (`player_id`,`team_id`,`joined_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table `season_statistics`
-- --------------------------------------------------------

CREATE TABLE `season_statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `season` varchar(10) NOT NULL,
  `games_played` int(11) DEFAULT 0,
  `games_started` int(11) DEFAULT 0,
  `total_minutes_played` int(11) DEFAULT 0,
  `total_points` int(11) DEFAULT 0,
  `total_two_points_made` int(11) DEFAULT 0,
  `total_two_points_attempted` int(11) DEFAULT 0,
  `total_three_points_made` int(11) DEFAULT 0,
  `total_three_points_attempted` int(11) DEFAULT 0,
  `total_free_throws_made` int(11) DEFAULT 0,
  `total_free_throws_attempted` int(11) DEFAULT 0,
  `total_offensive_rebounds` int(11) DEFAULT 0,
  `total_defensive_rebounds` int(11) DEFAULT 0,
  `total_assists` int(11) DEFAULT 0,
  `total_steals` int(11) DEFAULT 0,
  `total_blocks` int(11) DEFAULT 0,
  `total_turnovers` int(11) DEFAULT 0,
  `total_fouls` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `player_team_season` (`player_id`,`team_id`,`season`),
  KEY `team_id` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table `teams`
-- --------------------------------------------------------

CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `level` enum('senior','U20','U18','U17','U15','U13') NOT NULL,
  `category` enum('masculine','feminine','mixte') NOT NULL,
  `division` varchar(50) DEFAULT NULL,
  `club_id` int(11) NOT NULL,
  `season` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `club_id` (`club_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table `users`
-- --------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table `user_clubs`
-- --------------------------------------------------------

CREATE TABLE `user_clubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
