-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 04, 2018 at 11:20 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u275686932_info`
--

-- --------------------------------------------------------

--
-- Table structure for table `sthlmBNB_reservation`
--

CREATE TABLE `sthlmBNB_reservation` (
  `reservation_ID` int(11) NOT NULL,
  `reservation_firstname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `reservation_lastname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `reservation_email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `reservation_phone` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `reservation_room_id` int(50) NOT NULL,
  `reservation_room_headline` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `reservation_adult` int(1) NOT NULL,
  `reservation_child` int(1) NOT NULL,
  `reservation_arrival` int(2) NOT NULL,
  `reservation_department` int(2) NOT NULL,
  `reservation_total_days` int(5) NOT NULL,
  `reservation_total_cost` int(20) NOT NULL,
  `reservation_one_cost` int(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sthlmBNB_reservation`
--

INSERT INTO `sthlmBNB_reservation` (`reservation_ID`, `reservation_firstname`, `reservation_lastname`, `reservation_email`, `reservation_phone`, `reservation_room_id`, `reservation_room_headline`, `reservation_adult`, `reservation_child`, `reservation_arrival`, `reservation_department`, `reservation_total_days`, `reservation_total_cost`, `reservation_one_cost`) VALUES
(125, 'Nettan', 'Johansson', 'nettan@n.se', '4444', 3, 'Familjerum', 1, 2, 21, 23, 3, 2700, 900),
(124, 'Anders', 'Ek', 'ekposten@eken.se', '4433', 1, 'Enkelrum', 1, 0, 8, 9, 2, 1000, 500),
(122, 'Steffo', 'Dimfelt', 'steffo.dimfelt@gmail.com', '998899', 1, 'Enkelrum', 1, 0, 2, 4, 3, 1500, 500),
(123, 'Janet', 'Larsson', 'janet@larsson.se', '222', 1, 'Enkelrum', 1, 0, 16, 19, 4, 2000, 500);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sthlmBNB_reservation`
--
ALTER TABLE `sthlmBNB_reservation`
  ADD PRIMARY KEY (`reservation_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sthlmBNB_reservation`
--
ALTER TABLE `sthlmBNB_reservation`
  MODIFY `reservation_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
