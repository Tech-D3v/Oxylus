-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2017 at 10:27 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oxylus`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `BrandID` int(11) NOT NULL,
  `BrandName` varchar(255) NOT NULL,
  `BrandDescription` text NOT NULL,
  `BrandImagePath` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`BrandID`, `BrandName`, `BrandDescription`, `BrandImagePath`) VALUES
(0, 'Dawn', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum nec est tristique maximus. Sed eget ante at sapien sollicitudin pharetra eget id lacus. Nunc vestibulum nulla posuere est venenatis hendrerit. Vestibulum urna est, eleifend sit amet risus et, tincidunt maximus sapien. Phasellus quis tempus tortor, et imperdiet arcu. Nullam a convallis elit. Suspendisse et maximus tortor. Ut viverra ultricies justo, non sagittis sem vulputate sed. Fusce iaculis, purus a finibus aliquet, tellus leo eleifend mi, eu semper turpis mauris ut nisi.', 'assets/images/sample1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `indexpage`
--

CREATE TABLE `indexpage` (
  `ID` int(11) NOT NULL,
  `Heading` varchar(255) NOT NULL,
  `Subheading` varchar(255) NOT NULL,
  `Text` text NOT NULL,
  `ImagePath` text NOT NULL,
  `BrandID` int(11) NOT NULL,
  `Carousel` varchar(5) NOT NULL,
  `Page` varchar(5) NOT NULL,
  `New` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `indexpage`
--

INSERT INTO `indexpage` (`ID`, `Heading`, `Subheading`, `Text`, `ImagePath`, `BrandID`, `Carousel`, `Page`, `New`) VALUES
(1, 'Dawn', 'Checkout our new Dawn Lineup', 'Dawn contains only natural elements that are natural and take your senses away from the moment.', 'assets/images/sample1.jpg', 0, 'true', 'true', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `ProductPrice` double NOT NULL,
  `ProductBasicDescription` varchar(255) NOT NULL,
  `ProductDetailedDescription` text NOT NULL,
  `ProductImagePath` text NOT NULL,
  `ProductCategory` text NOT NULL,
  `ProductBrandID` int(11) NOT NULL,
  `ProductStock` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `ProductPrice`, `ProductBasicDescription`, `ProductDetailedDescription`, `ProductImagePath`, `ProductCategory`, `ProductBrandID`, `ProductStock`) VALUES
(1, 'Dawn Shampoo', 9.99, 'Dawn Shampoo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum nec est tristique maximus. Sed eget ante at sapien sollicitudin pharetra eget id lacus. Nunc vestibulum nulla posuere est venenatis hendrerit. Vestibulum urna est, eleifend sit amet risus et, tincidunt maximus sapien. Phasellus quis tempus tortor, et imperdiet arcu. Nullam a convallis elit. Suspendisse et maximus tortor. Ut viverra ultricies justo, non sagittis sem vulputate sed. Fusce iaculis, purus a finibus aliquet, tellus leo eleifend mi, eu semper turpis mauris ut nisi.', 'assets/images/sample3.jpg', 'Shampoo, Dawn', 0, 10),
(2, 'Dawn Conditioner', 14.99, 'Dawn Conditioner', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum nec est tristique maximus. Sed eget ante at sapien sollicitudin pharetra eget id lacus. Nunc vestibulum nulla posuere est venenatis hendrerit. Vestibulum urna est, eleifend sit amet risus et, tincidunt maximus sapien. Phasellus quis tempus tortor, et imperdiet arcu. Nullam a convallis elit. Suspendisse et maximus tortor. Ut viverra ultricies justo, non sagittis sem vulputate sed. Fusce iaculis, purus a finibus aliquet, tellus leo eleifend mi, eu semper turpis mauris ut nisi.', 'assets/images/sample1.jpg', 'Conditioner, Dawn', 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Firstname` varchar(255) NOT NULL,
  `Surname` varchar(255) NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Address` text NOT NULL,
  `StripeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Email`, `Firstname`, `Surname`, `FullName`, `Password`, `Address`, `StripeID`) VALUES
(1, 'william@mannclan.net', 'Will', 'Mann', 'Will Mann', '$2y$10$1uqJm7Lz288YD9jxxZk.XOf1Z7h/oTuFqv7A20nbfDvKMm1vFXtk2', '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `indexpage`
--
ALTER TABLE `indexpage`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `indexpage`
--
ALTER TABLE `indexpage`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
