---
title: "July Update : Champion DNA, toujours plus de stats !"
description: Un nouvel onglet dédié à vos champions.
tag: Release
date: 10/07/2026
author: Mateleo
thumbnail: calibrum.jpg
---

Salut à tous ! La saison 16 bat son plein et Calibrum continue d'évoluer avec vous. Aujourd'hui, on vous présente une fonctionnalité : l'exploitation de toutes ces données de champions qu'on a dans notre base de données.

## 🧬 Champion DNA : quel joueur êtes-vous ?

Depuis janvier 2025, chaque partie enregistrée sur Calibrum conserve le champion joué et votre KDA. Jusqu'ici, ces informations se limitaient à votre historique de parties. L'idée est de proposer un nouvel onglet **Champion DNA** est disponible sur votre page joueur, et analysant l'intégralité de la saison en cours.

Dès l'ouverture, une carte d'identité vous accueille avec votre champion signature et la proportion qu'il représente dans vos parties. Vous y découvrirez aussi votre archétype de joueur : **One-Trick** 🎯, **Specialist** 🗡️, **Versatile** 🃏 ou **Champion Collector** 🌪️, calculé à partir de la taille "effective" de votre pool, c'est-à-dire pondérée par la fréquence réelle de vos picks.

![Champion DNA](/content/img/championdna.png)

### Un tableau complet, comparé au reste de Calibrum

Enfin, un tableau récapitule tout votre pool : parties jouées, winrate, KDA moyen, LP par partie, etc

La colonne **vs Calibrum** compare votre winrate sur chaque champion à celui du reste de l'asso, vos propres parties étant exclues du calcul pour une comparaison honnête. Et si personne d'autre ne joue votre champion, vous décrochez le badge **Signature pick 👑**.

![Champion Pool](/content/img/championpool.png)

Pour garder des statistiques lisibles, les champions joués moins de 5 fois sont regroupés dans une ligne repliable en bas du tableau.

## ⚡ Des profils qui s'affichent instantanément

Votre page joueur s'affiche désormais immédiatement, sans attendre le calcul des prédictions. Celles-ci apparaissent tranquillement quelques instants plus tard, dès qu'elles sont prêtes. Fini l'écran qui semble figé !

## 🎖️ Des badges enfin à l'heure

Les badges utilisaient encore des données de l'ancienne saison. Ils sont maintenant branchés sur la saison en cours, avec des séries de victoires et défaites correctement comptées, ainsi qu'un vrai seuil de parties sur 24 heures. Au passage, les badges vides ne s'affichent plus.

## 🩹 Une pluie de correctifs

On a aussi profité de cette mise à jour pour passer un grand coup de balai :

- Les parties à 0 kill s'affichent de nouveau dans l'historique (désolé pour les supports 🙏)
- Plus de winrate "NaN" ni de crash sur les historiques de rang vides
- Le graphique de prédiction est correctement aligné et les calculs de rang sont exacts, même pile à la frontière entre deux divisions
- La heatmap affiche les bons jours de la semaine et se met à jour quand vous changez de compte
- La pastille "live" vérifie désormais tous vos comptes liés, pas seulement le premier
- Les pages de joueurs introuvables renvoient une vraie erreur 404

Merci à tous pour vos retours, c'est grâce à eux que Calibrum s'améliore. N'hésitez pas à venir partager votre Champion DNA sur le Discord de l'association !

À bientôt,
Mateleo
