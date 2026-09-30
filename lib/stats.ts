/**
 * Estatísticas dinâmicas do site (geradas no build)
 * Atualiza automaticamente: anos de mercado, sonhos realizados, seguidores
 */
import statsJson from "./stats.json";

export const stats = {
  generatedAt: statsJson.generatedAt,
  yearsMarket: statsJson.yearsMarket,
  yearsMarketLabel: statsJson.yearsMarketLabel,
  dreamsDone: statsJson.dreamsDone,
  dreamsDoneLabel: statsJson.dreamsDoneLabel,
  instagramFollowers: statsJson.instagramFollowers,
  instagramFollowersLabel: statsJson.instagramFollowersLabel,
} as const;

export type Stats = typeof stats;