---
title: "September Update: Le reset de saison"
description: Ajout du tracking des LP des Challengers et des Grandmasters
tag: Release
date: 30/09/2024
author: Turdyo, Mateleo
thumbnail: calibrum.jpg
---

Bienvenue dans ce premier article consacré au développement de Calibrum. Ce mois-ci, Turdyo a préparé méticuleusement le reset du split actuel et a jeté les bases pour la saison 2025.

## 🏆 Viser le Chall

L'une des premières tâches a été d'ajouter le suivi des points de ligue (LP) nécessaires pour le rush de début de saison. Au début de chaque saison, le seuil pour atteindre le rang Challenger est fixé à 500 LP, et à 300 LP pour le rang Grandmaster. Pour rappel, les Challenger représentent les 300 meilleurs joueurs du serveur, tandis que les Grandmaster incluent les 700 suivants. Ces classements sont mis à jour quotidiennement à 00h45.

Pour le reste de la saison, Turdyo a implémenté un tracker.
Le processus commence par la récupération des données des joueurs des divisions Challenger, GrandMaster, et Master avec l'API de Riot Games pour obtenir les informations nécessaires.

```ts
const challengers = (await fetchApexPLayers("challenger")).data
const grandmasters = (await fetchApexPLayers("grandmaster")).data
const masters = (await fetchApexPLayers("master")).data
```

Une fois que les données sont récupérées, les entrées de chaque division sont fusionnées dans un seul tableau `players`. Le tableau `players` est ensuite trié en fonction des LP des joueurs, du plus élevé au plus bas. Cela nous permet de récupérer les Challengers ainsi que les Grandmaster.

```ts
const sortedPlayers = players.sort((a, b) => {
  if (a.leaguePoints === b.leaguePoints) return 0
  return a.leaguePoints > b.leaguePoints ? -1 : 1
})
```

Enfin les seuils pour les divisions Challenger et GrandMaster sont déterminés en prenant LP du dernier joueur de chaque division et en ajoutant 1 point.

```ts
const chall = newChalls.at(-1)!.leaguePoints + 1
const gm = newGM.at(-1)!.leaguePoints + 1
```

## 🔍 Une question de zoom

Turdyo a apporté une amélioration significative au graph de LP pour chaque compte en ajoutant la possibilité de zoomer et de déplacer le graphique. Grâce au zoom, les utilisateurs peuvent now examiner en détail les variations des points de ligue sur des périodes spécifiques.
![LP de Qwyvin](/content/img/image.png)
