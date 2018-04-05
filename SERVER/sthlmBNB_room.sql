-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 04, 2018 at 10:42 PM
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
-- Table structure for table `sthlmBNB_room`
--

CREATE TABLE `sthlmBNB_room` (
  `room_ID` int(11) NOT NULL,
  `room_headline` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `room_description` text CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `room_cost` int(11) NOT NULL,
  `room_options` text COLLATE utf8_unicode_ci NOT NULL,
  `room_size` int(1) NOT NULL,
  `room_image_01` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `room_image_02` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sthlmBNB_room`
--

INSERT INTO `sthlmBNB_room` (`room_ID`, `room_headline`, `room_description`, `room_cost`, `room_options`, `room_size`, `room_image_01`, `room_image_02`) VALUES
(1, 'Enkelrum', 'Slå dig ner i fåtöljen med en bok eller slappa i sängen framför en film. Behöver du jobba lite kan du även sitta vid skrivbordet.', 500, 'Balkong\r\nDusch\r\nFritt wifi\r\nFåtölj \r\nGarderob\r\nHårtork\r\nKylskåp\r\nMörkläggningsgardiner\r\nRökfritt\r\nSkrivbord\r\nSminkspegel\r\nStadsutsikt\r\nStrykjärn och strykbräda\r\nSäkerhetsskåp\r\nTrägolv\r\nTV\r\nUtsikt mot gatan', 1, 'enkelrum_01.jpg', 'enkelrum_02.jpg'),
(2, 'Dubbelrum', 'Bo stort och bekvämt med härlig utsikt över Humlegården. Vila ut i den sköna sängen innan det är dags för kvällens nöjen.', 700, 'Badkar\r\nBadrum med dusch eller badkar \r\nBalkong eller terrass \r\nFritt wifi \r\nFåtölj \r\nGarderob \r\nHårtork \r\nKylskåp \r\nMörkläggningsgardiner \r\nRökfritt \r\nSkrivbord \r\nSminkspegel \r\nSoffa/soffor \r\nStrykjärn och strykbräda \r\nSäkerhetsskåp \r\nTrägolv \r\nTV \r\nUtsikt mot park', 2, 'dubbelrum_01.jpg', 'dubbelrum_02.jpg'),
(3, 'Familjerum', 'Vila ut efter en äventyrlig dag. Stora, bekväma rum med storstadskänsla och utsikt mot gatorna utanför. Koppla av i badkaret innan du möter stadens puls igen.', 900, 'Badkar \r\nDusch\r\nFotpall \r\nFritt wifi \r\nFåtölj \r\nFönsternisch \r\nHårtork \r\nKaffe-/tekokare \r\nKylskåp \r\nMörkläggningsgardiner \r\nRökfritt \r\nSkrivbord \r\nStrykjärn och strykbräda \r\nSäkerhetsskåp \r\nTrägolv \r\nTV \r\nUtsikt mot gatan \r\nVåningssäng', 5, 'familjerum_01.jpg', 'familjerum_02.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sthlmBNB_room`
--
ALTER TABLE `sthlmBNB_room`
  ADD PRIMARY KEY (`room_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sthlmBNB_room`
--
ALTER TABLE `sthlmBNB_room`
  MODIFY `room_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
