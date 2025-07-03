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
-- Table structure for table `virtual_centre_ref`
--

CREATE TABLE `virtual_centre_ref` (
  `vc_refId` int(11) NOT NULL,
  `ref` varchar(12) NOT NULL DEFAULT '-',
  `vc_managerId` int(11) NOT NULL DEFAULT 0,
  `zoneId` int(11) NOT NULL DEFAULT 0,
  `sub_zoneId` int(11) NOT NULL DEFAULT 0,
  `cell_id` int(11) NOT NULL DEFAULT 0,
  `familyId` int(11) NOT NULL DEFAULT 0,
  `linkId` int(11) NOT NULL DEFAULT 0,
  `httn_points_old` int(11) NOT NULL DEFAULT 0,
  `httn_points_new` int(11) NOT NULL DEFAULT 0,
  `individual_reg` int(11) NOT NULL DEFAULT 0,
  `bulk_reg` int(11) NOT NULL DEFAULT 0,
  `amplify_reg` int(11) NOT NULL DEFAULT 0,
  `moved` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `move_msg` varchar(60) NOT NULL DEFAULT '-',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_ref_date` datetime NOT NULL DEFAULT '1000-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `virtual_centre_ref`
--

INSERT INTO `virtual_centre_ref` (`vc_refId`, `ref`, `vc_managerId`, `zoneId`, `sub_zoneId`, `cell_id`, `familyId`, `linkId`, `httn_points_old`, `httn_points_new`, `individual_reg`, `bulk_reg`, `amplify_reg`, `moved`, `status`, `move_msg`, `timestamp`, `update_ref_date`) VALUES
(22, 'JIDEM12', 386002, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '-', '2021-02-22 21:21:19', '1000-01-01 00:00:00'),
(23, 'PEEKAAY', 1892, 40, 0, 0, 40, 0, 4, 3, 0, 0, 0, 2, 1, 'Channel username has been taken', '2021-02-23 11:52:00', '2025-03-10 09:10:42'),
(24, 'Bvas', 212477, 1215, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 1, '-', '2021-02-24 21:18:21', '1000-01-01 00:00:00'),
(25, 'Meleza', 102517, 495, 0, 0, 46, 2, 0, 0, 0, 0, 0, 2, 1, 'Channel username has been taken', '2021-02-25 05:36:33', '1000-01-01 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `virtual_centre_ref`
--
ALTER TABLE `virtual_centre_ref`
  ADD PRIMARY KEY (`vc_refId`),
  ADD UNIQUE KEY `ref` (`ref`),
  ADD KEY `vc_managerId` (`vc_managerId`),
  ADD KEY `zoneId` (`zoneId`),
  ADD KEY `familyId` (`familyId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `virtual_centre_ref`
--
ALTER TABLE `virtual_centre_ref`
  MODIFY `vc_refId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4850227;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
