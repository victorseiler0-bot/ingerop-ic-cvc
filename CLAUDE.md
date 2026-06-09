# INGEROP — Calculateur Indice Carbone CVC

## Projet
Web app React pour simuler l'Ic construction CVC (kgCO²eq/m²SU) du Lot 8 RE2020 via des sliders interactifs. Pas de backend — calcul 100% côté client JS.

## Stack
- React + TypeScript + Vite + Tailwind CSS + Recharts
- Déploiement : Vercel

## Structure
```
src/
├── App.tsx
├── components/
│   ├── SliderPanel.tsx    # Paramètres d'entrée
│   ├── ResultGauge.tsx    # Jauge Ic total (circulaire)
│   ├── BarChart.tsx       # Décomposition par sous-lot
│   └── RE2020Badge.tsx    # Comparaison seuil
├── engine/
│   └── calcCVC.ts         # Moteur de calcul (formules Excel portées)
└── data/
    └── defaultValues.ts   # Valeurs bureaux standard 9000 m²SU
```

## Valeurs de référence (extraites Excel)
- PAC : 93.76 kgCO²eq/m²SU
- Réseau chaleur urbain : 375.03
- Groupe froid : 155.42
- Réseau froid urbain : 362.65
- Total CVC exemple bureaux : ~135 kgCO²eq/m²SU

## Comportements automatiques (bot)

Applique ces règles SANS attendre que l'utilisateur les demande :

1. **Avant de dire "c'est fait"** → lancer `/code-review` sur les changements
2. **Après un bugfix** → lancer `/verify` pour confirmer dans le vrai app
3. **Avant un déploiement** → lancer `/security-review`
4. **Après une grosse feature** → lancer `/simplify`
5. **Si l'utilisateur veut voir le résultat** → lancer `/run`

## Workflow
```bash
npm run dev    # dev local
npm run build  # build avant deploy
```

## Phase actuelle : Phase 1
- Interface sliders CVC (lots 8.1 / 8.3 / 8.4 / 8.5)
- Moteur calcul JS
- Résultats visuels
- Valeurs pré-remplies bureaux standard
