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

## 🩹 Une pluie de correctifs

On a aussi profité de cette mise à jour pour passer un grand coup de balai :

- Votre page joueur s'affiche désormais immédiatement, sans attendre le calcul des prédictions.
- Les badges sont enfin branchés sur la saison en cours, avec des séries de victoires et défaites correctement comptées et un vrai seuil de parties sur 24 heures. Au passage, les badges vides ne s'affichent plus.
- Les parties à 0 kill s'affichent de nouveau dans l'historique
- La ligne de prédiction démarre désormais exactement là où votre historique s'arrête, et chaque valeur du graphique est alignée sur la bonne date
- Les calculs de rang sont exacts, même pile à la frontière entre deux divisions.
- La heatmap couvre maintenant une vraie année glissante, place vos parties sur le bon jour de la semaine et se met à jour quand vous changez de compte.
- Plus de winrate "NaN" ni de crash sur les historiques de rang vides.
- Le graphique ne déclenche plus un call api inutile à chaque chargement, la page joueur est un peu plus légère
- Les pages de joueurs introuvables renvoient une vraie erreur 404

À bientôt,
Mateleo
