-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 14 Jun 2024 pada 20.01
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `health_plus_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','pasien') NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `password`, `role`, `status`, `created_at`, `updated_at`, `verified`) VALUES
(6, 'pasien', 'pasien', 'john@example.com', '$2a$10$eepQ55BWh/P/tkXbZSLBTObm0jMg521dpCW/aMzx/Umyf558XzhaK', 'admin', 'active', '2024-06-14 16:27:42', '2024-06-14 16:53:39', 1),
(9, 'pasien2', 'pasien', 'baru@example.com', '$2a$10$5ikVa7EIkrw5oQ6s8yRhfeaU4vh4BWL4BpYDg6LQFvQk7Wz4o0Nye', 'pasien', 'active', '2024-06-14 16:49:58', '2024-06-14 16:49:58', 0),
(11, 'pasien2', 'pasien', 'baru@example.com', '$2a$10$zA/aVPliHV.FPKWNezOOleRuJJJXN2wnvEaZ21BmPcvZ.3SfnaB4G', 'pasien', '1', '2024-06-14 17:27:46', '2024-06-14 17:27:46', 0),
(12, 'pasien2', 'pasien', 'baru@example.com', '$2a$10$m8Vy1oTlRyn5J140a0uaLuhhF/j0sR89t4RUmbds1cY/jsNfukeoO', 'pasien', '1', '2024-06-14 17:43:22', '2024-06-14 17:43:22', 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
