-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 10.0.40.17:3307
-- Generation Time: Jul 01, 2025 at 04:41 PM
-- Server version: 11.7.2-MariaDB
-- PHP Version: 8.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healandmir`
--

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `subscriberId` int(11) NOT NULL,
  `title` varchar(30) NOT NULL DEFAULT '-',
  `firstname` varchar(35) DEFAULT NULL,
  `lastname` varchar(35) DEFAULT NULL,
  `email` varchar(45) NOT NULL DEFAULT '-',
  `phone` varchar(20) DEFAULT '-',
  `kc_phone` varchar(30) NOT NULL DEFAULT '-',
  `kc_confirmed` int(11) NOT NULL DEFAULT 0,
  `country` varchar(150) DEFAULT '''-''',
  `ip_address` varchar(25) NOT NULL DEFAULT '-',
  `state` varchar(120) NOT NULL DEFAULT '''-''',
  `city` varchar(50) NOT NULL DEFAULT '-',
  `language` varchar(60) NOT NULL DEFAULT '-',
  `birthday` date DEFAULT NULL,
  `participants` int(11) NOT NULL DEFAULT 1,
  `crypt_val` varchar(80) DEFAULT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `zoneId` int(11) NOT NULL DEFAULT 0,
  `sub_zoneId` int(11) NOT NULL DEFAULT 0,
  `cell_id` int(11) NOT NULL DEFAULT 0,
  `familyId` int(11) NOT NULL DEFAULT 0,
  `zoneId_net` int(11) NOT NULL DEFAULT 0,
  `familyId_net` int(11) NOT NULL DEFAULT 0,
  `ministry_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `department` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `deptId` int(11) NOT NULL DEFAULT 0,
  `vc_refId` int(11) NOT NULL DEFAULT 0,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `confirmed` int(1) NOT NULL DEFAULT 0,
  `valid_email` int(11) NOT NULL DEFAULT 0,
  `dispatch` int(1) NOT NULL DEFAULT 0,
  `seen` int(11) NOT NULL DEFAULT 0,
  `presubscribed` int(1) NOT NULL DEFAULT 0,
  `gmfs_reg` varchar(20) NOT NULL DEFAULT '-',
  `previous_student` varchar(15) DEFAULT '-',
  `financial_partner` int(11) NOT NULL DEFAULT 0,
  `partner` int(11) NOT NULL DEFAULT 0,
  `donation_categories` varchar(250) NOT NULL DEFAULT '-',
  `partner_regdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `translator` int(11) NOT NULL DEFAULT 0,
  `httnlive` varchar(8) NOT NULL DEFAULT '-',
  `exhibition` varchar(7) NOT NULL DEFAULT '-',
  `hsopc` varchar(20) NOT NULL DEFAULT '-',
  `hsopc_moved` int(11) NOT NULL DEFAULT 0,
  `hslhs` varchar(8) NOT NULL DEFAULT '-',
  `gdop` varchar(10) NOT NULL DEFAULT '-',
  `ylw` varchar(15) NOT NULL DEFAULT '-',
  `herald` int(11) NOT NULL DEFAULT 0,
  `httn_app` int(11) NOT NULL DEFAULT 0,
  `profile_picture` varchar(80) NOT NULL DEFAULT '-',
  `view_lang` varchar(50) NOT NULL DEFAULT '-',
  `db_move` int(11) NOT NULL DEFAULT 0,
  `unsubscribe` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`subscriberId`, `title`, `firstname`, `lastname`, `email`, `phone`, `kc_phone`, `kc_confirmed`, `country`, `ip_address`, `state`, `city`, `language`, `birthday`, `participants`, `crypt_val`, `password`, `zoneId`, `sub_zoneId`, `cell_id`, `familyId`, `zoneId_net`, `familyId_net`, `ministry_name`, `department`, `deptId`, `vc_refId`, `login_time`, `timestamp`, `confirmed`, `valid_email`, `dispatch`, `seen`, `presubscribed`, `gmfs_reg`, `previous_student`, `financial_partner`, `partner`, `donation_categories`, `partner_regdate`, `translator`, `httnlive`, `exhibition`, `hsopc`, `hsopc_moved`, `hslhs`, `gdop`, `ylw`, `herald`, `httn_app`, `profile_picture`, `view_lang`, `db_move`, `unsubscribe`) VALUES
(1, '-', 'Uwem', 'Udofia', 'uwemudofia.hsch@gmail.com', '08062754443', '-', 0, 'Nigeria', '105.112.182.151', 'Lagos', 'Lagos', 'English', '1900-01-01', 1, '$1$$CyPPzcD5EduxIoT1wwFBs/', '0', 40, 0, 0, 40, 0, 0, '-', '-', 0, 578, '2023-11-27 10:37:00', '2024-06-14 11:56:27', 1, 1, 0, 1, 0, 'GMFSAug21', '', 11, 1, 'Healing Everywhere', '2023-06-29 15:00:10', 0, 'Jan23', '-', '-', 0, 'Jul24', '-', '-', 0, 0, '-', 'English', 5, 0),
(6, '-', 'Chinenye adaeze', 'Agwazim ', 'aguc225@gmail.com', '-', '-', 0, 'Nigeria', '-', '-', '-', '-', NULL, 1, '$1$$nRqcfWL0xWrd2JKMxZp7M/', '0', 1226, 0, 0, 0, 0, 0, '-', '-', 0, 0, '2021-01-01 00:00:00', '2021-06-30 19:14:55', 1, 1, 0, 0, 1, '-', '-', 0, 0, '-', '2022-05-13 11:01:35', 0, '0', '-', '-', 0, '-', '-', '-', 0, 0, '-', '-', 5, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`subscriberId`),
  ADD UNIQUE KEY `emal` (`email`),
  ADD KEY `crypt_val` (`crypt_val`),
  ADD KEY `zoneId` (`zoneId`),
  ADD KEY `familyId` (`familyId`),
  ADD KEY `vc_refId` (`vc_refId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `subscriberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14014318;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
