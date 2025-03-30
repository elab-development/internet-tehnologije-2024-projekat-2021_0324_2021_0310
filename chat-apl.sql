-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Mar 29, 2025 at 01:22 PM
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
(7, 1, 3, 'g', '2025-03-26 10:35:43', '2025-03-26 10:35:43'),
(8, 1, 3, 'g', '2025-03-26 10:35:43', '2025-03-26 10:35:43'),
(9, 1, 1, 'da', '2025-03-26 10:43:07', '2025-03-26 10:43:07'),
(10, 1, 3, 'sta radite', '2025-03-26 10:43:27', '2025-03-26 10:43:27'),
(11, 1, 1, 'gde si', '2025-03-26 11:06:18', '2025-03-26 11:06:18'),
(14, 1, 1, 'kad dolazis', '2025-03-26 11:10:28', '2025-03-26 11:10:28'),
(20, 1, 1, 'je l si stigao', '2025-03-26 11:17:30', '2025-03-26 11:17:30'),
(21, 1, 3, 'gde ste', '2025-03-26 13:59:16', '2025-03-26 13:59:16'),
(22, 1, 1, 'hej', '2025-03-27 13:04:59', '2025-03-27 13:04:59'),
(23, 2, 1, 'ee', '2025-03-27 13:06:23', '2025-03-27 13:06:23'),
(24, 2, 1, 'ee', '2025-03-27 13:43:34', '2025-03-27 13:43:34'),
(25, 2, 1, 'ee', '2025-03-27 13:43:42', '2025-03-27 13:43:42'),
(28, 2, 1, 'ee', '2025-03-27 13:43:44', '2025-03-27 13:43:44'),
(29, 2, 1, 'ee', '2025-03-27 13:43:45', '2025-03-27 13:43:45'),
(30, 2, 1, 'ee', '2025-03-27 13:43:46', '2025-03-27 13:43:46'),
(31, 2, 1, 'ee', '2025-03-27 13:43:50', '2025-03-27 13:43:50'),
(32, 2, 1, 'ee', '2025-03-27 13:43:51', '2025-03-27 13:43:51'),
(33, 2, 1, 'ee', '2025-03-27 13:43:52', '2025-03-27 13:43:52'),
(34, 2, 1, 'ee', '2025-03-27 13:43:53', '2025-03-27 13:43:53'),
(35, 2, 1, 'ee', '2025-03-27 13:43:53', '2025-03-27 13:43:53'),
(36, 2, 1, 'ee', '2025-03-27 13:43:54', '2025-03-27 13:43:54'),
(38, 2, 1, 'j', '2025-03-27 13:44:08', '2025-03-27 13:44:08');

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
(16, '2025_03_09_095535_create_cache_table', 1),
(17, '2025_03_29_114249_create_reported_messages_table', 2),
(18, '2025_03_29_114336_create_reported_messages_table', 3),
(19, '2025_03_29_114343_create_reported_messages_table', 4),
(20, '2025_03_29_120522_add_suspended_until_to_users_table', 5);

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
(6, 'App\\Models\\User', 5, 'auth_token', '2be208f5629fa7cab4514fde6c550049fafa2b804020191baac31d97be3ce118', '[\"*\"]', NULL, NULL, '2025-03-14 11:31:34', '2025-03-14 11:31:34'),
(7, 'App\\Models\\User', 1, 'auth_token', '0c828d291393a8bf413f7b5defffe67ef163be47622bfb80f9bd7c020f2d7aae', '[\"*\"]', NULL, NULL, '2025-03-25 11:00:59', '2025-03-25 11:00:59'),
(8, 'App\\Models\\User', 1, 'auth_token', '204914a1f3e11a56c96ce1413118386b8c6b8dab81f99dd3d2e750b896421a4c', '[\"*\"]', NULL, NULL, '2025-03-25 11:05:06', '2025-03-25 11:05:06'),
(9, 'App\\Models\\User', 1, 'auth_token', '6161fd188498706124a3eb4bd4b96d6849d9ef8239e9d40a947c7d21f08d7336', '[\"*\"]', NULL, NULL, '2025-03-25 11:19:12', '2025-03-25 11:19:12'),
(10, 'App\\Models\\User', 1, 'auth_token', '1116c4f013a942d34bbd135abd2311ea5c36b9317b28b8c8cda149eb7cf06e87', '[\"*\"]', '2025-03-25 12:39:12', NULL, '2025-03-25 11:44:50', '2025-03-25 12:39:12'),
(11, 'App\\Models\\User', 1, 'auth_token', 'ab288560ce631a2a5742c3541a830ec02d46b06df9ee54f45017d3a5b8b30760', '[\"*\"]', NULL, NULL, '2025-03-25 11:58:13', '2025-03-25 11:58:13'),
(12, 'App\\Models\\User', 1, 'auth_token', '25f7973ec590d4139f22611d647dd350b5077875fa083bb32ceb9f82f2396dd4', '[\"*\"]', NULL, NULL, '2025-03-25 11:58:16', '2025-03-25 11:58:16'),
(13, 'App\\Models\\User', 1, 'auth_token', '820ab1f20b3b83f981c621e76bcccfbfc720b22b3915e9bd6a4839140905334b', '[\"*\"]', NULL, NULL, '2025-03-25 11:58:36', '2025-03-25 11:58:36'),
(14, 'App\\Models\\User', 1, 'auth_token', '1e8877a4da0566e6c8cd202a591eb0075e808faf9bfdce0b065eeda8b9cb6fed', '[\"*\"]', NULL, NULL, '2025-03-25 11:58:39', '2025-03-25 11:58:39'),
(15, 'App\\Models\\User', 1, 'auth_token', '84e9bd7254b3e584bc707cb7e5d1b8b774a4bd224253c722cfe3b5ccbe90d1ac', '[\"*\"]', NULL, NULL, '2025-03-25 12:02:44', '2025-03-25 12:02:44'),
(16, 'App\\Models\\User', 1, 'auth_token', '18c7a2edc713489a91f2a4e90f8b860fab9d058be886ef194c1972ba1ad553bf', '[\"*\"]', NULL, NULL, '2025-03-25 12:02:47', '2025-03-25 12:02:47'),
(17, 'App\\Models\\User', 1, 'auth_token', 'e27413d5997b3b88b476d2e27061e1d485c7e8d1f3e6657a872cba7cbcccbab4', '[\"*\"]', NULL, NULL, '2025-03-25 12:03:45', '2025-03-25 12:03:45'),
(18, 'App\\Models\\User', 1, 'auth_token', '02e910fa09578be988463a5fcd8a9e1deb2e5499d0d24f3adaa41b85bd145968', '[\"*\"]', NULL, NULL, '2025-03-25 12:03:48', '2025-03-25 12:03:48'),
(19, 'App\\Models\\User', 1, 'auth_token', 'd0a5e77242740983cb3f9bc70c0f3df853deddb50e3ddad1683feab270c8e26b', '[\"*\"]', '2025-03-25 12:44:26', NULL, '2025-03-25 12:06:06', '2025-03-25 12:44:26'),
(20, 'App\\Models\\User', 1, 'auth_token', '5fcf876a3a3934ad1a398b7883d7bd61e6e284aafe45634fe1203c49e00b8d54', '[\"*\"]', '2025-03-25 12:55:38', NULL, '2025-03-25 12:52:51', '2025-03-25 12:55:38'),
(21, 'App\\Models\\User', 1, 'auth_token', '62e19e4ddb68e1add867e7385becbd2d61162837528bc4ca61786a71e81c4778', '[\"*\"]', '2025-03-25 13:08:10', NULL, '2025-03-25 13:07:44', '2025-03-25 13:08:10'),
(22, 'App\\Models\\User', 1, 'auth_token', 'ef4034b9611064e226e7069ba5d57b98de1e1451d65755ae250173dad16f1d80', '[\"*\"]', '2025-03-26 10:24:26', NULL, '2025-03-26 10:24:15', '2025-03-26 10:24:26'),
(23, 'App\\Models\\User', 1, 'auth_token', '65bdc3c4c5695757af8a63ceafe84bcdc1f1af1eeeed1b058fef30114433fa76', '[\"*\"]', '2025-03-26 10:24:27', NULL, '2025-03-26 10:24:19', '2025-03-26 10:24:27'),
(24, 'App\\Models\\User', 1, 'auth_token', '38bd7b004cd610288bb95d49ef0ee3630c4ac9363b368a9287722e94e640e5c9', '[\"*\"]', '2025-03-26 11:27:01', NULL, '2025-03-26 10:24:21', '2025-03-26 11:27:01'),
(25, 'App\\Models\\User', 1, 'auth_token', 'f72bd9501453c57af796610b3234d05abe2b03cd5ff22a70ed3790625de05aca', '[\"*\"]', '2025-03-26 13:59:19', NULL, '2025-03-26 13:59:02', '2025-03-26 13:59:19'),
(26, 'App\\Models\\User', 1, 'auth_token', 'de9e4eece88668ff62f5b86e932318004cf073caefa497f675b5cbc9177a4810', '[\"*\"]', '2025-03-27 13:04:49', NULL, '2025-03-27 13:04:43', '2025-03-27 13:04:49'),
(27, 'App\\Models\\User', 1, 'auth_token', '9ef3f26199e6970c4b61f1ddc965ddfbefe570f57b6aa18f8df82db5855fcfcd', '[\"*\"]', '2025-03-27 13:04:59', NULL, '2025-03-27 13:04:47', '2025-03-27 13:04:59'),
(28, 'App\\Models\\User', 2, 'auth_token', 'c4e0b834f9e481a1be36693197abb1607e1b921d7b3a7260b05f1b13530ddac7', '[\"*\"]', '2025-03-27 13:06:58', NULL, '2025-03-27 13:06:12', '2025-03-27 13:06:58'),
(29, 'App\\Models\\User', 1, 'auth_token', '24cd31ce644ded280c9181bba366284adb1884dd6ea76816e9bfafadeb40cd25', '[\"*\"]', '2025-03-27 13:27:55', NULL, '2025-03-27 13:27:48', '2025-03-27 13:27:55'),
(30, 'App\\Models\\User', 2, 'auth_token', 'e3cd1377307bf51f5977b5280447da471fdd308bcb21757a2274137cb3e329e4', '[\"*\"]', '2025-03-27 13:28:31', NULL, '2025-03-27 13:28:23', '2025-03-27 13:28:31'),
(31, 'App\\Models\\User', 2, 'auth_token', 'a5ca91c544f51c3e487337835f013b8725bbc988fefd96fb630d2d02ee69352a', '[\"*\"]', '2025-03-27 13:28:33', NULL, '2025-03-27 13:28:25', '2025-03-27 13:28:33'),
(32, 'App\\Models\\User', 2, 'auth_token', 'd2cab6145deb821bc5cce638df4baa40c489f06a77e30a72532fb6347023d6f8', '[\"*\"]', '2025-03-27 13:44:08', NULL, '2025-03-27 13:28:29', '2025-03-27 13:44:08'),
(33, 'App\\Models\\User', 2, 'auth_token', 'a4a69e5ba81825b1d5bde94899b65588a465b9d3e3bb9c305a86e630142e206e', '[\"*\"]', '2025-03-28 16:26:43', NULL, '2025-03-28 16:18:05', '2025-03-28 16:26:43'),
(34, 'App\\Models\\User', 1, 'auth_token', '5fb5af435055b47caa94d77db476324a23aea30b64c270af84b05f788773fa70', '[\"*\"]', NULL, NULL, '2025-03-28 16:33:49', '2025-03-28 16:33:49'),
(35, 'App\\Models\\User', 1, 'auth_token', 'd3fe3da857ff38610dc444150b234735322bfbfeef274ef09f674e077a712f39', '[\"*\"]', '2025-03-28 17:04:24', NULL, '2025-03-28 16:33:50', '2025-03-28 17:04:24'),
(36, 'App\\Models\\User', 2, 'auth_token', '375d8af60e1e81542cad80df46e4a26a1b75ae0bda7b6389741250f40203755e', '[\"*\"]', '2025-03-29 09:43:56', NULL, '2025-03-29 09:43:33', '2025-03-29 09:43:56'),
(37, 'App\\Models\\User', 2, 'auth_token', 'b5f8dbc82462b3d7d694be956d787ed5f1c6240b71fce685c3945609383f1578', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:40', '2025-03-29 09:43:40'),
(38, 'App\\Models\\User', 2, 'auth_token', '936c6e6550adf553e52a523f664f065fa06faedaf8964a800750b57401584bfc', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:41', '2025-03-29 09:43:41'),
(39, 'App\\Models\\User', 2, 'auth_token', '9037ed2b24c3ba194e4321f4e78f66699d0555cdb6f8461182cf5d2e45a119f3', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:42', '2025-03-29 09:43:42'),
(40, 'App\\Models\\User', 2, 'auth_token', '6c5b84e50d5d77998eadfda54939cf5a1485e0cfe59e0dac84c102fbd6cc3327', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:44', '2025-03-29 09:43:44'),
(41, 'App\\Models\\User', 2, 'auth_token', '216583b1f312588b737ae4339c81f9dcf8d9e04fb3233422a7689e1722d50656', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:45', '2025-03-29 09:43:45'),
(42, 'App\\Models\\User', 2, 'auth_token', 'f363a5ecfbb363e6cc5b198568f4147f4a9fbf060cd13c9efb1f8c95894c872e', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:46', '2025-03-29 09:43:46'),
(43, 'App\\Models\\User', 2, 'auth_token', 'a6e3cb67699a4b067a58c0a740e4379e72dfd1261d0637cf1500b6a2bc956f79', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:47', '2025-03-29 09:43:47'),
(44, 'App\\Models\\User', 2, 'auth_token', '028f6d847126cd72ad9879145476815fe01eb0ec07930ff94674c8de74d36ce9', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:48', '2025-03-29 09:43:48'),
(45, 'App\\Models\\User', 2, 'auth_token', '0d4f0de258bc255a70d0dca4bea651118fa7ac5c698dd71007b42570fb33bf71', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:49', '2025-03-29 09:43:49'),
(46, 'App\\Models\\User', 2, 'auth_token', 'a7b2342fdd9f3fc7c954265a3e4cb028c6471f170a7ff0904d64cb862fff6221', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:50', '2025-03-29 09:43:50'),
(47, 'App\\Models\\User', 2, 'auth_token', '19e94237a8d7affa89d2bd8e8b18ae54a00fffdcbfc2d83c3b2fe0bd8355c923', '[\"*\"]', NULL, NULL, '2025-03-29 09:43:52', '2025-03-29 09:43:52'),
(48, 'App\\Models\\User', 2, 'auth_token', 'bd8815fadc286c618e9b462f204275084e71e1835d9a9de52cc0ee0d40a847aa', '[\"*\"]', '2025-03-29 11:14:20', NULL, '2025-03-29 09:43:53', '2025-03-29 11:14:20'),
(49, 'App\\Models\\User', 1, 'auth_token', 'cb0e5d65a10f20cf3bba364f54917cd84b332260757e6699405fb7acaa972d51', '[\"*\"]', '2025-03-29 10:35:54', NULL, '2025-03-29 10:35:24', '2025-03-29 10:35:54'),
(50, 'App\\Models\\User', 1, 'auth_token', 'cc1d72317f71e8c7b2025f800dbc9c95e1d2ed06a2724afb8b39e5340b0d00a5', '[\"*\"]', '2025-03-29 11:18:26', NULL, '2025-03-29 11:14:38', '2025-03-29 11:18:26');

-- --------------------------------------------------------

--
-- Table structure for table `reported_messages`
--

CREATE TABLE `reported_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `message_id` bigint(20) UNSIGNED NOT NULL,
  `reported_by` bigint(20) UNSIGNED NOT NULL,
  `reason` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reported_messages`
--

INSERT INTO `reported_messages` (`id`, `message_id`, `reported_by`, `reason`, `details`, `created_at`, `updated_at`) VALUES
(1, 5, 2, 'harassment', NULL, '2025-03-29 10:56:59', '2025-03-29 10:56:59'),
(2, 20, 2, 'harassment', NULL, '2025-03-29 10:57:10', '2025-03-29 10:57:10'),
(3, 3, 1, 'spam', NULL, '2025-03-29 11:14:50', '2025-03-29 11:14:50');

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
  `role` enum('admin','moderator','user') NOT NULL DEFAULT 'user',
  `suspended_until` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `last_seen`, `created_at`, `updated_at`, `role`, `suspended_until`) VALUES
(1, 'Ana User', 'ana@example.com', '$2y$12$kfkti6gC8fQaKqqd0iHpteMvFCL.G9QnhXlty9BW8w3vnVK.7yHtK', NULL, '2025-03-14 10:09:07', '2025-03-25 11:04:50', 'user', NULL),
(2, 'Marko User', 'marko@example.com', '$2y$12$I4z6BeCIoSMvnGm4YD3i/OMwthWklRxycct0iZTwM8M.Ei.0vpumG', NULL, '2025-03-14 10:25:44', '2025-03-27 13:05:54', 'user', NULL),
(3, 'Jelena User', 'jelena@example.com', '$2y$12$svbrx58xzIUcEyQvjCepFeZWD3GAJlePn017sBBBzPsAr3ED4NDxu', NULL, '2025-03-14 11:08:28', '2025-03-14 11:08:28', 'user', NULL),
(4, 'Milica User', 'milica@example.com', '$2y$12$YJFrRqyso8PyKabf6nV8KOqJA78v.4moEJMbq9xHzRPqi.e5oQRyq', NULL, '2025-03-14 11:08:55', '2025-03-14 11:08:55', 'user', NULL),
(5, 'marijana User', 'marijana@example.com', '$2y$12$029ZeMF50duXTVgo2lxi4Oiu4gemSpxWMqVH29BblCgeSwEiFQGkC', NULL, '2025-03-14 11:31:34', '2025-03-14 11:31:34', 'user', NULL);

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
-- Indexes for table `reported_messages`
--
ALTER TABLE `reported_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reported_messages_message_id_foreign` (`message_id`),
  ADD KEY `reported_messages_reported_by_foreign` (`reported_by`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `message_attachments`
--
ALTER TABLE `message_attachments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `reported_messages`
--
ALTER TABLE `reported_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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

--
-- Constraints for table `reported_messages`
--
ALTER TABLE `reported_messages`
  ADD CONSTRAINT `reported_messages_message_id_foreign` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reported_messages_reported_by_foreign` FOREIGN KEY (`reported_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
