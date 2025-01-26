---
title: "January Update: Champions, Heatmap et bien plus !"
description: Ajout du tracking des champions, d'une nouvelle heatmap et de plusieurs QoL.
tag: Release
date: 26/01/2025
author: Mateleo, Turdyo
thumbnail: calibrum.jpg
---

Bonne année 2025 à tous ! Pour ce premier devlog de l'année, nous avons énormément de choses à vous faire partager. Alors, préparez-vous à découvrir de nouvelles fonctionnalités et améliorations qui vont enrichir votre expérience sur Calibrum.

## 🧔 Des champions à perte de vue

Turdyo a ajouté une fonctionnalité: le suivi des champions joués dans chaque partie. Que ce soit sur la page d'accueil avec les dernières parties jouées, ou directement sur le profil d'un joueur, vous pouvez retrouver un historique détaillé de vos champions préférés lors des dernières parties. De plus, un historique pour chaque compte est également disponible sur votre page joueur.

![Dernière parties](/content/img/championslastgames.png)

Les nouvelles routes API de Riot Games nous permettent de stocker toutes les informations d'un match. Cette route est extrêmement complète, c'est pourquoi nous nous concentrons uniquement sur le champion joué et l'ID du match, pour des fonctionnalités futures.

```ts
if (hasNewGame) {
  if (!userAccount?.puuid) return
  const matches = await fetchLast10Matches(userAccount.puuid)
  const matchResponse = await getMatchInfo(matches[0])
  const championName = matchResponse.info.participants.find((p) => p.puuid === userAccount.puuid)?.championName
  const championId = matchResponse.info.participants.find((p) => p.puuid === userAccount.puuid)?.championId
  await prisma.lpUpdateS142.create({
    data: {
      LPC: newLPC,
      date: new Date().toISOString(),
      LP: rankedInfo.leaguePoints,
      rank: rankedInfo.rank,
      tier: rankedInfo.tier,
      lastUpdateDiff: Math.abs(diff) < 100 ? diff : 0, // prevent new seasons reset
      isDodge: isDodge(newLPC, diff),
      matchId: matchResponse.metadata.matchId,
      championName,
      championId,
      account: {
        connect: {
          id: accountId
        }
      }
    }
  })
}
```

## 🗺 Nouvelle Heatmap

Nous avons introduit une carte de fréquentation directement dans votre profil joueur. Elle représente la répartition de toutes vos parties sur la saison 15 ainsi que les split 1 et 2 de la saison 14.

![Heatmap](/content/img/heatmap.png)

## 🛠 QoL à foison

Mateleo a travaillé sur de nombreuses améliorations pour rendre Calibrum encore plus agréable à utiliser.

### Barre de recherche

Vous pouvez désormais cliquer sur le compte en question et naviguer facilement grâce à la touche tab.

### Nouveau header

Nous avons revu notre header pour lui donner une apparence plus moderne. La barre de recherche est désormais centrée et un lien vers notre blog est disponible à droite.

![Nouveau Header](/content/img/newheader.png)

### Optimisation des images

Toutes les images sur le site sont désormais gérées par NuxtImage. Ce module permet de compresser directement sur le serveur les images de Calibrum, en les rendant disponibles au format moderne "webp". Les images sont beaucoup plus légères tout en conservant une qualité optimale. Cette optimisation réduit considérablement la bande passante nécessaire.

### Caché dans les abysses

Les joueurs unranked sont maintenant cachés du classement global. Ils restent présents en base de données et réapparaîtront automatiquement après leurs parties de classement. Calibrum accueil de plus en plus de joueurs, cette fonctionnalité nous permet de mettre en avant uniquement les joueurs actifs.

### 👀 Un Blog

Calibrum possède maintenant son propre blog ! Chaque article est écrit en Markdown et conçu pour que n'importe qui puisse facilement partager son expérience. Nous publierons bientôt un article détaillé à ce sujet.

Merci pour votre attention ! N'hésitez pas à nous contacter si vous avez des questions ou des suggestions. ❤
