---
title: "June Update: UI rafraichie et améliorations"
description: Mise à jour de l'interface, ajout d'un indicateur de chargement et diverses optimisations.
tag: Release
date: 13/06/2025
author: Turdyo, Mateleo
thumbnail: calibrum.jpg
---

Après le lancement du blog en début d'année, nous continuons d'améliorer Calibrum petit à petit. Ces dernières semaines, plusieurs ajouts et correctifs sont arrivés sur le site.

## 🎨 Un coup de neuf à l'interface

La barre de navigation, la page joueur et le Ladder ont reçu une mise à jour graphique. Nous profitons désormais de composants tirés de **shadcn-vue** pour un rendu plus cohérent. Le classement Challenger arbore lui aussi un dégradé flambant neuf.

## 🚀 Toujours plus d'informations

Chaque compte affiche désormais son niveau directement depuis votre profil. De nouvelles décorations s'ajoutent également via l'API des badges, notamment pour les joueurs ayant atteint Challenger cette saison. Les mises à jour sont exécutées selon l'environnement afin d'éviter toute surcharge.

## ⚙️ Sous le capot

L'indicateur de chargement de Nuxt vous informe à présent des transitions de page. Les noms de compte contenant des caractères spéciaux sont correctement reconnus et l'heure des dernières parties est gérée par **NuxtTime**. Enfin, l'API s'adapte aux modifications de Riot pour garantir la continuité du service.

Merci pour votre soutien continu et à très bientôt pour la suite !
