-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2020 at 03:36 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kunokhar_timesheet_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `allocate_client_tb`
--

CREATE TABLE `allocate_client_tb` (
  `allocate_id` int(11) NOT NULL,
  `allocate_client_id` int(11) NOT NULL,
  `allocate_emp_id` int(11) NOT NULL,
  `allocate_date_allocated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `client_tb`
--

CREATE TABLE `client_tb` (
  `client_id` int(11) NOT NULL,
  `client_fname` varchar(100) COLLATE utf8_bin NOT NULL,
  `client_lname` varchar(100) COLLATE utf8_bin NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `client_tb`
--

INSERT INTO `client_tb` (`client_id`, `client_fname`, `client_lname`, `date_created`) VALUES
(1, 'Sinethemba', 'Mgoqi', '2020-02-16 19:02:08'),
(2, 'Sibusiso', 'Dlomo', '2020-02-22 16:02:04'),
(3, 'Simamkele', 'Ndabeni', '2020-02-22 17:02:22');

-- --------------------------------------------------------

--
-- Table structure for table `employee_tb`
--

CREATE TABLE `employee_tb` (
  `emp_id` int(11) NOT NULL,
  `emp_fname` varchar(100) COLLATE utf8_bin NOT NULL,
  `emp_lname` varchar(100) COLLATE utf8_bin NOT NULL,
  `emp_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `emp_password` text COLLATE utf8_bin NOT NULL,
  `emp_date_created` datetime NOT NULL,
  `emp_power` int(11) NOT NULL,
  `emp_active_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `employee_tb`
--

INSERT INTO `employee_tb` (`emp_id`, `emp_fname`, `emp_lname`, `emp_email`, `emp_password`, `emp_date_created`, `emp_power`, `emp_active_status`) VALUES
(3, 'Masibulele', 'Mgoqi', 'masibulelemgoqi@gmail.com', '$2y$10$Xs2yk95Coyjczd.I6ErVuutHjjXI62MdNCtT.HRPOX6QrJhDNsOeq', '2020-02-16 19:02:25', 1, 0),
(4, 'Simamkele', 'Ndabeni', 'smaverns@gmail.com', '$2y$10$aFCnGrHwkMRATKThqvPHzeOTdOc.7vzMEBmyx0naUzUAzypbHLtbm', '2020-02-16 19:02:48', 0, 0),
(13, 'Masibulele', 'Mgoqi', 'masibulelemgoqi@kunokhar.co.za', '$2y$10$fmEJEoRGHNfsu23SU0o9JO3n4UMyag7fsxRFp8GiteW4XgOE.98L.', '2020-02-23 13:02:28', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `register_tb`
--

CREATE TABLE `register_tb` (
  `reg_id` int(11) NOT NULL,
  `reg_emp_id` int(11) NOT NULL,
  `reg_enter_time` datetime NOT NULL,
  `reg_exit_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `task_tb`
--

CREATE TABLE `task_tb` (
  `task_id` int(11) NOT NULL,
  `task_emp_id` int(11) DEFAULT NULL,
  `task_client_id` int(11) NOT NULL,
  `task_date_posted` datetime NOT NULL,
  `task_start_time` datetime DEFAULT NULL,
  `task_finish_time` datetime DEFAULT NULL,
  `task_name` varchar(200) COLLATE utf8_bin NOT NULL,
  `task_status` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'Unallocated',
  `task_importance` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `task_duration` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `task_deadline` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `task_tb`
--

INSERT INTO `task_tb` (`task_id`, `task_emp_id`, `task_client_id`, `task_date_posted`, `task_start_time`, `task_finish_time`, `task_name`, `task_status`, `task_importance`, `task_duration`, `task_deadline`) VALUES
(1, NULL, 1, '2020-02-23 13:02:49', NULL, NULL, 'update Website', 'Unallocated', 'Very urgent', NULL, '2020-02-19 12:02:00'),
(2, NULL, 2, '0000-00-00 00:00:00', NULL, NULL, 'Clean', 'Unallocated', 'Very urgent', NULL, '2020-02-05 05:02:00'),
(3, NULL, 2, '2020-02-23 15:02:05', NULL, NULL, 'Cooks', 'Unallocated', 'Very urgent', NULL, '2020-02-12 08:02:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allocate_client_tb`
--
ALTER TABLE `allocate_client_tb`
  ADD PRIMARY KEY (`allocate_id`),
  ADD KEY `allocate_client_id` (`allocate_client_id`),
  ADD KEY `allocate_emp_id` (`allocate_emp_id`);

--
-- Indexes for table `client_tb`
--
ALTER TABLE `client_tb`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `employee_tb`
--
ALTER TABLE `employee_tb`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `register_tb`
--
ALTER TABLE `register_tb`
  ADD PRIMARY KEY (`reg_id`),
  ADD KEY `reg_emp_id` (`reg_emp_id`);

--
-- Indexes for table `task_tb`
--
ALTER TABLE `task_tb`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `task_emp_id` (`task_emp_id`),
  ADD KEY `task_client_id` (`task_client_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allocate_client_tb`
--
ALTER TABLE `allocate_client_tb`
  MODIFY `allocate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_tb`
--
ALTER TABLE `client_tb`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_tb`
--
ALTER TABLE `employee_tb`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `register_tb`
--
ALTER TABLE `register_tb`
  MODIFY `reg_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_tb`
--
ALTER TABLE `task_tb`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `allocate_client_tb`
--
ALTER TABLE `allocate_client_tb`
  ADD CONSTRAINT `allocate_client_tb_ibfk_1` FOREIGN KEY (`allocate_emp_id`) REFERENCES `employee_tb` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `allocate_client_tb_ibfk_2` FOREIGN KEY (`allocate_client_id`) REFERENCES `client_tb` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `register_tb`
--
ALTER TABLE `register_tb`
  ADD CONSTRAINT `register_tb_ibfk_1` FOREIGN KEY (`reg_id`) REFERENCES `employee_tb` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_tb`
--
ALTER TABLE `task_tb`
  ADD CONSTRAINT `task_tb_ibfk_1` FOREIGN KEY (`task_emp_id`) REFERENCES `employee_tb` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_tb_ibfk_2` FOREIGN KEY (`task_client_id`) REFERENCES `client_tb` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
