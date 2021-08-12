-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 14 juin 2021 à 07:36
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jobdate`
--

-- --------------------------------------------------------

--
-- Structure de la table `depot_offre_emploi`
--

DROP TABLE IF EXISTS `depot_offre_emploi`;
CREATE TABLE IF NOT EXISTS `depot_offre_emploi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_professionnel` int(11) NOT NULL,
  `intitule_poste` varchar(255) NOT NULL,
  `type_contrat` varchar(50) NOT NULL,
  `prise_fct` date NOT NULL,
  `fin_contrat` date NOT NULL,
  `lieu_exercice` varchar(255) NOT NULL,
  `description_offre` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_professionnel` (`id_professionnel`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `depot_offre_emploi`
--

INSERT INTO `depot_offre_emploi` (`id`, `id_professionnel`, `intitule_poste`, `type_contrat`, `prise_fct`, `fin_contrat`, `lieu_exercice`, `description_offre`) VALUES
(25, 1, 'test du matin', 'cdi', '2021-06-19', '2021-06-26', 'paris', 'taatatatatatat'),
(30, 2, 'ccczegfesrhgstdhtdshd', 'cdi', '2021-06-16', '2021-06-03', 'dzsfvdfgbdtugipgoijpg', 'tdhgsfghgdchugpougpojgpoug'),
(26, 1, 'willy', 'cdi', '2021-06-01', '2021-06-01', 'zefrsgf', 'ezqrsgqsgs'),
(27, 1, 'ccc', 'cdi', '2021-06-03', '2021-06-17', 'rgr', 'rgr'),
(28, 2, 'ccc', 'cdi', '2021-06-16', '2021-06-03', 'dzsfvdfgbdt', 'tdhgsfghgdch'),
(29, 1, 'test', 'cdi', '2021-06-01', '2021-06-18', 'rg', 'regrgqrsg'),
(31, 1, 'sebastien', 'cdd', '2021-06-01', '2021-06-01', 'fontenay', 'keep cool'),
(32, 1, 'valentin', 'cdi', '2021-06-02', '2021-06-10', 'tghth', 'thththh');

-- --------------------------------------------------------

--
-- Structure de la table `experience`
--

DROP TABLE IF EXISTS `experience`;
CREATE TABLE IF NOT EXISTS `experience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_particulier` int(11) NOT NULL,
  `type_emploi` varchar(255) NOT NULL,
  `secteur_emploi` varchar(255) NOT NULL,
  `type_contrat` varchar(255) NOT NULL,
  `lieu` int(11) NOT NULL,
  `descriptif_poste` text NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `entreprise` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_particulier` (`id_particulier`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `fil_actu`
--

DROP TABLE IF EXISTS `fil_actu`;
CREATE TABLE IF NOT EXISTS `fil_actu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_professionnel` int(11) NOT NULL,
  `titre_actu` varchar(255) NOT NULL,
  `date_crea_actu` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `texte_actu` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_professionnel` (`id_professionnel`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

DROP TABLE IF EXISTS `formation`;
CREATE TABLE IF NOT EXISTS `formation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_particulier` int(11) NOT NULL,
  `diplome` varchar(255) NOT NULL,
  `annee_obtention` year(4) NOT NULL,
  `organisme_ecole` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_particulier` (`id_particulier`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_particulier`
--

DROP TABLE IF EXISTS `utilisateur_particulier`;
CREATE TABLE IF NOT EXISTS `utilisateur_particulier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_compte` tinyint(1) NOT NULL DEFAULT '1',
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `code_postal` tinyint(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `tel` tinyint(16) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_pro`
--

DROP TABLE IF EXISTS `utilisateur_pro`;
CREATE TABLE IF NOT EXISTS `utilisateur_pro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_compte` tinyint(1) NOT NULL DEFAULT '2',
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `code_postal` tinyint(255) NOT NULL,
  `tel` tinyint(16) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `desc_societe` text NOT NULL,
  `raison_sociale` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
