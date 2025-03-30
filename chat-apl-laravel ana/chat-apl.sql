-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2025 at 01:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat-apl`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `name`, `created_by`, `created_at`, `updated_at`) VALUES
(1, NULL, 1, '2025-03-18 11:10:16', '2025-03-14 11:10:19'),
(3, 'Grupa123', 3, '2025-03-14 11:25:59', '2025-03-14 11:25:59');

-- --------------------------------------------------------

--
-- Table structure for table `conversation_user`
--

CREATE TABLE `conversation_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `conversation_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conversation_user`
--

INSERT INTO `conversation_user` (`id`, `user_id`, `conversation_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-03-10 11:48:28', '2025-03-10 11:49:30'),
(2, 2, 1, '2025-03-10 11:48:28', '2025-03-10 11:49:30'),
(5, 3, 3, '2025-03-14 11:25:59', '2025-03-14 11:25:59'),
(6, 4, 3, '2025-03-14 11:25:59', '2025-03-14 11:25:59'),
(7, 1, 3, '2025-03-14 11:25:59', '2025-03-14 11:25:59'),
(8, 2, 3, '2025-03-14 11:25:59', '2025-03-14 11:25:59');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `conversation_id` bigint(20) UNSIGNED NOT NULL,
  `content` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `conversation_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'cao', '2025-03-11 11:49:30', '2025-03-10 11:49:30'),
(3, 2, 1, 'cao, sta ima', '2025-03-14 10:50:57', '2025-03-14 10:50:57'),
(5, 1, 1, 'evo nis, kod tb?', '2025-03-14 11:04:58', '2025-03-14 11:04:58'),
(6, 2, 1, 'idem na trening, hoces sa mnom?', '2025-03-14 11:06:17', '2025-03-14 11:06:17');

-- --------------------------------------------------------

--
-- Table structure for table `message_attachments`
--

CREATE TABLE `message_attachments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `message_id` bigint(20) UNSIGNED NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_02_26_174423_create_users_table', 1),
(2, '2025_02_26_174424_create_conversations_table', 1),
(3, '2025_02_26_174424_create_messages_table', 1),
(4, '2025_02_26_174425_create_message_attachments_table', 1),
(5, '2025_02_26_180042_add_last_seen_to_users', 1),
(6, '2025_02_26_180212_change_content_to_longtext_in_messages', 1),
(7, '2025_02_26_180352_add_unique_index_to_messages', 1),
(8, '2025_02_26_180456_remove_file_type_from_message_attachments', 1),
(9, '2025_02_26_180559_create_conversation_user_table', 1),
(10, '2025_02_26_181241_add_name_to_conversations', 1),
(11, '2025_03_01_133455_add_role_to_users_table', 1),
(12, '2025_03_02_113519_add_file_path_to_message_attachments', 1),
(13, '2025_03_03_121540_create_sessions_table', 1),
(14, '2025_03_08_221852_create_personal_access_tokens_table', 1),
(15, '2025_03_09_092052_create_password_resets_table', 1),
(16, '2025_03_09_095535_create_cache_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 1, 'auth_token', '9fbf113affe3bd300aff55d6d6dd4222c20f6cea44e0e90765774434c9602965', '[\"*\"]', '2025-03-14 11:06:25', NULL, '2025-03-14 10:09:35', '2025-03-14 11:06:25'),
(3, 'App\\Models\\User', 2, 'auth_token', '675e3999e88f71e040920deab47943e0445dcc4ef95df37827fe6411fca04743', '[\"*\"]', '2025-03-14 11:06:17', NULL, '2025-03-14 10:25:44', '2025-03-14 11:06:17'),
(4, 'App\\Models\\User', 3, 'auth_token', '28039ed5c382467b72929ff3a6cf97834e6a67d61abee6656e1b74c83e18a2f2', '[\"*\"]', '2025-03-14 11:28:55', NULL, '2025-03-14 11:08:28', '2025-03-14 11:28:55'),
(5, 'App\\Models\\User', 4, 'auth_token', 'd814593c40910eb901ebd2753dd1cac14176b8e71bcce179b5271fe4074ad1fc', '[\"*\"]', NULL, NULL, '2025-03-14 11:08:55', '2025-03-14 11:08:55'),
(6, 'App\\Models\\User', 5, 'auth_token', '2be208f5629fa7cab4514fde6c550049fafa2b804020191baac31d97be3ce118', '[\"*\"]', NULL, NULL, '2025-03-14 11:31:34', '2025-03-14 11:31:34');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_seen` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','moderator','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `last_seen`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Ana User', 'ana@example.com', '$2y$12$EnC/TW7EfLznokGJpXRukujQajC7Wl9GtL.rI2K6EvERBJOx4Ptoi', NULL, '2025-03-14 10:09:07', '2025-03-14 10:09:07', 'user'),
(2, 'Marko User', 'marko@example.com', '$2y$12$/qstLPCx4wdzqE0K8I3dk.NsYxSTY6aPMXcx3A1Z7KAwZNUhU/7DS', NULL, '2025-03-14 10:25:44', '2025-03-14 10:25:44', 'user'),
(3, 'Jelena User', 'jelena@example.com', '$2y$12$svbrx58xzIUcEyQvjCepFeZWD3GAJlePn017sBBBzPsAr3ED4NDxu', NULL, '2025-03-14 11:08:28', '2025-03-14 11:08:28', 'user'),
(4, 'Milica User', 'milica@example.com', '$2y$12$YJFrRqyso8PyKabf6nV8KOqJA78v.4moEJMbq9xHzRPqi.e5oQRyq', NULL, '2025-03-14 11:08:55', '2025-03-14 11:08:55', 'user'),
(5, 'marijana User', 'marijana@example.com', '$2y$12$029ZeMF50duXTVgo2lxi4Oiu4gemSpxWMqVH29BblCgeSwEiFQGkC', NULL, '2025-03-14 11:31:34', '2025-03-14 11:31:34', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversations_created_by_foreign` (`created_by`);

--
-- Indexes for table `conversation_user`
--
ALTER TABLE `conversation_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversation_user_user_id_foreign` (`user_id`),
  ADD KEY `conversation_user_conversation_id_foreign` (`conversation_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_conversation_id_foreign` (`conversation_id`);

--
-- Indexes for table `message_attachments`
--
ALTER TABLE `message_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `message_attachments_message_id_foreign` (`message_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `conversation_user`
--
ALTER TABLE `conversation_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `message_attachments`
--
ALTER TABLE `message_attachments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `conversation_user`
--
ALTER TABLE `conversation_user`
  ADD CONSTRAINT `conversation_user_conversation_id_foreign` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `conversation_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `message_attachments`
--
ALTER TABLE `message_attachments`
  ADD CONSTRAINT `message_attachments_message_id_foreign` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
